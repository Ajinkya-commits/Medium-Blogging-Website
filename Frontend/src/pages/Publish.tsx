import axios from "axios";
import AppBar from "../components/AppBar";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  return (
    <div>
      <AppBar />
      <div className="flex justify-center pt-5 px-10 lg:px-0">
        <div className="max-w-screen-lg w-full">
          <input
            onChange={(e) => {
              settitle(e.target.value);
            }}
            type="text"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
            placeholder="Title"
          />
        </div>
      </div>
      <div className="flex justify-center pt-4 px-10 lg:px-0">
        <div className="max-w-screen-lg w-full">
          <form>
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="px-1 py-2 bg-white rounded-lg">
                <textarea
                  onChange={(e) => {
                    setcontent(e.target.value);
                  }}
                  className="w-full focus:outline-none h-32 px-0 text-sm bg-white border-none"
                  placeholder="Write the content..."
                  required
                ></textarea>
              </div>
            </div>
            <div className="flex justify-start">
              <button
                onClick={async () => {
                  setLoading(true); 
                  try {
                    const response = await axios.post(
                      `${BACKEND_URL}/api/v1/blog`,
                      {
                        title,
                        content: content,
                      },
                      {
                        headers: {
                          Authorization: localStorage.getItem("token"),
                        },
                      }
                    );
                    console.log(response.data);
                    navigate(`/blog/${response.data.id}`);
                  } catch (error) {
                    console.error("Error publishing blog:", error);
                  } finally {
                    setLoading(false); 
                  }
                }}
                type="button"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                disabled={loading} 
              >
                {loading ? "Publishing..." : "Publish"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Publish;
