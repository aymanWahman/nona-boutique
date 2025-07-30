import Link from "../link";
import Navbar from "./Navbar";
import CartButton from "./cart-button";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import LanguageSwitcher from "./language-switcher";
import AuthButtons from "./auth-buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

async function Header() {
  const locale = await getCurrentLocale();
  const initialSession = await getServerSession(authOptions);
  const translations = await getTrans(locale);
  return (
    <header className="fixed top-0 w-full py-4 bg-transparent backdrop-blur-md z-40">
      <div className="container flex items-center justify-between gap-x-6 lg:gap-x-10">
        <Link
          href={`/${locale}`}
          className={`text-primary font-semibold text-2xl ${dancingScript.className}`}
        >
          {translations.logo}
        </Link>
        <Navbar translations={translations} initialSession={initialSession} />
        <div className="flex items-center gap-6 flex-1 justify-end">
          <div className="hidden lg:flex lg:items-center lg:gap-6 ">
            <AuthButtons
              translations={translations}
              initialSession={initialSession}
            />
            <LanguageSwitcher />
          </div>

          <CartButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
