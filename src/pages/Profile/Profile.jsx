import React, { useState, useEffect } from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import api from "../../api/axios";
import Tweet from "../../components/Tweet/Tweet";
import EditProfile from "../../components/EditProfile/EditProfile";
import { following } from "../../redux/userSlice";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [userTweets, setUserTweets] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Finding user for Profile Component");
        const [userTweetsResponse, userProfileResponse] = await Promise.all([
          api.get(`/tweets/user/all/${id}`),
          api.get(`/users/find/${id}`),
        ]);
        setUserTweets(userTweetsResponse.data);
        setUserProfile(userProfileResponse.data);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchData();
  }, [currentUser, id]);

  const handleFollow = async () => {
    const isFollowing = currentUser.following.some(
      (followingArray) => followingArray[0] === id
    );
    try {
      if (isFollowing) {
        await api.put(`/users/unfollow/${id}`, { id: currentUser._id });
        console.log("Unfollow");
      } else {
        await api.put(`/users/follow/${id}`, { id: currentUser._id });
        console.log("Follow");
      }
      dispatch(following(id));
    } catch (err) {
      console.log(`${isFollowing ? "Unfollow" : "Follow"} Error:`, err);
    }
  };

  const renderFollowButton = () => {
    if (currentUser._id === id) {
      return (
        <button
          className="px-4 py-2 bg-blue-500 rounded-full text-white"
          onClick={() => setOpen(true)}
        >
          Edit Profile
        </button>
      );
    }
    const isFollowing = currentUser.following.some(
      (followingArray) => followingArray[0] === id
    );
    return (
      <button
        className="px-4 py-2 bg-blue-500 rounded-full text-white"
        onClick={handleFollow}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="px-6">
          <LeftSidebar />
        </div>
        <div className="col-span-2 px-6 border-x-2 border-t-slate-800">
          <div className="flex justify-between items-center">
            <img
              src={userProfile?.profilePicture}
              alt="Profile Picture"
              className="w-16 h-16"
            />
            {renderFollowButton()}
          </div>
          <div className="mt-6">
            {userTweets &&
              userTweets.map((tweet) => (
                <div className="p-2" key={tweet._id}>
                  <Tweet tweet={tweet} setData={setUserTweets} />
                </div>
              ))}
          </div>
        </div>
        <div className="px-6">
          <RightSidebar />
        </div>
      </div>
      {open && <EditProfile setOpen={setOpen} />}
    </>
  );
};

export default Profile;
