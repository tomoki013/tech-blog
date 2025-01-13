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
      		<body>
				<Elements.Providers>
					<Elements.ThemeButton />
					<Layouts.Header />
					<Elements.FlexWrapper>
						<Elements.LeftContainer />
						<Elements.CenterContainer>
							{children}
						</Elements.CenterContainer>
						<Elements.RightContainer>
							<Layouts.Profile />
						</Elements.RightContainer>
					</Elements.FlexWrapper>
					<Layouts.Footer />
				</Elements.Providers>
      		</body>
    	</html>
  	);
}
