import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
// Components
import {
  LanguageSwitcher,
  Login,
  UserMenu,
} from '@/components/layout/content/header/toolbar/index';
// User validation
import { useUserAuthObserver } from '@/hooks/auth';
// Helpers
import { CurrentColor, FormStyles } from '@/helpers';
// Icons
import {
  MapPinIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

export const ToolBar = () => {
  const { data: session } = useSession();
  const { user: existUser, queryClient, isLoading } = useUserAuthObserver();
  const t = useTranslations('Header_Tool');
  const tc = useTranslations('Common_Forms');
  const currentColor = CurrentColor();

  return (
    <div className="bg-black z-50">
      <nav className="flex flex-row" aria-label="Global">
        <div className="hidden lg:flex lg:basis-1/6 lg:gap-x-12 lg:justify-left lg:pl-2 lg:py-2">
          <div className="flex items-center text-white">
            <MapPinIcon
              className="h-6 w-6 text-white mr-2"
              aria-hidden="true"
            />
            <p className="font-bold text-sm">
              Toluca<span className="hidden lg:inline">, Estado de México</span>
            </p>
          </div>
        </div>
        <div className="py-3 pl-2 basis-1/2 lg:flex lg:basis-1/6 lg:gap-x-12 lg:justify-left lg:pl-2 lg:py-2">
          <div className="flex items-center text-white">
            <GlobeAltIcon
              className="h-6 w-6 text-white mr-2"
              aria-hidden="true"
            />
            <LanguageSwitcher />
          </div>
        </div>
        <div className="hidden lg:flex lg:justify-center lg:basis-2/6 lg:pl-2 lg:py-2">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">CTickets</span>
            <Image
              src={'/images/assets/logos/logo_white.png'}
              alt="logo"
              width={200}
              height={120}
              className="mt-2 select-none self-center object-contain"
            />
          </Link>
        </div>
        <div className="lg:hidden flex justify-center basis-1/2 lg:basis-2/6 lg:justify-cente lg:pl-2 lg:py-2">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">CTickets</span>
            <Image
              src={'/images/assets/logos/logo_icon.png'}
              alt="logo"
              width={28}
              height={28}
              className="mt-2 select-none self-center object-contain"
            />
          </Link>
        </div>
        <div className="hidden lg:flex lg:basis-1/6 lg:justify-end lg:pl-2 lg:py-2">
          <div className="relative mt-2 rounded-md shadow-sm w-60">
            <input
              type="text"
              name="search"
              id="search"
              autoComplete={tc('auto_search')}
              placeholder={tc('place_search')}
              className={FormStyles('input')}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        {session ? (
          <div className="flex basis-1/2 justify-end lg:flex lg:basis-1/6 lg:justify-end my-4">
            <UserMenu />
          </div>
        ) : (
          <div className="flex basis-1/2 justify-end lg:flex lg:basis-1/6 lg:justify-end">
            <Login currentColor={currentColor} />
          </div>
        )}
      </nav>
    </div>
  );
};
