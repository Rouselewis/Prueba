/** @format */
import { useState } from 'react';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
// Layout and Header
import AdminLayout from '@/components/layout/admin';
import { Heading } from '@/components/headers/admin/heading';
// Forms
import { CustomCancel, CustomSubmit } from '@/components/forms';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
  EventCategory,
  EventSpecialCategory,
  EventSupplier,
} from '@/interfaces/event';
import { WithDocs } from '@/interfaces/serializers/commons';
import CreateEventStep0 from '@/components/admin/event/CreateEventStep0';
import CreateEventStep1 from '@/components/admin/event/CreateEventStep1';
import CreateEventStep2 from '@/components/admin/event/CreateEventStep2';
import CreateEventStep3 from '@/components/admin/event/CreateEventStep3';
import { getEventsCategories } from '@/api/event/event_category';
import { getEventsSpecialsCategories } from '@/api/event/event_special_category';
import { getEventsSuppliers } from '@/api/event/event_supplier';

type FormData = {
  lang: string;
  event_general: {
    supplier_id: string;
    category_id: string;
    sub_category_id: string;
    sub_sub_cateogry_id: string;
    images: {
      web: string;
      app: string;
      flyer: string;
    };
    tags: string[];
    content: {
      name: string;
      description: string;
      lang: string;
    }[];
  };
  event_aditional: {
    social_media: {
      facebook: string;
      instagram: string;
      twitter: string;
    };
    info: {
      age_limit: number;
      duration: string;
      content: {
        lang: string;
        general: string;
        observations: string;
        services: string;
        restrictions: string;
        access_limit: string;
      }[];
    };
  };
  eventDates: {
    dates: {
      range: {
        start_at: Date;
        end_at: Date;
      };
    };
    schedules: {
      start_at: Date;
      end_at: Date;
      costs: {
        cost: number;
        lower: number;
        high: number;
      };
      urls: {
        ticket: string;
        streaming: string;
      };
    }[];
  };
  address: string;
  address2: string;
  zipcode: string;
  country: string;
  state: string;
  city: string;
  currency: string;
  date_type: 'define' | 'range';
};

type Props = {
  categories: EventCategory[];
  specialCategories: WithDocs<EventSpecialCategory>;
  suppliers: EventSupplier[];
};

const EventCreate = ({ categories, specialCategories, suppliers }: Props) => {
  const [step, setStep] = useState(0);
  const t = useTranslations('Panel_SideBar');
  const te = useTranslations('Ferrors');
  const validationSchema = [
    yup.object().shape({
      event_general: yup.object({
        supplier_id: yup.string().required(te('required')),
        category_id: yup.string().required(te('required')),
        sub_category_id: yup.string().required(te('required')),
        sub_sub_category_id: yup.string().required(te('required')),
        tags: yup.array(yup.string()).min(1, te('required')),
        content: yup.array(
          yup.object({
            name: yup.string().required(te('required')),
            description: yup.string().required(te('required')),
          })
        ),
      }),
    }),
    yup.object().shape({
      event_aditional: yup.object({
        social_media: yup.object({
          facebook: yup.string(),
          instagram: yup.string(),
          twitter: yup.string(),
        }),
        info: yup.object({
          age_limit: yup
            .number()
            .test('Required', te('required'), (t) => t !== 0),
          duration: yup.string().required(te('required')),
          content: yup.array(
            yup.object({
              lang: yup.string(),
              general: yup.string(),
              observations: yup.string(),
              access_limit: yup.string(),
            })
          ),
        }),
      }),
    }),
    yup.object().shape({
      searchaddress: yup.string(),
      address: yup.string().required(te('required')),
      address2: yup.string(),
      zipcode: yup.string().required(te('required')),
      country: yup.string().required(te('required')),
      state: yup.string().required(te('required')),
      city: yup.string().required(te('required')),
    }),
    yup.object().shape({
      event_dates: yup.object({
        dates: yup.object({
          range: yup.object({
            start_at: yup.date().required(te('required')),
            end_at: yup.date(),
          }),
        }),
      }),
    }),
  ];
  const currentValidationSchema = validationSchema[step];
  const useFormReturn = useForm<FormData>({
    defaultValues: {
      lang: 'es',
      event_general: {
        content: [{ lang: 'es', name: '', description: '' }],
        tags: [],
      },
      event_aditional: {
        info: {
          content: [
            {
              lang: 'es',
              general: '',
              observations: '',
              services: '',
              restrictions: '',
              access_limit: '',
            },
          ],
        },
      },
      date_type: 'define',
    },
    resolver: yupResolver(currentValidationSchema),
  });
  const { handleSubmit, control, watch } = useFormReturn;
  const generalContentArray = useFieldArray({
    control,
    name: 'event_general.content',
  });
  const aditionalInfoContentArray = useFieldArray({
    control,
    name: 'event_aditional.info.content',
  });

  const [lang, generalContent, aditionalInfoContent] = watch([
    'lang',
    'event_general.content',
    'event_aditional.info.content',
  ]);

  const breadcrumb = [
    { page: t('event.event'), href: '' },
    { page: t('actions.create'), href: '' },
  ];

  const onAppend = () => {
    try {
      if (step == 0) {
        const langAlreadyAdded = generalContent?.find((c) => c?.lang == lang);
        if (langAlreadyAdded) throw new Error('Language already added');
        generalContentArray.append({ lang, name: '', description: '' });
      } else if (step == 1) {
        const langAlreadyAdded = aditionalInfoContent?.find(
          (c) => c?.lang == lang
        );
        if (langAlreadyAdded) throw new Error('Language already added');
        aditionalInfoContentArray.append({
          lang,
          general: '',
          observations: '',
          services: '',
          restrictions: '',
          access_limit: '',
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onSubmit = async (formData: FormData) => {
    console.log('formData', formData);
    try {
      if (step == 0) {
        setStep(1);
      } else if (step == 1) {
        setStep(2);
      } else if (step == 2) {
        setStep(3);
      } else if (step == 3) {
        toast.success('Event created');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* Breadcrumb section */}
      <FormProvider {...useFormReturn}>
        <div>
          <Heading breadcrumb={breadcrumb} langBread onAppend={onAppend} />
        </div>
        <form className="flex flex-1 pt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-screen min-h-0 overflow-hidden">
            {step == 0 ? (
              <CreateEventStep0
                categories={categories}
                suppliers={suppliers}
                specialCategories={specialCategories?.items}
                {...generalContentArray}
              />
            ) : step == 1 ? (
              <CreateEventStep1 {...aditionalInfoContentArray} />
            ) : step == 2 ? (
              <CreateEventStep2 />
            ) : (
              step == 3 && <CreateEventStep3 />
            )}

            {/* Buttons section */}
            <div className="pt-6 divide-y divide-gray-200">
              <div className="flex justify-end px-4 py-4 mt-4 gap-x-3 sm:px-6">
                <div onClick={() => setStep((prv) => (prv == 0 ? 0 : prv - 1))}>
                  <CustomCancel />
                </div>
                <CustomSubmit />
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

EventCreate.Layout = AdminLayout;
export default EventCreate;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const categories = await getEventsCategories();
  const specialCategories = await getEventsSpecialsCategories();
  const suppliers = await getEventsSuppliers();

  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
      categories,
      specialCategories,
      suppliers,
    },
  };
}
