import user from "../models/userModels";
import { razorpay } from "../server";
import AppError from "../utils/utilError";
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

    const subscription=await razorpay.subscriptions.create({
        plan_id:process.env.PLAN_ID,
        customer_notify:1
    }
    );

    User.subscription.id=subscription.id;
    User.subscription.status=subscription.status;

    await User.save();
    res.status(200).json({
        success:true,
        message:"Subscribed successfully",
        id:subscription.id
    });

};

const verifySubscription = async (req, res, next) => { };

const cancelSubscription = async (req, res, next) => { };

const allPayments = async (req, res, next) => { };
export {
    getRazorPayKey,
    buySubscription,
    verifySubscription,
    cancelSubscription,
    allPayments,
};
