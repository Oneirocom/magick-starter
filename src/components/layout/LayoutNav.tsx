import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { navbarVariants } from "~/motion/layoutVariants";
import { navigation, userNavigation } from "~/config/navigation";

const LayoutNav = ({}: {}) => {
  const { data: user, isLoading, error } = api.player.getCurrentUser.useQuery();
  const router = useRouter();

  return (
    <motion.div key="layout-nav" {...navbarVariants}>
      <Disclosure
        as="nav"
        className="absolute top-0 h-16 w-full border-b border-b-card-main bg-gradient-to-r from-card-main/70 via-card-main/50 to-card-main/60 saturate-100 backdrop-blur-2xl"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-12  object-contain"
                      src="/images/logo.png"
                      alt="Espresso RPG"
                      width={64}
                      height={64}
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-8">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={clsx(
                            item.href === router.asPath
                              ? "border-secondary-highlight text-white"
                              : "text-gray-300 border-transparent hover:border-secondary-highlight",
                            "rounded-md border px-3 py-2 text-sm font-medium text-white transition-all duration-150 ease-in-out hover:border-secondary-highlight"
                          )}
                          aria-current={item ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                      <Link
                        href="https://magickml.com/"
                        target="_blank"
                        className="text-gray-300 rounded-md border border-transparent px-3 py-2 text-sm font-medium text-white transition-all duration-150 ease-in-out hover:border-secondary-highlight"
                      >
                        Sign up for the MagickML alpha.
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="bg-gray-800 focus:ring-offset-gray-800 relative flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user?.image ?? ""}
                            alt=""
                          />
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
                                <Link
                                  href={item.href}
                                  className={clsx(
                                    active ? "bg-gray-100" : "",
                                    "text-gray-700 block px-4 py-2 text-sm"
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-gray-800 text-gray-400 hover:bg-gray-700 focus:ring-offset-gray-800 relative inline-flex items-center justify-center rounded-md p-2 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={clsx(
                      item.href === router.asPath
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={
                      item.href === router.asPath ? "page" : undefined
                    }
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-gray-700 border-t pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src={user?.image ?? "/images/logo.png"}
                      alt=""
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {user?.name ?? ""}
                    </div>
                    <div className="text-gray-400 text-sm font-medium leading-none">
                      {user?.email ?? ""}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="text-gray-400 hover:bg-gray-700 block rounded-md px-3 py-2 text-base font-medium hover:text-white"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </motion.div>
  );
};

export default LayoutNav;
