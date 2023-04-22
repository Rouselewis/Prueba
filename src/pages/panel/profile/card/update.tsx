import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import AdminLayout from '@/components/layout/admin';
import { CardForm } from '@/components/admin/profile/cardForm';
// Session
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);
console.log(process.env.NEXT_PUBLIC_STRIPE_API_KEY);

const CardCreate = () => {
  const t = useTranslations('Panel_Profile_Card');

  const { data: session, status } = useSession();
  const route = useRouter();

  if (status !== 'authenticated') {
    route.push('/');
  }

  return (
    <div>
      <h1>{t('add_card')}</h1>
      <Elements stripe={stripePromise}>
        <CardForm />
      </Elements>
    </div>
  );
};

CardCreate.Layout = AdminLayout;
export default CardCreate;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
}
