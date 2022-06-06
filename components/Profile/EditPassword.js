import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import { serverUrl } from "../../scripts/_setting"
import Alert from "../Alert";
/* eslint-disable */
export default ({userId}) => {
    const router = useRouter()
    const [password,setPassword] = useState({
        oldPass :"",
        newPass : "",
        rePass : ""
    })
const [alert, setAlert] =useState({show:false,type:"success",desc:"Ok"}) 

    const doUpdate = ()=>{
        if(checkRepeatPass()) return setAlert({...alert , show:true , type:"warning",desc:"Password and Repeat Password is not same!"});
        axios.put(serverUrl+"profile/password/"+userId , password)
            .then(res =>{
                if(res.status == 204){
                    if(localStorage != "undefined"){
                        localStorage.removeItem("token")
                        router.reload()
                    }
                }
            })
            .catch(err=>{
                if(err.response.status == 403) return setAlert({...alert , show:true , type:"error",desc:"Old Password is not match!"})
                setAlert({...alert , show:true , type:"error",desc:"Something wrong!"})
            })
    }

    const checkRepeatPass = () =>{
        if(password.rePass != password.newPass) {
            return true
        }
        return false
    }
    return (<>
        {alert.show? (<Alert type={alert.type} onClick={e=>setAlert({...alert , show:false})}>{alert.desc}</Alert>):""}
        <div className="w-full py-6 grid gap-6">
            <div>
                <label className="capitalize text-xl font-semibold" htmlFor="oldPass">Old Password</label>
                <input type="password" id="oldPass" className="w-full rounded-lg p-2 text-lg" value={password.oldPass} onChange={e=>setPassword({...password, oldPass : e.target.value})} />
            </div>
            <div>
                <label className="capitalize text-xl font-semibold " htmlFor="newPass">new Password</label>
                <input type="password" id="newPass" className="w-full rounded-lg p-2 text-lg" value={password.newPass} onChange={e=>setPassword({...password, newPass : e.target.value})} />
            </div>
            <div>
                <label className="capitalize text-xl font-semibold " htmlFor="rePass">repeat new Password</label>
                <input type="password" id="rePass" className="w-full rounded-lg p-2 text-lg" 
                    value={password.rePass} onChange={e=>setPassword({...password, rePass : e.target.value})}
                />
            </div>


            <div className="divider"></div>
            <div className="flex gap-x-4 justify-end">
                <input type="button" value="Cancel" className="btn btn-warning" onClick={e=>router.reload()}/>
                <input type="button" value="Save" className="btn btn-success" onClick={e=>{doUpdate()}}/>    
            </div>
        </div>
    </>)
}