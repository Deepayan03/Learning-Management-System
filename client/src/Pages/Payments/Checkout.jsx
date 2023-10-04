import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRazorPayId,
  purchaseCourseBundles,
  verifyUserPayment,
} from "../../Redux/Slices/PaymentSlice";
import toast from "react-hot-toast";
import HomeLayout from "../../Layouts/HomeLayout";
import { BiRupee } from "react-icons/bi";
import { getUserData } from "../../Redux/Slices/AuthSlice";
const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const razorPayKey = useSelector((state) => state?.razorPay?.key);

  const subscription_id = useSelector(
    (state) => state?.razorPay?.subscription_id
  );

  const userData = useSelector((state) => state?.auth?.data);
  let paymentDetails = {
    razorpay_payment_id: "",
    razorpay_signature: "",
    razorpay_subscription_id: "",
  };
  const handleSubscription = async (e) => {
    e.preventDefault();
    if (!razorPayKey || !subscription_id) {
      toast.error("Something went wrong. Please try again later");
      return;
    }
    console.log(razorPayKey, subscription_id);
    const options = {
      key: razorPayKey,
      subscription_id: subscription_id,
      name: "Edura pvt ltd",
      description: "Monthly Subscription",
      theme: {
        color: "#F37254",
      },
      prefill: {
        email: userData?.email,
        name: userData?.name,
      },
      handler: async (response) => {
        // console.log(response);
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;
        paymentDetails.razorpay_subscription_id =
          response.razorpay_subscription_id;
        const res = await dispatch(verifyUserPayment(paymentDetails));
        toast.success("Payment Successful");
        await dispatch(getUserData());
        res?.payload?.success
          ? navigate("/payment/success")
          : navigate("/payment/failure");
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const load = async () => {
    setLoading(true);
    await dispatch(getRazorPayId());
    await dispatch(purchaseCourseBundles());
    setLoading(false);
  };
  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  return (
    <HomeLayout>
      {loading ? (
        <div className="spinner-container flex justify-center items-center w-screen h-screen" >
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <form
          className=" min-h-[70vh] flex items-center justify-center p-3"
          onSubmit={handleSubscription}>
          <div className="w-[20rem] h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-xl relative p-5 ">
            <h1 className="bg-yellow-500 absolute top-0  w-full  rounded-xl flex justify-center items-center text-white text-2xl font-bold">
              Subscribe Now! <br />
            </h1>
            <div className="px-4 space-y-5 text-center">
              <p className="p.text-[17px]">
                This purchase will allow you to access all the available courses
                on Edura for{" "}
                <span className="text-yellow-500 font-bold">
                  <br />a duration of 1 year
                </span>
                {"  "}
                All the existing and new launched courses will also be
                accessible to you
              </p>
              <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-200">
                <BiRupee /> <span>499</span> only
              </p>
              <div className="text-gray-200">
                <p>100% refund on cancellation </p>
                <p>* Terms and Conditions applied *</p>
              </div>
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-xl text-white py-2">
                Buy now
              </button>
            </div>
          </div>
        </form>
      )}
    </HomeLayout>
  );
};

export default Checkout;
