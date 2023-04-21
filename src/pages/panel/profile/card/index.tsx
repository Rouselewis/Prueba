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

  //create client secret
  // useEffect(() => {
  //     if (user?.payment_data?.stripe === null) {
  //         const { mutate: updateUser, isError, error, isSuccess } = useMutationUpdateUser();
  //         if (isError) console.log("useMutationUpdateUser ERROR", (error as Error)?.message)
  //         // if (isSuccess) queryClient.invalidateQueries(["user"])

  //         const addStripeToUser = (stripeSecret: string) => {
  //             const payment_data = {
  //                 stripe: stripeSecret,
  //             };
  //             const updatedUser: User = { ...user, payment_data: payment_data };
  //             updateUser(updatedUser);
  //         };
  //         const { data: stripeData, } = useCreateUserCard()
  //         setStripeSecret(stripeData?.client_secret)
  //         addStripeToUser(stripeSecret)

  //     } else {
  //         setStripeSecret(user?.payment_data?.stripe)
  //     }
  // }, [])

  // const paymentMethods = userCradsData?.data

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
                  {/* <CustomCard id="1" name="Hector Ruiz" type="debit" number="4242" expMonth="03" expYear="2024" /> */}
                  {/* <pre>{JSON.stringify(userCradsData.data, null, 1)}</pre>
                                    {
                                        <>
                                            <p>{userCradsData.data[0]?.id}</p>
                                            <p>{userCradsData.data[0]?.billing_details?.name}</p>
                                            <p>{userCradsData.data[0]?.type}</p>
                                            <p>{userCradsData.data[0]?.card?.last4}</p>
                                            <p>{userCradsData.data[0].card?.exp_month}</p>
                                            <p>{userCradsData.data[0].card?.exp_year}</p>
                                        </>
                                    } */}
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
