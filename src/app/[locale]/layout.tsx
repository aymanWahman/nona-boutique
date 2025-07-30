import Header from "@/components/header";
import Footer from "@/components/footer";
import ReduxProvider from "@/providers/ReduxProvider";
import { Directions, Languages } from "@/constants/enums";


import { Locale } from "@/i18n.config";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";

export async function generateStaticParams() {
  return [{ locale: Languages.ARABIC }, { locale: Languages.ENGLISH }];
}


export default async function RootLayout({
  params,
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const locale = (await params).locale;
  return (
    <html
      lang={locale}
      dir={locale === Languages.ARABIC ? Directions.RTL : Directions.LTR}
    >
      <body>
        <NextAuthSessionProvider>
          <ReduxProvider>
            <Header />
            {children}
            <Footer />
            <Toaster />
          </ReduxProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
