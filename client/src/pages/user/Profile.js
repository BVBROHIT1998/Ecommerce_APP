import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import axios from "axios";
import { json, useNavigate } from "react-router-dom";

const Profile = () => {
  const [auth, setauth] = useAuth();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [address, setaddress] = useState("");
  const navigate = useNavigate();

  //Get user Data

  useEffect(() => {
    const { name, email, phone, address, password } = auth?.user;
    setname(name);
    setphone(phone);
    setemail(email);
    setaddress(address);
  }, [auth?.user]);

  //Form Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setauth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Succesfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Dashboard - Profile"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <h1>USER PROFILE</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setname(e.target.value)}
                    id="exampleInputname"
                    value={name}
                    placeholder="Enter Your Name"
                    
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    onChange={(e) => setemail(e.target.value)}
                    id="exampleInputemail"
                    value={email}
                    placeholder="Enter Your Email"
                    
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) => setpassword(e.target.value)}
                    id="exampleInputPassword1"
                    value={password}
                    placeholder="Enter Your Password"
                    
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setaddress(e.target.value)}
                    id="exampleInputaddress"
                    value={address}
                    placeholder="Enter Your Address"
                    
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setphone(e.target.value)}
                    id="exampleInputphone"
                    value={phone}
                    placeholder="Enter Your Phone"
                    
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
