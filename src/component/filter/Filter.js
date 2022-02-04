import React from 'react';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, } from '@heroicons/react/solid'
import { MailIcon } from '@heroicons/react/solid'
import { useState } from 'react';
// const sortOptions = [
//   { name: 'Most Popular', value: '25', current: true },
//   { name: 'Best Rating', value: '25', current: false },
//   { name: 'Newest', value: '25', current: false }
// ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function Filter(props) {
  const [sortOptions, setSortOptions] = useState([
    { name: 'Most Popular', value: 'popularity.desc', current: true },
    { name: 'Best Rating', value: 'vote_count.desc', current: false }
  ]);
  return (
    <Disclosure
      as="section"
      aria-labelledby="filter-heading"
      className="relative z-10 border-t border-b border-gray-200 grid items-center"
    >
     
      <div className="relative col-start-1 row-start-1">
        <div className="max-w-7xl mx-auto flex space-x-6 divide-x divide-gray-200 text-sm px-4 sm:px-6 lg:px-8">

          <div className="">
            <div className="mt-1 mb-1 relative rounded-md shadow-sm">
              <input
                type="text"
                className="border-l-2 py-4 focus:outline-none h-full block w-full px-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search Movies"
                onChange={(e) => props.searchMovieItem(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-start-1 row-start-1 py-4">
        <div className="flex justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Menu as="div" className="relative inline-block">
            <div className="flex">
              <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                Sort
                <ChevronDownIcon
                  className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
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
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <Menu.Item key={option.name}>
                      {({ active }) => (
                        <a
                        onClick={() => {props.sortFilter(option.value)}}
                          className={classNames(
                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          {option.name}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </Disclosure>
  );
}
