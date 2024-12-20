import axios from "axios";
import { useEffect } from "react";
import { BACKEND_URL } from "../config";
import { useState } from "react";


interface Blogs {
  "content": string;
  "title": string;
  "id": string;
  "author": {
      "name": string;
  }
}
export const useBlogs =() =>{
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blogs[]>([]);
 

  useEffect(()=>{
   axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
    headers:{
      Authorization:localStorage.getItem("token"),
    }
   })
   .then(response => {
    setBlogs(response.data.posts);
    setLoading(false);
   })
  },[])


  return {
    loading,
    blogs,
  }
}


export interface Blog {
  "content": string;
  "title": string;
  "id": string;
  "author": {
      "name": string;
  }
}
export const useBlog =({id} : { id:string}) =>{
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);
 

  useEffect(()=>{
   axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
    headers:{
      Authorization:localStorage.getItem("token"),
    }
   })
   .then(response => {
    setBlog(response.data.post);
    setLoading(false);
   })
  },[])


  return {
    loading,
    blog,
  }
}