import { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { FaBars } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import SwitchTheme from './SwitchTheme';
import { Combobox } from '@headlessui/react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import Image from 'next/image';


const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Livros', href: '/livros', current: true },
  { name: 'Minha Lista', href: '/minha-lista', current: true },
]

function classNames(...classes : any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const { data: session } = useSession();
  const [ users, setAllUsers ] = useState([] as any);
  const [ selectedUser, setSelectedUser ] = useState<any>([]);
  const [query, setQuery] = useState('')

  const filteredUsers =
    query === ''
      ? users
      : users.filter((user: any) => {
          return user.name.toLowerCase().includes(query.toLowerCase())
        })

  async function getUsers() {
    await axios.get("/api/auth/getAllUsers")
    .then((res) => {
      setAllUsers(res.data);
    });
  }

  function handleUserSearch(event: any) {
    event.preventDefault();
    if (selectedUser.id) {
      window.location.href = `/perfil/${selectedUser.id}`;
    }
  }

  useEffect(() => {
    getUsers();
  }, [session]);

  return (
    <Disclosure as="nav" className="bg-primary">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-primaryDark hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <HiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FaBars className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-12 w-auto lg:hidden"
                    src="/logo.png"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-16 w-auto lg:block mr-3"
                    src="/logo.png"
                    alt="Your Company"
                  />
                  <h3 className="hidden h-12 mt-4 w-auto lg:block text-white">My Read List</h3>
                </div>
                <div className="hidden sm:ml-6 sm:block mt-3">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-primaryDark text-white border-white border-1' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex gap-5 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <form onSubmit={handleUserSearch} className='relative'>
                  <Combobox
                      value={selectedUser}
                      onChange={setSelectedUser}
                      name="searchUsers">
                    <Combobox.Input className="bg-primaryDark rounded-md px-3 py-2 text-sm font-medium"
                                    onChange={(event) => setQuery(event.target.value)}
                                    displayValue={(user: any) => user.name}
                                    placeholder='Porcure por usuários...' />
                    <Combobox.Options className="bg-primaryDark rounded-md px-3 py-2 text-sm font-medium absolute z-10">
                      {
                        filteredUsers.map((user: any) => (
                          <Combobox.Option key={user.id} value={user} className="bg-primaryDark rounded-md px-3 py-2 text-sm font-medium hover:bg-primary">
                            <div className="flex items-center">
                              <img
                                className="h-8 w-8 rounded-full"
                                src={ user.image || "user-profile-placeholder.jpg" }
                              />
                              <div className='flex flex-col'>
                                <span className="ml-3 block font-normal truncate">
                                  {user.name}
                                </span>
                                <span className="ml-3 block font-normal truncate">
                                  {user.email}
                                </span>
                              </div>
                            </div>
                          </Combobox.Option>
                        ))
                      }
                    </Combobox.Options>
                    <button type="submit" className="absolute right-0 top-0 mt-3 mr-4"> <FaSearch className="text-white" /> </button>
                  </Combobox>
                </form>
                  
                {/* Profile dropdown */}
                {/* Check if logged */}
                {session ? (
                  <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={ session?.user?.image || "user-profile-placeholder.jpg" }
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
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/me"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Perfil
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/login"
                            onClick={() => { signOut({
                              callbackUrl: `${window.location.origin}/login`
                            }) }}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sair
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                ) : (
                  <Link href="/login" className="text-white bg-primaryDark hover:bg-primaryLight hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Login
                  </Link>
                )}
                {/* Ebable Dark Mode */}
                <SwitchTheme />
                
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>

    
  )
}
