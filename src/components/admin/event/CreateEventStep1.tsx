/** @format */
import { useTranslations } from 'next-intl';
import {
  CustomError,
  CustomLabel,
  CustomCancel,
  CustomSubmit,
} from '@/components/forms';
import { EventLang } from '@/components/forms/lang';
// Helpers
import { FormStyles } from '@/helpers';
// Icons
import { LinkIcon } from '@heroicons/react/24/solid';
import { useFormContext, UseFieldArrayReturn } from 'react-hook-form';

type Props = UseFieldArrayReturn<any, any>;
const CreateEventStep1: React.FC<Props> = ({ fields }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const t = useTranslations('Panel_SideBar');
  const tc = useTranslations('Common_Forms');

  return (
    <>
      <div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6 lg:col-span-6">
            <CustomLabel field="facebook" name={tc('field_facebook')} />
            <div className="relative rounded-md shadow-sm">
              <input
                type="url"
                name="facebook"
                id="facebook"
                autoComplete={tc('field_facebook')}
                placeholder={tc('field_facebook')}
                className={FormStyles('input')}
                {...register('event_aditional.social_media.facebook')}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <LinkIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </div>
            {errors?.event_aditional?.['social_media']?.facebook && (
              <CustomError
                error={
                  errors?.event_aditional?.['social_media']?.facebook?.message
                }
              />
            )}
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-6">
            <CustomLabel field="instagram" name={tc('field_instagram')} />
            <div className="relative rounded-md shadow-sm">
              <input
                type="url"
                name="instagram"
                id="instagram"
                autoComplete={tc('field_instagram')}
                placeholder={tc('field_instagram')}
                className={FormStyles('input')}
                {...register('event_aditional.social_media.instagram')}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <LinkIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </div>
            {errors?.event_aditional?.['social_media']?.instagram && (
              <CustomError
                error={
                  errors?.event_aditional?.['social_media']?.instagram?.message
                }
              />
            )}
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-6">
            <CustomLabel field="twitter" name={tc('field_twitter')} />
            <div className="relative rounded-md shadow-sm">
              <input
                type="url"
                name="twitter"
                id="twitter"
                autoComplete={tc('field_twitter')}
                placeholder={tc('field_twitter')}
                className={FormStyles('input')}
                {...register('event_aditional.social_media.twitter')}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <LinkIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </div>
            {errors?.event_aditional?.['social_media']?.twitter && (
              <CustomError
                error={
                  errors?.event_aditional?.['social_media']?.twitter?.message
                }
              />
            )}
          </div>
          <div className="col-span-12 sm:col-span-3 lg:col-span-3">
            <CustomLabel
              field="age_limit"
              name={tc('field_age_limit')}
              required
            />
            <select
              id="age_limit"
              name="age_limit"
              className={FormStyles('select')}
              defaultValue="0"
              {...register('event_aditional.info.age_limit', {
                setValueAs: (v) => parseInt(v),
              })}
            >
              <option value="0">{tc('field_select_age_limit')}</option>
              {Array(22)
                .fill(1)
                .map((i, idx) => (
                  <option value={idx + 18} key={idx}>
                    {idx + 18}
                  </option>
                ))}
            </select>
            {errors?.event_aditional?.['info']?.age_limit && (
              <CustomError
                error={errors?.event_aditional?.['info']?.age_limit?.message}
              />
            )}
          </div>
          <div className="col-span-12 sm:col-span-3 lg:col-span-3">
            <CustomLabel
              field="duration"
              name={tc('field_duration')}
              required
            />
            <input
              type="text"
              name="duration"
              id="duration"
              autoComplete={tc('field_duration')}
              placeholder={tc('field_duration')}
              className={FormStyles('input')}
              {...register('event_aditional.info.duration')}
            />
            {errors?.event_aditional?.['info']?.duration && (
              <CustomError
                error={errors?.event_aditional?.['info']?.duration?.message}
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 mt-6">
          {fields?.map((field, index) => (
            <EventLang key={field?.id} index={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CreateEventStep1;
