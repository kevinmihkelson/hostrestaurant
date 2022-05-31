import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IMenuGroup } from "../../../domain/IMenuGroup";
import { IMenuItem } from "../../../domain/IMenuItem";
import { IMenuItemExtra } from "../../../domain/IMenuItemExtra";
import MenuGroupService from "../../../services/MenuGroupService";
import MenuItemService from "../../../services/MenuItemService";
import Modal from "react-modal";
import MenuItemExtraService from "../../../services/MenuItemExtraService";

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

const ItemEdit = (props: any) => {
  // Item data
  const [item, setItem] = useState<IMenuItem>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<IMenuGroup[]>(props.categories);

  //Modal
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Item extra data
  const [itemExtraName, setItemExtraName] = useState("");
  const [itemExtraDescription, setItemExtraDescription] = useState("");
  const [itemExtras, setItemExtras] = useState<IMenuItemExtra[]>([]);
  const [itemExtra, setItemExtra] = useState<IMenuItemExtra>();

  const handleItemExtraCreate = () => {
    var menuItemExtra: IMenuItemExtra = {
      name: itemExtraName,
      description: itemExtraDescription,
      menuItemId: item?.id!,
    };
    itemExtras.push(menuItemExtra);
    closeModal();
  };

  const handleItemExtraEdit = async () => {
    let newItemExtra: IMenuItemExtra = {
      id: itemExtra?.id,
      name: itemExtraName != "" ? itemExtraName : itemExtra?.name!,
      description:
        itemExtraDescription != ""
          ? itemExtraDescription
          : itemExtra?.description!,
      menuItemId: itemExtra?.menuItemId!,
    };
    if (itemExtras.includes(itemExtra!)) {
      var extras = itemExtras.filter((item) => item.name !== itemExtra?.name);
      closeEditModal();
      setItemExtras([...extras, newItemExtra]);
      return;
    }
    await menuItemExtraService.update(newItemExtra, itemExtra?.id!);
    await fetchMenuItem();
    closeEditModal();
  };

  const handleItemExtraDelete = async () => {
    if (itemExtras.includes(itemExtra!)) {
      setItemExtras(itemExtras.filter((item) => item.name !== itemExtra?.name));
      closeEditModal();
      return;
    }
    await menuItemExtraService.delete(itemExtra?.id!);
    await fetchMenuItem();
    closeEditModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openEditModal = (x: IMenuItemExtra) => {
    setItemExtra(x);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const menuItemService = new MenuItemService();
  const menuItemExtraService = new MenuItemExtraService();
  const menuGroupService = new MenuGroupService();

  const navigate = useNavigate();

  const handleEdit = async () => {
    item!.name = name != "" ? name : item!.name;
    item!.description = description != "" ? description : item!.description;
    item!.image = image != "" ? image : item!.image;
    item!.price = price != "" ? parseFloat(price) : item!.price;
    item!.menuGroupId = category != "" ? category : item?.menuGroupId;
    item!.menuItemExtras = itemExtras;
    await menuItemService.update(item!, item?.id!);
    navigate("/menu");
  };

  const handleDelete = async () => {
    await menuItemService.delete(item?.id!);
    navigate(-1);
  };

  const fetchMenuItem = async () => {
    await menuItemService.getById(id).then((data) => setItem(data));
  };

  useEffect(() => {
    fetchMenuItem();
  }, []);

  let { id } = useParams();

  return (
    <>
      <h1>
        <i className="bi bi-arrow-left" onClick={() => navigate(-1)}></i>
      </h1>
      <div className="container">
        <h1>Edit item</h1>
        <hr />
        <div>
          <div>
            <div className="form-group row">
              <label className="col-form-label">Name</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setName(e.target.value)}
                  placeholder={item?.name}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-form-label">Description</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={item?.description}
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
                  placeholder={item?.image}
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
                  placeholder={item?.price.toString()}
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
                  {categories?.map((itemCategory) => (
                    <option
                      selected={item?.menuGroupId === itemCategory.id}
                      value={itemCategory.id}
                    >
                      {itemCategory.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="m-2">
              <h3>Item extras</h3>
              <hr />
              <div>
                {item?.menuItemExtras.map((x) => (
                  <div className="m-2">
                    <h5 onClick={() => openEditModal(x)}>{x.name}</h5>
                  </div>
                ))}
                {itemExtras?.map((x) => (
                  <div className="m-2">
                    <h5 onClick={() => openEditModal(x)}>{x.name}</h5>
                  </div>
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
              <Modal
                isOpen={isEditModalOpen}
                onRequestClose={closeEditModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <h2>
                  <i onClick={closeEditModal} className="bi bi-x-lg"></i>
                </h2>
                <div>
                  <h3>Edit an extra</h3>
                </div>
                <div className="container">
                  <div className="form-group">
                    <label className="col-form-label">Item Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={itemExtra?.name}
                      onChange={(e) => setItemExtraName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Description</label>
                    <textarea
                      className="form-control"
                      placeholder={itemExtra?.description}
                      onChange={(e) => setItemExtraDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div>
                    <button
                      className="btn btn-secondary m-2"
                      onClick={handleItemExtraEdit}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={handleItemExtraDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Modal>
              <button className="btn btn-secondary mt-4" onClick={openModal}>
                Add an extra
              </button>
            </div>
            <button className="btn btn-secondary m-2" onClick={handleEdit}>
              Edit Item
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete Item
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemEdit;
