"use client";

import { Briefcase, UserPlusIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import SignOutButton from './ui/sign-out';
import { useSession } from '@/lib/auth/auth-client';
import Clock from './examples/clock/clock';

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className='bg-white border-b border-gray-200'>
      <div className={`container mx-auto 
            flex h-16 items-center gap-5
            px-4 justify-between`}
      >
        <Link href="/" className='flex items-center gap-2 text-xl font-semibold text-primary'>
          <Briefcase />
          {" Job Tracker"}
        </Link>
        <div className='flex items-center gap-4'>
          {session?.user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className='text-gray-700 hover:text-black'>
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant='ghost' size="icon" asChild className="p-0 rounded-full">
                    <Avatar>
                      <AvatarFallback className="font-bold text-white bg-blue-500">{session.user.name[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <div>
                      <p>{session.user.name}</p>
                      <p>{session.user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <SignOutButton />
                </DropdownMenuContent>
              </DropdownMenu>
            </>) : (
            <>
              <Clock />
              <Link href="/sign-in" >
                <Button variant="ghost" className='text-gray-700 hover:text-black'>
                  Login
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant='ghost'>
                  Sign Up for free
                  <UserPlusIcon />
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>

  );
};
