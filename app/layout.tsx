import type { Metadata } from "next";
import "./globals.scss";
import * as Layout from '@/app/components/layouts/index';
import * as Elements from '@/app/components/elements/index';

export const metadata: Metadata = {
  	title: "ともきちのITブログ",
  	description: "ともきちのITブログです。",
};

export default function RootLayout({
  	children,
}: Readonly<{
  	children: React.ReactNode;
}>) {
  	return (
    	<html lang="ja" suppressHydrationWarning>
      		<body>
				<Elements.Providers>
					<Elements.ThemeButton />
					<Layout.Header />
        				{children}
					<Layout.Footer />
				</Elements.Providers>
      		</body>
    	</html>
  	);
}
