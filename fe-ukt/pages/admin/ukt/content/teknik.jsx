import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const teknik = (props) => {
    const [dataTeknik, setDataTeknik] = useState([])
    const [totalPages, setTotalPages] = useState();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);


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
    const getDataTeknik = () => {
        const token = localStorage.getItem('token')
        const event = JSON.parse(localStorage.getItem('event'))

        setLoading(true);
        axios.get(BASE_URL + `teknik_detail/pages/${event.id_event}/50`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setTotalPages(res.data.totalPages);
            })
            .catch(err => {
                console.log(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
        axios.get(BASE_URL + `teknik_detail/event/${event.id_event}/${page}/50`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                console.log(res.data.data[0].siswa_teknik_detail.length);
                setDataTeknik(res.data.data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    function ThComponent({ items }) {
        return items.map((item) => (
            <th key={item.id_teknik} className='px-3 '>
                <div className={"font-semibold text-white py-1.5 px-12 uppercase"}>{item.siswa_teknik.name}</div></th>
        ));;
    }

    function TdComponent({ items }) {
        return items.map((item) => (
            <td key={item.id_teknik} className='px-3 border-b-2 border-gray'>
                <div className={"font-semibold bg-purple rounded-md text-white py-1.5 px-12"}>{item.predikat}</div></td>
        ));
    }
    useEffect(() => {
        getDataTeknik()
    }, [page])

    return (
        <div className="min-h-screen bg-darkBlue py-6 h-screen">

            <div className="bg-navy rounded-md py-2 h-[70%]">

                {/* table */}
                <div className='overflow-x-scroll h-full bg-navy'>
                    <table className='w-max'>
                        <thead className='sticky top-0 bg-black'>
                            <>
                                <tr className='text-white'>
                                    <th className='py-3 w-5 px-5'>No</th>
                                    <th className='w-30 px-20'>Nama</th>
                                    <th className='w-30 px-20'>Penguji</th>
                                    {dataTeknik.slice(0, 1).map((item, index) => (
                                        <ThComponent items={(item.siswa_teknik_detail)} key={index + 1} />
                                    ))}
                                </tr>
                            </>

                        </thead>
                        <tbody>
                            {dataTeknik.map((item, index) => (
                                <>
                                    <tr className='text-green text-center' key={item.id_teknik_detail}>
                                        <td className='border-b-2 text-white py-3 border-gray'>{index + 1}</td>
                                        <td className='border-b-2 text-white border-gray '>{item.teknik_siswa.name}</td>
                                        <td className='border-b-2 text-white border-gray '>{item.penguji_teknik.name}</td>
                                        <TdComponent items={(item.siswa_teknik_detail)} key={index + 1} />
                                    </tr>
                                </>
                            ))}

                        </tbody>

                    </table>
                </div>
            </div>
            <div className="flex justify-center mt-5">
                {renderPageNumbers()}
            </div>
        </div>
    )
}

export default teknik