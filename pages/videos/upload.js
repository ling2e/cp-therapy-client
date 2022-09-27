import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

import { useUserContext } from "../../public/scripts/Provider/UserProvider";
import Custom404 from "../_error";
import { serverUrl } from "../../public/scripts/_setting";
import Alert from "../../components/Alert";


import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function VideoUpload () {
    const userCxt = useUserContext()
    const router = useRouter()
    const [isLoading , setLoading] = useState(false)
    const [newPost ,setNewPost] = useState({
        title: "",
        description : "",
        files : "",
        videoAvatar : ""
    })
    const [alert , setAlert] = useState({
        show:false,
        type:"success",
        content : ""
    })
    if(!userCxt) return (<Custom404></Custom404>)
    else{
        let Post = async()=>{
            setLoading(true)
            if(!newPost.title.trim() || !newPost.description.trim() || !newPost.files || !newPost.videoAvatar) {
                setLoading(false)
                return(
                    setAlert({...alert , show:true ,type:"warning", content : "The form cant have a empty!"})
                )
            }
            let formData = new FormData()
            let newData = {...newPost , ...userCxt};
            for ( let i in newData ) {
                formData.append(i, newData[i]);
            }
            
            await axios.post(serverUrl+"videos/upload",formData,{
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
                .then(res=>{
                    setLoading(false)
                    setAlert({...alert , show:true ,type:"success", content : "Success Created!"})
                    router.push("/videos/"+res.data)
                })
                .catch(e=>{
                    setLoading(false)
                    setAlert({...alert , show:true , type:"error" , content : "Something is going wrong! Please try again"})
                })
        }
        const videoTypeChecker = (e)=>{
            if(!e.target.files[0]) return
            let video = e.target.files[0]
            let videoSupportType = ["mp4","flv","avi"]
            let currentVideoType = video.type.toString().replace("video/","")
            if(videoSupportType.includes(currentVideoType)) return setNewPost({...newPost , files : video})
            setAlert({...alert , show:true , type:"warning" , content : "We are not supporting this video type"})
        }
        const videoAvatarTypeChecker = (e)=>{
            if(!e.target.files[0]) return
            let avatar = e.target.files[0]
            let avatarSupportType = ["jpeg","png"]
            let currentAvatarType = avatar.type.toString().replace("image/","")
            if(avatarSupportType.includes(currentAvatarType)) return setNewPost({...newPost , videoAvatar : avatar})
            setAlert({...alert , show:true , type:"warning" , content : "We are not supporting this image type"})
        }
    return (
        <>
            <Head>
                <title>Video Upload</title>
                <link href="//cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet"></link>
                <link rel="stylesheet" href="/_assets/css/videos-upload.css" />
            </Head>
            {alert.show ? (<Alert onClick={e=>setAlert({...alert,show:false})} type={alert.type}>{alert.content}</Alert>):""}
            <div className="min-h-screen max-h-max lg:h-screen container mx-auto py-10" >
            
                <div className="flex flex-wrap  h-4/5">
                    <label htmlFor="Infile" className={`w-full lg:w-8/12 h-96 lg:h-full flex justify-center items-center  border-2  rounded-lg cursor-pointer  ${newPost.files ? "bg-green-300 border-green-400" : "bg-gray-300 border-gray-400 animate-pulse"}`}>
                        <i className={`text-gray-600 text-5xl content mx-auto ${newPost.files ? "hidden" : ""} `}>+</i>
                        <i className={`text-green-600 text-2xl content mx-auto ${newPost.files ? "" : "hidden"}`}>✔</i>
                    </label>
                    <input type="file" accept="video/mp4" id="Infile" className="hidden" onChange={e=>videoTypeChecker(e)}/>
                    
                    <div className="w-full lg:w-4/12 pl-0 lg:pl-6">
                        <div className="flex items-center gap-x-3 mt-4 flex-wrap">
                            <p className="">Title</p>
                            <input type="text" className="w-full h-12 text-2xl px-4 rounded-lg text-primary" 
                            onChange={e=>setNewPost({...newPost , title : e.target.value })}
                            />
                        </div>

                        <div className="divider"></div>

                        <div className="flex gap-x-3 flex-wrap">
                            <p className="">Description</p>
                            {/* <textarea className="w-full rounded-lg p-4 text-gray-600" rows="6" onChange={e=>setNewPost({...newPost , description : e.target.value })}></textarea> */}
                            
                            <ReactQuill 
                                theme="bubble" 
                                className='w-full h-full text-gray-700 border-0 rounded-lg bg-white min-h-[11rem]' 
                                value={newPost.description} 
                                onChange={e=>setNewPost({...newPost , description : e })}
                            > 
                            </ReactQuill>
                        </div>

                        <div className="divider"></div>

                        <p className="">Video Avatar</p>
                        <label htmlFor="videoAvatar" className={`w-40 h-40 flex justify-center items-center  border-2 rounded-lg cursor-pointer  ${newPost.videoAvatar ? "bg-green-300 border-green-400" : "bg-gray-300 border-gray-400 animate-pulse"}`}>
                            <i className={`text-gray-600 text-5xl content mx-auto  ${newPost.videoAvatar ? "hidden" : ""}`}>+</i>
                            <i className={`text-green-600 text-2xl content  mx-auto ${newPost.videoAvatar ? "" : "hidden"}`}>✔</i>
                        </label>
                        <input type="file" accept="images/jpg" id="videoAvatar" className="hidden" onChange={e=>videoAvatarTypeChecker(e)}/>

                    </div>
                    <div className="flex gap-x-4 justify-end w-full">
                        <input type="submit" className="btn btn-error my-4  rounded-full px-12" value="Cancel" onClick={()=>router.back()}/>
                        {!isLoading ? 
                        <input type="submit" className="btn btn-primary my-4  rounded-full px-12" value="Post" onClick={Post}/> 
                        
                        : 
                        <input type="submit" className="btn btn-primary my-4  rounded-full px-12 loading" value="posting" disabled/>}
                        
                    </div>
                </div>
                
            </div>
        </>
    );
}}