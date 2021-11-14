import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';



// @desc           Create new order
// @routes         POST /api/orders
// @access         Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  // make order items not empty
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    // create new order in the DB
    const order = new Order({
      // pass in everything from req.body and add user._id
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })

    // save to DB
    const createdOrder = await order.save();

    // status 201 cause something was created
    res.status(201).json(createdOrder)
  }

});











// @desc           Get order by ID
// @routes         GET /api/orders/:id
// @access         Private
const getOrderById = asyncHandler(async (req, res) => {
  // fetch the order and . user info('from', 'what we want')
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  // checl for the order and respons with the order
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found!!!');
  }


})







export { addOrderItems }