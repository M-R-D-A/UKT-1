import React, { useEffect, useState } from 'react'
import Sidebar from './components/sidebar'
import Header from './components/header'
import Footer from './components/footer'
import Link from 'next/link'

const index = () => {
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
            pathname: './ukt',
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
                            {/* <img className='rounded-full object-cover w-28 h-28' src={IMAGE_URL + dataPengurus?.foto} alt="" /> */}
                        </div>
                    </div>

                    {/* wrapper ukt card */}
                    <div className="border-t-2 border-white px-3">

                        {/* card ukt jambon */}
                        <Link onClick={() => toUkt('ukt jambon')}>
                            <div className="hover:scale-105 transition ease-in-out duration-500 hover:bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] rounded-md p-0.5  mt-4">
                                <div className="bg-navy shadow drop-shadow-lg rounded-md p-5 text-center">
                                    <h1 className='text-xl font-semibold text-green tracking-wide'>UKT Jambon</h1>
                                </div>
                            </div>
                        </Link>

                        {/* card ukt Hijau */}
                        <Link href={'/pengurus/event_hijau'}>
                            <div className="hover:scale-105 transition ease-in-out duration-500 hover:bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] rounded-md p-0.5  mt-4">
                                <div className="bg-navy shadow drop-shadow-lg rounded-md p-5 text-center">
                                    <h1 className='text-xl font-semibold text-green tracking-wide'>UKT Hijau</h1>
                                </div>
                            </div>
                        </Link>

                        {/* card ukt Putih */}
                        <Link href={'/pengurus/event_putih'}>
                            <div className="hover:scale-105 transition ease-in-out duration-500 hover:bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] rounded-md p-0.5  mt-4">
                                <div className="bg-navy shadow drop-shadow-lg rounded-md p-5 text-center">
                                    <h1 className='text-xl font-semibold text-green tracking-wide'>UKT Putih</h1>
                                </div>
                            </div>
                        </Link>

                        {/* card ukcw */}
                        <Link href={'/pengurus/event_ukcw'}>
                            <div className="hover:scale-105 transition ease-in-out duration-500 hover:bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] rounded-md p-0.5  mt-4">
                                <div className="bg-navy shadow drop-shadow-lg rounded-md p-5 text-center">
                                    <h1 className='text-xl font-semibold text-green tracking-wide'>UKCW</h1>
                                </div>
                            </div>
                        </Link>

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