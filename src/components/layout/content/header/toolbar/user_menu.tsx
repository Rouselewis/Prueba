/** @format */
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
// Auth
import { useUserAuthObserver } from '@/hooks/auth';
import { logout_firebase } from '@/lib/firebase_auth';
// Helpers
import { classNames } from '@/helpers';
// Icons
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export const UserMenu = () => {
  const { user: existUser, queryClient, isLoading } = useUserAuthObserver();
  const { data: session } = useSession();
  const logout_ = () => {
    queryClient.setQueryData(['user'], () => null);
    localStorage.clear();
    logout_firebase();
  };

  const userNavigation = [
    { name: 'Your Profile', onclick: () => {}, href: '/panel/profile' },
    { name: 'Settings', onclick: () => {}, href: '/panel/profile/config' },
    { name: 'Sign out', onClick: () => signOut(), href: '/' },
  ];

  return (
    <>
      {/* Profile dropdown */}
      <Menu as="div" className="relative flex-shrink-0">
        <div className="mr-2">
          <Menu.Button className="flex px-2 rounded-full text-sm text-white focus:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-900">
            <span className="pr-2">{session?.user?.name}</span>
            <span className="sr-only">Open user menu</span>
            <ChevronDownIcon className="w-4 h4" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {userNavigation.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <Link href={`${item.href}`}>
                    <button
                      onClick={item.onClick}
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block py-2 px-4 text-sm text-gray-700 w-full text-left'
                      )}
                    >
                      {item.name}
                    </button>
                  </Link>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
