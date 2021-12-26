const router = require('express').Router();

const { Shipments, Shipping } = require('../../models');
const crypto = require('crypto');
const { Device } = require('../../../service-inventory/models');

router.get('/:tracking_number', async (req, res) => {
  try {
    const shipment = await Shipments.getTrackingInfo(
      req.params.tracking_number
    );

    if (shipment) {
      res.status(200).json(shipment[0][0]);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.post('/', async (req, res) => {
  try {
    const newShipmentEntry = {
      tracking_number: crypto.randomBytes(16).toString('hex').concat('US'),
      expected_arrival: new Date(req.body.expected_arrival),
      address_id: req.body.address_id,
    };

    const resultShipment = await Shipments.createShipment(newShipmentEntry);
    const newId = resultShipment[0].insertId;
    const newShipment = await Shipments.getShipment(newId);

    res.status(newShipment ? 200 : 400).json(newShipment[0][0]);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.post('/:id/update', async (req, res) => {
  try {
    const shippingUpdate = {
      updated_on: new Date(),
      status: req.body.status,
      location: req.body.location,
      shipment_id: req.params.id,
    };

    const resultUpdate = await Shipping.create(shippingUpdate);
    const newId = resultUpdate[0].insertId;
    const newUpdate = await Shipping.getUpdate(newId);

    res.status(newUpdate ? 200 : 400).json(newUpdate[0][0]);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

module.exports = router;
