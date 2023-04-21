/** @format */
import { useState, useEffect } from 'react';
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
import { useCreateNewEvent } from '@/hooks/event/event';
import { useEventScheduleTimetable } from '@/hooks/event/event_schedules_timetables';
import { keepProperties, removeProperties } from '@/helpers';
import { useRouter } from 'next/router';
type FormData = {
  event_general: {
    supplier_id: string;
    category_id: string;
    sub_category_id: string;
    sub_sub_category_id: string;
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
  event_dates: {
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
  picture_web: File;
  app_web: File;
  flyer: File;
  lang: string;
  address: string;
  address2: string;
  country: string;
  city: string;
  state: string;
  zipcode: string;
  latitude: string;
  longitude: string;
  short_country: string;
  short_state: string;
  date_type: 'define' | 'range';
};

type Props = {
  categories: EventCategory[];
  specialCategories: WithDocs<EventSpecialCategory>;
  suppliers: EventSupplier[];
};

const EventCreate = ({ categories, specialCategories, suppliers }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const { data: eventScheduleTimeTable } = useEventScheduleTimetable(
    id as string,
    {
      enabled: Boolean(id),
    }
  );
  const { mutate: createNewEvent } = useCreateNewEvent();
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
      event_dates: {
        schedules: [] as any,
      },
      date_type: 'define',
    },
    resolver: yupResolver(currentValidationSchema),
  });
  const { handleSubmit, control, watch, reset } = useFormReturn;
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
    { page: id ? t('actions.update') : t('actions.create'), href: '' },
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
    const {
      event_general,
      event_aditional,
      event_dates,
      picture_web,
      app_web,
      flyer,
    } = formData;
    const event_direction = {
      venue_name: '',
      address: {
        latitude: formData?.latitude,
        longitude: formData?.longitude,
        address: formData?.address,
        address2: formData?.address2,
        city: formData?.city,
        state: {
          long_name: formData?.state,
          short_name: formData?.short_state,
        },
        country: {
          long_name: formData?.country,
          short_name: formData?.short_country,
        },
        zipcode: formData?.zipcode,
      },
    };
    const event_request = {
      event_general,
      event_aditional,
      event_dates,
      event_direction,
    };
    console.log('form data', {
      event_request,
      picture_web,
      app_web,
      flyer,
    });
    try {
      if (step == 0) {
        setStep(1);
      } else if (step == 1) {
        setStep(2);
      } else if (step == 2) {
        setStep(3);
      } else if (step == 3) {
        const newFormData = new FormData();
        newFormData.append('event_request', JSON.stringify(event_request));
        newFormData.append('picture_web', picture_web);
        newFormData.append('app_web', app_web);
        newFormData.append('flyer', flyer);

        await createNewEvent(newFormData as any);

        toast.success('Event created');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (id && eventScheduleTimeTable) {
      reset({
        event_general: {
          supplier_id:
            eventScheduleTimeTable?.schedule_id?.event_id?.supplier_id?._id,
          category_id:
            eventScheduleTimeTable?.schedule_id?.event_id?.category_id?._id,
          sub_category_id:
            eventScheduleTimeTable?.schedule_id?.event_id?.subcategory_id?._id,
          sub_sub_category_id:
            eventScheduleTimeTable?.schedule_id?.event_id?.subcategory_id?._id,
          tags: [],
          content: [
            {
              name: '',
              description: '',
              lang: '',
            },
          ],
        },
        event_aditional: {
          social_media: {
            facebook:
              eventScheduleTimeTable?.schedule_id?.event_id?.social_media
                ?.facebook,
            instagram:
              eventScheduleTimeTable?.schedule_id?.event_id?.social_media
                ?.instagram,
            twitter:
              eventScheduleTimeTable?.schedule_id?.event_id?.social_media
                ?.twitter,
          },
          info: {
            age_limit: 0,
            duration: eventScheduleTimeTable?.schedule_id?.event_id?.info
              ?.duration as any,
            content:
              eventScheduleTimeTable?.schedule_id?.event_id?.info?.content,
          },
        },
        event_dates: {
          dates: {
            range: {
              start_at: eventScheduleTimeTable?.start_at,
              end_at: eventScheduleTimeTable?.end_at,
            },
          },
          schedules: [
            {
              start_at: new Date(),
              end_at: new Date(),
              costs: {
                cost: eventScheduleTimeTable?.costs?.cost,
                lower: eventScheduleTimeTable?.costs?.lower,
                high: eventScheduleTimeTable?.costs?.high,
              },
              urls: {
                ticket: eventScheduleTimeTable?.urls?.ticket,
                streaming: eventScheduleTimeTable?.urls?.streaming,
              },
            },
          ],
        },
        picture_web: null,
        app_web: null,
        flyer: null,
        lang: 'es',
        address:
          eventScheduleTimeTable?.schedule_id?.venue_id?.address?.address,
        address2:
          eventScheduleTimeTable?.schedule_id?.venue_id?.address?.address2,
        country:
          eventScheduleTimeTable?.schedule_id?.venue_id?.address?.country
            ?.short_name,
        city: eventScheduleTimeTable?.schedule_id?.venue_id?.address?.city,
        state:
          eventScheduleTimeTable?.schedule_id?.venue_id?.address?.state
            ?.short_name,
        zipcode:
          eventScheduleTimeTable?.schedule_id?.venue_id?.address?.zipcode,
        latitude:
          eventScheduleTimeTable?.schedule_id?.venue_id?.address?.latitude,
        longitude:
          eventScheduleTimeTable?.schedule_id?.venue_id?.address?.longitude,
        short_country:
          eventScheduleTimeTable?.schedule_id?.venue_id?.address?.short_country,
        short_state:
          eventScheduleTimeTable?.schedule_id?.venue_id?.address?.short_state,
        date_type: eventScheduleTimeTable?.schedule_id?.type?.defined
          ? 'define'
          : 'range',
      });
    }
  }, [eventScheduleTimeTable]);
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
