import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IMenuGroup } from "../../../domain/IMenuGroup";
import MenuGroupService from "../../../services/MenuGroupService";

const CategoryEdit = () => {
  const [category, setCategory] = useState<IMenuGroup>();
  const [categoryName, setCategoryName] = useState("");
  const menuGroupService = new MenuGroupService();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await menuGroupService.delete(id!);
    navigate("/menu");
  };

  const handleEdit = async () => {
    category!.name = categoryName;
    await menuGroupService.update(category!, category?.id!);
    navigate("/menu");
  };

  let { id } = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      await menuGroupService.getById(id).then((data) => setCategory(data));
    };
    fetchCategory();
  }, []);

  return (
    <div>
      <h1>
        <i className="bi bi-arrow-left" onClick={() => navigate(-1)}></i>
      </h1>
      <div className="container">
        <h1>Edit category</h1>
        <div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Name:</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                required
                placeholder={category?.name}
                onChange={(e) => {
                  setCategoryName(e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <button className="btn btn-secondary m-2" onClick={handleEdit}>
              Edit Category
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryEdit;
