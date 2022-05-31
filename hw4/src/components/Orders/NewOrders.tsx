import React, { useEffect, useState } from "react";
import { IOrder } from "../../domain/IOrder";
import OrderService from "../../services/OrderService";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

const NewOrders = (props: { restaurantId: string | undefined }) => {
  const [orders, setOrders] = useState<IOrder[]>();
  const orderService = new OrderService();

  const handleConfirm = async (id: string) => {
    await orderService.patch(id, 1);
    await fetchdata();
  };

  const handleCancel = async (id: string) => {
    await orderService.patch(id, 4);
    await fetchdata();
  };

  const fetchdata = async () => {
    await orderService
      .getByRestaurant(props.restaurantId!)
      .then((data) => setOrders(data));
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="container">
      <h1 className="m-3">New Orders</h1>
      <hr />
      {orders?.length == 0 && (
        <div className="container mt-5">
          <h4>No new orders</h4>
        </div>
      )}
      {orders?.map(
        (order) =>
          order.orderStatus == 0 && (
            <div className="m-3">
              <Accordion allowZeroExpanded>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <div>
                        <h3>{order.clientName}</h3>
                      </div>
                      <p>Id: {order.id}</p>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="container">
                      <h4>Order Items</h4>
                      {order.orderItems.map((item) => (
                        <div key={item.menuItemId}>
                          <div className="row p-2">
                            <div className="col-2">
                              <b>{item.quantity}</b>
                            </div>
                            <div className="col-9">
                              {item.menuItemName}
                              <div>
                                {item.orderItemExtras.at(0)?.menuItemExtraName}
                              </div>
                            </div>
                            <div className="col-1">{item.menuItemPrice}€</div>
                          </div>
                        </div>
                      ))}
                      {order.note && (
                        <div className="row alert alert-danger mt-4 mb-4">
                          {" "}
                          {order.note}
                        </div>
                      )}
                      <div className="row">
                        <h4>Total: {order.price} €</h4>
                      </div>
                      <div className="row p-2">
                        <div className="col">
                          <button
                            className="btn btn-danger m-2"
                            onClick={() => handleCancel(order.id)}
                          >
                            Cancel Order
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={() => handleConfirm(order.id)}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>
            </div>
          )
      )}
    </div>
  );
};

export default NewOrders;
