import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios"
import Link from "next/link"
import Head from "next/head"

import {serverUrl} from "../../../scripts/_setting"
import Loading from "../../../components/Loading"
import Custom404 from "../../_error"
import Header from "../../../components/Header"
import { useUserContext } from "../../../scripts/Provider/UserProvider";
import Alert from "../../../components/Alert";
/* eslint-disable */
export default ()=>{
    const router = useRouter()
    const id = router.query.id

    const [data ,setData] = useState()
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
                </Head>
                {alert.show? (<Alert type={alert.type} onClick={e=>setAlert({...alert , show:false})}>{alert.desc}</Alert>):""}
                <section className="min-h-screen">
                    <Header backgroundPosition="center 20%"></Header>
                    <article className="container mx-auto py-6 ">
                        <h2 className="capitalize text-3xl font-semibold">{data.title}</h2>
                        <div className="divider"></div>
                        <p className="text-gray-700 min-h-16">{data.description}</p>
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