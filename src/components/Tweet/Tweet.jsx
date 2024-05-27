import React, { useState, useEffect } from "react";
import axios from "axios";
import formatDistance from "date-fns/formatDistance";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditTweet from "../EditTweet/EditTweet";

const Tweet = ({ tweet, setData }) => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);
  const dateStr = formatDistance(new Date(tweet.createdAt), new Date());
  const location = useLocation().pathname;
  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users/find/${tweet.userID}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [tweet.userID]);

  const handleLike = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/tweets/${tweet._id}/like`, { id: currentUser._id });

      let newData;
      if (location.includes("profile")) {
        newData = await axios.get(`/tweets/user/all/${id}`);
      } else if (location.includes("explore")) {
        newData = await axios.get(`/tweets/explore`);
      } else {
        newData = await axios.get(`/tweets/timeline/${currentUser._id}`);
      }
      setData(newData.data);
    } catch (error) {
      console.error("Error liking tweet:", error);
    }
  };

  if (!userData) return null;

  return (
    <>
      <div className="tweet p-4 border-b border-gray-300">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <Link to={`/profile/${userData._id}`}>
              <h3 className="font-bold">{userData.username}</h3>
            </Link>
            <span className="font-normal">@{userData.username}</span>
            <p className="text-gray-500"> - {dateStr}</p>
          </div>
          <MoreVertIcon
            className="cursor-pointer ml-auto"
            onClick={() => setOpen(true)}
          />
        </div>
        <p className="mt-2">{tweet.description}</p>
        <button
          onClick={handleLike}
          className="flex items-center space-x-1 mt-2"
        >
          {tweet.likes.includes(currentUser._id) ? (
            <FavoriteIcon className="cursor-pointer" />
          ) : (
            <FavoriteBorderIcon className="cursor-pointer" />
          )}
          <span>{tweet.likes.length}</span>
        </button>
      </div>
      {open && (
        <EditTweet
          setOpen={setOpen}
          tweetUserId={tweet.userID}
          tweetId={tweet._id}
          setData={setData}
        />
      )}
    </>
  );
};

export default Tweet;
