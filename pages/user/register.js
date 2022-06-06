import axios from "axios"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { serverUrl } from "../../scripts/_setting"
/* eslint-disable */
export default function Register() {
    let router = useRouter()

    if(typeof(window) != "undefined"){
        localStorage.getItem("token") ? router.push("/") : false
    }

    const [newUserDetails,setNewUserDetails] = useState({
        firstName : "",
        lastName : "",
        username : "",
        password : "",
        email : ""
    })
    const [rePass , setRePass] = useState()
    const [sucNotice , setSucNotice] = useState(false)
    const [notice , setNotice]= useState({
        show : false,
        msg : "Some thing going wrong"
    })

    // function
    const checkRePass = ()=>{
        let oPass = newUserDetails.password
        if(rePass == oPass) return true
        return onNotice("\"Repeat Password\" must same as \"Password\"")
    }

    const onNotice=(msg)=>{
        setNotice({show : true , msg:msg})
    }

    const checkInFill = () =>{
        let {
            username,
            password,
            email,
            firstName,
            lastName
        } = newUserDetails
        if(!username || 
        !password || 
        !email || 
        !firstName|| 
        !lastName) return onNotice("Please fill all the from!")
        if(username.length <= 4) return onNotice("Username cant below then 4 character")
        if(password.length <= 4) return onNotice("Password cant below then 4 character")
        let regMail = new RegExp("@[a-z]{3,}[.]com$")
        if(!regMail.test(email)) return onNotice("Fail to match it is an Email")
        if(!checkRePass()) return
        Register()
    }
    const Register = async ()=>{
        await axios.post(serverUrl+"auth/register",newUserDetails)
        .then(res=>{
            if(res.status == 200) {
                setNotice({...notice , show:false})
                setSucNotice(true)
                setNewUserDetails({
                    firstName : "",
                    lastName : "",
                    username : "",
                    password : "",
                    email : ""
                }) & setRePass("")
                return true
            }
        })
        .catch(res => {
            if(res.response.status == 409){
                return onNotice("User already exists!")
            }
            if(res.response.status == 429){
                return onNotice("Email already over limit register! Please try another Email !")
            }
            return onNotice("Something going Wrong ! Please try again .")
        })
    }
    return(
        <>
            <Head>
                <title>Register</title>
            </Head>
            <div className="fixed bottom-4 left-4 z-50 alertBox">
                <div className={`alert alert-warning shadow-lg max-w-max pr-10 cursor-pointer ${notice.show ? "": "hidden"}`}
                onClick={e=>setNotice({...notice , show:false})} data-aos="zoom-in"
                >
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap=""cap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{notice.msg}</span>
                    </div>
                </div>

                {
                    sucNotice ? (
                        <>
                        <div className="alert alert-success shadow-lg  max-w-max pr-10 mt-2" data-aos="zoom-in">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Success Created Account!</span>
                    </div>
                </div>

                <Link href={"/user/login"}>
                    <div className="alert alert-success shadow-lg cursor-pointer max-w-max pr-10 mt-2" data-aos="zoom-in">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Click on me go to Login Page</span>
                        </div>
                    </div>
                </Link>
                        </>
                    ): <></>
                }
            </div>
            

            <section className="flex justify-center items-center min-h-screen">
                <div className="card max-w-max bg-base-100 shadow-xl p-10 gap-y-4">
                    <h1 className="text-center px-10 font-bold text-5xl mb-6">Sign Up</h1>

                        <div className="form-control">
                            <label className="input-group ">
                                <span>Name</span>
                                <div className="flex">
                                <input type="text" placeholder="First Name" className="input input-bordered" onChange={e=> {
                                    setNewUserDetails({...newUserDetails , firstName : e.target.value})
                                }} 
                                value={newUserDetails.firstName}
                                />
                                <input type="text" placeholder="Last Name" className="input input-bordered" onChange={e=> {
                                    setNewUserDetails({...newUserDetails , lastName : e.target.value})
                                }} 
                                value={newUserDetails.lastName}
                                /></div>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="input-group input-group-vertical">
                                <span className="">Username</span>
                                <input type="text" placeholder="johndoe123" className="input input-bordered" onChange={e=> {
                                    setNewUserDetails({...newUserDetails , username : e.target.value})
                                }} 
                                value={newUserDetails.username}
                                />
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="input-group input-group-vertical">
                                <span className="">Email</span>
                                <input type="text" placeholder="johndoe123@gmail.com" className="input input-bordered" 
                                onChange={e=> {
                                    setNewUserDetails({...newUserDetails , email : e.target.value})
                                }} 
                                value={newUserDetails.email}
                                />
                            </label>
                        </div>
                        
                        <div className="form-control">
                            <label className="input-group input-group-vertical ">
                                <span>Password</span>
                                <input type="password" placeholder="Password" className="input input-bordered " 
                                onChange={e=> {
                                    setNewUserDetails({...newUserDetails , password : e.target.value})
                                }}
                                value={newUserDetails.password}
                                />
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="input-group input-group-vertical ">
                                <span>Repeat Password</span>
                                <input type="password" placeholder="Repeat Password" className="input input-bordered" 
                                onBlur={checkRePass}
                                onChange={e=> {setRePass(e.target.value)}}
                                value={rePass}
                                />
                            </label>
                        </div>


                        <p className="text-sm text-gray-500">Already have an account ? <Link href="/user/login" ><span className="text-blue-700 font-semibold cursor-pointer">Click Here</span></Link></p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary px-14 " onClick={checkInFill}>Register</button>
                        </div>
                </div>
            </section>
        </>
    )
}