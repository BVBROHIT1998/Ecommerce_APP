import React from "react";
import Layout from "./../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-6 mb-3 mt-5 gx-3 gy-3">
              
                <Link to={`/category/${c.slug}`} className="btn btn-primary">{c.name}</Link>
              
            </div>
          ))}
        </div>
      </div>
      <h1>All Categories</h1>
    </Layout>
  );
};

export default Categories;
