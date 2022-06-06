import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import Head from "next/head"

import Loading from "../../../components/Loading"
import Custom404 from "../../_error"
import { serverUrl } from "../../../scripts/_setting"
import Header from "../../../components/Header"
import Alert from "../../../components/Alert"
import { useUserContext } from "../../../scripts/Provider/UserProvider"
/* eslint-disable */
export default () => {
    const router = useRouter()
    const id = router.query.id
    const userCxt = useUserContext()

    const [isLoading , setIsLoading] = useState(true)
    const [updateBlog , setUpdateBlog] = useState()

    const [alert, setAlert] =useState({show:false,type:"success",desc:"Ok"}) 


    const doUpdate = () =>{
        if(!updateBlog.title || !updateBlog.description) return setAlert({...alert , show:true , type:"warning",desc:"Title and Description cant be Empty!"});
        axios.put(serverUrl+"blogs/"+id)
            .then(res=>{
                if(res.status == 204) {
                    router.push("/blogs/"+id)
                }
            })
            .catch(err=> setAlert({...alert , show:true , type:"error",desc:"Something wrong please try again !"}))
    }
    if(!updateBlog && isLoading){
        axios.get(serverUrl+"blogs/"+id)
            .then(res=>{
                if(userCxt.userId == res.data.userId ) setUpdateBlog({title : res.data.title , description : res.data.description})
                setIsLoading(false)
            })
            .catch(err=>setIsLoading(false))
    }

    if(updateBlog)return (<>
        <Head>
            <title>{updateBlog.title} | Edit</title>
        </Head>
        {alert.show? (<Alert type={alert.type} onClick={e=>setAlert({...alert , show:false})}>{alert.desc}</Alert>):""}
        <section className="min-h-screen">
            <Header backgroundPosition="center 20%">
                <p className="text-5xl font-bold">Edit Post</p>
            </Header>
            <article className="container mx-auto py-6">
                <p className="text-xl font-semibold w-full capitalize  mb-1">Title</p>
                <input type="text" className="w-full text-2xl rounded-lg px-3 py-2 capitalize" value={updateBlog.title} 
                    onChange={e=>setUpdateBlog({...updateBlog , title:e.target.value})}
                />
                <div className="divider"></div>
                <p className="text-xl font-semibold w-full capitalize mb-1">Description</p>
                <textarea className="w-full min-h-16 p-3 text-gray-700 rounded-lg" rows="10"
                    value={updateBlog.description}
                    onChange={e=>setUpdateBlog({...updateBlog , description:e.target.value})}
                ></textarea>
                <div className="flex flex-nowrap gap-4 mt-4 justify-end">
                    <input type="button" value="Cancel" className="btn btn-error" onClick={e=>router.back()}/>
                    <input type="button" value="Update" className="btn btn-success" onClick={e=>doUpdate()}/>    
                </div>
            </article>
            
        </section>
    </>)
    if(isLoading)return(<Loading />)
    return(<Custom404></Custom404>)
}