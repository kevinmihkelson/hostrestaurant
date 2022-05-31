import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IMenu } from "../../domain/IMenu";
import MenuService from "../../services/MenuService";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Overview from "./Overview";
import Categories from "./Categories/Categories";
import Items from "./MenuItem/Items";
import { useNavigate } from "react-router-dom";
import { IMenuItem } from "../../domain/IMenuItem";
import { merge } from "jquery";

const RestaurantMenu = (props: any) => {
  const [menu, setMenu] = useState<IMenu | undefined>(props.restaurantMenu);
  const [menuName, setMenuName] = useState("");
  const navigate = useNavigate();

  const menuService = new MenuService();

  const handleMenuCreation = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    var newMenu = {
      restaurantId: props.restaurantId,
      name: menuName,
    };
    await menuService.add(newMenu);
    await props.fetchData();
    navigate("/home");
  };

  const fetchData = async () => {
    await menuService.getById(menu?.id).then((data) => setMenu(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {menu == undefined && (
        <div className="container">
          <h1>No menu found</h1>
          <div className="form-group">
            <label className="col-form-label">Menu's name:</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setMenuName(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <button className="btn btn-secondary" onClick={handleMenuCreation}>
              Create a new menu
            </button>
          </div>
        </div>
      )}
      {menu != undefined && (
        <Tabs>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Categories</Tab>
            <Tab>Items</Tab>
          </TabList>
          <TabPanel>
            <Overview restaurantId={menu?.id} menu={menu} />
          </TabPanel>
          <TabPanel>
            <Categories categories={menu?.menuGroups} menuId={menu?.id} />
          </TabPanel>
          <TabPanel>
            <Items
              menuId={menu.id}
              menuItems={menu?.menuGroups?.map((elemet) => elemet.menuItems)}
              categories={menu?.menuGroups}
              fetchData={props.fetchData}
            />
          </TabPanel>
        </Tabs>
      )}
    </div>
  );
};

export default RestaurantMenu;
