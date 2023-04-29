import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
// Helpers
import { CurrentColor, FormStyles } from '@/helpers';
// Icons
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { CustomLabel } from '@/components/forms';
import { useFormContext } from 'react-hook-form';

type Props = {
  breadcrumb: Breadcrumb[];
  buttonBread?: buttonBread | null;
  langBread?: boolean;
  onAppend?: () => void;
  onChange?:React.ChangeEventHandler<HTMLSelectElement>
};

interface Breadcrumb {
  page: string;
  href: string;
}

interface buttonBread {
  text: string;
  href: string;
}

export const HeadingSelect = ({
  breadcrumb,
  buttonBread = null,
  langBread,
  onAppend,
  onChange
}: Props) => {
  const { locales, locale } = useRouter();
  const currentColor = CurrentColor();
  const t = useTranslations('Common_Forms');
  const formMethods = useFormContext();

  return (
    <>
      <div>
        <nav className="sm:hidden" aria-label="Back">
          <a
            href="#"
            className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ChevronLeftIcon
              className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            Back
          </a>
        </nav>
        <nav className="hidden sm:flex" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-4">
            {breadcrumb.map((bread, index) => {
              return (
                <li key={bread.page}>
                  <div className={`flex${index == 0 ? '' : ' items-center'}`}>
                    {index == 0 ? (
                      ''
                    ) : (
                      <ChevronRightIcon
                        className={`h-5 w-5 flex-shrink-0 text-gray-400`}
                        aria-hidden="true"
                      />
                    )}
                    <Link
                      href={bread.href}
                      className={`${
                        index == 0 ? '' : ' ml-4 '
                      }text-sm font-medium text-gray-500 hover:text-${currentColor}`}
                    >
                      {bread.page}
                    </Link>
                  </div>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
      <div className="mt-2 md:flex md:items-end md:justify-end">
        <div className="min-w-0 flex-1">
          <h2
            className={`text-2xl font-bold leading-7 text-${currentColor} sm:truncate sm:text-3xl sm:tracking-tight`}
          >
            {breadcrumb[breadcrumb.length - 1].page}
          </h2>
        </div>
        {buttonBread !== null ? (
          <div className="mt-4 flex flex-shrink-0 md:mt-0 md:ml-4">
            <Link
              href={buttonBread ? buttonBread.href : ''}
              className={`ml-3 inline-flex items-center rounded-md bg-${currentColor} px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-${currentColor} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${currentColor}`}
            >
              {buttonBread ? buttonBread.text : ''}
            </Link>
          </div>
        ) : (
          ''
        )}
        {langBread ? (
          <div>
            <CustomLabel field="lang" name={t('field_add_lang')} />
            <div className="inline-flex">
              <select
                onChange={onChange}
                defaultValue={locale}
                className={FormStyles('select')}
                {...(formMethods?.register('lang') || {})}
              >
                {locales.map((l, i) => {
                  return (
                    <option key={i} value={l}>
                      {l}
                    </option>
                  );
                })}
              </select>
              <div className="px-2">
                <button
                  type="button"
                  className={`inline-flex justify-center rounded-md bg-${currentColor} py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-${currentColor}-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700`}
                  onClick={onAppend}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};
