import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchMobile } from './search';
import Logo from '@/components/resources/logo';
import { HeartIcon } from '@heroicons/react/24/outline';
import OpenUser from 'components/profile/open-user';

export default async function Navbar() {
  const menu = await getMenu('main-menu');

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="flex w-full items-center justify-between">
        <Link href="/" className="mr-2 flex w-fit items-center justify-center md:w-auto lg:mr-6">
          <div className="w-16">
            <Logo />
          </div>
        </Link>
        {menu.length ? (
          <ul className="hidden gap-6 text-sm md:flex md:items-center">
            {menu.map((item: Menu) => (
              <li key={item.title}>
                <Link
                  href={item.path}
                  className="text-neutral-500 underline-offset-4 hover:text-black hover:underline "
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex items-center gap-5">
          <Search />
          <div className="md:hidden">
            <SearchMobile />
          </div>
          <div className="hidden w-6 md:block">
            <Suspense>
              <HeartIcon />
            </Suspense>
          </div>
          <div className="w-6">
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </div>
          <div className="w-6 md:hidden">
            <OpenUser />
          </div>
          <div className="w-6 md:hidden">
            <Suspense fallback={null}>
              <MobileMenu menu={menu} />
            </Suspense>
          </div>
        </div>
      </div>
    </nav>
  );
}
