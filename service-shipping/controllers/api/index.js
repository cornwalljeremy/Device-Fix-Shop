const router = require('express').Router();
const shipmentRoutes = require('./shipments');

router.use('/shipments', shipmentRoutes);

module.exports = router;
