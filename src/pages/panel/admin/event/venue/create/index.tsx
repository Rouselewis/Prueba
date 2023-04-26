/** @format */
import { Fragment, useState } from 'react';
import { GetStaticPropsContext } from 'next';
import { useLocale, useTranslations } from 'next-intl';
import { Switch } from '@headlessui/react';
// Layout and Header
import AdminLayout from '@/components/layout/admin';
import { Heading } from '@/components/headers/admin/heading';
// Forms
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  CustomError,
  CustomLabel,
  CustomCancel,
  CustomSubmit,
  CustomAdd,
} from '@/components/forms';
// Helpers
import { CurrentColor, FormStyles, classNames } from '@/helpers';
// Icons
import { LinkIcon } from '@heroicons/react/24/solid';
import { AddressForm } from '@/components/forms/forms';
// Interface
import { Address } from '@/interfaces/serializers/commons';
import { useCreateEventVenue } from '@/hooks/event/event_venue';
import { useEventVenueCategories } from '@/hooks/event/event_venue_category';
import { getEventsVenuesCategories } from '@/api/event/event_venue_category';
import { toast } from 'react-toastify';

const EventCreateAdditional = ({ categoriesVenues }) => {
  const t = useTranslations('Panel_SideBar');
  const tc = useTranslations('Common_Forms');
  const te = useTranslations('Ferrors');
  const validationSchema = yup.object().shape({
    // addressname: yup.string().required("Address name is required"),
    searchaddress: yup.string(),
    address: yup.string().required(te('required')),
    address2: yup.string().required(te('required')),
    zipcode: yup.string().max(5).required(te('required')),
    country: yup.string().required(te('required')),
    state: yup.string().required(te('required')),
    city: yup.string().required(te('required')),
    currency: yup.string().required(te('required')),
    venue: yup.string().required(te('required')),
    type: yup.string().required(te('required')),
    quota: yup.string().required(te('required')),
    url: yup.string().url(te('url')).required(te('required')),
    generic_rules: yup.string().required(te('required')),
    children_rules: yup.string().required(te('required')),
    accessible: yup.boolean(),
    facebook: yup.string().url(te('url')).required(te('required')),
    instagram: yup.string().url(te('url')).required(te('required')),
    twitter: yup.string().url(te('url')).required(te('required')),
    cost: yup.number().required(te('required')),
    box_office: yup.number().required(te('required')),
    cash: yup.boolean(),
    credit: yup.boolean(),
    debit: yup.boolean(),
    day: yup.array(
      yup.object({
        day: yup.string().required(te('required')),
        start_at: yup.string().required(te('required')),
        end_at: yup.string().required(te('required')),
      })
    ),
  });
  const currentColor = CurrentColor();

  const [searchAddress, setSearchAddress] = useState('');
  const [markerPosition, setMarkerPosition] = useState(null);
  const [accessible, setAccessible] = useState(false);
  const locale = useLocale();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm<Address>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      accessible: false,
      cash: false,
      credit: false,
      debit: false,
      day: [
        {
          day: '',
          end_at: '',
          start_at: '',
        },
      ],
    },
  });
  const ts = useTranslations('Fsuccess');
  const {
    fields: schedulesDays,
    append: addDay,
    remove: removeDay,
  } = useFieldArray({
    control,
    name: 'day',
  });
  const { mutate: createEventVenue, error } = useCreateEventVenue();

  const filteredCategories = categoriesVenues?.map((item) => ({
    ...item,
    category:
      item.category.find((obj) => obj.lang == locale).name ||
      item.category.find((obj) => obj.lang == 'es').name,
  }));

  const breadcrumb = [
    { page: t('event.event'), href: '' },
    { page: t('actions.create'), href: '' },
  ];

  const onPlaceSelected = (address, latLng) => {
    setSearchAddress(address);
    setMarkerPosition(latLng);
  };
  const onSubmit = (data: Address) => {
    try {
      createEventVenue({
        category_id: filteredCategories.find(
          (item) => item.category == data.type
        )._id,
        name: data.venue,
        address: {
          latitude: data.latitude,
          longitude: data.longitude,
          address: data.address,
          address2: data.address2,
          city: data.city,
          state: {
            // @ts-ignore
            long_name: data.state,
            short_name: data.short_state,
          },
          country: {
            // @ts-ignore
            long_name: data.country,
            short_name: data.short_country,
          },
          zipcode: data.zipcode,
        },
        info: {
          quota: data.quota,
          url: data.url,
          social_media: {
            facebook: data.facebook,
            instagram: data.instagram,
            twitter: data.twitter,
          },
          parking: {
            currency: data.currency,
            cost: data.cost,
          },
          box_office: {
            number: `${data.box_office}`,
            // @ts-ignore
            schedule: data.day.map((item) => {
              const [startHours, startMinutes] = item.start_at.split(':');
              const [endHours, endMinutes] = item.end_at.split(':');
              const startDate = new Date();
              const endDate = new Date();
              startDate.setHours(parseInt(startHours));
              startDate.setMinutes(parseInt(startMinutes));
              endDate.setHours(parseInt(endHours));
              endDate.setMinutes(parseInt(endMinutes));
              return {
                day: item.day,
                end_at: endDate,
                start_at: startDate,
              };
            }),
            payment: {
              cash: data.cash,
              card: data.credit,
              debit: data.debit,
            },
          },
          accessible_seats: data.accessible,
          generic_rules: data.generic_rules,
          children_rules: data.children_rules,
        },
      });
      if (error) throw new Error(error as string);
      toast.success(ts('venue_added'));
      reset();
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <>
      {/* Breadcrumb section */}
      <div>
        <Heading breadcrumb={breadcrumb} />
      </div>
      <div className="flex flex-1 pt-6">
        <div className="w-screen min-h-0 overflow-hidden">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-9 px-2"
            // action="#"
            // method="POST"
          >
            <div className="mt-6 grid grid-cols-12 gap-6 mb-6">
              <div className="col-span-12 sm:col-span-6 lg:col-span-6">
                <CustomLabel required field="venue" name={tc('field_venue')} />
                <input
                  type="text"
                  name="venue"
                  id="venue"
                  autoComplete={tc('field_venue')}
                  placeholder={tc('field_venue')}
                  className={FormStyles('input')}
                  {...register('venue')}
                />
                <CustomError error={errors?.venue?.message} />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-6">
                <CustomLabel required field="type" name={tc('field_type')} />
                <select
                  id="type"
                  name="type"
                  className={FormStyles('select')}
                  defaultValue={''}
                  {...register('type')}
                >
                  {filteredCategories?.map((item) => (
                    <option key={item._id} value={item.category}>
                      {item.category}
                    </option>
                  ))}
                </select>
                <CustomError error={errors?.type?.message} />
              </div>
            </div>

            <AddressForm
              register={register}
              setValue={setValue}
              errors={errors}
              searchAddress={searchAddress}
              onPlaceSelected={onPlaceSelected}
              markerPosition={markerPosition}
            />

            <div className="mt-6 grid grid-cols-12 gap-6">
              <div className="col-span-12">Information</div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-6">
                <CustomLabel required field="quota" name={tc('field_quota')} />
                <input
                  type="text"
                  name="quota"
                  id="quota"
                  autoComplete={tc('field_quota')}
                  placeholder={tc('field_quota')}
                  className={FormStyles('input')}
                  {...register('quota')}
                />
                <CustomError error={errors?.quota?.message} />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-6">
                <CustomLabel required field="url" name={tc('field_url')} />
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="url"
                    id="url"
                    autoComplete={tc('field_url')}
                    placeholder={tc('field_url')}
                    className={FormStyles('input')}
                    {...register('url')}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <LinkIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <CustomError error={errors?.url?.message} />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-6">
                <CustomLabel
                  required
                  field="generic_rules"
                  name={tc('field_generic_rules')}
                />
                <input
                  type="text"
                  name="generic_rules"
                  id="generic_rules"
                  autoComplete={tc('field_generic_rules')}
                  placeholder={tc('field_generic_rules')}
                  className={FormStyles('input')}
                  {...register('generic_rules')}
                />
                <CustomError error={errors?.generic_rules?.message} />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-6">
                <CustomLabel
                  required
                  field="children_rules"
                  name={tc('field_children_rules')}
                />
                <input
                  type="text"
                  name="children_rules"
                  id="children_rules"
                  autoComplete={tc('field_children_rules')}
                  placeholder={tc('field_children_rules')}
                  className={FormStyles('input')}
                  {...register('children_rules')}
                />
                <CustomError error={errors?.children_rules?.message} />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-6">
                <CustomLabel field="accessible" name={tc('field_accessible')} />
                <Switch.Group as="div" className="flex items-center">
                  <Switch
                    checked={watch('accessible')}
                    onChange={(e) => {
                      setAccessible(e);
                      setValue('accessible', e);
                    }}
                    className={classNames(
                      accessible ? `bg-${currentColor}` : `bg-gray-200`,
                      `relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-${currentColor} focus:ring-offset-2`
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={classNames(
                        watch('accessible') ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                      )}
                    />
                  </Switch>
                </Switch.Group>
                <CustomError error={errors?.accessible?.message} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-12 gap-6">
              <div className="col-span-12">Social Media</div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-6">
                <CustomLabel
                  required
                  field="facebook"
                  name={tc('field_facebook')}
                />
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="facebook"
                    id="facebook"
                    autoComplete={tc('field_facebook')}
                    placeholder={tc('field_facebook')}
                    className={FormStyles('input')}
                    {...register('facebook')}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <LinkIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <CustomError error={errors?.facebook?.message} />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-6">
                <CustomLabel
                  required
                  field="instagram"
                  name={tc('field_instagram')}
                />
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="instagram"
                    id="instagram"
                    autoComplete={tc('field_instagram')}
                    placeholder={tc('field_instagram')}
                    className={FormStyles('input')}
                    {...register('instagram')}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <LinkIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <CustomError error={errors?.instagram?.message} />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-6">
                <CustomLabel
                  required
                  field="twitter"
                  name={tc('field_twitter')}
                />
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="twitter"
                    id="twitter"
                    autoComplete={tc('field_twitter')}
                    placeholder={tc('field_twitter')}
                    className={FormStyles('input')}
                    {...register('twitter')}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <LinkIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <CustomError error={errors?.twitter?.message} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-12 gap-6">
              <div className="col-span-12">Parking</div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-6">
                <CustomLabel
                  required
                  field="currency"
                  name={tc('field_currency')}
                />
                <select
                  id="currency"
                  name="currency"
                  className={FormStyles('select')}
                  defaultValue={''}
                  {...register('currency')}
                >
                  <option value="MXN">MXN</option>
                  <option value="USD">USD</option>
                </select>
                <CustomError error={errors?.currency?.message} />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-6">
                <CustomLabel required field="cost" name={tc('field_cost')} />
                <input
                  type="number"
                  name="cost"
                  id="cost"
                  autoComplete={tc('field_cost')}
                  placeholder={tc('field_cost')}
                  className={FormStyles('input')}
                  {...register('cost')}
                />
                <CustomError error={errors?.cost?.message} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-6">
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12">Box Office</div>
                  <div className="col-span-12 sm:col-span-6 lg:col-span-6">
                    <CustomLabel
                      required
                      field="box_office"
                      name={tc('field_box_office')}
                    />
                    <input
                      type="text"
                      name="box_office"
                      id="box_office"
                      autoComplete={tc('field_box_office')}
                      placeholder={tc('field_box_office')}
                      className={FormStyles('input')}
                      {...register('box_office')}
                    />
                    <CustomError error={errors?.box_office?.message} />
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6">
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12">Payment</div>
                  <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                    <CustomLabel
                      required
                      field="cash"
                      name={tc('field_cash')}
                    />
                    <Switch.Group as="div" className="flex items-center">
                      <Switch
                        checked={watch('cash')}
                        onChange={(e) => {
                          setValue('cash', e);
                        }}
                        className={classNames(
                          watch('cash') ? `bg-${currentColor}` : `bg-gray-200`,
                          `relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-${currentColor} focus:ring-offset-2`
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            watch('cash') ? 'translate-x-5' : 'translate-x-0',
                            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                          )}
                        />
                      </Switch>
                    </Switch.Group>
                    <CustomError error={errors?.cash?.message} />
                  </div>
                  <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                    <CustomLabel
                      required
                      field="credit"
                      name={tc('field_credit')}
                    />
                    <Switch.Group as="div" className="flex items-center">
                      <Switch
                        checked={watch('credit')}
                        onChange={(e) => {
                          setValue('credit', e);
                        }}
                        className={classNames(
                          watch('credit')
                            ? `bg-${currentColor}`
                            : `bg-gray-200`,
                          `relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-${currentColor} focus:ring-offset-2`
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            watch('credit') ? 'translate-x-5' : 'translate-x-0',
                            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                          )}
                        />
                      </Switch>
                    </Switch.Group>
                    <CustomError error={errors?.credit?.message} />
                  </div>
                  <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                    <CustomLabel field="debit" name={tc('field_debit')} />
                    <Switch.Group as="div" className="flex items-center">
                      <Switch
                        checked={watch('debit')}
                        onChange={(e) => {
                          setValue('debit', e);
                        }}
                        className={classNames(
                          watch('debit') ? `bg-${currentColor}` : `bg-gray-200`,
                          `relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-${currentColor} focus:ring-offset-2`
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            watch('debit') ? 'translate-x-5' : 'translate-x-0',
                            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                          )}
                        />
                      </Switch>
                    </Switch.Group>
                    <CustomError error={errors?.debit?.message} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-12 gap-6">
              <div className="col-span-6">Schedule</div>
              <div className="col-span-6 text-right">
                <div
                  onClick={() => addDay({ day: '', end_at: '', start_at: '' })}
                >
                  <CustomAdd />
                </div>
              </div>
              {schedulesDays.map((item, idx) => (
                <div
                  className="grid grid-cols-12 gap-6 col-span-12"
                  key={item.id}
                >
                  <div className="col-span-12 sm:col-span-4">
                    <CustomLabel required field="day" name={tc('field_day')} />
                    <select
                      id="day"
                      name="v"
                      className={FormStyles('select')}
                      defaultValue={''}
                      {...register(`day.${idx}.day`)}
                    >
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                    </select>
                    <CustomError error={errors?.day?.[idx]?.day?.message} />
                  </div>
                  <div className="col-span-12 sm:col-span-4">
                    <CustomLabel
                      required
                      field="start"
                      name={tc('field_start')}
                    />
                    <input
                      type="time"
                      name="start"
                      id="start"
                      autoComplete={tc('field_start')}
                      placeholder={tc('field_start')}
                      className={FormStyles('input')}
                      {...register(`day.${idx}.start_at`)}
                    />
                    <CustomError
                      error={errors?.day?.[idx]?.start_at?.message}
                    />
                  </div>
                  <div className="col-span-12 sm:col-span-4">
                    <CustomLabel required field="end" name={tc('field_end')} />
                    <input
                      type="time"
                      name="end"
                      id="end"
                      autoComplete={tc('field_end')}
                      placeholder={tc('field_end')}
                      className={FormStyles('input')}
                      {...register(`day.${idx}.end_at`)}
                    />
                    <CustomError error={errors?.day?.[idx]?.end_at?.message} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-12 gap-6">
              <div className="col-span-6">Templates</div>
              <div className="col-span-6 text-right">
                <CustomAdd />
              </div>
              <div className="col-span-12 sm:col-span-4"></div>
            </div>

            {/* Buttons section */}
            <div className="divide-y divide-gray-200 pt-6">
              <div className="mt-4 flex justify-end gap-x-3 py-4 px-4 sm:px-6">
                <CustomCancel />
                <CustomSubmit />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

EventCreateAdditional.Layout = AdminLayout;
export default EventCreateAdditional;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const categoriesVenues = await getEventsVenuesCategories();
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
      categoriesVenues,
    },
  };
}
