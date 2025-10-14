'use client'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useRouter } from 'next/navigation';

export default function Searchbox() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      if (debouncedQuery.length > 1) {
        try {
          const url = '/api/search?query=' + encodeURIComponent(debouncedQuery);
          const response = await fetch(url, { signal: controller.signal });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.error('Fetch error:', error);
          }
        }
      } else {
        setPosts([]);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  const filteredPosts =
    query === ''
      ? posts
      : posts.filter((post) => post.title.toLowerCase().includes(query.toLowerCase()));

  const handleChange = (post) => {
    if (post && post.slug) {
      router.push(`/details/${post.slug}`);
    }
  };

  return (
    <div className="w-52 flex justify-center">
      <Combobox value={selected} onChange={handleChange} __demoMode>
        <div className="relative">
          <ComboboxInput
            className={clsx(
              'w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white',
              'focus:outline-none focus:ring-2 focus:ring-white/25'
            )}
            displayValue={(post) => (post ? post.title : '')}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search posts..."
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-white/60 group-hover:fill-white" />
          </ComboboxButton>
        </div>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <ComboboxOptions
            anchor="bottom"
            className="w-[var(--input-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:hidden"
          >
            {debouncedQuery.length > 1 && filteredPosts.length === 0 ? (
              <ComboboxOption
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                disabled
              >
                <div className="text-sm/6 text-white">Not Found</div>
              </ComboboxOption>
            ) : (
              filteredPosts.map((post) => (
                <ComboboxOption
                  key={post.id}
                  value={post}
                  className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                >
                  <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                  <div className="text-sm/6 text-white">{post.title}</div>
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </Transition>
      </Combobox>
    </div>
  );
}
