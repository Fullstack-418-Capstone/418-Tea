const express = require("express");
const router = express.Router();
//insert functions from the database here (addresses)
const { createAddress, getAddress } = require("../database/addresses");

//create an address
//POST api/address

router.post("/", async (req, res, next) => {
  const { address1, address2, city, state, zipcode } = req.body;

  try {
    const address = await createAddress(
      address1,
      address2,
      city,
      state,
      zipcode
    );

    if (address) {
      res.send({
        message: "Thank you for entering your address!",
      });
    }
  } catch (error) {
    console.error("problem adding address");
    throw error;
  }
});

//get the address
//GET api/address

router.get("/address", async (req, res, next) => {
  const address = await getAddress(userId);
  res.send(address);
});
