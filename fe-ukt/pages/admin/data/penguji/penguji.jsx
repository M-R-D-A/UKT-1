import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { globalState } from '@/context/context'
import axios from 'axios'
import Sidebar from '../../components/sidebar'
import Header from   '../../components/header'
import Footer from '../../components/footer'
import Modal_CSV_Penguji from '../../components/modal_csv_penguji'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const penguji = () => {

    // deklarasi router
    const router = useRouter ()

    // state
    const [role, setRole] = useState ('')
    const [dataPenguji, setDataPenguji] = useState ([])
    const [showModalCSV, setShowModalCSV] = useState (false)

    // function get data penguji
    const getDataPenguji = () => {
        const token = localStorage.getItem ('token')

        axios.get (BASE_URL + `penguji`, {headers : {Authorization : `Bearer ${token}`}})
        .then (res => {
            setDataPenguji (res.data.data)
        })
        .catch (err => {
            console.log(err.message);
        })
    }

    const getRole = () => {
        const role = JSON.parse (localStorage.getItem ('admin'))
        setRole (role)
    }

    //function handlesave by csv
    const handleSaveByCsv = (e) => {
        e.preventDefault()

        const token = localStorage.getItem('token')

        let form = new FormData()
        form.append ('csvFile', fileCSV)
        // let form = {
        //     csvFile: fileCSV,
        //     id_event: event.id,
        //     tipe_ukt: event.tipe_ukt
        // }

        axios.post(BASE_URL + `/csv/penguji`, form, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    // function login checker
    const isLogged = () => {
        if (localStorage.getItem ('token') === null || localStorage.getItem ('admin') === null) {
            router.push ('/admin/login')
        }
    }

    useEffect (() => {
        getDataPenguji ()
        getRole ()
        isLogged ()
    }, [])

    return (
        <>
        <div className="flex font-lato">

            {/* sidebar */}
            <Sidebar />
            {/* akhir sidebar */}

            {/* awal wrapper konten utama */}
            {/* supaya konten header dapat di scroll dan tidak mempengaruhi sidebar */}
            <div className="w-full overflow-y-auto h-screen">

                {/* overlap untuk device sm */}
                {/* <div className="absolute hidden lg:hidden inset-0 bg-slate-400 opacity-50 z-10">
                </div> */}

                {/* header */}
                <Header />
                {/* akhir header */}

                {/* konten utama */}
                <div className="min-h-full bg-darkBlue p-6">

                    {/* wrapper page name and search */}
                    <div className="flex justify-between items-center text-white mb-7">

                        {/* page name */}
                        <h1 className='text-2xl tracking-wider uppercase font-bold'>Penguji</h1>

                        {/* search */}
                        <div 
                        onClick={() => setShowModalCSV(true)}
                        className="bg-purple rounded-md px-5 py-2 flex items-center gap-x-2 w-72">
                            <div>ADD VIA CSV</div>
                        </div>
                    </div>

                    {/* data count */}
                    <div className="grid grid-cols-2 gap-x-5">

                        {/* card penguji cabang */}
                        {(() => {
                            if (role.id_role === 'super admin') {
                                return (
                                    <Link href={'./cabang/penguji_cabang'} className="bg-navy hover:bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] rounded-md p-0.5">

                                        {/* inner bg */}
                                        <div className="bg-navy p-5 rounded-md space-y-5">

                                            {/* data name */}
                                            <div className="flex justify-between items-center">
                                                <h1 className='text-green text-2xl'>Penguji Cabang</h1>
                                                <svg width="25" height="23" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.6923 0H1.30769C0.960871 0 0.628254 0.137774 0.383014 0.383014C0.137774 0.628254 0 0.960871 0 1.30769V13.0769C0 13.4237 0.137774 13.7564 0.383014 14.0016C0.628254 14.2468 0.960871 14.3846 1.30769 14.3846H2.40288C2.52669 14.385 2.64799 14.3497 2.75233 14.2831C2.85666 14.2164 2.93963 14.1211 2.99135 14.0087C3.31126 13.3391 3.81414 12.7738 4.44184 12.3781C5.06954 11.9823 5.79642 11.7723 6.53846 11.7723C7.2805 11.7723 8.00738 11.9823 8.63508 12.3781C9.26278 12.7738 9.76566 13.3391 10.0856 14.0087C10.1373 14.1211 10.2203 14.2164 10.3246 14.2831C10.4289 14.3497 10.5502 14.385 10.674 14.3846H15.6923C16.0391 14.3846 16.3717 14.2468 16.617 14.0016C16.8622 13.7564 17 13.4237 17 13.0769V1.30769C17 0.960871 16.8622 0.628254 16.617 0.383014C16.3717 0.137774 16.0391 0 15.6923 0ZM4.57692 8.5C4.57692 8.11204 4.69197 7.7328 4.9075 7.41023C5.12304 7.08765 5.42939 6.83624 5.78781 6.68777C6.14624 6.53931 6.54064 6.50047 6.92114 6.57615C7.30164 6.65184 7.65115 6.83866 7.92548 7.11298C8.19981 7.38731 8.38662 7.73682 8.46231 8.11732C8.538 8.49782 8.49915 8.89222 8.35069 9.25065C8.20222 9.60907 7.95081 9.91542 7.62823 10.131C7.30566 10.3465 6.92642 10.4615 6.53846 10.4615C6.01889 10.4594 5.52122 10.252 5.15382 9.88464C4.78643 9.51725 4.57907 9.01957 4.57692 8.5ZM15.6923 13.0769H11.0663C10.5206 12.1381 9.69866 11.3903 8.7125 10.9356C9.20745 10.4949 9.55677 9.91414 9.71416 9.27037C9.87155 8.62661 9.82957 7.95021 9.59379 7.33085C9.358 6.71149 8.93955 6.17841 8.39391 5.80228C7.84826 5.42616 7.20119 5.22474 6.53846 5.22474C5.87574 5.22474 5.22866 5.42616 4.68302 5.80228C4.13737 6.17841 3.71892 6.71149 3.48314 7.33085C3.24735 7.95021 3.20537 8.62661 3.36276 9.27037C3.52015 9.91414 3.86947 10.4949 4.36442 10.9356C3.37826 11.3903 2.55631 12.1381 2.01058 13.0769H1.30769V1.30769H15.6923V13.0769ZM2.61538 4.57692V3.26923C2.61538 3.09582 2.68427 2.92951 2.80689 2.80689C2.92951 2.68427 3.09582 2.61538 3.26923 2.61538H13.7308C13.9042 2.61538 14.0705 2.68427 14.1931 2.80689C14.3157 2.92951 14.3846 3.09582 14.3846 3.26923V11.1154C14.3846 11.2888 14.3157 11.4551 14.1931 11.5777C14.0705 11.7003 13.9042 11.7692 13.7308 11.7692H12.4231C12.2497 11.7692 12.0834 11.7003 11.9607 11.5777C11.8381 11.4551 11.7692 11.2888 11.7692 11.1154C11.7692 10.942 11.8381 10.7757 11.9607 10.653C12.0834 10.5304 12.2497 10.4615 12.4231 10.4615H13.0769V3.92308H3.92308V4.57692C3.92308 4.75033 3.85419 4.91664 3.73157 5.03926C3.60895 5.16188 3.44264 5.23077 3.26923 5.23077C3.09582 5.23077 2.92951 5.16188 2.80689 5.03926C2.68427 4.91664 2.61538 4.75033 2.61538 4.57692Z" fill="#42C6A3"/>
                                                </svg>
                                            </div>

                                            {/* data count and button add data */}
                                            <h1 className='text-white text-4xl font-semibold tracking-wider'>{dataPenguji.filter (a => a.id_role === 'penguji cabang').length}</h1>
                                        </div>
                                    </Link>
                                )
                            } else if (role.id_role === 'admin ranting') {
                                return (
                                    <Link href={'./cabang/penguji_cabang'} className="hidden bg-navy hover:bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] rounded-md p-0.5">

                                        {/* inner bg */}
                                        <div className="bg-navy p-5 rounded-md space-y-5">

                                            {/* data name */}
                                            <div className="flex justify-between items-center">
                                                <h1 className='text-green text-2xl'>Penguji Cabang</h1>
                                                <svg width="25" height="23" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.6923 0H1.30769C0.960871 0 0.628254 0.137774 0.383014 0.383014C0.137774 0.628254 0 0.960871 0 1.30769V13.0769C0 13.4237 0.137774 13.7564 0.383014 14.0016C0.628254 14.2468 0.960871 14.3846 1.30769 14.3846H2.40288C2.52669 14.385 2.64799 14.3497 2.75233 14.2831C2.85666 14.2164 2.93963 14.1211 2.99135 14.0087C3.31126 13.3391 3.81414 12.7738 4.44184 12.3781C5.06954 11.9823 5.79642 11.7723 6.53846 11.7723C7.2805 11.7723 8.00738 11.9823 8.63508 12.3781C9.26278 12.7738 9.76566 13.3391 10.0856 14.0087C10.1373 14.1211 10.2203 14.2164 10.3246 14.2831C10.4289 14.3497 10.5502 14.385 10.674 14.3846H15.6923C16.0391 14.3846 16.3717 14.2468 16.617 14.0016C16.8622 13.7564 17 13.4237 17 13.0769V1.30769C17 0.960871 16.8622 0.628254 16.617 0.383014C16.3717 0.137774 16.0391 0 15.6923 0ZM4.57692 8.5C4.57692 8.11204 4.69197 7.7328 4.9075 7.41023C5.12304 7.08765 5.42939 6.83624 5.78781 6.68777C6.14624 6.53931 6.54064 6.50047 6.92114 6.57615C7.30164 6.65184 7.65115 6.83866 7.92548 7.11298C8.19981 7.38731 8.38662 7.73682 8.46231 8.11732C8.538 8.49782 8.49915 8.89222 8.35069 9.25065C8.20222 9.60907 7.95081 9.91542 7.62823 10.131C7.30566 10.3465 6.92642 10.4615 6.53846 10.4615C6.01889 10.4594 5.52122 10.252 5.15382 9.88464C4.78643 9.51725 4.57907 9.01957 4.57692 8.5ZM15.6923 13.0769H11.0663C10.5206 12.1381 9.69866 11.3903 8.7125 10.9356C9.20745 10.4949 9.55677 9.91414 9.71416 9.27037C9.87155 8.62661 9.82957 7.95021 9.59379 7.33085C9.358 6.71149 8.93955 6.17841 8.39391 5.80228C7.84826 5.42616 7.20119 5.22474 6.53846 5.22474C5.87574 5.22474 5.22866 5.42616 4.68302 5.80228C4.13737 6.17841 3.71892 6.71149 3.48314 7.33085C3.24735 7.95021 3.20537 8.62661 3.36276 9.27037C3.52015 9.91414 3.86947 10.4949 4.36442 10.9356C3.37826 11.3903 2.55631 12.1381 2.01058 13.0769H1.30769V1.30769H15.6923V13.0769ZM2.61538 4.57692V3.26923C2.61538 3.09582 2.68427 2.92951 2.80689 2.80689C2.92951 2.68427 3.09582 2.61538 3.26923 2.61538H13.7308C13.9042 2.61538 14.0705 2.68427 14.1931 2.80689C14.3157 2.92951 14.3846 3.09582 14.3846 3.26923V11.1154C14.3846 11.2888 14.3157 11.4551 14.1931 11.5777C14.0705 11.7003 13.9042 11.7692 13.7308 11.7692H12.4231C12.2497 11.7692 12.0834 11.7003 11.9607 11.5777C11.8381 11.4551 11.7692 11.2888 11.7692 11.1154C11.7692 10.942 11.8381 10.7757 11.9607 10.653C12.0834 10.5304 12.2497 10.4615 12.4231 10.4615H13.0769V3.92308H3.92308V4.57692C3.92308 4.75033 3.85419 4.91664 3.73157 5.03926C3.60895 5.16188 3.44264 5.23077 3.26923 5.23077C3.09582 5.23077 2.92951 5.16188 2.80689 5.03926C2.68427 4.91664 2.61538 4.75033 2.61538 4.57692Z" fill="#42C6A3"/>
                                                </svg>
                                            </div>

                                            {/* data count and button add data */}
                                            <h1 className='text-white text-4xl font-semibold tracking-wider'>{dataPenguji.filter (a => a.id_role === 'penguji cabang').length}</h1>
                                        </div>
                                    </Link>
                                )
                            }
                        })()}

                        {/* card penguji ranting */}
                        <Link href={'./ranting/penguji_ranting'} className="bg-navy hover:bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] rounded-md p-0.5">

                            {/* inner bg */}
                            <div className="bg-navy p-5 rounded-md space-y-5">

                                {/* data name */}
                                <div className="flex justify-between items-center">
                                    <h1 className='text-green text-2xl'>Penguji Ranting</h1>
                                    <svg width="25" height="23" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.6923 0H1.30769C0.960871 0 0.628254 0.137774 0.383014 0.383014C0.137774 0.628254 0 0.960871 0 1.30769V13.0769C0 13.4237 0.137774 13.7564 0.383014 14.0016C0.628254 14.2468 0.960871 14.3846 1.30769 14.3846H2.40288C2.52669 14.385 2.64799 14.3497 2.75233 14.2831C2.85666 14.2164 2.93963 14.1211 2.99135 14.0087C3.31126 13.3391 3.81414 12.7738 4.44184 12.3781C5.06954 11.9823 5.79642 11.7723 6.53846 11.7723C7.2805 11.7723 8.00738 11.9823 8.63508 12.3781C9.26278 12.7738 9.76566 13.3391 10.0856 14.0087C10.1373 14.1211 10.2203 14.2164 10.3246 14.2831C10.4289 14.3497 10.5502 14.385 10.674 14.3846H15.6923C16.0391 14.3846 16.3717 14.2468 16.617 14.0016C16.8622 13.7564 17 13.4237 17 13.0769V1.30769C17 0.960871 16.8622 0.628254 16.617 0.383014C16.3717 0.137774 16.0391 0 15.6923 0ZM4.57692 8.5C4.57692 8.11204 4.69197 7.7328 4.9075 7.41023C5.12304 7.08765 5.42939 6.83624 5.78781 6.68777C6.14624 6.53931 6.54064 6.50047 6.92114 6.57615C7.30164 6.65184 7.65115 6.83866 7.92548 7.11298C8.19981 7.38731 8.38662 7.73682 8.46231 8.11732C8.538 8.49782 8.49915 8.89222 8.35069 9.25065C8.20222 9.60907 7.95081 9.91542 7.62823 10.131C7.30566 10.3465 6.92642 10.4615 6.53846 10.4615C6.01889 10.4594 5.52122 10.252 5.15382 9.88464C4.78643 9.51725 4.57907 9.01957 4.57692 8.5ZM15.6923 13.0769H11.0663C10.5206 12.1381 9.69866 11.3903 8.7125 10.9356C9.20745 10.4949 9.55677 9.91414 9.71416 9.27037C9.87155 8.62661 9.82957 7.95021 9.59379 7.33085C9.358 6.71149 8.93955 6.17841 8.39391 5.80228C7.84826 5.42616 7.20119 5.22474 6.53846 5.22474C5.87574 5.22474 5.22866 5.42616 4.68302 5.80228C4.13737 6.17841 3.71892 6.71149 3.48314 7.33085C3.24735 7.95021 3.20537 8.62661 3.36276 9.27037C3.52015 9.91414 3.86947 10.4949 4.36442 10.9356C3.37826 11.3903 2.55631 12.1381 2.01058 13.0769H1.30769V1.30769H15.6923V13.0769ZM2.61538 4.57692V3.26923C2.61538 3.09582 2.68427 2.92951 2.80689 2.80689C2.92951 2.68427 3.09582 2.61538 3.26923 2.61538H13.7308C13.9042 2.61538 14.0705 2.68427 14.1931 2.80689C14.3157 2.92951 14.3846 3.09582 14.3846 3.26923V11.1154C14.3846 11.2888 14.3157 11.4551 14.1931 11.5777C14.0705 11.7003 13.9042 11.7692 13.7308 11.7692H12.4231C12.2497 11.7692 12.0834 11.7003 11.9607 11.5777C11.8381 11.4551 11.7692 11.2888 11.7692 11.1154C11.7692 10.942 11.8381 10.7757 11.9607 10.653C12.0834 10.5304 12.2497 10.4615 12.4231 10.4615H13.0769V3.92308H3.92308V4.57692C3.92308 4.75033 3.85419 4.91664 3.73157 5.03926C3.60895 5.16188 3.44264 5.23077 3.26923 5.23077C3.09582 5.23077 2.92951 5.16188 2.80689 5.03926C2.68427 4.91664 2.61538 4.75033 2.61538 4.57692Z" fill="#42C6A3"/>
                                    </svg>

                                </div>

                                {/* data count and button add data */}
                                <h1 className='text-white text-4xl font-semibold tracking-wider'>{dataPenguji.filter (a => a.id_role === 'penguji ranting').length}</h1>
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
        <globalState.Provider value={{ showModalCSV, setShowModalCSV }}>
                <Modal_CSV_Penguji />
            </globalState.Provider>
    </>

    )
}

export default penguji