import Payment from "../models/paymentModel.js";
import user from "../models/userModels.js";
import { razorpay } from "../server.js";
import AppError from "../utils/utilError.js";
import crypto from "crypto"
const getRazorPayKey = async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Razor_pay API key",
        key: process.env.PAY_KEY,
    });
};

const buySubscription = async (req, res, next) => {
    const { id } = req.user;
    const User = await user.findById(id);

    if (!User) {
        return next(new AppError("Unauthorized Please log in", 400));
    }
    if (user.role === "ADMIN") {
        return next(
            new AppError(
                "Admin cannot purchase a subscription.P.S: Why are you trying to pay ?You have the entire dashboard...You are the king here",
                400
            )
        );
    }

    const subscription = await razorpay.subscriptions.create({
        plan_id: process.env.PLAN_ID,
        customer_notify: 1
    }
    );

    User.subscription.id = subscription.id;
    User.subscription.status = subscription.status;

    await User.save();
    res.status(200).json({
        success: true,
        message: "Subscribed successfully",
        id: subscription.id
    });

};

const verifySubscription = async (req, res, next) => {
    const { id } = req.user;
    const { razorpay_payment_id, razorpay_signature, razorpay_subscription_id } = req.body;

    const User = await user.findById(id);

    if (!User) {
        return next(new AppError("Unauthorized Please log in", 400));
    }
    const subscriptionId = User.subscription.id;
    const generatedSignature = crypto.
        createHmac("sha256", process.env.PAY_SECRET).
        update(`${razorpay_payment_id}` | `${subscriptionId}`)
        .digest("hex");

    console.log(generatedSignature);
    if (generatedSignature !== razorpay_signature) {
        return next(new AppError("Payment not verified", 500));
    }
    await Payment.create({
        razorpay_payment_id,
        razorpay_signature,
        razorpay_subscription_id
    });

    User.subscription.status = "active";

    await User.save();

    res.status(200).json({
        success: true,
        message: "Payment verified successfully!"
    })

};

const cancelSubscription = async (req, res, next) => {
    const { id } = req.user;
    const User = await user.findById(id);

    if (!User) {
        return next(new AppError("Unauthorized Please log in", 400));
    }
    if (user.role === "ADMIN") {
        return next(
            new AppError(
                "Admin cannot purchase a subscription.P.S: Why are you trying to pay ?You have the entire dashboard...You are the king here",
                400
            )
        );
    }

    const subscription_id = User.subscription.id;
    const subscription = razorpay.subscriptions.cancel(
        subscription_id,
    );

    User.subscription.status = subscription.status;

    await User.save();

};

const allPayments = async (req, res, next) => { 
    const {count}=req.query;
    const subscriptions=await razorpay.subscriptions.all({
        count:count || 10,
    });

    res.status(200).json({
        success:true,
        message:"Here's the records you have requested...",
        data: subscriptions
    })
};
export {
    getRazorPayKey,
    buySubscription,
    verifySubscription,
    cancelSubscription,
    allPayments,
};