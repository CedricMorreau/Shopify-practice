'use client';

import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

import { Bars3Icon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Menu } from 'lib/shopify/types';
import Jordan from '@/components/resources/Jordan';
import Converse from '@/components/resources/Converse';
import OpenCart from 'components/cart/open-cart';
import OrderIcon from '@/components/resources/order-icon';
import FindAstore from '@/components/resources/find-a-store';
import HelpIcon from '@/components/resources/help-icon';

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(true);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-full w-full items-center justify-center"
      >
        <Bars3Icon />
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[100%]"
          >
            <Dialog.Panel className="fixed bottom-0  right-0 top-0 flex h-full w-10/12 flex-col bg-white pb-6 ">
              <div className="overflow-y-scroll p-4">
                <div className="flex w-full justify-end">
                  <button
                    className=" flex h-11 w-11 items-center justify-center outline-none"
                    onClick={closeMobileMenu}
                    aria-label="Close mobile menu"
                  >
                    <XMarkIcon className="h-6" />
                  </button>
                </div>

                {menu.length ? (
                  <ul className="flex w-full flex-col px-3">
                    {menu.map((item: Menu) => (
                      <li
                        className="py-2 text-2xl text-black transition-colors hover:text-neutral-500"
                        key={item.title}
                      >
                        <Link
                          href={item.path}
                          className="flex items-center justify-between"
                          onClick={closeMobileMenu}
                        >
                          {item.title}
                          <ChevronRightIcon className="w-5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-10 px-5">
                  <Link href="#" className="flex items-center gap-5">
                    <div className="w-7">
                      <Jordan />
                    </div>
                    <p>Jordan</p>
                  </Link>
                  <Link href="#" className="mt-5 flex items-center gap-5">
                    <div className="w-7">
                      <Converse />
                    </div>
                    <p>Converse</p>
                  </Link>
                </div>

                <div className="mt-20 px-5">
                  <p className="text-xl text-[#707072]">
                    Become a Nike Member for the best products, inspiration and stories in sport.{' '}
                    <Link className="font-medium text-[#111111]" href="#">
                      Learn more
                    </Link>
                  </p>

                  <div className="mt-5 flex items-center gap-3">
                    <Link
                      className="rounded-full bg-[#111111] px-5 py-2 font-medium text-white"
                      href="#"
                    >
                      Join Us
                    </Link>
                    <Link
                      className="rounded-full border-2 border-[#CACACB] px-5 py-2 font-medium "
                      href="#"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>

                <div className="mt-10 flex flex-col gap-3 px-5 text-lg">
                  <Link href="#" className="flex items-center gap-5">
                    <div className="w-6">
                      <OpenCart />
                    </div>
                    <p>Bag</p>
                  </Link>

                  <Link href="#" className="flex items-center gap-5">
                    <div className="w-6">
                      <OrderIcon />
                    </div>
                    <p>Orders</p>
                  </Link>

                  <Link href="#" className="flex items-center gap-5">
                    <div className="w-6">
                      <FindAstore />
                    </div>
                    <p>Find a store</p>
                  </Link>

                  <Link href="#" className="flex items-center gap-5">
                    <div className="w-6">
                      <HelpIcon />
                    </div>
                    <p>Help</p>
                  </Link>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
