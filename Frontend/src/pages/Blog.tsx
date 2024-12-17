import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import FullBlog from "../components/FullBlog";
import AppBar from "../components/AppBar";


const Blog = () => {
  const { id } = useParams();
  const {loading,blog} = useBlog({id : id || ""});
  if(loading){
    return (
      <div>
           <AppBar/>
         <div className="flex justify-center mt-[10vh]">
         <div className="w-[50vw] mr-10">
        <div className="h-5 bg-gray-200 rounded-full w-48 mb-4"></div>
        <div className="h-3 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full max-w-[460px] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full max-w-[360px]"></div>
    </div>
    <div className="flex items-center mt-4">
       <svg className="w-14 h-14 me-3 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
        <div>
            <div className="h-5 bg-gray-200 rounded-full  w-32 mb-2"></div>
            <div className="w-48 h-3 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="w-48 h-3 bg-gray-200 rounded-full mb-2.5 "></div>
            <div className="w-48 h-3 bg-gray-200 rounded-full mb-2.5"></div>
        </div>
    </div>
          </div>

          
      </div>
      )
  }
  return (
    <div>
      <FullBlog blog={blog}/>
    </div>
  )
}

export default Blog