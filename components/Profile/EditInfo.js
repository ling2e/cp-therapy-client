import axios from "axios"
import { useRouter } from "next/router"
import {useState} from "react"
import { serverUrl } from "../../public/scripts/_setting"

import Alert from "../Alert";
export default function EditInfo({data}){
    const router = useRouter()
    const [newInfo, setInfo] = useState({
        username : data.username,
        email : data.email
    })
    const [isLoading , setLoading] = useState(false)
const [alert, setAlert] =useState({show:false,type:"success",desc:"Ok"}) 
    const doUpdate =() =>{
        setLoading(true)
        if(!newInfo.email || !newInfo.username) return ("Empty")

        axios.put(serverUrl+"profile/"+data._id,newInfo)
            .then(res=>{
                if(res.status == 200){
                    if(localStorage != "undefined"){
                        localStorage.setItem("token",res.data.accessToken)
                        router.reload()
                    }
                }
                setLoading(false)
            })
            .catch(err=>{
                if(err.response.status == 409) return setAlert({...alert , show:true , type:"error",desc:"Username already exits!"})
                setLoading(false)
                
                setAlert({...alert , show:true , type:"error",desc:"Something Wrong!"})
            })
    }
    return(<>
        {alert.show? (<Alert type={alert.type} onClick={e=>setAlert({...alert , show:false})}>{alert.desc}</Alert>):""}

        <div className="w-full py-6">
            <label className="capitalize text-xl font-semibold" htmlFor="username">username</label>
            <input type="text" id="username" className="w-full rounded-lg p-2 text-lg" value={newInfo.username} onChange={e=>setInfo({...newInfo, username : e.target.value})} />

            <label className="capitalize text-xl font-semibold" htmlFor="email">email</label>
            <input type="text" id="email" className="w-full rounded-lg p-2 text-lg" value={newInfo.email} onChange={e=>setInfo({...newInfo, email : e.target.value})} />
            <div className="divider"></div>
            <div className="flex gap-x-4 justify-end">
                <input type="button" value="Cancel" className="btn btn-warning" onClick={e=>router.reload()}/>
                {!isLoading ? 
                <input type="button" value="Save" className="btn btn-success" onClick={e=>{doUpdate()}}/>     : 
                <input type="button" value="Saving..." className="btn btn-success" disabled />    
                }
            </div>
        </div>
    </>)
}