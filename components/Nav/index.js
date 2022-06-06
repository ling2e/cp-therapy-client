import Link from "next/link"
import {useState,useEffect} from "react"
import {useRouter} from "next/router"
/* eslint-disable */
import { useUserContext } from "../../scripts/Provider/UserProvider"
import { serverUrl } from "../../scripts/_setting"

const Nav = () => {
  const router = useRouter()
  const userContext = useUserContext()
  
  const Logout = ()=>{
    localStorage.removeItem("token")
    router.reload()
  }

  return (
    <>
      <div className="navbar bg-neutral text-neutral-content sticky top-0 z-50">
        <div className="container mx-auto">
          <div className="flex-1">
            <Link href="/">
              <a className="btn btn-ghost normal-case text-xl"><span className="mr-2"><img src={"/_assets/image/favicon.png"} className="w-10 rounded-full"></img></span><span className="sm:block hidden">CP Therapy</span></a>
            </Link>
          </div> 
          <div className="flex-none"> 
              <ul className="menu menu-horizontal p-0 gap-3">
                <li><Link href={"/"}>Home</Link></li>
                <li tabIndex="0">
                    <a>
                    Therapy
                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                    </a>
                    <ul className="p-2 bg-neutral-focus z-40">
                    <li><Link href={"/videos"}><a>Video</a></Link></li>
                    <li><button disabled="disabled">Coming Soon</button></li>
                    </ul>
                </li>
              <li><Link href={"/blogs"}>Blog</Link></li>
              {userContext ? (
                
                <div className="avatar ml-4 dropdown dropdown-end dropdown-hover">
                  <div className="w-12 mask mask-hexagon cursor-pointer" tabIndex="0">
                  
                    <img src={serverUrl+userContext.userAvatar} />
                  </div>
                    <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-gray-600 flex-wrap">
                      <li className="block w-full">
                        <Link href={"/user/"+userContext.username}><a>Profile</a></Link>
                      </li>
                      <li className="block w-full">
                        <Link href={"/user/edit"}><a>Settings</a></Link>
                      </li>
                      <li className=" block w-full" onClick={Logout}><a className="text-error font-bold">Logout</a></li>
                    </ul>
                </div>
                ):
                (<li><Link href={"/user/login"}>Login/Register</Link></li>)
                }
              
              
                
              </ul>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Nav