"use client"

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';

function FinishPage() {
    const navigate = useRouter();
    const { quelen, anslen } = useSelector((state) => state.exam);
    return (
        <>
            <div className='bg-white rounded-t-sm h-100 mt-5'>
                <div className='p-2'>
                    <h1 className='text-center font-bold text-2xl underline p-6'>Scorecard</h1>

                    <div className='p-5 '>
                        <div className='font-bold text-muted-foreground my-6'>Total Questions: {quelen}</div>
                        <div className='font-bold text-muted-foreground my-6'>Total Questions Attempted: {anslen}</div>
                    </div>

                    <div className='flex justify-center'>
                        <Button onClick={()=>navigate.push("/")} className=' w-[150px] p-6 rounded-0 bg-[#ecba11] text-black my-3 cursor-pointer px-4 hover:bg-[#ecba11]'>Done</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FinishPage