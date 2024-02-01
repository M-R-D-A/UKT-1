import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const sambung = (props) => {
    const [dataSambung, setDatasambung] = useState([])
    console.log(props.data?.tipe_ukt);
    const getDataSambung = () => {
        const token = localStorage.getItem('token')
        const event = JSON.parse(localStorage.getItem('event'))

        axios.get(BASE_URL + `sambung/ukt/${props.data?.tipe_ukt}/${event.id_event}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                console.log(res.data.data);
                setDatasambung(res.data.data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }
    function TdComponent({ items }) {
        return items.map((item, index) => (
            <td key={item.id_senam} className='border-b-2 border-gray w-[40%]'>
                <div className="flex flex-row justify-center">
                    <div className="font-semibold w-3/4 bg-navy border-2 border-purple rounded-md rounded-br-none rounded-tr-none text-white py-1.5 px-2">
                        {item.sambung_siswa.nomor_urut} - {item.sambung_siswa.name}
                    </div>
                    <div className="flex items-center justify-center text-bold font-semibold w-[15%] bg-purple rounded-md rounded-l-none text-white py-1.5 px-2">
                        {item.nilai}
                    </div>
                </div>
            </td>
        ));
    }

    useEffect(() => {
        getDataSambung()
    }, [])

    return (
        <div className="min-h-screen bg-darkBlue h-screen">
            <div className="bg-navy rounded-md py-2 px-3 h-[70%]">

                {/* table */}
                <div className='h-full overflow-y-auto'>
                    <table className='w-full border-spacing-2'>
                        <thead className='sticky top-0 bg-black border border-white'>
                            <tr className='text-white text-[10px]'>
                                <th className='py-3 w-[5%]'>NO</th>
                                <th className='border border-white w-20'>NAME</th>
                                <th className='border border-white w-16'>PUKULAN</th>
                                <th className='border border-white w-16'>SIKUTAN</th>
                                <th className='border border-white w-16'>DENGKULAN</th>
                                <th className='border border-white w-16'>TENDANGAN A</th>
                                <th className='border border-white w-16'>TENDANGAN C</th>
                                <th className='border border-white w-16'>TENDANGAN T</th>
                                <th className='border border-white w-16'>TENDANGAN B</th>
                                <th className='border border-white w-16'>SERKEL ATAS</th>
                                <th className='border border-white w-16'>SERKEL BAWAH</th>
                                <th className='border border-white w-16'>POLA LANGKAH</th>
                                <th className='border border-white w-16'>JATUHAN SERANGA</th>
                                <th className='border border-white w-16'>KAIT/PENGKOL</th>
                                <th className='border border-white w-16'>GUNTINGAN</th>
                                <th className='border border-white w-16'>BANTINGAN SAUTAN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataSambung.map((item, index) => (
                                <>
                                    <tr className='text-green text-center' key={item.id_sambung}>
                                        <td className='border-b-2 text-white py-3 border-gray'>{index + 1}</td>
                                        <td className='border-b-2 text-white border-gray text-[10px]'>
                                            <div className="flex flex-col justify-center">
                                                <div className='h-10 sm:h-5 flex justify-center items-center'>
                                                    {item.penguji_sambung.name}
                                                </div>
                                                <div className='flex flex-col'>{item.detail_sambung.map((item, index) => (
                                                    <table className='border border-white rounded-md '>
                                                        <tr className='h-10 sm:h-16'>
                                                            <div className='py-4'>
                                                                {item.sambung_siswa.name}
                                                            </div>
                                                        </tr>

                                                    </table>
                                                ))
                                                }</div>
                                                {/* <div>{item.detail_sambung[1].sambung_siswa.name}</div> */}
                                            </div>
                                        </td>
                                        <td className='h-full flex-col'>
                                            <div className='h-5  bg-transparent'></div>
                                            <div className='h-16 p-4 border border-white bg-green'></div>
                                            <div className='h-16 p-4 border border-white bg-purple'></div>
                                        </td>
                                        <td className='h-full flex-col'>
                                            <div className='h-5  bg-transparent'></div>
                                            <div className='h-16 p-4 border border-white bg-green'></div>
                                            <div className='h-16 p-4 border border-white bg-purple'></div>
                                        </td>
                                        <td className='h-full flex-col'>
                                            <div className='h-5  bg-transparent'></div>
                                            <div className='h-16 p-4 border border-white bg-green'></div>
                                            <div className='h-16 p-4 border border-white bg-purple'></div>
                                        </td>
                                        <td className='h-full flex-col'>
                                            <div className='h-5  bg-transparent'></div>
                                            <div className='h-16 p-4 border border-white bg-green'></div>
                                            <div className='h-16 p-4 border border-white bg-purple'></div>
                                        </td>
                                        <td className='h-full flex-col'>
                                            <div className='h-5  bg-transparent'></div>
                                            <div className='h-16 p-4 border border-white bg-green'></div>
                                            <div className='h-16 p-4 border border-white bg-purple'></div>
                                        </td>
                                        <td className='h-full flex-col'>
                                            <div className='h-5  bg-transparent'></div>
                                            <div className='h-16 p-4 border border-white bg-green'></div>
                                            <div className='h-16 p-4 border border-white bg-purple'></div>
                                        </td>
                                        <td className='h-full flex-col'>
                                            <div className='h-5  bg-transparent'></div>
                                            <div className='h-16 p-4 border border-white bg-green'></div>
                                            <div className='h-16 p-4 border border-white bg-purple'></div>
                                        </td>
                                        <td className='h-full flex-col'>
                                            <div className='h-5  bg-transparent'></div>
                                            <div className='h-16 p-4 border border-white bg-green'></div>
                                            <div className='h-16 p-4 border border-white bg-purple'></div>
                                        </td>
                                        <td className='h-full flex-col'>
                                            <div className='h-5  bg-transparent'></div>
                                            <div className='h-16 p-4 border border-white bg-green'></div>
                                            <div className='h-16 p-4 border border-white bg-purple'></div>
                                        </td>
                                        {/* <TdComponent items={(item.detail_sambung)} /> */}
                                    </tr>
                                </>
                            ))}

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default sambung