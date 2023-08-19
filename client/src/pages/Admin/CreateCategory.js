import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Button, Modal } from "antd";

const CreateCategory = () => {
  const [categories, setcategories] = useState([]);
  const [name, setname] = useState("");
  const [open, setopen] = useState(false);
  const [selected, setselected] = useState(null);
  const [updatedName, setupdatedName] = useState("");

  //handleForm
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Get All categories
  const getAllCategory = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data.success) {
        setcategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      setselected(null);
      setupdatedName("");
      setopen(false);
      getAllCategory();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (pid) => {
   
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`);
      
      getAllCategory();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Dashboard - CreateCategory"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setname}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    
                      <tr key={c._id}>
                        <td>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setopen(true);
                              setupdatedName(c.name);
                              setselected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button className="btn btn-danger ms-2" onClick={()=>handleDelete(c._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => setopen(false)} footer={null} open={open}>
              <CategoryForm
                value={updatedName}
                setValue={setupdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
