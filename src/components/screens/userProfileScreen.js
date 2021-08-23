import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { detailsUser, updateUserProfile } from "../actions/useraction";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";

function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const {success: successUpdate, error: errorUpdate, loading: loadingUpdate} = userUpdateProfile

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
    dispatch({type: USER_UPDATE_PROFILE_RESET});
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if( password !== confirmPassword){
        alert ('Password and Confirm password are not matched');
    } else {
        dispatch(updateUserProfile({userId: user._id, name, email, password}))
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler} className="form">
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
            {successUpdate && <MessageBox variant = "success">Profile Updated Successufully</MessageBox>}
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="comfirmpassword">comfirm password</label>
              <input
                id="comfirmpassword"
                type="password"
                placeholder="Enter comfirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Update Profile
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default ProfileScreen;
