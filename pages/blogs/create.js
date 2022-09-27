

import React, { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'

import Custom404 from '../_error'
import { useUserContext } from '../../public/scripts/Provider/UserProvider'
import { useRouter } from 'next/router'
import Alert from '../../components/Alert'
import { serverUrl } from '../../public/scripts/_setting'
import Header from '../../components/Header'
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


export default function Create() {
  const userCxt = useUserContext()
  const router = useRouter()
  
  const [newPost , setNewPost] = useState({
    title: "",
    description : ""
  })
  const [alertBox , setAlertBox] = useState({
    show: false,
    val : "",
    type : "",
  })

  const createPost = () =>{
    if(!newPost.title || !newPost.description){return setAlertBox({show:true , val : "Please fill up all the form!",type:"error"})}

    let newPostData = ({...newPost,user:userCxt})
    
    axios.post(serverUrl+"blogs/create",newPostData)
    .then(res => {
      if(res.status == 200) {
        setAlertBox({show:true , val : "Post Created!"})
        router.push("/blogs/"+res.data)
      }
    })
    .catch(e=>setAlertBox({show:true , val : "Something going wrong",type:"error"}))
  }
  if(!userCxt) return( <Custom404></Custom404>)
  return (
    <>
      <Head>
        <title>Create Post</title>
        <link rel="stylesheet" href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css" />
        <link rel="stylesheet" href="/_assets/css/blogs-create.css" />
      </Head>
      <Header backgroundPosition="center 20%">
      </Header>
      {alertBox.show ? (<Alert type={alertBox.type} onClick={e=>setAlertBox({...alertBox , show:false})}>{alertBox.val}</Alert>) :""}

      <div className="min-h-screen py-10">
          <div className="container mx-auto">
              <header className='flex items-center px-4 flex-wrap '>
                <h3 className='text-gray-700 text-xl font-semibold w-full capitalize  mb-1'>Title</h3>
                <input type="text" className='w-full text-2xl px-3 py-2 capitalize' onChange={e=>setNewPost({...newPost , title:e.target.value})} value={newPost.title} />
              </header>
              <div className='divider'></div>
              <section className='flex px-4 flex-wrap '>
                <h3 className='text-gray-700 text-xl font-semibold w-full capitalize mb-1'>Description</h3>

                {/* <textarea name="" id=""  rows="10" className='w-full min-h-16 p-3 text-gray-700 rounded-lg'
                onChange={e=>setNewPost({...newPost , description:e.target.value})} value={newPost.description}
                ></textarea> */}

                <ReactQuill 
                  theme="snow" 
                  className='w-full h-full text-gray-700 border-0 bg-white' 
                  value={newPost.description} 
                  onChange={e=>setNewPost({...newPost , description:e})} 
                />

              </section>
              <div className='mt-14 mx-6 float-right flex gap-x-3'>
              <input type="submit" className='btn btn-error' value={"Cancel"} onClick={()=>router.back()}/>
              <input type="submit" className='btn btn-primary' value={"Post"} onClick={e=>createPost()} />
              </div>
          </div>
      </div>
    </>
  )
}
