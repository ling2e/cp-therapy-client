import Head from "next/head"
import Link from "next/link";

import VideoItem from "../../components/videos/Item"
import Header from "../../components/Header";
import { serverUrl } from "../../public/scripts/_setting";
import { useUserContext } from "../../public/scripts/Provider/UserProvider";

export const getServerSideProps = async () => {
    const res = await fetch(serverUrl+"videos");
    const data = await res.json()
    return ({
        props : {
             data
        }
    })
};

const Videos = ({data})=>{
    const videos = data["video"]
    const userCxt = useUserContext()

    return (
        <>  
            <Head>
                <title>Video</title>
            </Head>
            <div className="min-h-screen ">

            <Header backgroundPosition="center 20%">
                <p className="text-5xl font-bold">Videos</p>
            </Header>
            <section className="py-6 container mx-auto">
                {userCxt ? (<nav className="mb-4"><Link href="/videos/upload"><a className="btn btn-primary">Upload</a></Link></nav>): ""}
                    {videos.length ? 
                        (
                            <article className="w-full grid justify-center grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12">
                                {videos.map(video=>(
                                    <VideoItem
                                        key={video._id}
                                        id={video._id}
                                        videoAva = {video.videoAvatarUrl}
                                        title = {video.title}
                                        content = {video.description}
                                        Author = {video.author}
                                        viewCount = {video.viewCount}
                                    />
                                )) }
                            </article>
                        )
                        :
                        (
                            <>
                                
                                <div className="alert alert-info shadow-lg" data-aos="zoom-in">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <span>There is no Video available yet !</span>
                                    </div>
                                </div>
                            </>
                        )
                    }
                        
                
            </section>
            </div>

        </>
    )
}

export default Videos