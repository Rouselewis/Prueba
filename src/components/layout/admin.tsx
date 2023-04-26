/** @format */
import { PropsWithChildren, ReactElement } from 'react';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
// Helpers
import { CurrentColor } from '@/helpers/currentColor';
// Layout
import { Header } from './content/header';
import { Menu } from './content/admin/menu';
import { Navigation } from '@/components/layout/content/admin/navigation';
import { Footer } from './content/footer';
// Icons
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
// Hooks
import { useMe } from '@/hooks/user/user';

function AdminLayout({ children }: PropsWithChildren<{}>): ReactElement {
  const router = useRouter();
  const t = useTranslations('Panel');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentColor = CurrentColor();
  // Just the Dashboard and POS module doesn't have Sidebar
  const hasSideBar =
    router.pathname.split('/').length == 2 ||
    (router.pathname.includes('pos') && router.pathname.split('/').length < 4);

  useMe();

  return (
    <>
      <Header />
      <Menu path={router.pathname} color={currentColor} />

      {/* Bottom section */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div className="flex h-full flex-col">
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setSidebarOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                          type="button"
                          className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <span className="sr-only">Close sidebar</span>
                          <XMarkIcon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                      <div className="flex flex-shrink-0 items-center px-4">
                        <img
                          className="h-8 w-auto"
                          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                          alt="Your Company"
                        />
                      </div>
                      <Navigation path={router.pathname} color={currentColor} />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
                <div className="w-14 flex-shrink-0">
                  {/* Force sidebar to shrink to fit close icon */}
                </div>
              </div>
            </Dialog>
          </Transition.Root>
          {/* Narrow sidebar*/}
          {!hasSideBar ? (
            <div className="sticky top-1 z-10 bg-white pl-1 pt-1 flex justify-start sm:pl-3 sm:pt-3 lg:hidden">
              <button
                type="button"
                className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          ) : (
            ''
          )}
          {/* Main area */}
          <main className="flex-1 border-t border-gray-200 lg:flex w-screen">
            {/* Primary column */}
            <section
              aria-labelledby="primary-heading"
              className="p-10 flex flex-col overflow-y-auto lg:order-last"
            >
              <main
                className={` ${
                  !hasSideBar
                    ? 'container mx-auto'
                    : 'mx-auto max-w-[100%] sm:px-6 lg:px-8'
                } px-2 sm:px-3 lg:px-4`}
              >
                {children}
              </main>
            </section>
            {/* Secondary column (hidden on smaller screens) */}
            {!hasSideBar ? (
              <aside className="hidden lg:order-first lg:block lg:flex-shrink-0">
                <div className="relative flex h-full w-64 flex-col overflow-y-auto border-r border-gray-200 bg-gray-100">
                  <div className="flex flex-grow flex-col overflow-y-auto bg-white pt-5 pb-4">
                    <div className="mt-5 flex flex-grow flex-col">
                      <Navigation path={router.pathname} color={currentColor} />
                    </div>
                  </div>
                </div>
              </aside>
            ) : (
              ''
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminLayout;
