import Sidebar from './sidebar'
import Header from './header'
import Footer from './footer'
import { useRouter } from 'next/router'

export default function BasicLayout({children}) {
    // state router
    const location = useRouter()
    const { pathname } = location
    const splitLoc = pathname.split('/admin/')
    return (
        <div className="flex font-lato">

            {/* sidebar */}
            <Sidebar location={splitLoc}/>
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
                    {children}
                </div>
                {/* akhir konten utama */}

                {/* footer */}
                <Footer />
                {/* akhir footer */}

            </div>
            {/* akhir wrapper konten utama */}
        </div >
    )
}