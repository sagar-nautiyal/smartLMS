import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    courses: {
      type: [
        {
          courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            default: 1,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
      default: [],
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalItems: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);
//  Auto-calculate totalPrice and totalItems before saving
cartSchema.pre("save", function (next) {
  if (!Array.isArray(this.courses)) {
    this.totalPrice = 0;
    this.totalItems = 0;
  } else {
    this.totalPrice = this.courses.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    this.totalItems = this.courses.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
  }

  next();
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
