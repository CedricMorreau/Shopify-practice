'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { createUrl } from 'lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set('q', search.value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/search', newParams));
  }

  return (
    <form onSubmit={onSubmit} className="relative  hidden w-full max-w-[12rem] md:block">
      <input
        key={searchParams?.get('q')}
        type="text"
        name="search"
        placeholder="Search"
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        className="w-full rounded-full bg-[#f5f5f5] px-4 py-3 pl-12 text-black placeholder:text-neutral-300 focus:outline-0"
      />
      <div className="absolute left-0 top-0 ml-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-6" />
      </div>
    </form>
  );
}

export function SearchMobile() {
  return (
    <div className="flex w-6">
      <MagnifyingGlassIcon className="w-full" />
    </div>
  );
}
