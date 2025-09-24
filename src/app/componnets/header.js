"use client"

import Image from 'next/image'
import React from 'react'
import logo from '../../../public/cdac_logo.png'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function Header() {
  const pathname = usePathname();

  return (
    <header className=' top-0 w-[90%] m-auto rounded-bl-xl p-4 rounded-br-xl bg-[#f5f5f599] backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60'>
      {pathname ==="/login" || pathname === "/"  ?
        <div className='p-3 flex justify-center'>
          <Image
            src={logo}
            alt='logoo'
            priority
          />
        </div>
        : <div className='flex justify-between align-items-center'>
          <Image
            src={logo}
            alt='logoo'
            priority
          />
          <div>
            <div className='w-50 p-2 bg-[#f5f5f599] border border-gray-300 rounded-xl' style={{boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset'}}>
              <div className="flex justify-between border-b border-gray-200 text-sm">
                <span className="text-gray-700">Student name :</span>
                <span className="font-bold">Guest</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 text-sm">
                <span className="text-gray-700">Course Name :</span>
                <span className="font-bold">000</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 text-sm">
                <span className="text-gray-700">Center name :</span>
                <span className="font-bold">test</span>
              </div>
              <div className="flex justify-between border-gray-200 text-sm">
                <span className="text-gray-700">Reg.ID :</span>
                <span className="font-bold">000</span>
              </div>
              {pathname === "/welcomepage" ? 
              <div className="flex justify-between border-t border-gray-200 text-sm">
                <Link href='/login' className="text-blue-700 underline">LogOut</Link>
              </div> : null}
            </div>
          </div>
        </div>}
    </header>
  )
}

export default Header