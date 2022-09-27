import axios from "axios"
import { useState } from "react"
import { serverUrl ,server} from "../../public/scripts/_setting"
import { useRouter } from "next/router";
import Alert from "../Alert";


export default function EditAvatar({data}){

    const [hvChange , setHvChange] = useState(false)
    const [avatarSrc , setAvatarSrc] = useState(data.avatar)
    const router = useRouter()
    const [alert, setAlert] =useState({show:false,type:"success",desc:"Ok"}) 
    const [isLoading , setLoading] = useState(false)

    const avatarPreShow = (e) =>{
        let inp_data = document.getElementById("inp_userAvatar")
        let newAvatarType = inp_data.files[0]?.type.toString().replace("image/","")
        let avatarTypeSup = ["jpeg","png"]
        if(!avatarTypeSup.includes(newAvatarType)) return setAlert({...alert , show:true , type:"Warning",desc:"Image Type is Not support!"})


        const reader = new FileReader()
        let oImgs = document.querySelectorAll(".img_userAvatar")
        reader.onload = ()=>{
            const img = new Image()
            img.src = reader.result
            let newSrc = img.getAttribute("src")
            setAvatarSrc(newSrc)
            setHvChange(true)
        }
        reader.readAsDataURL(e.files[0])
    }
    const btnSave = () =>{
        setLoading(true)
        let inp_data = document.getElementById("inp_userAvatar")
        let newAvatar = inp_data.files[0]
        axios.put(serverUrl+"profile/avatar/"+data._id,{files : newAvatar},{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
            .then(res =>{
                if(res.status == 200) {
                    if(localStorage != "undefined"){
                        localStorage.setItem("token",res.data.accessToken)
                        router.reload()
                    }
                }
                setLoading(false)
            })
            .catch(err=>{
                setLoading(false)
                setAlert({...alert , show:true , type:"error",desc:"Something wrong !"})
            })
    }
    return(<>
        {alert.show? (<Alert type={alert.type} onClick={e=>setAlert({...alert , show:false})}>{alert.desc}</Alert>):""}

        <form action="" method="post" id="formUserAvatar" className="w-full flex gap-x-8 justify-between flex-wrap">
                <div className="w-full flex justify-end gap-x-4 ">
                {hvChange ? (<>
                    <input type="button" className="btn btn-warning" value={"Cancel"} onClick={e=>router.reload()}/>
                    {!isLoading ? 
                        <input type="button" className="btn btn-primary" value={"Save"} onClick={e=>btnSave()}/>:
                        <input type="button" className="btn btn-primary" value={"Saving..."} disabled/>
                    }
                    </>):
                    (<>
                    <input type="button" className="btn btn-warning" value={"Cancel"} disabled/>
                    <input type="button" className="btn btn-primary" value={"Save"} disabled/>
                    </>)
                    }
                </div>
            
            <div className="divider w-full mb-4"></div>
            <div className="w-full flex gap-5 justify-center">
                <div className="avatar w-3/5 flex-wrap gap-y-3">
                    <div className="w-full mask mask-hexagon " >
                        <img src={avatarSrc} className="img_userAvatar"/>
                    </div>
                </div>
                <div className="grid grid-cols-1 justify-center gap-y-3">
                    <div className="w-full ">
                        <label htmlFor="inp_userAvatar" className="px-4 py-2 cursor-pointer border-4 border-primary rounded-lg text-primary font-bold">Upload Avatar</label>
                        <input type="file" name="userAvatar" id="inp_userAvatar" className="hidden" onChange={e=>avatarPreShow(e.target)}/>
                    </div>
                    <div className="flex justify-center w-full">
                        <div className="avatar w-40 ">
                            <div className="w-full mask mask-hexagon " >
                                <img src={avatarSrc} className="img_userAvatar"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center w-full">
                        <div className="avatar w-28 ">
                            <div className="w-full mask mask-hexagon " >
                                <img src={avatarSrc} className="img_userAvatar"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center w-full">
                        <div className="avatar w-20 ">
                            <div className="w-full mask mask-hexagon " >
                                <img src={avatarSrc} className="img_userAvatar"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </>)
}