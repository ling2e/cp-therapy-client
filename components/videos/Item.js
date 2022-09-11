import Link from "next/link"
import { serverUrl } from "../../public/scripts/_setting"

const Item = ({videoAva,title,desc,Author,viewCount,id,videoUrl})=>{
    return (
        <>
            <Link href={`/videos/${id}`} data-aos="fade-up">
                <a className="flex justify-center">
                    <div className="card card-compact w-96 bg-base-100 shadow-xl " >
                        <figure className="h-52 overflow-hidden"><img src={`${videoAva}`} alt={title}  /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{title}</h2>
                            <p>{desc}</p>
                            <div className="flex w-full overflow-hidden justify-around">
                                <p className="text-gray-600 text-sm">By: {Author}</p>
                                <p className="text-gray-600 text-sm">{viewCount} viewed</p>
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        </>
    )
}

export default Item