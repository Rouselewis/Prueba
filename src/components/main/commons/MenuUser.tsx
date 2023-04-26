import React, { Fragment } from 'react';
import { classNames, useAnimation } from '@/helpers';
import { signOut, useSession } from 'next-auth/react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Avatar } from '@/components/commons';

export type props = {
  className?: string;
};

const navigation = [
  {
    name: 'Your Profile',
    href: '/panel/profile',
  },
  {
    name: 'Settings',
    href: '/settings',
  },
  {
    name: 'Sign Out',
    onClick: () =>
      signOut({
        redirect: false,
      }),
  },
];

const MenuUser: React.FC<props> = ({ className }) => {
  const { data: session } = useSession();
  const animation = useAnimation('menu');
  return (
    <Menu as="div" className="relative flex-shrink-0">
      <div className="mr-2">
        <Menu.Button className="flex px-2 items-center gap-2 rounded-full text-sm text-white focus:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-900">
          <div>
            <span className="pr-2">{session?.user?.name}</span>
            <span className="sr-only">Open user menu</span>
          </div>
          <Avatar size="small" image={session?.user?.image} />
          <ChevronDownIcon className="w-4 h4" />
        </Menu.Button>
      </div>
      <Transition as={Fragment} {...animation}>
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {navigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) =>
                item.href ? (
                  <Link
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block py-2 px-4 text-sm text-gray-700 w-full text-left'
                    )}
                    href={`${item.href}`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span
                    onClick={item.onClick}
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block py-2 px-4 text-sm text-gray-700 w-full text-left'
                    )}
                  >
                    {item.name}
                  </span>
                )
              }
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MenuUser;
