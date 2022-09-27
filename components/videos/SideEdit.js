import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { serverUrl } from "../../public/scripts/_setting"

import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function SideEdit({data,onClick}) {
    const router =useRouter()
    const [isLoading , setLoading] = useState(false)
    const [updateData , setUpdateData] = useState({
        title : data.title,
        description : data.description
    })

    const doUpdate = ()=>{
        setLoading(true)
        if(!updateData.title || !updateData.description) return console.log("got empty");
        axios.put(serverUrl+"videos/"+data._id,updateData)
            .then(res=> {if(res.status == 200) {return router.reload()}})
            .catch(err=>console.log(err))
        setLoading(false)
        
    }

    return (<>
    
        <link href="//cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet"></link>
        <link rel="stylesheet" href="/_assets/css/videos-upload.css" />
        <h4>Title</h4>
        <input type="text" className="font-bold text-2xl w-full rounded-md p-2"
            onChange={e=>setUpdateData({...updateData , title : e.target.value})}
            value={updateData.title}
        />
        <div className="divider"></div>
        <p>Description</p>

        {/* <textarea className={"w-full rounded-md p-2 min-h-16"}
            onChange={e=>setUpdateData({...updateData , description : e.target.value})}
            value={updateData.description}
        ></textarea> */}
        <ReactQuill 
            theme="bubble" 
            className='w-full text-gray-700 border-0 rounded-lg bg-white sideEdit' 
            value={updateData.description} 
            onChange={e=>setUpdateData({...updateData , description : e})}
        > 
        </ReactQuill>

        <div className="divider w-full"></div>
        <div className="flex justify-end gap-8 w-full">
            <input type="button" className="btn btn-error" value={"Cancel"} onClick={onClick}/>
            {!isLoading ? 
            <input type="button" className="btn btn-success" value={"Done"} onClick={doUpdate} />:
            <input type="button" className="btn btn-success" value={"Loading"} disabled />}
        </div>
    </>)
}