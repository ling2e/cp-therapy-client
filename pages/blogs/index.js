import Head from "next/head"
import Link from "next/link"


import Header from "../../components/Header"
import { useUserContext } from "../../public/scripts/Provider/UserProvider"
import { Item } from "../../components/blogs"
import { serverUrl } from "../../public/scripts/_setting"

export const getServerSideProps = async ()=>{
    const res = await fetch(serverUrl+"blogs");
    const blogs = await res.json()
    return ({
        props : {
             blogs
        }
    })
}

export default function Blog({blogs}) {
    const userCxt = useUserContext()
    return(
        <>
            <Head >
                <title>Blog</title>
            </Head>
            <div className="min-h-screen">
                <Header backgroundPosition="center 20%">
                    <p className="text-5xl font-bold">Blog</p>
                </Header>

                <div className="container mx-auto py-4">
                    {userCxt ? (<nav className="mb-4"><Link href="/blogs/create"><a className="btn btn-primary">Create</a></Link></nav>): ""}
                    {Object.keys(blogs).length  ? (<>
                        <div className="w-full grid justify-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {blogs.map(blog => {
                                return (
                                    <Item data={blog} key={blog._id}></Item>
                                )
                            })}
                        </div>
                    </>): (
                        <div className="alert alert-info shadow-lg" data-aos="zoom-in">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>There is no any Post yet !</span>
                            </div>
                        </div>
                    )}
                    
                </div>
            </div>
                        
        </>
    )
}