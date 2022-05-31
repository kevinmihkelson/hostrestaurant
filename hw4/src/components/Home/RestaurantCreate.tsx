import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IOpeningHours } from "../../domain/IOpeningHours";
import { IRestaurant } from "../../domain/IRestaurant";
import RestaurantService from "../../services/RestaurantService";

const RestaurantCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [openingHours, setOpeningHours] = useState<IOpeningHours[]>();
  const navigate = useNavigate();
  const restaurantService = new RestaurantService();

  const handleCreate = async () => {
    var restaurant: IRestaurant = {
      name: name,
      description: description,
      image: image,
      address: address,
      number: number,
      isActive: false,
      orders: [],
      openingHours: [],
      restaurantMenus: []
    };
    await restaurantService.add(restaurant);
  };

  return (
    <div className="container">
      <h1>No restaurant found</h1>
      <h4>Create a new restaurant</h4>
      <div>
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label className="col-form-label">Restaurant Name</label>
            <input
              type="text"
              className="form-control"
              required
              maxLength={50}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="col-form-label">Description</label>
            <textarea
              maxLength={500}
              className="form-control"
              required
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label className="col-form-label">Address</label>
            <input
              className="form-control"
              type="text"
              required
              maxLength={200}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label className="col-form-label">Number</label>
            <input
              className="form-control"
              type="text"
              required
              maxLength={30}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>
              Image <b>(url)</b>
            </label>
            <input
              className="form-control"
              type="url"
              required
              onChange={(e) => {
                setImage(e.target.value);
              }}
            />
          </div>
          <div className="mt-1">
            <button className="btn btn-secondary">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestaurantCreate;
