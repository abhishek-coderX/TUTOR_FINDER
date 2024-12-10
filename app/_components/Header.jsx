"use client";

import React, { useEffect } from 'react';
import Image from "next/image";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LoginLink, LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const Header = () => {

  const Menu = [
    {
      id: 1,
      name: 'Home',
      path: '/'
    },
    {
      id: 2,
      name: 'Explore',
      path: '/explore'
    },
    {
      id: 3,
      name: 'Contact Us',
      path: '/contact'
    }
  ];

  const { user } = useKindeBrowserClient();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <header>
      <div className='flex items-center justify-between p-4 shadow-sm'>
        <div className='flex items-center gap-10'>
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          <ul className='md:flex gap-8 hidden'>
            {Menu.map((item) => (
              <Link href={item.path} key={item.id}>
                <li className='hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out'>
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div>
          {user ?(

<Popover>
<PopoverTrigger> <div className='flex items-center gap-4'>
              <Image 
                src={user?.picture} 
                alt='profile picture' 
                width={40} 
                height={40} 
                className="rounded-full"
              />
            </div></PopoverTrigger>
<PopoverContent className='w-44'>

<ul  className='flex flex-col gap-2 '>

  <li className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>Profile</li>
  <li className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>My Booking</li>
  <li className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'> <LogoutLink>Logout</LogoutLink></li>
</ul>

</PopoverContent>
</Popover>

          
  )
          
          
          : (
            <LoginLink>
              <Button>Get Started</Button>
            </LoginLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
