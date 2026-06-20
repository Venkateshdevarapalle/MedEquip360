const express = require("express");
const router = express.Router();

let orders = [
  {
    id: 1,
    equipment: "ECG Machine",
    quantity: 2,
    status: "Pending"
  }
];

// GET ALL ORDERS
router.get("/", (req, res) => {
  res.json(orders);
});

// CREATE ORDER
router.post("/", (req, res) => {
  const newOrder = {
    id: orders.length + 1,
    status: "Pending",
    ...req.body
  };

  orders.push(newOrder);

  res.json(newOrder);
});

// DELETE ORDER
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  orders = orders.filter(
    (order) => order.id !== id
  );

  res.json({
    message: "Order deleted"
  });
});

// UPDATE STATUS
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  orders = orders.map((order) => {
    if (order.id === id) {
      return {
        ...order,
        status: req.body.status
      };
    }

    return order;
  });

  res.json({
    message: "Order updated"
  });
});
router.get("/stats", (req, res) => {
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (o) => o.status === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (o) => o.status === "Delivered"
  ).length;

  res.json({
    totalOrders,
    pendingOrders,
    deliveredOrders
  });
});
router.get("/stats", (req, res) => {
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (o) => o.status === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (o) => o.status === "Delivered"
  ).length;

  res.json({
    totalOrders,
    pendingOrders,
    deliveredOrders
  });
});

module.exports = router;