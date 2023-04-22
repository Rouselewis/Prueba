import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
// Components
import { BasicTable } from '@/components/admin/tables';
import { columnsTicketDashboard } from '@/components/admin/tables/columns/columnsTicketDashboard';
import { columnsTicketPhaseDashboard } from '@/components/admin/tables/columns/columnsTicketPhaseDashboard';
import { ComplexCard, SimpleCard } from './stats';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { CurrentColor } from '@/helpers';

export const TicketDashboard = () => {
  const td = useTranslations('Panel_Dashboard');
  const currentColor = CurrentColor();

  const info = [
    { name: td('active'), amount: '25,000', color: 'customPurple' },
    { name: td('available'), amount: '5,000', color: 'customRed' },
    { name: td('sold'), amount: '19,500', color: 'customGreen' },
    { name: td('attendance'), amount: '19,800', color: 'customPink' },
    { name: td('earns'), amount: '$3,855,000', color: 'customBlue' },
  ];
  const stats = [
    { name: td('visit'), amount: '40,000' },
    { name: td('likes'), amount: '108,000' },
    { name: td('assisted'), amount: '19,000' },
  ];
  const shared = [
    { name: 'facebook', amount: '1,080,000' },
    { name: 'instagram', amount: '400,00' },
    { name: 'twitter', amount: '600,000' },
    { name: 'whatsapp', amount: '2,000,000' },
    { name: 'telegram', amount: '350,000' },
  ];

  const dataT = useMemo(
    () => [
      {
        id: '1',
        section: 'General',
        amount: '10,000',
        available: '2,500',
        sold: '7,300',
        attendance: '7,500',
        cost: '$100',
        earns: '$730,000',
      },
      {
        id: '2',
        section: 'Preferente',
        amount: '15,000',
        available: '2,500',
        sold: '12,500',
        attendance: '15,000',
        cost: '$250',
        earns: '$3,125,000',
      },
    ],
    []
  );
  const columnsT = columnsTicketDashboard();

  const dataTP = useMemo(
    () => [
      {
        id: '1',
        phase: 'test',
        start_at: '2023-02-02',
        end_at: '2023-02-02',
        available: 100,
        sold: 100,
        cost: '$100',
        earns: '$1200',
      },
      {
        id: '2',
        phase: 'test2',
        start_at: '2023-02-02',
        end_at: '2023-02-02',
        available: 100,
        sold: 100,
        cost: '$250',
        earns: '$1200',
      },
    ],
    []
  );
  const columnsTP = columnsTicketPhaseDashboard();

  return (
    <>
      <div className="flex flex-1 pt-6">
        <div className="w-screen min-h-0 overflow-hidden">
          <div className="flex justify-between">
            <div className="text-2xl">Mineros vs America</div>
            <div className="text-xl">
              <div className="flex items-center">
                <CalendarIcon className={`w-5 h-5 text-${currentColor}`} />
                <span className="px-2">Viernes 28 Abril 2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 pt-6">
        <div className="w-screen min-h-0 overflow-hidden">
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {/* Card */}
            {info.map((card) => (
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
            <div className="col-span-12 lg:col-span-6">
              <div
                className={`mt-2 grid grid-cols-1 sm:grid-cols-3 rounded-lg border-t-[30px] border-customPurple`}
              >
                {/* Card */}
                {stats.map((stat) => (
                  <ComplexCard name={stat.name} amount={stat.amount} />
                ))}
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div
                className={`mt-2 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 rounded-lg border-t-[30px] border-customGreen`}
              >
                {/* Card */}
                {shared.map((share) => (
                  <ComplexCard name={share.name} amount={share.amount} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden shadow sm:rounded-lg mb-16 mt-16">
        <div className="min-w-full divide-y divide-gray-300">
          <BasicTable columns={columnsT} defaultData={dataT} />
        </div>
      </div>
      <div className="overflow-hidden shadow sm:rounded-lg mb-16 mt-16">
        <div className="min-w-full divide-y divide-gray-300">
          <BasicTable columns={columnsTP} defaultData={dataTP} />
        </div>
      </div>
    </>
  );
};
