import { Blog } from "../hooks"
import AppBar from "./AppBar"
import { Avatar } from "./BlogCard"

const FullBlog = ({blog} : {blog : Blog}) => {
  return (
    <div>
      <AppBar/>
      <div className="lg:px-20 px-5">
    <div className="grid grid-cols-12 py-5">
      <div className="col-span-8">
        <div className="text-4xl poppins-bold break-words">{blog.title}
          </div>
          <div className="text-slate-500 pt-2">
            Post on 2nd December 2024
          </div>
          <div className="break-words pt-2">
            {blog.content}
          </div>
      </div>
      <div className="pl-4 md:px-10 col-span-4">
        Author
        <div className="flex pt-2">
            <div className="pr-2"><Avatar name={blog.author.name || "Anonymous"} size={"big"}/></div>
              <div className="text-xl poppins-bold">
               {blog.author.name || "Anonymous"}
              </div>
        </div>
        <div className="pt-2 text-slate-600">
                "The author is a technology enthusiast and  researcher with a deep interest in applying machine learning and image analytics to real-world environmental challenges. "
              </div>
       </div>
      </div>
     </div>
    </div>
  )
}

export default FullBlog