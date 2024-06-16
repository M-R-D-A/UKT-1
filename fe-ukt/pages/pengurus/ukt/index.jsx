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

    // function modal add
    const addModal = () => {
        setShowModalEvent(true)
        setAction('insert')
        setName('')
        setDate('')
        setTipe(idUkt)
        setRanting(idRanting)
        setIsActive(true)
    }

    // function modal edit
    const editModal = (selectedItem) => {
        setShowModalEvent(true)
        setAction('update')
        setIdEvent(selectedItem.id_event)
        setName(selectedItem.name)
        setDate(selectedItem.tanggal)
        setTipe(idUkt)
        setRanting(idRanting)
        setIsActive(selectedItem.is_active)
    }

    // function modal delete
    const deleteModal = (selectedId) => {
        setShowModalDelete(true)
        setAction('deleteEvent')
        setIdEvent(selectedId)
        setTipe(idUkt)
    }

    // function to rekap nilai
    const toRekapNilai = (item) => {
        localStorage.setItem('event', JSON.stringify(item))
        router.push({
            pathname: './ranting/event/rekap_nilai_' + idTipe,
            query: { eventId: item.id_event, idRanting: item.id_ranting, nameEvent: item.name } // Add your parameter here
        });
    }

    // function to detail nilai
    const toDetailNilai = (item) => {
        localStorage.setItem('event', JSON.stringify(item))
        router.push({
            pathname: './ranting/event/detail_nilai_' + idTipe,
            query: { eventId: item.id_event, idRanting: item.id_ranting, nameEvent: item.name } // Add your parameter here
        });
    }

    // function login checker
    const isLogged = () => {
        if (localStorage.getItem('token') === null || localStorage.getItem('admin') === null) {
            router.push('/admin/login')
        }
    }

    const toUkt = (item) => {
        router.push({
            pathname: './ukt',
            query: { tipe: item } // Add your parameter here
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
                        {dataEvent.map((item, index) => (
                            <button className='w-full' key={index}>
                                <div className="hover:scale-105 transition ease-in-out duration-500 hover:bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] rounded-md p-0.5 mb-4">
                                    <div className="bg-navy shadow drop-shadow-lg rounded-md p-5 text-center">
                                        <h1 className='text-xl font-semibold text-green tracking-wide'>{item.name}</h1>
                                    </div>
                                </div>
                            </button>
                        ))}
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