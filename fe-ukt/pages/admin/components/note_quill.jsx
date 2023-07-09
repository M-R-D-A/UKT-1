import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const NoteQuill = () => {
    const [value, setValue] = useState('');

    return (
        <>
            <Chart theme="snow" value={value} onChange={setValue} />;
        </>
    )
}

export default NoteQuill