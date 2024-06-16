import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from './components/header'
import Footer from './components/footer'
const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL

const index = () => {
    // deklarasi router
    const router = useRouter()

    const [dataPengurus, setDataPengurus] = useState([])

    const getDataPengurus = () => {
        const pengurus = JSON.parse(localStorage.getItem('pengurus'))
        setDataPengurus(pengurus)
    }

    useEffect(() => {
        getDataPengurus()
    }, [])

    const toUkt = (item) => {
        router.push({
            pathname: 'pengurus/ukt',
            query: { tipe: item } // Add your parameter here
        });
    }

    return (
        <div className="font-lato">

            {/* awal wrapper konten utama */}
            <div className="w-full h-screen">

                {/* header */}
                <Header />
                {/* akhir header */}

                {/* konten utama */}
                <div className="min-h-full bg-darkBlue px-4 py-8">

                    {/* wrapper user information */}
                    <div className="flex flex-col justify-center items-center mb-7">

                        {/* photo profile */}
                        <div className="bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] p-0.5 rounded-full mb-3">
                            <img className='rounded-full object-cover w-28 h-28' src={IMAGE_URL + dataPengurus?.foto} alt="" />
                        </div>

                        {/* username */}
                        <h1 className='text-2xl font-semibold text-white'>{dataPengurus.username}</h1>

                        {/* name */}
                        <h1 className='text-green'>{dataPengurus.name}</h1>
                    </div>

                    {/* wrapper ukt card */}
                    <div className="border-t-2 border-white px-3">

                        {/* card ukt jambon */}
                        <button className='w-full' onClick={() => toUkt('UKT Jambon')}>
                            <div className="hover:scale-105 transition ease-in-out duration-500 hover:bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] rounded-md p-0.5  mt-4">
                                <div className="bg-navy shadow drop-shadow-lg rounded-md p-5 text-center">
                                    <h1 className='text-xl font-semibold text-green tracking-wide'>UKT Jambon</h1>
                                </div>
                            </div>
                        </button>

                        {/* card ukt Hijau */}
                        <button className='w-full' onClick={() => toUkt('UKT Jambon')}>
                            <div className="hover:scale-105 transition ease-in-out duration-500 hover:bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] rounded-md p-0.5  mt-4">
                                <div className="bg-navy shadow drop-shadow-lg rounded-md p-5 text-center">
                                    <h1 className='text-xl font-semibold text-green tracking-wide'>UKT Hijau</h1>
                                </div>
                            </div>
                        </button>

                        {/* card ukt Putih */}
                        <button className='w-full' onClick={() => toUkt('UKT Jambon')}>
                            <div className="hover:scale-105 transition ease-in-out duration-500 hover:bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] rounded-md p-0.5  mt-4">
                                <div className="bg-navy shadow drop-shadow-lg rounded-md p-5 text-center">
                                    <h1 className='text-xl font-semibold text-green tracking-wide'>UKT Putih</h1>
                                </div>
                            </div>
                        </button>

                        {/* card ukcw */}
                        <button className='w-full' onClick={() => toUkt('UKCW')}>
                            <div className="hover:scale-105 transition ease-in-out duration-500 hover:bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] rounded-md p-0.5  mt-4">
                                <div className="bg-navy shadow drop-shadow-lg rounded-md p-5 text-center">
                                    <h1 className='text-xl font-semibold text-green tracking-wide'>UKCW</h1>
                                </div>
                            </div>
                        </button>

                    </div>
                </div>
                {/* akhir konten utama */}

                {/* footer */}
                <Footer />
                {/* akhir footer */}

            </div>
            {/* akhir wrapper konten utama */}
        </div>
    )
}

export default index