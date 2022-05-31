import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IOrder } from "../../domain/IOrder";
import type { IRestaurant } from "../../domain/IRestaurant";
import OrderService from "../../services/OrderService";
import RestaurantService from "../../services/RestaurantService";
import RestaurantCreate from "./RestaurantCreate";

const Home = (props: { restaurant: IRestaurant | undefined }) => {
  const restaurantService = new RestaurantService();
  const [restaurantOpen, setRestaurantOpen] = useState<boolean>();
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [newOrders, setNewOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [activeOrders, setActiveOrders] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [canceledOrders, setCanceledOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

  const handleOpen = async () => {
    props.restaurant!.isActive = true;
    await restaurantService
      .update(props.restaurant!, props.restaurant!.id!)
      .then(() => setRestaurantOpen(true));
  };

  const handleClose = async () => {
    props.restaurant!.isActive = false;
    await restaurantService
      .update(props.restaurant!, props.restaurant!.id!)
      .then(() => setRestaurantOpen(false));
  };

  useEffect(() => {
    const fetchRestaurantOpen = async () => {
      setRestaurantOpen(props.restaurant?.isActive);
    };

    fetchRestaurantOpen();

    const fetchTotalRevenue = () => {
      let sum = 0;
      props.restaurant?.orders.forEach((element) => {
        sum += element.price;
      });
      setTotalRevenue(sum);
    };

    const fetchNewOrders = () => {
      let newOrderSum = 0;
      props.restaurant?.orders.forEach((element) => {
        if (element.orderStatus == 0) {
          newOrderSum++;
        }
      });
      setNewOrders(newOrderSum);
    };

    const fetchCompletedOrders = () => {
      let sum = 0;
      props.restaurant?.orders.forEach((element) => {
        if (element.orderStatus == 3) {
          sum++;
        }
      });
      setCompletedOrders(sum);
    };

    const fetchActiveOrders = () => {
      let sum = 0;
      props.restaurant?.orders.forEach((element) => {
        if (element.orderStatus == 1 || element.orderStatus == 2) {
          sum++;
        }
      });
      setActiveOrders(sum);
    };

    const fetchCanceledOrders = () => {
      let sum = 0;
      props.restaurant?.orders.forEach((element) => {
        if (element.orderStatus == 4) {
          sum++;
        }
      });
      setCanceledOrders(sum);
    };

    const fetchTotalItems = () => {
      let sum = 0;
      props.restaurant?.restaurantMenus
        .at(0)
        ?.menuGroups?.forEach((element) => {
          sum += element.menuItems.length;
        });
      setTotalItems(sum);
    };

    const fetchTotalCustomers = () => {
      let x = new Set(props.restaurant?.orders.map((item) => item.appUserId))
        .size;
      setTotalCustomers(x);
    };

    fetchNewOrders();
    fetchTotalRevenue();
    fetchCompletedOrders();
    fetchActiveOrders();
    fetchTotalItems();
    fetchTotalCustomers();
    fetchCanceledOrders();
  }, []);

  return (
    <div>
      {props.restaurant == undefined && <RestaurantCreate />}
      {props.restaurant != undefined && (
        <div className="row">
          <div className="col-3">
            <img className="restaurant-image" src={props.restaurant?.image} />
          </div>
          <div className="col-9">
            <div className="restaurant-title">
              <h2>{props.restaurant?.name}</h2>
            </div>
            <div className="text-muted">
              <i className="bi bi-geo-alt-fill"></i>
              {props.restaurant?.address}
            </div>
            <div className="mt-4">
              <i
                className="bi bi-circle-fill"
                style={
                  props.restaurant?.isActive == false
                    ? { color: "red" }
                    : { color: "green" }
                }
              >
                {" "}
              </i>
              {props.restaurant?.isActive == false ? "Closed" : "Open"}
            </div>
            <div className="mt-2">
              {props.restaurant?.isActive == false && (
                <button className="btn btn-secondary" onClick={handleOpen}>
                  Open restaurant
                </button>
              )}
              {props.restaurant?.isActive == true && (
                <button className="btn btn-secondary" onClick={handleClose}>
                  Close restaurant
                </button>
              )}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="row container d-flex justify-content-center mt-3">
              <div className="dashboard-card card col-xl-3 m-2">
                <h3>New Orders</h3>
                <div className="text-secondary">
                  <h3>{newOrders}</h3>
                </div>
              </div>
              <div className="dashboard-card card col-xl-3 m-2">
                <h3>Total Orders</h3>
                <div className="text-secondary">
                  <h3>{props.restaurant.orders.length}</h3>
                </div>
              </div>
              <div className="dashboard-card card col-xl-3 m-2">
                <h3>Active Orders</h3>
                <div className="text-secondary">
                  <h2>{activeOrders}</h2>
                </div>
              </div>
              <div className="dashboard-card card col-xl-3 m-2">
                <h3>Completed Orders</h3>
                <div className="text-secondary">
                  <h3>{completedOrders}</h3>
                </div>
              </div>
              <div className="dashboard-card card col-xl-3 m-2">
                <h3>Canceled Orders</h3>
                <div className="text-secondary">
                  <h3>{canceledOrders}</h3>
                </div>
              </div>
              <div className="dashboard-card card col-xl-3 m-2">
                <h3>Categories</h3>
                <div className="text-secondary">
                  <h3>
                    {props.restaurant.restaurantMenus.at(0)?.menuGroups?.length}
                  </h3>
                </div>
              </div>
              <div className="dashboard-card card col-xl-3 m-2">
                <h3>Items</h3>
                <div className="text-secondary">
                  <h3>{totalItems}</h3>
                </div>
              </div>
              <div className="dashboard-card card col-xl-3 m-2">
                <h3>Total Revenue</h3>
                <div className="text-secondary">
                  <h3>{totalRevenue}</h3>
                </div>
              </div>
              <div className="dashboard-card card col-xl-3 m-2">
                <h3>Total Customers</h3>
                <div className="text-secondary">
                  <h3>{totalCustomers}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
