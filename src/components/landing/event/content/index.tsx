/** @format */
import { Fragment } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Tab } from '@headlessui/react';
// Helpers
import { classNames } from '@/helpers';
// Icons
import {
  CalendarDaysIcon,
  ClockIcon,
  CurrencyDollarIcon,
  MapIcon,
} from '@heroicons/react/24/outline';
import { EventShare } from './eventShare';
import { EventPayMethod } from './eventPayMethod';

const product = {
  name: 'Aladín - El Deslumbrante Show De Brodway',
  cost: '$ 220.00',
  date: 'Friday, April 8 2022',
  time: '19:00 - 21:00',
  location: 'Plaza Miguel Auza, Zacatecas',

  imageSrc: '/images/events/event/prueba01.webp',
  imageAlt: 'test',
};
const description = {
  href: '#',
  summary:
    'For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.',
  content: `
      <h4>Example of event description</h4>
      
      <p>For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.</p>
      
      <ul role="list">
      <li>You\'re allowed to use the icons in unlimited projects.</li>
      <li>Attribution is not required to use the icons.</li>
      </ul>
      
      <h4>What you can do with it</h4>
      
      <ul role="list">
      <li>Don\'t be greedy. Selling or distributing these icons in their original or modified state is prohibited.</li>
      <li>Don\'t be evil. These icons cannot be used on websites or applications that promote illegal or immoral beliefs or activities.</li>
      </ul>
    `,
};
const info = [
  {
    question: 'What format are these icons?',
    answer:
      'The icons are in SVG (Scalable Vector Graphic) format. They can be imported into your design tool of choice and used directly in code.',
  },
  {
    question: 'Can I use the icons at different sizes?',
    answer:
      "Yes. The icons are drawn on a 24 x 24 pixel grid, but the icons can be scaled to different sizes as needed. We don't recommend going smaller than 20 x 20 or larger than 64 x 64 to retain legibility and visual balance.",
  },
  // More FAQs...
];

type Props = {
  currentColor: string;
};
export const EventContent = ({ currentColor }: Props) => {
  const t = useTranslations('Public');
  return (
    <>
      {/* Product */}
      <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
        {/* Product image */}
        <div className="lg:col-span-4 lg:row-end-1">
          <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.imageSrc}
              alt={product.name}
              className="object-cover object-center"
            />
          </div>
          <div className="pt-2 border-gray-200 flex justify-end">
            <span className={`px-4 pt-2 text-${currentColor}`}>
              {t('event.share_on')}:
            </span>
            <EventShare
              share={t('event.share_on')}
              currentColor={currentColor}
            />
          </div>
        </div>

        {/* Product details */}
        <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
          <div className="flex flex-col-reverse">
            <div className="mt-4">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
              <h2 id="information-heading" className="sr-only">
                {t('event.product_info')}
              </h2>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-base">
              <div className="flex items-center">
                <CurrencyDollarIcon
                  className={`w-5 h-5 text-${currentColor}`}
                />
                <span className="px-2">{t('event.cost')}</span>
              </div>
            </div>
            <p className="text-customGray">{product.cost}</p>
          </div>
          <div className="mt-6">
            <div className="text-base">
              <div className="flex items-center">
                <CalendarDaysIcon className={`w-5 h-5 text-${currentColor}`} />
                <span className="px-2">{t('event.date')}</span>
              </div>
            </div>
            <p className="text-customGray">{product.date}</p>
          </div>
          <div className="mt-6">
            <div className="text-base">
              <div className="flex items-center">
                <ClockIcon className={`w-5 h-5 text-${currentColor}`} />
                <span className="px-2">{t('event.time')}</span>
              </div>
            </div>
            <p className="text-customGray">{product.time}</p>
          </div>
          <div className="mt-6">
            <div className="text-base">
              <div className="flex items-center">
                <MapIcon className={`w-5 h-5 text-${currentColor}`} />
                <span className="px-2">{t('event.location')}</span>
              </div>
            </div>
            <p className="text-customGray">{product.location}</p>
          </div>

          <div className="w-80 mt-20 grid grid-cols-1 gap-x-6 gap-y-4 mx-auto">
            <button
              type="button"
              className={`flex w-full items-center justify-center rounded-md border border-transparent bg-${currentColor} py-3 px-8 text-base font-medium text-white hover:bg-${currentColor} focus:outline-none focus:ring-2 focus:ring-${currentColor} focus:ring-offset-2 focus:ring-offset-gray-50`}
            >
              {t('event.buy')}
            </button>
          </div>
          <div className="flex justify-center pt-4">
            <EventPayMethod />
          </div>
          <div className="flex justify-center mt-6">
            <div className="text-xl">
              <div className="flex items-center">
                <span className="px-2">{t('event.supplier')}: </span>
                <span className={`text-customGray hover:text-${currentColor}`}>
                  CTickets
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
          <Tab.Group as="div">
            <div className="border-b border-gray-200">
              <Tab.List className="-mb-px flex space-x-8">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      selected
                        ? `border-${currentColor} text-${currentColor}`
                        : `border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800`,
                      'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                    )
                  }
                >
                  {t('event.description')}
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      selected
                        ? `border-${currentColor} text-${currentColor}`
                        : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                      'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                    )
                  }
                >
                  {t('event.information')}
                </Tab>
              </Tab.List>
            </div>
            <Tab.Panels as={Fragment}>
              <Tab.Panel className="pt-10">
                <h3 className="sr-only">{t('event.description')}</h3>
                <div
                  className="prose prose-sm max-w-none text-gray-500"
                  dangerouslySetInnerHTML={{ __html: description.content }}
                />
              </Tab.Panel>

              <Tab.Panel className="text-sm text-gray-500">
                <h3 className="sr-only">{t('event.information')}</h3>
                <dl>
                  {info.map((faq) => (
                    <Fragment key={faq.question}>
                      <dt className="mt-10 font-medium text-gray-900">
                        {faq.question}
                      </dt>
                      <dd className="prose prose-sm mt-2 max-w-none text-gray-500">
                        <p>{faq.answer}</p>
                      </dd>
                    </Fragment>
                  ))}
                </dl>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </>
  );
};
