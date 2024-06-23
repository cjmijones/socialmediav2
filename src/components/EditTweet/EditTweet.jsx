import React from "react";
import api from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditTweet = ({ setOpen, tweetUserId, tweetId, setData }) => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation().pathname;

  const handleDelete = async () => {
    try {
      await api.delete(`/tweets/${currentUser._id}`, {
        data: { tweetId: tweetId },
      });
      setOpen(false);

      // Refresh the tweet list (Assuming setData updates the list of tweets)
      let newData;
      if (location.includes("profile")) {
        newData = await api.get(`/tweets/user/all/${id}`);
      } else if (location.includes("explore")) {
        newData = await api.get(`/tweets/explore`);
      } else {
        newData = await api.get(`/tweets/timeline/${currentUser._id}`);
      }
      setData(newData.data);
    } catch (error) {
      console.error("Error deleting tweet:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[600px] h-[600px] bg-slate-200 rounded-lg p-8 flex flex-col gap-4 relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 cursor-pointer text-lg"
        >
          X
        </button>
        <h2 className="font-bold text-xl">Edit Tweet</h2>

        {/* Additional edit functionalities can be added here */}

        {currentUser._id === tweetUserId && (
          <div className="mt-auto w-full">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 rounded-full mt-4 w-full"
            >
              Delete Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditTweet;
