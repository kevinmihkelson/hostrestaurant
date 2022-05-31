import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home/Home";
import "./App.css";
import RestaurantService from "./services/RestaurantService";
import { IRestaurant } from "./domain/IRestaurant";
import Settings from "./components/Settings/Settings";
import RestaurantMenu from "./components/Menu/RestaurantMenu";
import CategoryCreate from "./components/Menu/Categories/CategoryCreate";
import ItemCreate from "./components/Menu/MenuItem/ItemCreate";
import ItemEdit from "./components/Menu/MenuItem/ItemEdit";
import CategoryEdit from "./components/Menu/Categories/CategoryEdit";
import OrderHistory from "./components/Orders/OrderHistory";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import NewOrders from "./components/Orders/NewOrders";
import OrdersInProgress from "./components/Orders/OrdersInProgress";
import OrdersForPickup from "./components/Orders/OrdersForPickup";
import Homepage from "./components/Homepage";
import Register from "./components/Identity/Register";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faGear,
  faHome,
  faRightFromBracket,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [restaurant, setRestaurant] = useState<IRestaurant>();
  const [sidebarShow, setSidebarShow] = useState(false);
  const navigate = useNavigate();

  const restaurantService = new RestaurantService();

  function makeTimer() {
    setInterval(() => {
      fetchData();
    }, 10000);
  }

  const fetchData = async () => {
    await restaurantService.getRestaurant().then((data) => setRestaurant(data));
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSidebarShow = () => {
    setSidebarShow(sidebarShow == true ? false : true);
  };

  useEffect(() => {
    fetchData();
    if (localStorage.getItem("jwt") != null) {
      makeTimer();
    }
  }, []);

  return (
    <div>
      {/* <Header /> */}
      {localStorage.getItem("jwt") !== null && (
        <div className="row" style={{ height: window.innerHeight }}>
          <ProSidebar
            style={{ minHeight: window.outerHeight }}
            collapsed={sidebarShow}
            collapsedWidth={110}
          >
            <SidebarHeader onClick={handleSidebarShow}>
              <h1>Logo here</h1>
            </SidebarHeader>
            <SidebarContent>
              <Menu iconShape="square">
                <MenuItem icon={<FontAwesomeIcon icon={faHome} />}>
                  Home <Link to="/home" />
                </MenuItem>
                <MenuItem icon={<FontAwesomeIcon icon={faUtensils} />}>
                  Menu <Link to="/Menu" />
                </MenuItem>
                <SubMenu
                  title="Orders"
                  icon={<FontAwesomeIcon icon={faCreditCard} />}
                >
                  <MenuItem>
                    New Orders <Link to="/neworders" />
                  </MenuItem>
                  <MenuItem>
                    Orders in Progress <Link to="/orderprogress" />
                  </MenuItem>
                  <MenuItem>
                    Orders ready for pickup <Link to="/pickup" />
                  </MenuItem>
                  <MenuItem>
                    Order History <Link to="/orderhistory" />
                  </MenuItem>
                </SubMenu>
                <MenuItem icon={<FontAwesomeIcon icon={faGear} />}>
                  Settings <Link to="/settings" />
                </MenuItem>
                <MenuItem
                  onClick={logOut}
                  icon={<FontAwesomeIcon icon={faRightFromBracket} />}
                >
                  Log out
                </MenuItem>
              </Menu>
            </SidebarContent>
          </ProSidebar>
          <div className="col">
            <Routes>
              <Route
                path="/orderhistory"
                element={<OrderHistory restaurantId={restaurant?.id} />}
              />
              <Route
                path="/settings"
                element={
                  <Settings restaurant={restaurant!} fetchData={fetchData} />
                }
              />
              <Route
                path="/menu"
                element={
                  <RestaurantMenu
                    restaurantId={restaurant?.id}
                    restaurantMenu={restaurant?.restaurantMenus.at(0)}
                    fetchData={fetchData}
                  />
                }
              />
              <Route
                path="/categories/create/:id"
                element={<CategoryCreate />}
              />
              <Route path="/categories/edit/:id" element={<CategoryEdit />} />
              <Route
                path="/neworders"
                element={<NewOrders restaurantId={restaurant?.id} />}
              />
              <Route
                path="/orderprogress"
                element={<OrdersInProgress restaurantId={restaurant?.id} />}
              />
              <Route
                path="/pickup"
                element={<OrdersForPickup restaurantId={restaurant?.id} />}
              />
              <Route
                path="/items/create/:id"
                element={
                  <ItemCreate
                    categories={restaurant?.restaurantMenus.at(0)?.menuGroups}
                  />
                }
              />
              <Route
                path="/items/edit/:id"
                element={
                  <ItemEdit
                    categories={restaurant?.restaurantMenus.at(0)?.menuGroups}
                  />
                }
              />
              <Route path="/home" element={<Home restaurant={restaurant} />} />
            </Routes>
          </div>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Homepage fetchData={fetchData} />} />
        <Route path="/identity/account/register" element={<Register />} />
      </Routes>
    </div>
  );
}
export default App;
