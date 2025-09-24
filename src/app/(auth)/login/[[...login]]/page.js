"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import * as yup from 'yup';
function LoginPage() {
  const navigate = useRouter();
  const [initialValues] = useState({
    username: "",
    psd: ""
  })

  const validation = yup.object().shape({
    username: yup.string().required('Username is required'),
    psd: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema:validation,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log("values", values)
      navigate.push('/welcomepage')
    }
  });
  console.log("formikk", formik)
  return (
    <>
      <div className='mb-3 w-full'>
        <h1 className='text-center w-[50%] text-2xl card_title'>ONLINE EXAM PORTAL</h1>

        <div className='card w-[40%]'>
          <div className='cardinput'>
            <Input placeholder="Enter username" name="username" value={formik.values.username} onChange={formik.handleChange} className="bg-white  mb-3 w-[90%] m-auto"/>
            {formik.errors.username && <p className='text-red-600 text-left ps-6'>{formik.errors.username}</p>}
          </div>
          <div className='cardinput'>
            <Input placeholder="Enter password" type='password' name="psd" value={formik.values.psd} onChange={formik.handleChange} className="bg-white w-[90%] m-auto" />
              {formik.errors.psd && <p className='text-red-600 text-left ps-6'>{formik.errors.psd}</p>}
          </div>

          <Button onClick={formik.handleSubmit} className='rounded-0 bg-[#ffcc00] text-black my-3 cursor-pointer px-4 hover:bg-[#ffcc00]'>Login</Button>
          {/* <Button onClick={() => navigate.push('/welcomepage')} className='rounded-0 bg-[#ffcc00] text-black my-3 cursor-pointer px-4 hover:bg-[#ffcc00]'>Login</Button> */}
        </div>
      </div>
    </>

  )
}

export default LoginPage