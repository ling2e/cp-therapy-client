import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { serverUrl } from "../../scripts/_setting"
/* eslint-disable */
export default function({data,onClick}) {
    const router =useRouter()
    const [updateData , setUpdateData] = useState({
        title : data.title,
        description : data.description
    })

    const doUpdate = ()=>{
        if(!updateData.title || !updateData.description) return console.log("got empty");
        axios.put(serverUrl+"videos/"+data._id,updateData)
            .then(res=> {if(res.status == 200) {return router.reload()}})
            .catch(err=>console.log(err))
    }

    return (<>
        <h4>Title</h4>
        <input type="text" className="font-bold text-2xl w-full rounded-md p-2"
            onChange={e=>setUpdateData({...updateData , title : e.target.value})}
            value={updateData.title}
        />
        <div className="divider"></div>
        <p>Description</p>
        <textarea className={"w-full rounded-md p-2 min-h-16"}
            onChange={e=>setUpdateData({...updateData , description : e.target.value})}
            value={updateData.description}
        ></textarea>

        <div className="divider w-full"></div>
        <div className="flex justify-end gap-8 w-full">
            <input type="button" className="btn btn-error" value={"Cancel"} onClick={onClick}/>
            <input type="button" className="btn btn-success" value={"Done"} onClick={doUpdate} />
        </div>
    </>)
}