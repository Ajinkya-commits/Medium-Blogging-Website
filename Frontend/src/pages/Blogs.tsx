import AppBar from "../components/AppBar"
import BlogCard from "../components/BlogCard"
import { useBlogs } from "../hooks"
import BlogSkeleton from "../components/BlogSkeleton"

const Blogs = () => {

  const{loading,blogs} = useBlogs();
  if(loading){
    return (
    
    <div>
           <AppBar/>
         <div className="flex justify-center">
           <div>
           <BlogSkeleton/>
           <BlogSkeleton/>
           <BlogSkeleton/>
           <BlogSkeleton/>
           <BlogSkeleton/>
           </div>
          </div>
      </div>
        
   
    )
  }
  return (
   <div>
    <AppBar/>
    <div>
      {blogs.map((blog,index) =><BlogCard key={index} 
      id={blog.id}
      authorName={blog.author.name || "Anonymous"} 
      title={blog.title}
      content = {blog.content}
      publishedDate={"11 Dec 2024"}    
          /> )}
    </div>
  </div>
  
  )
}

export default Blogs