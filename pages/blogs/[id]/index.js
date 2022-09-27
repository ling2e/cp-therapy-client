import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios"
import Link from "next/link"
import Head from "next/head"

import {serverUrl} from "../../../public/scripts/_setting"
import Loading from "../../../components/Loading"
import Custom404 from "../../_error"
import Header from "../../../components/Header"
import { useUserContext } from "../../../public/scripts/Provider/UserProvider";
import Alert from "../../../components/Alert";

export default function BlogsId(){
    const router = useRouter()
    const id = router.query.id

    const [data ,setData] = useState()
    const [content , setContent] = useState()
    const [onLoading , setOnLoading] = useState(true)
    const userCxt = useUserContext()

    const [alert, setAlert] =useState({show:false,type:"success",desc:"Ok"})
    if(!data){
        if(id){
            axios.get(serverUrl+"blogs/"+id)
            .then(res =>{
                setOnLoading(false)
                if(res.status == 200) setData(res.data)
            })
            .catch(err=>{
                if(err.response.status == 404) setOnLoading(false)
            })
        }
    }

    const deleteBlog = ()=>{
        axios.delete(serverUrl+"blogs/"+id)
            .then(res =>{
                if(res.status == 204) router.reload()
            })
            .catch(err=>{
                setAlert({...alert , show:true , type:"error",desc:"Something wrong please try again !"})
            })
    }

    if(data){
        return(<>
                <Head>
                    <title className="capitalize">{data.title} | Blog</title>
                    <link rel="stylesheet" href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css" />
                    <link rel="stylesheet" href="/_assets/css/blogs-create.css" />
                </Head>
                {alert.show? (<Alert type={alert.type} onClick={e=>setAlert({...alert , show:false})}>{alert.desc}</Alert>):""}
                <section className="min-h-screen">
                    <Header backgroundPosition="center 20%"></Header>
                    <article className="container mx-auto py-6 ">
                        <h2 className="capitalize text-3xl font-semibold">{data.title}</h2>
                        <div className="divider"></div>
                        {/* <div dangerouslySetInnerHTML={data.description}></div> */}
                        <div className="text-gray-700 min-h-16 ql-container ql-snow"> 
                            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: data.description }}></div> 
                        </div>
                        <div className="divider"></div>
                        <footer className="flex justify-between text-gray-500 h-16 items-center">
                            <p>By : <Link href={`/user/${data.author}`} className="cursor-pointer">{data.author}</Link></p>
                            {userCxt ? (
                                userCxt.userId == data.userId ? (<>
                                    <div className="flex gap-4 flex-nowrap justify-center">
                                    <input type="button" value="Delete" className="btn btn-error" onClick={e=>deleteBlog()}/>
                                    <Link href={`/blogs/${id}/edit`}><input type="button" value="Edit" className="btn btn-warning"/></Link>
                                </div>
                                </>) : ""
                            ):""}
                            <p>Created At : {data.createdAt}</p>
                        </footer>
                    </article>
                </section>
            </>)
    }
    if(onLoading) return(<Loading></Loading>)
    return (<Custom404></Custom404>)
};
