import Head from "next/head"
import { useRouter } from "next/router"

export default function Custom404() {
    let router = useRouter()
    return (
        <>
            <Head>
                <title>Page Not Found</title>
            </Head>
            <div className="h-screen flex justify-center items-center flex-wrap">
                <div>
                    <h1 className="text-bold text-xl mb-7"><span className="pr-4 border-r-2 border-gray-700 mr-4 ">404</span>Page is Not Found</h1>
                    <a className="btn btn-primary w-full" onClick={()=>router.back()}>Back to Previous Page</a>
                </div>
            </div>
        </>
    )
}