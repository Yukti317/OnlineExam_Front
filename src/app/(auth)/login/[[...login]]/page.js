"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createData } from '@/helper/axios'
import { setExamResult, setUserId } from '@/store/examSlice'
import { useFormik } from 'formik'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as yup from 'yup';
function LoginPage() {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false)
  const [initialValues] = useState({
    email: "",
    psd: ""
  })

  const validation = yup.object().shape({
    email: yup.string().required('Email is required'),
    psd: yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoader(true)
      const data = {
        email: values.email,
        password: values.psd
      }
      const res = await createData("", "auth/login", data, {
        withCredentials: true,
        header: {
          "Content-Type": "application/json",
        },
      });
      console.log("res", res)
      if (res.status === 200) {
        const token = res.data.data
        console.log("AAAA", typeof(token), token)
        const user = jwtDecode(token);
        dispatch(setUserId({ user }));
        setLoader(false)
        navigate.push('/welcomepage')
      }else{
        setLoader(false)
      }
    }
  });

  return (
    <>
      <div className='mb-3 w-full'>
        <h1 className='text-center w-[50%] text-2xl card_title'>ONLINE EXAM PORTAL</h1>

        <div className='card w-[40%]'>
          <div className='cardinput'>
            <Input placeholder="Enter email" name="email" value={formik.values.email} onChange={formik.handleChange} className="bg-white  mb-3 w-[90%] m-auto" />
            {formik.errors.email && <p className='text-red-600 text-left ps-6'>{formik.errors.email}</p>}
          </div>
          <div className='cardinput'>
            <Input placeholder="Enter password" type='password' name="psd" value={formik.values.psd} onChange={formik.handleChange} className="bg-white w-[90%] m-auto" />
            {formik.errors.psd && <p className='text-red-600 text-left ps-6'>{formik.errors.psd}</p>}
          </div>

          <Button onClick={formik.handleSubmit} className='rounded-0 bg-[#ffcc00] text-black my-3 cursor-pointer px-4 hover:bg-[#ffcc00]'>{loader ? 'Loading...' : 'Login'}</Button>
          {/* <Button onClick={() => navigate.push('/welcomepage')} className='rounded-0 bg-[#ffcc00] text-black my-3 cursor-pointer px-4 hover:bg-[#ffcc00]'>Login</Button> */}
        </div>
      </div>
    </>

  )
}

export default LoginPage