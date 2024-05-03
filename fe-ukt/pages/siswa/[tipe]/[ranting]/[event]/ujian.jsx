import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import Pagination from '../../../components/Pagination';
import AES from 'crypto-js/aes';
import { enc } from 'crypto-js';
const SECRET = process.env.NEXT_PUBLIC_SECRET;
// import BtnPrevNextImage from '/images/btn_prevnext.webp'

const ujian = () => {

    const router = useRouter()
    const [dataEvent,setDataEvent] = useState([])
    const searchParams = useSearchParams()
    const page = searchParams.get('page') ?? '1'

    const {tipe, event, ranting} = router.query
    
    const [selectedOption, setSelectedOption] = useState("")

    const handleChange = (e) => {
        setSelectedOption(e.target.value)
    }

    const decryptId = (str) => {
        const decodedStr = decodeURIComponent(str);
        return AES.decrypt(decodedStr, SECRET).toString(enc.Utf8);
    }


    useEffect(() => {
        if (!tipe && !event && !ranting){
            return;
        }
        setDataEvent(JSON.parse(JSON.parse(decryptId(event))));
    }, [tipe, ranting, event])
    

    return (
        <div className={`font-lato bg-darkBlue w-full min-h-screen h-auto flex flex-col items-center`}>
            {/* konten */}
            <div className='w-[90%] my-4'>
                {/* header */}
                <div className='w-full kg:py-3 py-1'>
                    <div className='flex justify-center items-center'>
                        <h1 className='font-lato text-white lg:text-[36px] text-[20px] font-bold text-center uppercase'>{tipe} - RANTING {ranting} - {dataEvent.name}</h1>
                    </div>
                    {/* data peserta */}
                    <div className='flex justify-center items-center w-full my-2 space-x-4'>
                        <div className="bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] rounded-md p-0.5 w-[80%]">
                            <div className='rounded-md col-span-4 bg-[#000510]'>
                                <h1 className='text-center text-white lg:py-2 py-1 font-bold font-lato uppercase tracking-wider lg:text-xl text-[14px]'>150 - siti nafiatul fauziah - TELKOm</h1>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-[#9A4BE9] to-[#16D4FC] rounded-md p-0.5 w-1/5">
                            <div className='rounded-md col-span-2 bg-[#000510]'>
                                <h1 className='text-white text-center lg:py-2 py-1 font-bold font-lato uppercase tracking-wider lg:text-xl text-[14px]'>10:00</h1>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* container soal & jawaban */}
                <div className='w-full bg-navy rounded-lg lg:my-2 lg:p-3 p-2'>
                    {/* wrapper soal */}
                    <div className='w-full h-auto mb-2'>
                        <p className='text-white lg:text-3xl text-lg font-lato select-none'>20. Pengurus Pusat dipimpin oleh seorang Ketua Umum yang dipilih dalam Parapatan Luhur sebagai forum musyawarah mufakat tertinggi dalam merumuskan arah kebijakan organisasi di tingkat Nasional. Siapakah nama dari Ketua Umum Pusat hasil Parapatan Luhur 2021 ?</p>
                    </div>
                    {/* wrapper jawaban */}
                    <div className='w-full h-auto mt-7'>
                        <form className='space-y-4'>
                            <div className="radio">
                                <label className='flex items-center'>
                                    <input className="form-radio mr-4 lg:h-7 lg:w-7 h-5 w-5" type="radio" value="option1" checked={selectedOption === 'option1'} onChange={e => handleChange(e)}/>
                                    <p className='text-white lg:text-2xl text-lg font-lato'>Mufahrodin</p>
                                </label>
                            </div>
                            <div className="radio">
                                <label className='flex items-center'>
                                    <input className="form-radio mr-4 lg:h-7 lg:w-7 h-5 w-5" type="radio" value="option2" checked={selectedOption === 'option2'} onChange={e => handleChange(e)}/>
                                    <p className='text-white lg:text-2xl text-lg font-lato'>Sigid Agus Hari Basoeki</p>
                                </label>
                            </div>
                            <div className="radio">
                                <label className='flex items-center'>
                                    <input className="form-radio mr-4 lg:h-7 lg:w-7 h-5 w-5" type="radio" value="option3" checked={selectedOption === 'option3'} onChange={e => handleChange(e)}/>
                                    <p className='text-white lg:text-2xl text-lg font-lato'>Wijiono</p>
                                </label>
                            </div>
                            <div className="radio">
                                <label className='flex items-center'>
                                    <input className="form-radio mr-4 lg:h-7 lg:w-7 h-5 w-5" type="radio" value="option4" checked={selectedOption === 'option4'} onChange={e => handleChange(e)}/>
                                    <p className='text-white lg:text-2xl text-lg font-lato'>Kukuh Widodo</p>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>

                {/* navigation */}
                <Pagination
                    page={page}
                />
            </div>
        </div>
  )
}

export default ujian