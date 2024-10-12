import React, { useState } from "react";
import TimelineTweet from "../TimelineTweet/TimelineTweet";
import { useSelector } from "react-redux";
import api from "../../api/axios";

const MainTweet = () => {
  const [tweetText, setTweetText] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Handle Submit Initialized");
    try {
      console.log("Trying to submit");
      console.log(currentUser._id);
      console.log(tweetText);
      await api.post("/tweets", {
        userID: currentUser._id,
        description: tweetText,
      });
      console.log("Tweet Submitted");
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main-content-area">
      {currentUser && (
        <p className="font-bold pl-2 my-2">{currentUser.username}</p>
      )}

      <form className="border-b-2 pb-6" onSubmit={handleSubmit}>
        <textarea
          onChange={(e) => setTweetText(e.target.value)}
          value={tweetText}
          placeholder="What's happening"
          maxLength={280}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto mt-2"
        >
          Tweet
        </button>
      </form>
      <TimelineTweet />
    </div>
  );
};

export default MainTweet;
