import { useState } from "react";
import React from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  "../../styles/AuthStyles.css"


const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [address, setaddress] = useState("");
  const [question, setquestion] = useState('')
  const navigate = useNavigate();


  //Form Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, question }
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
    <Layout title={"Register - Ecommerce App"}>
      <div className="form-container">
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setname(e.target.value)}
              id="exampleInputname"
              value={name}
              placeholder="Enter Your Name"
              required
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
              required
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
              required
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
              required
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
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setquestion(e.target.value)}
              id="exampleInputphone"
              value={question}
              placeholder="What's Your school"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
          
        </form>
      </div>
    </Layout>
  );
};

export default Register;
