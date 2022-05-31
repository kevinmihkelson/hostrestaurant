import React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { IMenuGroup } from "../../../domain/IMenuGroup";
import { Link } from "react-router-dom";

const getFilteredItems = (query: string, items: IMenuGroup[]) => {
  if (!query) {
    return items;
  }
  return items.filter((category) =>
    category.name.toUpperCase().includes(query.toUpperCase())
  );
};

const Categories = (props: any) => {
  const [query, setQuery] = useState("");
  const filteredItems = getFilteredItems(query, props.categories);

  return (
    <div className="container">
      <div>
        <div className="row">
          <div className="col-9">
            <h1>Categories</h1>
          </div>
          <div className="col-3">
            <Link to={`/categories/create/${props.menuId}`}>
              <button className="btn btn-secondary">
                <i className="bi bi-plus-lg"></i> New category
              </button>
            </Link>
          </div>
        </div>
        <div className="input-group rounded">
          <span className="input-group-text border-0">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control rounded"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {props.categories.length > 0 && (
          <div>
            <table className="table">
              <thead>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Items</td>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((value, i) => (
                  <tr key={value.id}>
                    <td>{i + 1}</td>
                    <td key={value.name}>
                      <Link to={`/categories/edit/${value.id}`}>
                        <a>{value.name}</a>
                      </Link>
                    </td>
                    <td key={value?.id}>{value.menuItems.length} items</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {props.categories.length < 1 && (
        <div>
          <h1>No categories found</h1>
        </div>
      )}
    </div>
  );
};

export default Categories;
