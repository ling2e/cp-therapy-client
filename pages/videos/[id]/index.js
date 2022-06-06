/* eslint-disable */
import { useRouter } from "next/router"
import { useState } from "react"
import Head from "next/head"
import axios from "axios"

import Loading from "../../../components/Loading"
import {serverUrl} from "../../../scripts/_setting"
import Custom404 from "../../_error"
import { useUserContext } from "../../../scripts/Provider/UserProvider";
import SideEdit from "../../../components/videos/SideEdit";
import Alert from "../../../components/Alert"


export default function video() {
    const router = useRouter()
    const id = router.query.id
    const userCxt = useUserContext()
    const [data , setData]= useState()
    const [onLoading ,setOnLoading]=useState(true)
    
    const [editMode , setEditMode] = useState(false)


    const deleteFun = (id)=>{
        axios.delete(serverUrl+"videos/"+id)
            .then(res=> {
                router.reload()
            })
            .catch(err=>console.log(err))
    }
    if(id!= undefined){
        if(!data){
            axios.get(serverUrl+"videos/details/"+id)
                .then(res=>{
                    setOnLoading(false)
                    setData(res.data)
                    
                }).catch(({message,response})=>{
                    setOnLoading(false)
                })
        }
        
        if(data) {
            return(
                <>
                    <Head><title>{data.title}</title></Head>

                    <section className="container mx-auto py-6 min-h-screen">
                        <article className="flex flex-wrap lg:flex-nowrap justify-between">
                            <video id="videoPlayer" controls className="w-full lg:w-9/12 rounded-xl mx-auto">
                                <source src={`${serverUrl}videos/${id}`} type="video/mp4"/>
                            </video>
                            <div className="w-full lg:w-3/12 pl-6 py-4">
    
                                {editMode ? (<>
                                    <SideEdit data={data} onClick={e=>setEditMode(false)}/>
                                </>):(<>
                                    <h3 className="font-bold text-2xl">{data.title}</h3>
                                    <div className="divider"></div>
                                    <p>{data.description}</p>
                                    <div className="divider w-full"></div>
                                    <div className="p-4 pt-0 text-sm text-gray-700 font-semibold ">
                                        <p onClick={e=>router.push("/user/"+data.author)}>By : {data.author}</p>
                                        <p>Created At : {data.createdAt}</p>
                                    </div>


                                    {userCxt ? (
                                        data.userId == userCxt.userId ? (<>
                                            <div className="flex justify-end gap-2  w-full">
                                                <input type="button" className="btn btn-warning" value={"Edit"} onClick={e=>setEditMode(true)} />
                                                <input type="button" className="btn btn-error" value={"Delete"} onClick={e=>deleteFun(data._id)} />
                                            </div>
                                        </>):""
                                    ):""}
                                </>)}
    
                            </div>
                            
                        </article>
                    </section>
                </>
            )
        }
    }
    if(onLoading) return(<><Loading></Loading></>)
    return (<Custom404></Custom404>)

}