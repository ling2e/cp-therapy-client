import Head from "next/head"
export default function Loading() {
    return(<>
        <Head><title>Loading...</title></Head>
        <section className="flex justify-center min-h-screen items-center flex-wrap">
            <div>
                <div className="radial-progress animate-spin" style={{"--value":20}}></div>
                <p className="font-bold text-xl mt-2 text-center ">Loading <span>.</span><span>.</span><span>.</span></p>
            </div>
        </section>
    </>)
}