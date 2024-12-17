import { Avatar } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";


const AppBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };
  return (
    <div className="flex justify-between px-10 py-4 border-b  items-center">
             <div className="cursor-pointer" onClick={()=>navigate('/blogs')}>
              Medium
             </div>
             
             <div>
             <button onClick={handleLogout} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-1 text-center me-2 mb-2 ">Logout</button>
             <Link to={'/publish'}>
             <button type="button" className=" ubuntu-medium bg-green-400 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-1 text-center me-2 mb-2 mr-4">New Blog</button>
             </Link>
              <Avatar size={"big"}  name="Ajinkya"/>
             </div>
    </div>
  )
}

export default AppBar;