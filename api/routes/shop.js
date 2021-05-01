const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render("shop");
});
router.post('/:orderId', (req, res, next) => {
      const id = req.params.orderId;
});
router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
   if(id === 2) {
    res.status(200).json({
        message: "this order is deleted!",
        orderId: id,
    });
   }
});
module.exports = router;
