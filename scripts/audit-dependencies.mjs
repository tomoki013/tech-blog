import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Exceptions match an advisory, package, version, and complete dependency path.
// A production path, new advisory, or changed version must be reviewed again.
export function evaluateAudit(report, exceptions, now = new Date()) {
  if (
    report.error ||
    !report.advisories ||
    typeof report.advisories !== "object" ||
    Array.isArray(report.advisories) ||
    !report.metadata?.vulnerabilities ||
    !Array.isArray(exceptions)
  ) {
    throw new Error("Invalid audit report or exception list; refusing to pass the audit.");
  }

  const accepted = [];
  const issues = [];
  const used = new Set();
  const today = now.toISOString().slice(0, 10);
  const byGhsa = new Map();

  for (const exception of exceptions) {
    if (
      !/^GHSA-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}$/.test(exception.ghsa) ||
      !exception.package ||
      !exception.severity ||
      !exception.reason?.trim() ||
      !exception.versions?.length ||
      !exception.paths?.length ||
      !/^\d{4}-\d{2}-\d{2}$/.test(exception.expires) ||
      !Number.isFinite(Date.parse(exception.expires)) ||
      new Date(exception.expires).toISOString().slice(0, 10) !== exception.expires ||
      byGhsa.has(exception.ghsa)
    ) {
      throw new Error("Invalid or duplicate audit exception.");
    }
    if (today > exception.expires) issues.push(`Expired exception: ${exception.ghsa}`);
    byGhsa.set(exception.ghsa, exception);
  }

  const advisories = Object.values(report.advisories);
  const counts = Object.values(report.metadata.vulnerabilities);
  if (!counts.length || counts.some((count) => !Number.isInteger(count) || count < 0)) {
    throw new Error("Audit report has invalid vulnerability counts.");
  }
  const reportedCount = counts.reduce((a, b) => a + b, 0);
  if ((reportedCount > 0 && advisories.length === 0) || reportedCount < advisories.length) {
    throw new Error("Audit vulnerability counts do not match advisory details.");
  }

  for (const advisory of advisories) {
    const ghsa = advisory.url?.match(/\/advisories\/(GHSA-[a-z0-9-]+)$/)?.[1];
    const exception = byGhsa.get(ghsa);
    if (!advisory.findings?.length) throw new Error("Audit advisory has no dependency findings.");
    for (const finding of advisory.findings) {
      if (!finding.paths?.length) throw new Error("Audit finding has no dependency path.");
      for (const path of finding.paths) {
        const label = `${ghsa ?? advisory.id}: ${advisory.module_name}@${finding.version} (${path})`;
        if (
          exception &&
          today <= exception.expires &&
          exception.package === advisory.module_name &&
          exception.severity === advisory.severity &&
          exception.versions.includes(finding.version) &&
          exception.paths.includes(path)
        ) {
          accepted.push(label);
          used.add(ghsa);
        } else {
          issues.push(`Unreviewed ${advisory.severity} vulnerability: ${label}`);
        }
      }
    }
  }

  for (const exception of exceptions) {
    if (!used.has(exception.ghsa)) issues.push(`Remove stale exception: ${exception.ghsa}`);
  }
  return { accepted, issues };
}

if (import.meta.main) {
  try {
    const result = spawnSync("pnpm", ["audit", "--json"], {
      cwd: fileURLToPath(new URL("..", import.meta.url)),
      encoding: "utf8",
      maxBuffer: 16 * 1024 * 1024,
    });
    if (result.error || result.signal || ![0, 1].includes(result.status)) {
      throw new Error(`Could not complete pnpm audit: ${result.error?.message ?? result.stderr}`);
    }
    const report = JSON.parse(result.stdout);
    const exceptions = JSON.parse(
      readFileSync(new URL("../security/audit-exceptions.json", import.meta.url), "utf8"),
    );
    const { accepted, issues } = evaluateAudit(report, exceptions);
    for (const finding of accepted) console.warn(`REVIEWED EXCEPTION: ${finding}`);
    if (issues.length) throw new Error(issues.join("\n"));
    console.log(
      `Dependency audit passed with ${accepted.length} reviewed development-only findings.`,
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
