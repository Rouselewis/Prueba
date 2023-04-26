import { useTranslations } from 'next-intl';
// Components
import { CustomLabel, CustomError } from '@/components/forms';
import { FormStyles } from '@/helpers';
import { useFormContext } from 'react-hook-form';
type Props = {
  index: number;
};

export const EventLang = ({ index }: Props) => {
  const t = useTranslations('Common_Forms');
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  const lang = watch(`event_aditional.info.content.${index}.lang`);
  const base = `event_aditional.info.content.${index}`;
  const baseErrors =
    errors?.['event_aditional']?.['content']?.['info']?.[index];

  return (
    <div className="col-span-12 sm:col-span-12 lg:col-span-6">
      <div className="h-[120vw] md:h-[36vw] lg:h-[18vw] gap-x-16 gap-y-10 border-2">
        <div className="relative px-5 pt-10 pb-10 space-y-1 inputCoverAd">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-6">
              <CustomLabel field="general" name={t('field_general')} />
              <input
                type="text"
                name="general"
                id="general"
                autoComplete={t('field_general')}
                placeholder={t('field_general')}
                className={FormStyles('input')}
                {...register(`${base}.general`)}
              />
              <CustomError error={baseErrors?.general} />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <CustomLabel
                field="observations"
                name={t('field_observations')}
              />
              <input
                type="text"
                name="observations"
                id="observations"
                autoComplete={t('field_observations')}
                placeholder={t('field_observations')}
                className={FormStyles('input')}
                {...register(`${base}.observations`)}
              />
              <CustomError error={baseErrors?.observations} />
            </div>

            <div className="col-span-12 sm:col-span-6">
              <CustomLabel field="service" name={t('field_service')} />
              <input
                type="text"
                name="service"
                id="service"
                autoComplete={t('field_service')}
                placeholder={t('field_service')}
                className={FormStyles('input')}
                {...register(`${base}.services`)}
              />
              <CustomError error={baseErrors?.services} />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <CustomLabel field="restriction" name={t('field_restriction')} />
              <input
                type="text"
                name="restriction"
                id="restriction"
                autoComplete={t('field_restriction')}
                placeholder={t('field_restriction')}
                className={FormStyles('input')}
                {...register(`${base}.restrictions`)}
              />
              <CustomError error={baseErrors?.restrictions} />
            </div>
            <div className="col-span-12 sm:col-span-12">
              <CustomLabel
                field="limit_access"
                name={t('field_limit_access')}
              />
              <input
                type="text"
                name="limit_access"
                id="v"
                autoComplete={t('field_limit_access')}
                placeholder={t('field_limit_access')}
                className={FormStyles('input')}
                {...register(`${base}.access_limit`)}
              />
              <CustomError error={baseErrors?.access_limit} />
            </div>
          </div>
          <div className="absolute px-2 py-1 text-xl font-black uppercase bg-white -top-5 w-fit text-customShadow">
            {lang}
          </div>
        </div>
      </div>
    </div>
  );
};
