import { useTranslations } from 'next-intl';
// Components
import { TopEvents } from '@/components/admin/tables';
import { SimpleCard } from './stats';

export const PromoterDashboard = () => {
  const td = useTranslations('Panel_Dashboard');

  const cards = [
    { name: td('active'), amount: '2', color: 'customPurple' },
    { name: td('visit'), amount: '52,000', color: 'customRed' },
    { name: td('attend'), amount: '28,800', color: 'customGreen' },
    { name: td('shared'), amount: '60,000', color: 'customBlue' },
  ];

  return (
    <>
      <div className="flex flex-1 pt-6">
        <div className="w-screen min-h-0 overflow-hidden">
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card */}
            {cards.map((card) => (
              <SimpleCard
                name={card.name}
                amount={card.amount}
                color={card.color}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-1 pt-6">
        <div className="w-screen min-h-0 overflow-hidden">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <TopEvents />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
