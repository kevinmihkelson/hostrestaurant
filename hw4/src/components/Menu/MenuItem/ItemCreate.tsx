import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IMenuGroup } from "../../../domain/IMenuGroup";
import { IMenuItem } from "../../../domain/IMenuItem";
import MenuGroupService from "../../../services/MenuGroupService";
import MenuItemService from "../../../services/MenuItemService";
import Modal from "react-modal";
import { IMenuItemExtra } from "../../../domain/IMenuItemExtra";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ItemCreate = (props: any) => {
  // Item data and categories
  const [categories, setCategories] = useState<IMenuGroup[]>(props.categories);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  // Item extra data and modal
  const [isOpen, setIsOpen] = useState(false);
  const [itemExtraName, setItemExtraName] = useState("");
  const [itemExtraDescription, setItemExtraDescription] = useState("");
  const [itemExtras, setItemExtras] = useState<IMenuItemExtra[]>([]);

  const handleItemExtraCreate = () => {
    var menuItemExtra: IMenuItemExtra = {
      name: itemExtraName,
      description: itemExtraDescription,
    };
    itemExtras.push(menuItemExtra);
    closeModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // services
  const menuGroupService = new MenuGroupService();
  const menuItemService = new MenuItemService();

  const navigate = useNavigate();

  const handleCreate = async () => {
    var menuItem: IMenuItem = {
      name: name,
      description: description,
      price: parseFloat(price),
      image: image,
      menuGroupId: category == "" ? categories?.at(0)?.id : category,
      menuItemExtras: itemExtras,
    };
    await menuItemService.add(menuItem);
    navigate(-1);
  };

  return (
    <div>
      <h1>
        <i className="bi bi-arrow-left" onClick={() => navigate(-1)}></i>
      </h1>
      <div className="container">
        <h1>Create a new item</h1>
        <hr />
        <div>
          <div className="form-group row">
            <label className="col-form-label">Name</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-form-label">Description</label>
            <div className="col-sm-10">
              <textarea
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-form-label">Image</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-form-label">Price</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 col-form-label">Category</label>
            <div className="col-sm-10">
              <select
                className="form-control"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="m-2">
            <h3>Item extras</h3>
            <hr />
            <div>
              {itemExtras.map((x) => (
                <div key={x.menuItemId}>{x.name}</div>
              ))}
            </div>
            <Modal
              isOpen={isOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <h2>
                <i onClick={closeModal} className="bi bi-x-lg"></i>
              </h2>
              <div>
                <h3>Add an extra</h3>
              </div>
              <div className="container">
                <div className="form-group">
                  <label className="col-form-label">Item Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    onChange={(e) => setItemExtraName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="col-form-label">Description</label>
                  <textarea
                    className="form-control"
                    onChange={(e) => setItemExtraDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="mt-4">
                  <button
                    className="btn btn-secondary"
                    onClick={handleItemExtraCreate}
                  >
                    Add
                  </button>
                </div>
              </div>
            </Modal>
            <div>
              <button className="btn btn-secondary" onClick={openModal}>
                Add an extra
              </button>
              <button className="btn btn-secondary m-3" onClick={handleCreate}>
                Create item
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCreate;
