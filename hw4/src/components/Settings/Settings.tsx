import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IRestaurant } from "../../domain/IRestaurant";
import RestaurantService from "../../services/RestaurantService";

const Settings = (props: { restaurant: IRestaurant; fetchData: any }) => {
  const [name, setName] = useState(props.restaurant?.name);
  const [description, setDescription] = useState(props.restaurant?.description);
  const [image, setImage] = useState(props.restaurant?.image);
  const [number, setNumber] = useState(props.restaurant?.number);
  const [address, setAddress] = useState(props.restaurant?.address);

  const navigate = useNavigate();
  const restaurantService = new RestaurantService();

  const handleEdit = async () => {
    let restaurant: IRestaurant = {
      id: props.restaurant!.id!,
      appUserId: props.restaurant?.appUserId,
      name: name!,
      description: description!,
      image: image!,
      address: address!,
      number: number!,
      isActive: props.restaurant!.isActive,
      orders: props.restaurant!.orders,
      openingHours: props.restaurant!.openingHours,
      restaurantMenus: props.restaurant.restaurantMenus,
    };
    await restaurantService.update(restaurant, props.restaurant!.id!);
    await props.fetchData()
    navigate("/home");
  };

  const handleDelete = async () => {
    await restaurantService.delete(props.restaurant.id!);
    navigate("/home");
    window.location.reload();
  };

  return (
    <div className="container">
      <div>
        <h1>Settings</h1>
      </div>
      <div className="form-group">
        <label className="col-form-label">Name</label>
        <input
          className="form-control"
          type="text"
          placeholder={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="col-form-label">Restaurant Description</label>
        <textarea
          className="form-control"
          required
          placeholder={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <img src="" alt="" />
        <label className="col-form-label">Restaurant Image</label>
        <input
          className="form-control"
          type="url"
          required
          placeholder={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="col-form-label">Number</label>
        <input
          className="form-control"
          type="text"
          required
          placeholder={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="col-form-label">Address</label>
        <input
          className="form-control"
          type="text"
          required
          placeholder={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <button className="btn btn-secondary m-2" onClick={handleEdit}>
          Save Changes
        </button>
        <button className="btn btn-danger m-2" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Settings;
