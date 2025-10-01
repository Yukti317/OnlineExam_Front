"use client"

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { createData, readData } from '@/helper/axios';
import { setExamResult } from '@/store/examSlice';
import { useFormik } from 'formik';
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
function ExamPage() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.exam);
    const searchparam = useSearchParams()
    const language = searchparam.get('lan')
    const navigate = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0)
    const [skiped, setSkiped] = useState([])
    const [isFinished, setIsFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(50);
    // const [timeLeft, setTimeLeft] = useState(5 * 6.0);
    const [que, setque] = useState([])
    const [initialValues] = useState({
        answer: {},
    })

    const validation = yup.object().shape({
        answer: yup.object().test(
            "all-answered",
            "Please select an answer",
            (value) => {
                return value && Object.values(value).every((ans) => ans !== "");
            }
        ),
    });
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validation,
        enableReinitialize: true,
        onSubmit: (values) => { Addans(values.answer) }
    });

    const Addans = async (ans) => {
        const anslength = Object.entries(ans).filter(([_, val]) => val !== "")
        isFinished ? null : window.confirm("Are you sure, you want to finish your exam?");
        console.log("111111")
        const quelen = que.length;
        let anslen = anslength.length
        dispatch(setExamResult({ quelen, anslen }));
        console.log("AAAAAAAAAAAA")
        try {
            console.log("222222")
            const customArray = Array.from(Object.entries(ans), ([questionId, selectedOptionId]) => ({ questionId, selectedOptionId }));
            console.log("result111111",user)
            const data = {
                userId: user?.id,
                examId: "1",
                answer: customArray
            }
            console.log("dataa", data)
            const res = await createData("", "exam/saveanswer", data, {
                withCredentials: true,
                header: {
                    "Content-Type": "application/json",
                },
            });

            console.log("ress", res)
            navigate.push("/finishpage");
        } catch (error) {
            console.log("errorr", error)
        }

    }

    const handleAnswer = (selectans) => {
        formik.setFieldValue("answer", {
            ...formik.values.answer,
            [que[currentIndex].id]: selectans
        })
    }


    const Getquestation = async () => {
        const res = await readData(`/exam/getQuestion?language=${language}&examid=1`, {
            header: {
                "Content-Type": "application/json",
            },
        });
        if (res.message === "Questions fetched successfully") {
            const apiSeconds = parseTimeInput(res.duration);
            if (apiSeconds > 0) {
                // setTimeLeft(apiSeconds);
            }
            setque(res.data)
        }
    }

    // Convert API value into seconds
    const parseTimeInput = (input) => {
        if (!input) return 0;

        // Case: "2:30"
        //   if (input.includes(":")) {
        //     const [h, m] = input.split(":").map(Number);
        //     return (h * 3600) + (m * 60);
        //   }

        //   // Case: "2 hour 30 min"
        //   if (input.toLowerCase().includes("hour") || input.toLowerCase().includes("min")) {
        //     let hours = 0, minutes = 0;
        //     const parts = input.toLowerCase().split(" ");
        //     parts.forEach((p, i) => {
        //       if (p.includes("hour")) hours = Number(parts[i - 1]) || 0;
        //       if (p.includes("min")) minutes = Number(parts[i - 1]) || 0;
        //     });
        //     return (hours * 3600) + (minutes * 60);
        //   }

        // Case: only number
        const num = Number(input);
        if (num <= 12) {
            return num * 3600; // assume hours
        }
        return num * 60; // assume minutes
    };

    useEffect(() => {
        Getquestation()
    }, [])

    useEffect(() => {
        if (isFinished) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsFinished(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval); // cleanup
    }, [isFinished]);

    const formatTimehr = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, "0")}`;
    };
    const formatTimeMin = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${m
            .toString()
            .padStart(2, "0")}`;
    };
    const formatTimeSec = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${s.toString().padStart(2, "0")}`;
    };

    const handleNext = () => {
        const currentQuesId = que[currentIndex].id;
        const currentAns = formik.values.answer?.[currentQuesId];

        if (!currentAns) {
            formik.setFieldError(`answer.${currentQuesId}`, "Please select an answer");
            return;
        }
        formik.setFieldError(`answer.${currentQuesId}`, undefined);

        if (currentIndex < que.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
        const getid = document.getElementById(`numbox_${currentIndex}`)
        if (getid) {
            getid.style.background = "green"
            getid.style.color = "#ffcc00"
        }
    };

    if (isFinished) {
        Addans(formik.values.answer)
    }

    const handlequejump = (val) => {
        setCurrentIndex(val)
    }
    const handleSkip = () => {
        setSkiped((prev) => [...prev, que[currentIndex].id])
        if (currentIndex < que.length - 1) {
            setCurrentIndex((prev) => prev + 1)
        }
        formik.setFieldValue("answer", {
            ...formik.values.answer,
            [que[currentIndex].id]: ""
        })
        const getid = document.getElementById(`numbox_${currentIndex}`)
        if (getid) {
            getid.style.background = "pink"

        }

    }
    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };
    // console.log("formikkk", formik.values.answer)
    return (
        <>
            <div className='py-4'>
                <div className="rounded-lg m-auto p-4 w-[70%] bg-[#f5f5f599] backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60 overflow-auto">
                    <div className='flex gap-1 justify-center'>
                        {que.map((data, index) => (
                            <p id={`numbox_${index}`} className={`numbox hover:scale-110 transition duration-300 ease-in-out ${currentIndex === index ? 'text-[#ffcc00] bg-[#ff3300] border-[#ff3300] scale-110' : 'bg-yellow-400 text-red-600'}`} onClick={() => handlequejump(index)} key={index}> {index + 1}</p>
                        ))}
                    </div>
                </div>
            </div>

            <div className='bg-white rounded-t-sm'>
                <div className='p-2' >
                    <div style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }} className=' grid grid-cols-3 w-full rounded-lg'>
                        <div className='bg-[#f0c55e] rounded-l-lg p-3'>
                            <p className='font-bold text-sm'>
                                {`Date: ${new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}`}
                            </p>
                        </div>
                        <div className='p-3 bg-[#f5f5f5] gap-2 flex justify-around'>
                            <div className='text-center'>
                                <p className='grid font-bold'>{formatTimehr(timeLeft)}
                                    <span>hr</span>
                                </p>
                            </div>
                            <div className='text-center'>
                                <p className='grid font-bold'>{formatTimeMin(timeLeft)}
                                    <span>Minutes</span>
                                </p>
                            </div>
                            <div className='text-center'>
                                <p className='grid font-bold'>{formatTimeSec(timeLeft)}
                                    <span>Seconds</span>
                                </p>

                            </div>
                        </div>
                        <div className='bg-[#f0c55e] rounded-r-lg p-3'>
                            <p className='font-bold text-right'>Total Marks:0</p>
                        </div>
                    </div>

                    <div className='py-4 px-5'>
                        <p className='font-bold mb-4'>{que[currentIndex]?.question}</p>

                        <RadioGroup
                            onValueChange={(val) => handleAnswer(val)}
                            value={formik.values.answer[que[currentIndex]?.id]}
                            className="px-3"
                        >
                            {que[currentIndex]?.options.map((opt, i) => (
                                <>
                                    <div className="flex items-center space-x-2 " key={i}>
                                        <RadioGroupItem value={opt.id} id={opt.id} name="answer" className="cursor-pointer border-black" />
                                        <Label htmlFor="english" >{opt.optionText}</Label>
                                    </div>
                                </>
                            ))}
                        </RadioGroup>

                        {formik.errors.answer ? (
                            <div className='text-red-600 p-4'>{formik.errors.answer}</div>
                        ) : null}
                    </div>


                    <div>
                        <div className='flex justify-center gap-3'>
                            {currentIndex > 0 ?
                                <Button onClick={() => handlePrevious()} className='rounded-0 bg-[#ecba11] text-black my-3 cursor-pointer px-4 hover:bg-[#ecba11]' >Previous</Button> : null}
                            <Button onClick={() => handleNext()} className='rounded-0 bg-[#ecba11] text-black my-3 cursor-pointer px-4 hover:bg-[#ecba11]'>Next</Button>
                            <Button onClick={() => handleSkip()} className='rounded-0 bg-[#ecba11] text-black my-3 cursor-pointer px-4 hover:bg-[#ecba11]' disabled={currentIndex + 1 === que.length}>Skip</Button>
                        </div>
                        <div className='flex justify-center'>
                            <Button type="submit" onClick={formik.handleSubmit} className='rounded-0 w-[150px] bg-red-600 text-white my-3 cursor-pointer px-4 hover:bg-red-600'>Finish</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ExamPage