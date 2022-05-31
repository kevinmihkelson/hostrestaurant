import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IMenuGroup } from "../../../domain/IMenuGroup";
import MenuGroupService from "../../../services/MenuGroupService";

const CategoryCreate = () => {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");

  let { id } = useParams();

  const menuGroupService = new MenuGroupService();

  const handleCategoryCreate = async () => {
    let category: IMenuGroup = {
      name: categoryName,
      menuId: id,
      menuItems: [],
    };
    await menuGroupService.add(category);
    navigate(-1);
  };
  return (
    <div>
      <h1>
        <i className="bi bi-arrow-left" onClick={() => navigate(-1)}></i>
      </h1>
      <div className="container">
        <h1>Add a new Category</h1>
        <input
          className="form-control"
          type="text"
          required
          placeholder="Name"
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <div className="mt-3">
          <button className="btn btn-secondary" onClick={handleCategoryCreate}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
