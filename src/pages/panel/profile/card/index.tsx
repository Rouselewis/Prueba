/** @format */
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
// Layout and Header
import AdminLayout from '@/components/layout/admin';
import { Heading } from '@/components/headers/admin/heading';
// Components
import { CustomCard } from '@/components/admin/profile/customCard';
// queries
import { useUserCard } from '@/hooks/user/user_card';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '@/interfaces/user';
// Session
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const ProfileCard = () => {
  const t = useTranslations('Panel_Profile_Card');
  const ts = useTranslations('Panel_SideBar');
  const tb = useTranslations('btn');

  const breadcrumb = [
    { page: ts('user'), href: '/panel/profile' },
    { page: ts('profile.card.name'), href: '' },
  ];
  const buttonBread = {
    text: tb('new_card'),
    href: '/panel/profile/card/create',
  };

  const { data: session, status } = useSession();
  const route = useRouter();
  if (status !== 'authenticated') {
    route.push('/');
  }

  const queryClient = useQueryClient();
  // const userData = queryClient.getQueryData(["user"])

  // const user: User = userData?.[0]?.user;

  // //get all user cards
  const { data: userCradsData, isLoading, isSuccess } = useUserCard();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isSuccess) {
    queryClient.invalidateQueries(['user']);
    queryClient.invalidateQueries(['user', 'get card']);
  }
  console.log(JSON.stringify(userCradsData?.data, null, 1));

  return (
    <div>
      {/* Breadcrumb section */}
      <div>
        <Heading breadcrumb={breadcrumb} buttonBread={buttonBread} />
      </div>
      <div className="flex flex-1 pt-6">
        <div className="w-screen min-h-0 overflow-hidden">
          <div className="lg:col-span-9">
            <div>
              <div className="grid text-stone-500 text-20 ">{t('message')}</div>
            </div>
            <div>
              <div className="md:flex md:items-center md:justify-between">
                <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {userCradsData &&
                    userCradsData.data.map((card: any) => (
                      <div key={card?.id}>
                        <CustomCard
                          id={card.id}
                          name={card?.billing_details?.name}
                          type={card?.type}
                          number={card?.card?.last4}
                          expMonth={card?.card?.exp_month}
                          expYear={card?.card?.exp_year}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileCard.Layout = AdminLayout;
export default ProfileCard;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
}
