/** @format */
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import MainLayout from "@/components/layout/main";
import Header from "@/components/headers/landing/header";
import Section from "@/components/headers/landing/section";
//Images
import image from "public/images/assets/landing/advert/slide.jpg";
import advert from "public/images/assets/landing/advert/advert.png";
// Vectors images
import vector1 from "public/images/assets/landing/advert/vector1.png";
import vector2 from "public/images/assets/landing/advert/vector2.png";
import vector3 from "public/images/assets/landing/advert/vector3.png";
import vector4 from "public/images/assets/landing/advert/vector4.png";
import vector5 from "public/images/assets/landing/advert/vector5.png";

const Advert = () => {
  const t = useTranslations("Advert");
  const tb = useTranslations("btn");

  return (
    <>
      <Header image={image} />
      <Section title={t('page')} gradiant="h-[129px] w-[100%] pl-[20px] lg:pl-[200px] py-[35px] bg-gradient-to-b from-customYellow via-customYellow to-white" />

      <div className="relative h-fit w-full">
        <div className=" px-[5vw] py-8">
          <div className="flex h-[44vw] md:h-[24vw] lg:h-[15vw] w-full items-start justify-center content-center">
            <div className="flex items-center justify-center self-center content-center">
              <Image
                src={advert}
                className="h-fit w-[100%] object-contain"
                alt="main"
              />
            </div>
            <div className="flex h-full w-[40%] flex-col justify-between">
              <h1 className="text-xl md:text-3xl lg:text-7xl font-bold">
                {t('question')}
              </h1>
              <div className="space-y-6">
                <p className="text-xs md:text-xl lg:text-2xl font-bold text-[#4B4B4D]">
                  {t('answer')}
                </p>
                <Link href="/landing/contact" passHref>
                  <button className="w-[100%] md:w-[100%] lg:w-[80%] rounded-md border-0 bg-customYellow py-2 px-2 text-sm font-bold text-white shadow-lg shadow-[#00000044] active:ring-0 ">
                  {tb('contact_us')}
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="relative flex h-fit w-full flex-col items-center justify-center space-y-12 lg:space-y-32 pt-16 md:pt-26 lg:pt-32 pb-20 font-bold">
            <div className="relative flex h-fit w-full flex-wrap items-start justify-center gap-y-28 gap-x-[18%] py-10 md:py-0 lg:py-0">
              <div className="flex h-fit w-fit flex-col items-center justify-center space-y-8 text-center md:w-[30%] lg:w-[15%]">
                <div>
                  <Image
                    src={vector1}
                    className="h-24 w-28 object-contain"
                    alt="mask2"
                  />
                </div>
                <div className="space-y-5">
                  <h1 className="text-2xl font-bold leading-tight">
                    {t('target')}
                  </h1>
                  <p className="text-base font-bold leading-tight text-[#4B4B4D]">
                    {t('target_desc')}
                  </p>
                </div>
              </div>
              <div className="flex h-fit w-fit flex-col items-center justify-center space-y-8 text-center md:w-[30%] lg:w-[15%]">
                <div>
                  <Image
                    src={vector2}
                    className="h-24 w-28 object-contain"
                    alt="mask2"
                  />
                </div>
                <div className="space-y-5">
                  <h1 className="text-2xl font-bold leading-tight">
                    {t('social')}
                  </h1>
                  <p className="text-base font-bold leading-tight text-[#4B4B4D] whitespace-pre-line">
                    {t('social_desc')}
                  </p>
                </div>
              </div>
              <div className="flex h-fit w-fit flex-col items-center justify-center space-y-8 text-center md:w-[30%] lg:w-[15%]">
                <div>
                  <Image
                    src={vector3}
                    className="h-24 w-28 object-contain"
                    alt="mask2"
                  />
                </div>
                <div className="space-y-5">
                  <h1 className="text-2xl font-bold leading-tight">
                    {t('advert')}
                  </h1>
                  <p className="text-base font-bold leading-tight text-[#4B4B4D] whitespace-pre-line">
                    {t('advert_desc')}
                  </p>
                </div>
              </div>
              <div className="flex h-fit w-fit flex-col items-center justify-center space-y-8 text-center md:w-[30%] lg:w-[15%]">
                <div>
                  <Image
                    src={vector4}
                    className="h-24 w-28 object-contain"
                    alt="mask2"
                  />
                </div>
                <div className="space-y-5">
                  <h1 className="text-2xl font-bold leading-tight">
                    {t('newsletter')}
                  </h1>
                  <p className="text-base font-bold leading-tight text-[#4B4B4D]">
                    {t('newsletter_desc')}
                  </p>
                </div>
              </div>
              <div className="flex h-fit w-fit flex-col items-center justify-center space-y-8 text-center md:w-[30%] lg:w-[15%]">
                <div>
                  <Image
                    src={vector5}
                    className="h-24 w-28 object-contain"
                    alt="mask2"
                  />
                </div>
                <div className="space-y-5">
                  <h1 className="text-2xl font-bold leading-tight">{t('ticket')}</h1>
                  <p className="text-base font-bold leading-tight text-[#4B4B4D]">
                    {t('ticket_desc')}
                  </p>
                </div>
              </div>
            </div>
            <Link href="/landing/contact" passHref>
              <button className="w-[10rem] md:w-[30rem] lg:w-[40rem] rounded-md border-0 bg-customYellow py-2 px-2 text-sm font-bold text-white shadow-lg shadow-[#00000044] active:ring-0 ">
                {tb('contact_us')}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

Advert.Layout = MainLayout;
export default Advert;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
}
