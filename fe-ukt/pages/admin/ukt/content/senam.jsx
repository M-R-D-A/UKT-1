import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import axios from 'axios'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const senam = (props) => {
    const [dataSenam, setDataSenam] = useState([])

    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState();
    const [page, setPage] = useState(1);
    const [value, setValue] = useState();

    const renderPageNumbers = () => {
        const pages = [];

        // Generate page numbers based on the total number of pages
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || i === page) {
                // Show the first, last, and current page numbers
                pages.push(
                    <button
                        key={i}
                        onClick={() => setPage(i)}
                        className={`mx-1 p-2 rounded ${i === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-white'
                            }`}
                    >
                        {i}
                    </button>
                );
            } else if (
                i >= page - 5 &&
                i <= page + 5 &&
                (i % 10 !== 0 || Math.abs(page - i) <= 10)
            ) {
                // Show the page numbers within a range of 10 from the current page
                pages.push(
                    <button
                        key={i}
                        onClick={() => setPage(i)}
                        className={`mx-1 p-2 rounded ${i === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-white'
                            }`}
                    >
                        {i}
                    </button>
                );
            } else if (
                (i === page - 10 && page > 15) ||
                (i === page + 10 && page < totalPages - 15)
            ) {
                // Show a dot for every 10 numbers before or after the current page
                pages.push(
                    <span key={i} className="mx-1 p-2 text-white">
                        ...
                    </span>
                );
            }
        }

        return pages;
    };

    const getDataSenam = () => {
        const token = localStorage.getItem('token')
        const event = JSON.parse(localStorage.getItem('event'))

        console.log(event);

        setLoading(true);
        axios.get(BASE_URL + `senam_detail/pages/${event.id_event}/50`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setTotalPages(res.data.totalPages);
            })
            .catch(err => {
                console.log(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
        axios.get(BASE_URL + `senam_detail/event/${event.id_event}/${page}/50`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setDataSenam(res.data.data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    function ThComponent({ items }) {
        let limit = items.length + 1
        let banding = 1;
        banding < limit;
        return items.map((item) => (
            <th key={banding}>{banding++}</th>
        ));
    }

    function TdComponent({ items }) {
        return items.map((item, index) => (
            <td key={index + 1} className='px-3 border-b-2 border-gray uppercase'>{item.siswa_senam.name}
                {item.predikat === true && (
                    <div className="font-semibold bg-purple rounded-md text-white py-1.5 px-12 uppercase">
                        benar
                    </div>
                )}
                {item.predikat === false && (
                    <div className="font-semibold bg-red rounded-md text-white py-1.5 px-12 uppercase">
                        salah
                    </div>
                )}
                {item.predikat === null && (
                    <div className="bg-purple rounded-md p-0.5 col-span-4">
                        <div className="font-semibold bg-navy rounded-md text-white py-1 px-10 uppercase">

                        </div>
                    </div>
                )}
            </td>
        ));
    }
    useEffect(() => {
        getDataSenam()
    }, [page])

    return (
        <Fragment>
            {loading
                ?
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className='flex flex-col justify-center items-center bg-navy rounded-md p-5'>
                        <Image src="/svg/spinner.svg" className="rounded-md" width={78} height={78} alt="Your SVG" />
                        <h1 className='text-white text-center'>
                            Please Wait Data Is Processed
                        </h1>
                    </div>
                </div>
                : []}
            <div className="min-h-screen bg-darkBlue h-screen">
                {/* wrapper search and filter */}
                <div className="flex gap-x-2">

                    {/* search */}

                </div>
                    <div className="bg-purple rounded-md px-5 py-2 flex items-center gap-x-2 w-72">
                        {/* <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.625 16.625C13.491 16.625 16.625 13.491 16.625 9.625C16.625 5.75901 13.491 2.625 9.625 2.625C5.75901 2.625 2.625 5.75901 2.625 9.625C2.625 13.491 5.75901 16.625 9.625 16.625Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18.3746 18.3751L14.5684 14.5688" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> */}
                        <input value={value} onChange={(e) => setValue(e.target.value)} className='bg-transparent w-full focus:outline-none' type="text" />
                    </div>
                <div className="bg-navy rounded-md py-2 h-[70%]">

                    {/* table */}
                    <div className='overflow-x-auto h-full bg-navy'>
                        <table className='w-max'>
                            <thead className='sticky top-0 bg-black'>
                                <tr className='text-white'>
                                    <th className='py-3 w-20 px-5'>No</th>
                                    <th className='w-30 px-20'>Nama</th>
                                    <th className='w-30 px-20'>Penguji</th>
                                    {dataSenam?.slice(0, 1).map((item, index) => (
                                        <ThComponent items={item.siswa_senam_detail} key={index + 1} />
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {dataSenam?.map((item, index) => (
                                    <tr className='text-green text-center' key={item.id_senam_detail}>
                                        <td className='border-b-2 text-white py-3 border-gray'>{item.senam_siswa.nomor_urut}</td>
                                        <td className='border-b-2 text-white border-gray text-left'>{item.senam_siswa.name}</td>
                                        <td className='border-b-2 text-white border-gray'>{item.penguji_senam.name}</td>
                                        <TdComponent items={item.siswa_senam_detail} key={index + 1} />
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-center mt-5">
                    {renderPageNumbers()}
                </div>

            </div>
        </Fragment>
    )
}

export default senam