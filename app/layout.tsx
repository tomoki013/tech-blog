import type { Metadata } from "next";
import "./globals.scss";
import * as Layouts from '@/app/components/layouts/index';
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
			<head>
				<meta name="google-site-verification" content="jk1E308JgpkVeYLTheB9i3UHWU3QVrRU9afhkYgvWPw" />
				<meta name="msvalidate.01" content="37047B265EABB92200421D53818C4486" />
				<meta name="google-adsense-account" content="ca-pub-8687520805381056"></meta>
			</head>
      		<body>
				<Elements.Providers>
					<Elements.ThemeButton />
					<Layouts.Header />
					<Elements.FlexWrapper>
						{children}
					</Elements.FlexWrapper>
					<Layouts.Footer />
				</Elements.Providers>
      		</body>
    	</html>
  	);
}
