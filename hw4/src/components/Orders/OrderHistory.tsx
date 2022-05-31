import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { IOrder, OrderStatus, PaymentMethod } from "../../domain/IOrder";
import OrderService from "../../services/OrderService";

const OrderHistory = (props: { restaurantId: string | undefined }) => {
  const [orders, setOrders] = useState<IOrder[]>();
  const orderService = new OrderService();

  useEffect(() => {
    const fetchdata = async () => {
      await orderService
        .getByRestaurant(props.restaurantId!)
        .then((data) => setOrders(data));
    };
    fetchdata();
  }, []);

  return (
    <div className="container">
      <h1 className="m-3">Order history</h1>
      <hr />
      {orders?.length == 0 && (
        <div className="container mt-5">
          <h4>No orders</h4>
        </div>
      )}
      {orders?.map((order) => {
        return (
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
                    <div className="row">
                      <div className="container">
                        <h4>Order Status</h4>
                      </div>
                      <div className="container m-2">
                        {OrderStatus[order.orderStatus]}
                      </div>
                    </div>
                    <h4 className="mt-2">Order Items</h4>
                    {order.orderItems.map((item) => (
                      <div key={item.menuItemId}>
                        <div className="row p-2">
                          <div className="col-2">
                            <b>{item.quantity}</b>
                          </div>
                          <div className="col-9">{item.menuItemId}</div>
                          <div className="col-1">{item.quantity}€</div>
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
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
};

export default OrderHistory;
