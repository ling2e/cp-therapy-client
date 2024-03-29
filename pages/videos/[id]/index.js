import { useRouter } from "next/router"
import { useState } from "react"
import Head from "next/head"
import axios from "axios"

import Loading from "../../../components/Loading"
import {serverUrl} from "../../../public/scripts/_setting"
import Custom404 from "../../_error"
import { useUserContext } from "../../../public/scripts/Provider/UserProvider";
import SideEdit from "../../../components/videos/SideEdit";
import Alert from "../../../components/Alert"


export default function VideoId() {
    const router = useRouter()
    const id = router.query.id
    const userCxt = useUserContext()
    const [data , setData]= useState()
    const [onLoading ,setOnLoading]=useState(true)
    
    const [editMode , setEditMode] = useState(false)
    const [isLoading , setLoading] = useState(false)

    const deleteFun = (id)=>{
        setLoading(true)
        axios.delete(serverUrl+"videos/"+id)
            .then(res=> {
                router.reload()
            })
            .catch(err=>console.log(err))
        setLoading(false)
        
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
                    <Head>
                        <title>{data.title}</title>
                        </Head>

                    <section className="container mx-auto py-6 min-h-screen">
                        <article className="flex flex-wrap lg:flex-nowrap justify-between">
                            <video id="videoPlayer" controls className="w-full lg:w-9/12 rounded-xl mx-auto h-max">
                                <source src={`${data.videoUrl}`} type="video/mp4"/>
                            </video>
                            <div className="w-full lg:w-3/12 pl-6 py-4">
    
                                {editMode ? (<>
                                    <SideEdit data={data} onClick={e=>setEditMode(false)}/>
                                </>):(<>
                                    <h3 className="font-bold text-xl">{data.title}</h3>
                                    <div className="divider"></div>
                                    <div className="ql-editor h-[17.5rem] overflow-y-scroll" dangerouslySetInnerHTML={{__html:data.description}}>
                                    </div>
                                    <div className="divider w-full"></div>
                                    <div className="p-4 pt-0 text-sm text-gray-700 font-semibold ">
                                        <p onClick={e=>router.push("/user/"+data.author)}>By : {data.author}</p>
                                        <p>Created At : {data.createdAt}</p>
                                    </div>


                                    {userCxt ? (
                                        data.userId == userCxt.userId ? (<>
                                            <div className="flex justify-end gap-2  w-full">
                                                <input type="button" className="btn btn-warning" value={"Edit"} onClick={e=>setEditMode(true)} />
                                                {!isLoading ? 
                                                <input type="button" className="btn btn-error" value={"Delete"} onClick={e=>deleteFun(data._id)} /> : 
                                                <input type="button" className="btn btn-error" value={"Loading"} disabled />
                                                }
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