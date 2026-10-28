import assert from "node:assert/strict";
import { existsSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { evaluateAudit } from "./audit-dependencies.mjs";

const now = new Date("2026-10-28T00:00:00Z");
const exception = {
  ghsa: "GHSA-jmr9-qjv8-65gv",
  package: "extract-zip",
  severity: "high",
  versions: ["2.0.1"],
  paths: [".>@lhci/cli>lighthouse>puppeteer-core>@puppeteer/browsers>extract-zip"],
  expires: "2027-01-26",
  reason: "Installed Chrome only; no browser archive extraction.",
};

function report({
  ghsa = exception.ghsa,
  name = exception.package,
  version = "2.0.1",
  paths,
  severity = "high",
} = {}) {
  return {
    metadata: { vulnerabilities: { high: 1 } },
    advisories: {
      1: {
        url: `https://github.com/advisories/${ghsa}`,
        module_name: name,
        severity,
        findings: [{ version, paths: paths ?? exception.paths }],
      },
    },
  };
}

test("only the reviewed advisory, package, version, and complete path pass", () => {
  assert.deepEqual(evaluateAudit(report(), [exception], now).issues, []);
  for (const changed of [
    { ghsa: "GHSA-aaaa-bbbb-cccc" },
    { name: "other-package" },
    { version: "2.0.2" },
    { severity: "critical" },
    { paths: [".>astro>extract-zip"] },
    { paths: [...exception.paths, ".>other-tool>extract-zip"] },
  ]) {
    assert.ok(evaluateAudit(report(changed), [exception], now).issues.length > 0);
  }
});

test("expired, stale, and duplicate exceptions fail", () => {
  assert.ok(
    evaluateAudit(report(), [exception], new Date("2027-01-27T00:00:00Z")).issues.length > 0,
  );
  const clean = { advisories: {}, metadata: { vulnerabilities: { high: 0 } } };
  assert.ok(evaluateAudit(clean, [exception], now).issues.length > 0);
  assert.deepEqual(evaluateAudit(clean, [], now).issues, []);
  assert.throws(() => evaluateAudit(report(), [exception, exception], now));
});

test("network errors and incomplete reports fail closed", () => {
  for (const invalid of [
    {},
    { error: { code: "ECONNRESET" } },
    { advisories: {}, metadata: { vulnerabilities: { high: 1 } } },
    { advisories: {}, metadata: { vulnerabilities: { high: "unavailable" } } },
    { ...report(), advisories: { 1: { findings: [] } } },
    report({ paths: [] }),
  ]) {
    assert.throws(() => evaluateAudit(invalid, [exception], now));
  }
});

test("security overrides preserve the APIs used by Lighthouse CI and its proxy helper", () => {
  const cliRequire = createRequire(import.meta.resolve("@lhci/cli/package.json"));
  const temp = cliRequire("tmp").fileSync({ postfix: ".html" });
  try {
    assert.ok(existsSync(temp.name));
    assert.equal(statSync(temp.name).mode & 0o777, 0o600);
  } finally {
    temp.removeCallback();
  }
  assert.equal(existsSync(temp.name), false);
  assert.match(cliRequire("uuid").v4(), /^[0-9a-f-]{14}4[0-9a-f-]{21}$/);

  const proxyRequire = createRequire(cliRequire.resolve("proxy-agent"));
  const pacRequire = createRequire(proxyRequire.resolve("pac-proxy-agent"));
  const uriRequire = createRequire(pacRequire.resolve("get-uri"));
  const client = new (uriRequire("basic-ftp").Client)();
  for (const method of ["access", "lastMod", "list", "downloadTo", "close"]) {
    assert.equal(typeof client[method], "function");
  }
  client.close();
});
