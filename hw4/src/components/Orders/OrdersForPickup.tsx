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

const OrdersForPickup = (props: { restaurantId: string | undefined }) => {
  const [orders, setOrders] = useState<IOrder[]>();
  const orderService = new OrderService();

  const handleConfirm = async (id: string) => {
    await orderService.patch(id, 3);
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
      <h1 className="m-3">Orders ready for pickup</h1>
      <hr />
      {orders?.length == 0 && (
        <div className="container mt-5">
          <h4>No orders ready for pickup</h4>
        </div>
      )}
      {orders?.map(
        (order) =>
          order.orderStatus == 2 && (
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
                      <div className="row p-2">
                        <div className="col">
                          <button
                            className="btn btn-secondary"
                            onClick={() => handleConfirm(order.id)}
                          >
                            Completed
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

export default OrdersForPickup;
