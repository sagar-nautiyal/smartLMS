import Cart from "../models/Cart.js";
import Course from "../models/Course.js";
export default class CartController {
  async getCartItems(req, res) {
    try {
      const userId = req.user._id;
      const cart = await Cart.findOne({ userId }).populate(
        "courses.courseId",
        "title price"
      );
      if (!cart) {
        return res
          .status(404)
          .json({ message: "cannot find cart items for user" });
      }

      return res.status(200).json(cart);
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async addItemtoCart(req, res) {
    try {
      const { quantity } = req.body;
      const { courseId } = req.params;
      const userId = req.user._id;

      //find course
      const course = await Course.findById(courseId);
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({
          userId,
          courses: [
            {
              courseId,
              quantity,
              price: course.price,
            },
          ],
        });
      } else {
        // check if course already exists
        const existingItem = cart.courses.find(
          (c) => c.courseId.toString() === courseId.toString()
        );

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.courses.push({ courseId, quantity, price: course.price });
        }
      }

      await cart.save();
      
      // Populate the cart before returning
      const populatedCart = await Cart.findById(cart._id).populate(
        "courses.courseId",
        "title price"
      );
      
      return res.status(201).json(populatedCart);
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateCartItems(req, res) {
    try {
      const { courseId } = req.params;
      const { quantity } = req.body;
      const userId = req.user._id;
      
      // Find the cart document to trigger pre-save hook
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      
      if (quantity === 0) {
        // Remove the course from cart
        cart.courses = cart.courses.filter(
          (c) => c.courseId.toString() !== courseId.toString()
        );
      } else {
        // Update the quantity
        const existingItem = cart.courses.find(
          (c) => c.courseId.toString() === courseId.toString()
        );
        if (existingItem) {
          existingItem.quantity = quantity;
        }
      }
      
      // Save to trigger pre-save hook for totalPrice/totalItems calculation
      await cart.save();
      
      // Populate and return updated cart
      const populatedCart = await Cart.findById(cart._id).populate(
        "courses.courseId",
        "title price"
      );
      
      return res.status(200).json(populatedCart);
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async removeItemFromCart(req, res) {
    try {
      const { courseId } = req.params;
      const userId = req.user._id;
      
      // Find the cart document to trigger pre-save hook
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      
      // Remove the course from cart
      cart.courses = cart.courses.filter(
        (c) => c.courseId.toString() !== courseId.toString()
      );
      
      // Save to trigger pre-save hook for totalPrice/totalItems calculation
      await cart.save();
      
      // Populate and return updated cart
      const populatedCart = await Cart.findById(cart._id).populate(
        "courses.courseId",
        "title price"
      );

      return res.status(200).json(populatedCart);
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
