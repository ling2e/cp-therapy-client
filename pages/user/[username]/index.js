import Link from "next/link"
import { useRouter } from "next/router"
import axios from "axios"
import { useState } from "react"
import Head from "next/head"

import {serverUrl} from "../../../scripts/_setting"
import Loading from "../../../components/Loading"
import Custom404 from "../../_error"
import { useUserContext } from "../../../scripts/Provider/UserProvider"
import { Item as BlogItem}  from "../../../components/blogs"
import VideoItem from "../../../components/videos/Item"
import Alert from "../../../components/Alert"
/* eslint-disable */
export default () => {
    const router = useRouter()
    const username = router.query.username
    const userCxt = useUserContext()

    const [user , setUser] = useState()
    const [videos,setVideos] = useState()
    const [blogs,setBlogs] = useState()
    const [onLoading , setOnLoading]=useState(true)

const [alert, setAlert] =useState({show:false,type:"success",desc:"Ok"}) 
    const deleteBlog = (id) =>{
        axios.delete(serverUrl+"blogs/"+id)
            .then(res=>{
                if(res.status == 204) router.reload()
            })
            .catch(err=>setAlert({...alert , show:true , type:"error",desc:"Fail to access this action"}))
    }

    if(!user && username){
        axios.get(serverUrl+"user/"+username)
            .then((userDetails) =>{
                setUser(userDetails.data)
            }).catch(err=> false)
    }

    if(user) {
        if(!videos) axios.get(serverUrl+"videos/byUser/"+user._id)
            .then(videos => setVideos(videos.data))
            .catch(err => setAlert({...alert , show:true , type:"error",desc:"Something Wrong"}))
        if(!blogs) axios.get(serverUrl+"blogs/byUser/"+user._id)
            .then(blogs => {
                setBlogs(blogs.data)
                setOnLoading(false)
            })
            .catch(err => setOnLoading(false))
        return(
            <>  
                <Head>
                    <title >Profile</title>
                </Head>
                        {alert.show? (<Alert type={alert.type} onClick={e=>setAlert({...alert , show:false})}>{alert.desc}</Alert>):""}

                <section className="min-h-screen container mx-auto py-14 relative px-2">
                    <article className="head flex flex-nowrap w-full items-end gap-x-4">
                        <div className="avatar">
                            <div className="lg:w-52 md:w-44 w-24 mask mask-hexagon">
                                <img  className="select-none" src={serverUrl+user.avatar} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-y-2 mb-5">
                            <h1 className="text-5xl font-semibold capitalize text-primary">{user.username}</h1>
                            <p className="text-gray-500 uppercase font-semibold text-sm">{user.role}</p>
                        </div>
    
                        
                    </article>
                    <div className="divider w-full relative"></div>
                    
                    {/* <article className="flex flex-wrap gap-y-2 mb-10">
                        <h3 className="font-bold text-xl uppercase w-full text-primary">About</h3>
    
                        <div className="card w-full bg-base-100 shadow-xl">
                        <div className="card-body py-6 min-h-16">
                            <p className="indent-8">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id corrupti laborum reprehenderit tempore. Quod voluptate deserunt nostrum eum repudiandae, voluptas, blanditiis quo nihil distinctio error itaque aut, rerum libero neque!</p>
                        </div>
                        </div>
                        
                    </article> */}
    
                    <article className="flex flex-wrap gap-y-2 mb-10">
                        <h3 className="font-bold text-xl uppercase w-full text-primary">Video</h3>
                        <div className="divider w-full"></div>
                        {videos ? (<>
                            <div className="w-full grid justify-center grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
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
                                ))}
                            </div>
                        </>):(
                            <div className="h-16 flex justify-center items-center">
                                    <p>There is no video</p>
                            </div>
                        )}    
                        
                    </article>
    
                    <article className="flex flex-wrap gap-y-2 mb-10">
                        <h3 className="font-bold text-xl uppercase w-full text-primary">Blogs</h3>
                        <div className="divider w-full"></div>
                        {blogs ? (<>
                            <div className="w-full grid justify-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {blogs.map(blog => (
                                    <BlogItem data={blog} key={blog._id}>
                                        

                                        {userCxt ? (
                                            userCxt.userId == blog.userId ? (<>
                                                <div className="flex gap-4 flex-nowrap justify-center">
                                                <input type="button" value="Delete" className="btn btn-error" onClick={e=>deleteBlog(blog._id)}/>
                                                <Link href={`/blogs/${blog._id}/edit`}><input type="button" value="Edit" className="btn btn-warning"/></Link>
                                            </div>
                                            </>) : ""
                                        ):""}
                                    </BlogItem>
                                ))}
                            </div>
                        </>):(<div className="h-16 flex justify-center items-center">
                            <p>There is no blog Posted</p>
                        </div>)}
                    </article>
    
                </section>
            </>
        )}

    if(onLoading)return (<Loading></Loading>)
    return (<Custom404></Custom404>)
}