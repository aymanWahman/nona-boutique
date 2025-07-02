import { Routes } from '@/constants/enums';
import MainHeading from '../main-heading';
import { getCurrentLocale } from '@/lib/getCurrentLocale';
import getTrans from '@/lib/translation';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils'; // helper for conditional classNames

async function About() {
  const locale = await getCurrentLocale();
  const { home } = await getTrans(locale);
  const { about } = home;
  const { descriptions, cards } = about;

  const isArabic = locale === 'ar';

  return (
    <section className="section-gap" id={Routes.ABOUT} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="container text-center">
        <MainHeading subTitle={about.ourStory} title={about.aboutUs} />
        <div className="text-accent max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>{descriptions.one}</p>
          <p>{descriptions.two}</p>
          <p>{descriptions.three}</p>
        </div>
      </div>

      <section className="px-6 py-12 max-w-5xl mx-auto text-center space-y-10">
      

        <div className={cn('grid md:grid-cols-3 gap-6', isArabic && 'text-right')}>
          <div className="bg-card p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-2">{cards.missionTitle}</h2>
            <p className="text-muted-foreground">{cards.missionText}</p>
          </div>

          <div className="bg-card p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-2">{cards.visionTitle}</h2>
            <p className="text-muted-foreground">{cards.visionText}</p>
          </div>

          <div className="bg-card p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-2">{cards.identityTitle}</h2>
            <p className="text-muted-foreground">{cards.identityText}</p>
          </div>
        </div>

        <div className="space-y-3 text-center">
          <h3 className="text-2xl font-bold text-primary">{cards.slogan}</h3>
          <p className="text-muted-foreground">{cards.subSlogan}</p>
        </div>

        <Button asChild>
          <a href={Routes.MENU}>{cards.button}</a>
        </Button>
      </section>
    </section>
  );
}

export default About;
