import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile, logout } from "../../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

const EditProfile = ({ setOpen }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [img, setImg] = useState(null);
  const [imgUploadProgress, setImgUploadProgress] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uploadImg = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgUploadProgress(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.error("Error during upload:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            const updateProfile = await api.put(
              `/users/${currentUser._id}`,
              {
                profilePicture: downloadURL,
              },
              { withCredentials: true }
            );
            console.log(updateProfile);
            dispatch(changeProfile(downloadURL));
          } catch (error) {
            console.log("Error updating profile:", error);
          }
        });
      }
    );
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/users/delete/${currentUser._id}`, {
        withCredentials: true,
      });
      dispatch(logout());
      console.log("Account deletion request issued");
      navigate("/signin");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  useEffect(() => {
    if (img) uploadImg(img);
  }, [img]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[600px] h-[600px] bg-slate-200 rounded-lg p-8 flex flex-col gap-4 relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 cursor-pointer text-lg"
        >
          X
        </button>
        <h2 className="font-bold text-xl">Edit Profile</h2>
        <p>Choose a new profile picture</p>
        {imgUploadProgress > 0 ? (
          <p>Uploading {imgUploadProgress}%</p>
        ) : (
          <input
            type="file"
            className="bg-transparent border border-slate-500 rounded p-2"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <div className="mt-auto w-full">
          <Link to="/signin">
            <button
              className="bg-red-500 text-white py-2 w-full rounded-full"
              onClick={handleDelete}
            >
              Delete Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
