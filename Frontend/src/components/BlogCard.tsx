import { Link } from "react-router-dom";

interface BlogCardProps{
  id:string,
  authorName:string,
  title : string,
  content : string,
  publishedDate :  string,
}

const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate
} : BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
    <div className="flex justify-center mt-5">
    <div className=" pb-4 w-[80vw] lg:max-w-xl">
      <div className="flex">
        <div className="flex justify-center flex-col">
           <Avatar size={"small"} name={authorName}/>
        </div> 
        <div className="font-extralight pl-2">
          {authorName}
        </div>
         <div className="pl-2 font-thin text-slate-500" >
            {publishedDate}
         </div>
      </div>

      <div className="text-2xl poppins-semibold pt-1 break-words">
        {title}
      </div>

      <div className="text-sm ubuntu-medium  break-words">
        {content.slice(0,200) + "...."}
      </div>

      <div className="text-slate-500 text-sm pt-3">
        {`${Math.ceil(content.length / 100)} minute(s) read`}
      </div> 
      <div className="h-[1px] bg-slate-200"></div>
  </div>
  </div>    
  </Link>
  )
}

export default BlogCard;


export function Avatar({name,size="small"} : {name : string , size : "small" | "big"} ){
 return <div className={` ${size === "small" ? "w-6 h-6" : "w-8 h-8"} relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
  <span className={` ${size === "small" ? "text-xs" : "text-base"} font-medium text-gray-600 dark:text-gray-300`}>{name[0]}</span>
</div>
}