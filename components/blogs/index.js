import Link from "next/link"
export const Item = ({
    data,
    children
}) => {
    return (<>
        <Link href={"/blogs/"+data._id} >
            <div className="card bg-base-100 shadow-xl cursor-pointer">
                <div className="card-body">
                    <h2 className="card-title">{data.title}</h2>
                    <p className="truncate text-gray-800">{data.description}</p>
                    <div className="divider"></div>
                    <div className="card-actions justify-between items-end">
                        <p className="text-sm text-gray-500">By {data.author}</p>
                        <div className="flex flex-nowrap gap-4 z-50">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    </>)
}