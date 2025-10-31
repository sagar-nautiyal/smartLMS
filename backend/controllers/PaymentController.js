import Stripe from "stripe";
import Course from "../models/Course.js";
import Cart from "../models/Cart.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export default class PaymentController {
  async createPaymentIntent(req, res) {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    try {
      // Get user's cart to store course IDs in metadata
      const userId = req.user.id;
      const cart = await Cart.findOne({ userId }).populate("courses.courseId");

      let courseIds = [];
      if (cart && cart.courses.length > 0) {
        courseIds = cart.courses.map((item) => item.courseId._id.toString());
      }

      const args = {
        amount: amount * 100,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          userId: userId,
          courseIds: JSON.stringify(courseIds), // Store course IDs in metadata
        },
      };
      //create payment intent
      const paymentIntent = await stripe.paymentIntents.create(args);

      //returning back to client
      return res
        .status(200)
        .json({ client_secret: paymentIntent.client_secret });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Enroll user in courses after successful payment
  async enrollAfterPayment(req, res) {
    try {
      const userId = req.user.id;
      // ...

      // Get user's cart (if it still exists)
      const cart = await Cart.findOne({ userId }).populate("courses.courseId");

      if (!cart || cart.courses.length === 0) {
        return res.status(400).json({
          message:
            "No courses found to enroll. Cart may have been cleared already.",
        });
      }

      const enrolledCourses = [];

      // Enroll user in all courses from cart
      for (const cartItem of cart.courses) {
        // ...

        const course = await Course.findById(cartItem.courseId._id);

        if (course && !course.enrolledStudents.includes(userId)) {
          course.enrolledStudents.push(userId);
          await course.save();
          enrolledCourses.push(course.title);
        } else if (course) {
          enrolledCourses.push(course.title);
        }
      }

      // Clear the cart after successful enrollment
      cart.courses = [];
      cart.totalPrice = 0;
      await cart.save();

      // ...

      return res.status(200).json({
        message: "Successfully enrolled in courses",
        enrolledCourses: enrolledCourses,
      });
    } catch (error) {
      console.error("Enrollment error caught:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
}
