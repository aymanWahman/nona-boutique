import Link from "@/components/link";
import { buttonVariants } from "@/components/ui/button";
import { Languages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";

async function Hero() {
  const locale = await getCurrentLocale();

  const { home } = await getTrans(locale);
  const { hero } = home;
  return (
  <section className="section-gap">
  <div className="container grid grid-cols-1 md:grid-cols-2 items-center">
    
    {/* النصوص */}
    <div className="md:py-12">
      <h1 className="text-4xl font-semibold">{hero.title}</h1>
      <p className="text-accent my-4">{hero.description}</p>
      <div className="flex items-center gap-4">
        <Link
          href={`/${Routes.MENU}`}
          className={`${buttonVariants({
            size: "lg",
          })} space-x-2 !px-4 !rounded-full uppercase`}
        >
          {hero.orderNow}
          <ArrowRightCircle
            className={`!w-5 !h-5 ${
              locale === Languages.ARABIC ? "rotate-180" : ""
            }`}
          />
        </Link>
        <Link
          href={`/${Routes.ABOUT}`}
          className="flex gap-2 items-center text-black hover:text-primary duration-200 transition-colors font-semibold"
        >
          {hero.learnMore}
          <ArrowRightCircle
            className={`!w-5 !h-5 ${
              locale === Languages.ARABIC ? "rotate-180" : ""
            }`}
          />
        </Link>
      </div>

      {/* ✅ الصورة للموبايل فقط */}
      <div className="relative block md:hidden mt-6 h-64 w-full">
        <Image
          src="https://res.cloudinary.com/dktod7mod/image/upload/v1753432960/nonasalopette_qghuro.png"
          alt="Nona’s Boutique"
          fill
          className="object-contain"
          loading="eager"
          priority
        />
      </div>
    </div>

    {/* ✅ الصورة للديسكتوب فقط */}
    <div className="relative hidden md:block h-full">
      <Image
        src="https://res.cloudinary.com/dktod7mod/image/upload/v1753432960/nonasalopette_qghuro.png"
        alt="Nona’s Boutique"
        fill
        className="object-contain"
        loading="eager"
        priority
      />
    </div>
  </div>
</section>

  );
}
export default Hero;
