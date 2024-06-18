import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { globalState } from '@/context/context'
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import Footer from '../components/footer'
import Modal_event from '../components/modal_event'
import Modal_delete from '../components/modal_delete'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const ukt = () => {

    // deklarasi router
    const router = useRouter()

    const idTipe = router.query.tipe

    // state modal
    const [showModalEvent, setShowModalEvent] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)

    // state
    const [dataEvent, setDataEvent] = useState([])
    const [isActive, setIsActive] = useState(false)
    const [ranting, setRanting] = useState()
    const [action, setAction] = useState('')
    const [idEvent, setIdEvent] = useState('')
    const [event, setEvent] = useState(null)
    const [name, setName] = useState('')
    const [date, setDate] = useState()
    const [tipe, setTipe] = useState('')

    // function get data event
    const getDataEvent = () => {
        const token = localStorage.getItem('token')

        axios.get(BASE_URL + `event/ukt/${idTipe}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setDataEvent(res.data.data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    // function login checker
    const isLogged = () => {
        if (localStorage.getItem('token') === null || localStorage.getItem('admin') === null) {
            router.push('/admin/login')
        }
    }

    const toUkt = (item) => {
        let ukt // Declare the variable once
        console.log('event')
        console.log(event)
        if (idTipe === 'UKT Jambon') {
            ukt = 'ukt_jambon'; // Assign a new value
        } else if (idTipe === 'UKT Hijau') {
            ukt = 'ukt_hijau'; // Assign a new value
        } else if (idTipe === 'UKT Putih') {
            ukt = 'ukt_putih'; // Assign a new value
        } else {
            ukt = 'ukt_ukcw'; // Assign a new value
        }
        router.push({
            pathname: `./ukt/${item}${ukt}`,
            query: { eventId: event.id_event, idRanting: event.id_ranting, nameEvent: event.name } // Add your parameter here
        });
    }

    useEffect(() => {
        getDataEvent()
        isLogged()
    }, [])

    return (
        <>
            <div className="font-lato">

                {/* awal wrapper konten utama */}
                <div className="w-full h-screen">

                    {/* header */}
                    <Header />
                    {/* akhir header */}

                    {/* konten utama */}
                    <div className="min-h-full bg-darkBlue px-10 py-8">

                        {/* card event */}
                        {!event ? dataEvent.map((item, index) => (
                            <button
                                onClick={() => {
                                    localStorage.setItem('event', JSON.stringify(item));
                                    setEvent(item);
                                }}
                                className='w-full' key={index}>
                                <div className="hover:scale-105 transition ease-in-out duration-500 hover:bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] rounded-md p-0.5 mb-4">
                                    <div className="bg-navy shadow drop-shadow-lg rounded-md p-5 text-center">
                                        <h1 className='text-xl font-semibold text-green tracking-wide'>{item.name}</h1>
                                    </div>
                                </div>
                            </button>
                        )) : <>
                            <button
                                onClick={() => toUkt('detail_nilai_')}
                                className='w-full' key={1}>
                                <div className="hover:scale-105 transition ease-in-out duration-500 hover:bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] rounded-md p-0.5 mb-4">
                                    <div className="bg-purple shadow drop-shadow-lg rounded-md p-5 text-center">
                                        <h1 className='text-xl font-semibold text-white tracking-wide'>Detail Nilai</h1>
                                    </div>
                                </div>
                            </button>
                            <button
                                onClick={() => toUkt('rekap_nilai_')}
                                className='w-full' key={2}>
                                <div className="hover:scale-105 transition ease-in-out duration-500 hover:bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] rounded-md p-0.5 mb-4">
                                    <div className="bg-purple shadow drop-shadow-lg rounded-md p-5 text-center">
                                        <h1 className='text-xl font-semibold text-white tracking-wide'>Rekap Nilai</h1>
                                    </div>
                                </div>
                            </button>
                        </>}
                    </div>
                </div>
            </div>

            {/* memanggil modal */}
            <globalState.Provider value={{ showModalEvent, setShowModalEvent, setDataEvent, action, idEvent, name, setName, date, setDate, tipe, setTipe, isActive, setIsActive, ranting, setRanting }}>
                <Modal_event />
            </globalState.Provider>

            <globalState.Provider value={{ showModalDelete, setShowModalDelete, setDataEvent, action, idEvent, tipe, setTipe }}>
                <Modal_delete />
            </globalState.Provider>
        </>
    )
}

export default ukt