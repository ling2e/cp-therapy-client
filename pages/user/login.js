import Head from "next/head"
import Link from "next/link"
import { useState} from "react"
import { useRouter } from "next/router"
import axios from "axios"

import { serverUrl } from "../../public/scripts/_setting"

export default function Login() {
    const router = useRouter()
    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")
    const [wrongPass , setWrongPass] = useState(false)
    const [userFound , setUserFound] = useState(true)
    const [isLoading, setLoading] = useState(false)

    if(typeof(window) != "undefined"){
        if(localStorage.getItem("token")) router.push("/")
    }
    const Login = async () =>{
        setLoading(true);setWrongPass(false)
        await axios.post(serverUrl+"auth/login",{
            username,
            password
        }).then(msg=>{
            let user = msg.data
            
            if(user.wrongPass) return setWrongPass(true)
            localStorage.setItem("token",user["accessToken"])
            router.reload()
            setLoading(false)
        })
        .catch(res=>{
            setLoading(false)
            if(res.response.status == 404) return setUserFound(false)
            return setWrongPass(true)
        }
        )
    }

    return(
        <>
            <Head>
                <title>Login</title>
            </Head>
            <div className="fixed bottom-4 left-4 z-50 alertBox">
                {wrongPass ? (
                    <>
                        <div className={`alert alert-error shadow-lg max-w-max px-10 cursor-pointer`} onClick={e=>setWrongPass(!wrongPass)} data-aos="zoom-in">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap=""cap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>Wrong Username or Password</span>
                            </div>
                        </div>
                    </>
                ):<></>}

                {userFound ? (
                   <></>
                ): <>
                    <div className={`alert alert-error shadow-lg max-w-max px-10 cursor-pointer`} onClick={e=>setUserFound(!userFound)} data-aos="zoom-in">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap=""cap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>User Undefine</span>
                        </div>
                    </div>
                </>}
            </div>
            
            <section className="flex justify-center items-center min-h-screen">
                <div className="card w-96 bg-base-100 shadow-xl p-10 gap-y-4">
                    <h1 className="text-center px-10 font-bold text-5xl mb-6">Login</h1>
                        <div className="form-control">
                            <label className="input-group input-group-vertical">
                                <span className="">Username</span>
                                <input 
                                    type="text" 
                                    placeholder="johndoe123" 
                                    className="input input-bordered" 
                                    name="username"
                                    onChange={e=> setUsername(e.target.value)}
                                />
                            </label>
                        </div>
                        
                        <div className="form-control">
                            <label className="input-group input-group-vertical ">
                                <span>Password</span>
                                <input type="password" placeholder="Password" className="input input-bordered " name="password" onChange={e=> setPassword(e.target.value)}/>
                            </label>
                        </div>
                        <div className="card-actions ">
                            {!isLoading ? 
                            (<button className="btn btn-primary block w-full " onClick={Login}>Login</button>) : 
                            (<button className="btn btn-primary px-14 loading block w-full" disabled></button>)}
                        </div>
                        <div className="divider m-0"></div> 
                        <div className="card-actions gap-0">
                            <p className="text-sm text-gray-500">Don&apos;t have account ? </p>
                            <Link href="/user/register" ><button className="btn block w-full ">Register</button></Link>
                        </div>
                </div>
            </section>
        </>
    )
}