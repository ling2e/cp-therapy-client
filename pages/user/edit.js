/* eslint-disable */
import Head from "next/head";
import { useState } from "react";


import { useUserContext } from "../../scripts/Provider/UserProvider";
import Loading from "../../components/Loading";
import Custom404 from "../_error";
import axios from "axios";
import { serverUrl } from "../../scripts/_setting";
import { useRouter } from "next/router";
import EditAvatar from "../../components/Profile/EditAvatar";
import EditInfo from "../../components/Profile/EditInfo";
import EditPassword from "../../components/Profile/EditPassword";


export default ()=>{
    const userCxt = useUserContext()
    const router = useRouter()
    const [onLoading , setLoading] = useState(true)
    const [profile,setProfile] = useState()
    const [currentPage,setCurrentPage] =useState(0)

    setInterval(()=>{
        if(!userCxt) setLoading(false)
    },3000)

    if(onLoading && !profile && userCxt){
            axios.post(serverUrl+"user/profile",userCxt)
                .then(res=>{
                    if(res.status == 200){
                        setProfile(res.data)
                    }
                    setLoading(false)
                })
                .catch(err=>setLoading(false))
    }
    
    if(!onLoading && userCxt && profile) return(<>
        <Head><title>Profile Edit</title></Head>

        <section className="container mx-auto min-h-screen flex items-center">
            <article className="flex justify-center w-full">
                <nav className="w-1/6 border-r-8 border-primary py-2 max-h-max">
                    <ul className=" text-sm font-semibold uppercase ">
                        <li className="py-4 px-6 cursor-pointer my-2" onClick={e=>setCurrentPage(0)}>Avatar</li>
                        <li className="py-4 px-6 cursor-pointer my-2" onClick={e=>setCurrentPage(1)}>Information</li>
                        <li className="py-4 px-6 cursor-pointer my-2" onClick={e=>setCurrentPage(2)}>Password</li>
                    </ul>
                </nav>
                <article className="w-7/12 px-6">
                    {currentPage == 0 ? (<>
                        <EditAvatar data={profile}/>
                    </>):""}
                    {currentPage == 1 ? (<>
                        <EditInfo data={profile}/>
                    </>):""}
                    {currentPage == 2 ? (<>
                        <EditPassword userId={profile._id}/>
                    </>):""}
                
                </article>
            </article>
        </section>
    </>)

    if(onLoading)return(<Loading />)
    return(<Custom404/>)
};