const express = require("express");
const router = express.Router();

let serviceTickets = [
  {
    id: 1,
    equipment: "ECG Machine",
    issue: "Display not working",
    status: "Pending"
  }
];

// GET ALL TICKETS
router.get("/", (req, res) => {
  res.json(serviceTickets);
});

// CREATE TICKET
router.post("/", (req, res) => {
  const newTicket = {
    id: serviceTickets.length + 1,
    status: "Pending",
    ...req.body
  };

  serviceTickets.push(newTicket);

  res.json(newTicket);
});

// UPDATE STATUS
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  serviceTickets = serviceTickets.map((ticket) => {
    if (ticket.id === id) {
      return {
        ...ticket,
        status: req.body.status
      };
    }

    return ticket;
  });

  res.json({
    message: "Ticket updated"
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  serviceTickets = serviceTickets.filter(
    (ticket) => ticket.id !== id
  );

  res.json({
    message: "Ticket deleted"
  });
});

module.exports = router;