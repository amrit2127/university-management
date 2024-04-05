import ShoppingCartModel from "../models/ShoppingCart.js";

export const addToCart = async (req, res) => {
  try {
    const cartData = await ShoppingCartModel.create(req.body);
    if (cartData)
      res.status(201).send({ message: "Data Added in the cart successfully" });
    else res.status(404).send({ message: "Unable to add items in the cart" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const GetCartItems = async (req, res) => {
  try {
    const cartData = await ShoppingCartModel.find().populate("product");
    res.status(200).send({ cartData });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};
export const calculateCartTotal = async (req, res) => {
  try {
    const cartTotal = await ShoppingCartModel.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: null, total: { $sum: { $multiply: ['$count', '$totalprice'] } } } },
      { $project: { _id: 0, total: 1 } }
    ]);

    if(cartTotal.length > 0) {
      res.status(200).send({ total: cartTotal[0].total });
    } else {
      res.status(200).send({ total: 0 });
    }
  } catch (e) {
    res.status(500).send({ error: e?.message });
  }
};

// export const updateCartItem = async (req, res) => {
//   const { itemId, quantity } = req.body;
//   try {
//     const cartItem = await ShoppingCartModel.findById(itemId);
//     if (!cartItem) {
//       return res.status(404).send({ message: "Cart item not found" });
//     }

//     cartItem.quantity = quantity;
//     await cartItem.save();
//     res.status(200).send({ message: "Cart item updated successfully" });
//   } catch (e) {
//     res.status(500).send({ error: e?.message });
//   }
// };
