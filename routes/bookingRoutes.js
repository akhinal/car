const express = require("express");
const router = express.Router();
const Booking = require("../models/BookingModel");
const Car = require("../models/carModel");
const stripe = require("stripe")(
  "sk_test_51NzaOVSEyBYP0F4zcv23MYmuzOJBnZjCF2BtmX9ks5CLfgsTyT4zWS6NWnbbtCjpxtdeFz0z4664H7j35og9p8Go00NaMYF0KN"
);
const { v4: uuidv4 } = require("uuid");

router.post("/bookcar", async (req, res) => {
  // req.body.transactionId =""
  const { token } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "INR",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      req.body.transactionId = payment.source.id;
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const car = await Car.findOne({ _id: req.body.car });
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);
      await car.save();
      return res.json({ message: "Booking is successful" });
    } else {
      return res.status(400).json({ error: "Payment failed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
