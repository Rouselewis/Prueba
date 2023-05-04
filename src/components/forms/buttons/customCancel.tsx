import { useTranslations } from 'next-intl';

export const CustomCancel = (props) => {
  const t = useTranslations('btn');

  return (
    <button
      {...props}
      type="button"
      className={`inline-flex justify-center rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
    >
      {t('form_cancel')}
    </button>
  );
};
