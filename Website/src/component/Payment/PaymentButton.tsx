import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

interface PaymentButtonProps {
  amount: number;
  cartData: any[];
  validation: any;
  onPaymentSuccess?: (orderPayload: any) => void;
}

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      return resolve(true);
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Razorpay SDK failed to load."));
    document.body.appendChild(script);
  });
};

const PaymentButton: React.FC<PaymentButtonProps> = ({ amount, cartData, validation, onPaymentSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    const errors = await validation.validateForm();
    validation.setTouched(
      Object.keys(validation.values).reduce((acc: any, key: string) => ({ ...acc, [key]: true }), {}),
    );

    if (Object.keys(errors).length > 0) {
      toast.error("Please fill all required fields before placing the order.");
      return;
    }

    if (!cartData || cartData.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const requestData = {
      name: validation.values.name,
      phone: validation.values.phone,
      products: cartData.map((item) => ({ _id: item._id, quantity: item.quantity })),
      shippingAddress: {
        address: validation.values.address,
        city: validation.values.city,
        zipCode: validation.values.zipCode,
      },
      totalAmount: amount / 100,
      type: "order",
    };

    setIsLoading(true);
    try {
      await loadRazorpayScript();

      const response = await axios.post("/api/payment/create-order", {
        amount,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        notes: {
          name: requestData.name,
          phone: requestData.phone,
        },
      });

      
      const orderData = response?.data ?? response;
      console.log("response", orderData);
      if (!orderData || !orderData?.order) {
        throw new Error("Unable to create payment order.");
      }

      const options = {
        key: orderData.key_id,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "AgroGenie",
        description: "Checkout payment",
        order_id: orderData.order.id,
        handler: async function (response: any) {
          try {
            const verifyRes :any = await axios.post("/api/payment/verify-payment", response);
            const verifyData = verifyRes?.data ?? verifyRes;
            console.log("verifyRes", verifyRes?.success, verifyData?.valid);
            if (verifyRes?.success && verifyData?.valid) {
              toast.success("Payment successful");
              onPaymentSuccess?.(requestData);
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (err) {
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          name: requestData.name,
          email: "",
          contact: requestData.phone,
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      toast.error(error?.message || "Unable to start payment.");
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={handlePayment}
      className="w-full rounded-3xl bg-slate-950 px-5 py-2 text-xl font-semibold text-White transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? "Redirecting to payment..." : "Place Order"}
    </button>
  );
};

export default PaymentButton;
