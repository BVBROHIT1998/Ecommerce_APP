import { useState } from "react";
import React from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";



const ForgotPassword = () => {
  const [email, setemail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [question, setquestion] = useState("");
  
  const navigate = useNavigate();
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, newPassword, question }
      );
      if (res.data.success) {
        toast.success(res & res.data.message);
      
        
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="form-container">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              onChange={(e) => setemail(e.target.value)}
              id="exampleInputemail"
              value={email}
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setquestion(e.target.value)}
              id="exampleInputemail"
              value={question}
              placeholder="Enter Your School"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              onChange={(e) => setnewPassword(e.target.value)}
              id="exampleInputPassword1"
              value={newPassword}
              placeholder="Enter Your Password"
              required
            />
          </div>


          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
