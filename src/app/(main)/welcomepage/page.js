"use client"

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { readData } from '@/helper/axios'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup';
function Welecomepage() {
  const navigate = useRouter();
  const [data, setData] = useState()
  const [initialValues] = useState({
    languagetype: "",
  })

  const validation = yup.object().shape({
    username: yup.string().required('Username is required'),
    psd: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    enableReinitialize: true,
  });


  // const GetAllExam = async () => {
  //   const res = await readData('/exam/getAllExam', {
  //     header: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   if (res.message === 'Exam details') {

  //       setData(res.data)
  //   }
  // }

  return (
    <div>
      <h1 className='text-center w-[80%] text-3xl card_title'>Welcome to C-DAC Online Exam Portal</h1>

      <div className='card w-[65%]'>
        <p className='text-[#f8e189] font-bold'>Please Read the terms mentioned below and proceed towards your exam.</p>
        <div className='flex justify-between p-2'>
          <div className='p-1 bg-[#f5f5f5] shadow rounded me-3 w-[50%] h-[300px] overflow-auto'>
            <ol className='list-decimal list-inside space-y-2 text-gray-800 text-left p-3 text-sm'>
              <li>Question type for Online Exam is MCQ.</li>
              <li>Gujarati Questions are available in CCC, CMOA, Tally &amp; DMOA.</li>
              <li>After Log-In verify your Name &amp; Course.</li>
              <li>Select Answer once you are sure about it.</li>
              <li>If you have any issue in reading or understanding question during exam, contact your Examiner.</li>
              <li>Check whether you have attempted all questions or not.</li>
              <li>You can not answer any pending question once you press Finish Exam button.</li>
              <li>Press Finish Exam Button once you are sure that no question is pending to attempt.</li>
            </ol>

          </div>
          <div className='p-1 bg-[#f5f5f5] shadow rounded w-[50%] h-[300px] overflow-auto'>
            <ol className='list-decimal list-inside space-y-2 text-gray-800 text-left p-3 text-sm'>
              <li>ઓનલાઇન પરીક્ષાનો પ્રશ્ન પ્રકાર MCQ છે.</li>
              <li>ગુજરાતી પ્રશ્નો CCC, CMOA, Tally અને DMOA માં ઉપલબ્ધ છે.</li>
              <li>લૉગ-ઇન કર્યા પછી તમારું નામ અને કોર્સ ચકાસો.</li>
              <li>જ્યારે તમને ખાતરી હોય ત્યારે જ જવાબ પસંદ કરો.</li>
              <li>પરીક્ષા દરમિયાન પ્રશ્ન વાંચવામાં અથવા સમજવામાં કોઈ મુશ્કેલી હોય તો તમારા પરિક્ષકનો સંપર્ક કરો.</li>
              <li>તમે બધા પ્રશ્નોનો જવાબ આપ્યો છે કે નહીં તે ચકાસો.</li>
              <li>તમે Finish Exam બટન દબાવ્યા પછી બાકી રહેલા પ્રશ્નનો જવાબ આપી શકશો નહીં.</li>
              <li>બાકી કોઈ પ્રશ્ન ન હોય તેની ખાતરી થયા પછી જ Finish Exam બટન દબાવો.</li>
            </ol>
          </div>
        </div>

        <p className='text-center w-[80%] p-[5px] text-[20px] card_title text-sm'>Choose Language</p>

        <div>
          <RadioGroup onValueChange={(val) => formik.setFieldValue("languagetype", val)}
            value={formik.values.languagetype} className="flex justify-center w-full">
            <div className="flex items-center space-x-2">
              <Label htmlFor="english" className="text-amber-600 font-bold">English</Label>
              <RadioGroupItem value="english" id="english" name="languagetype" className="cursor-pointer border-[#cd5700] border-2 p-2 bg-[#fad646] " />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="gujrati" className="text-amber-600 font-bold">Gujrati</Label>
              <RadioGroupItem value="gujrati" id="gujrati" name="languagetype" className="cursor-pointer border-[#cd5700] border-2 p-2 bg-[#fad646]" />
            </div>
          </RadioGroup>

          <Button onClick={() => navigate.push(`/exampage?lan=${formik.values.languagetype}`)} className='rounded-0 text-[#cd5700] bg-[#fad646] border-[#cd5700] border-2 hover:bg-[#cd5700] hover:text-[#fad646] hover:border-[#fad646] my-3 cursor-pointer px-4'>Start</Button>
        </div>
      </div>
    </div>
  )
}

export default Welecomepage