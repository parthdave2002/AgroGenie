import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AddLeadlist } from "../../Store/Lead/action";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../../component/ToastMessage";
import Inputbox from "../../component/Input/Inputbox";
import PaymentButton from "../../component/Payment/PaymentButton";

interface CartItem {
  _id: string;
  name: { englishname: string } | string;
  product_pics?: string[];
  price: number;
  quantity: number;
  image?: string;
  category?: string;
  specifications?: string[];
}

interface CartProps {
  cartOpen?: boolean;
  onClose?: () => void;
}

const CheckoutSection: React.FC<CartProps> = ({ cartOpen, onClose }) => {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const TAX_RATE = 0.02;
  const SHIPPING_COST = 0;


  useEffect(() => {
    const loadCart = () => {
      const storedCart = localStorage.getItem("product");
      if (storedCart) {
        setCartData(JSON.parse(storedCart));
      }
    };

    loadCart();
    window.addEventListener("cartChanged", loadCart);

    return () => {
      window.removeEventListener("cartChanged", loadCart);
    };
  }, []);

  const subtotal = cartData.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
  const discount = 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal - discount + tax + SHIPPING_COST;

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      paymentMethod: "card",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      securityCode: "",
      upiId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter your name"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Enter a 10-digit phone number")
        .required("Please enter phone number"),
      address: Yup.string().required("Please enter address"),
      city: Yup.string().required("Please enter city"),
      zipCode: Yup.string().required("Please enter postal code"),
    }),
    onSubmit: () => {
      // Payment is handled by the Place Order button.
    },
  });

  const handlePaymentSuccess = (requestData: any) => {
    dispatch(AddLeadlist(requestData));
    formik.resetForm();
    localStorage.removeItem("product");
    setCartData([]);
    window.dispatchEvent(new Event("cartChanged"));
    if (onClose) {
      onClose();
    }
    toast.success("Payment successful. Our advisor will contact you soon.");
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8  bg-White  bg-[url('/images/ad-bg-pattern.png')]  bg-repeat bg-[length:600px_600px] ">
      <ToastMessage />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[2rem] border border-slate-200 bg-White p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-md font-body uppercase tracking-[0.35em] text-slate-500">Checkout</p>
              <h1 className="mt-3 text-3xl font-body font-semibold tracking-tight text-slate-950">Complete your order</h1>
              <p className=" text-sm font-body leading-6 text-slate-600">
                Enter your details, review your items, and place the order with secure payment.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                <p className="text-sm font-body uppercase tracking-[0.35em] text-slate-500">Step 1</p>
                <p className="mt-1 font-semibold font-body text-slate-900">Customer info</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                <p className="text-sm uppercase font-body tracking-[0.35em] text-slate-500">Step 2</p>
                <p className="mt-1 font-semibold font-body text-slate-900">Delivery details</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                <p className="text-sm uppercase font-body tracking-[0.35em] text-slate-500">Step 3</p>
                <p className="mt-1 font-semibold font-body text-slate-900">Confirm payment</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="grid gap-8 lg:grid-cols-[1.8fr_1fr]">
          <div className="space-y-6">
            <section className="rounded-[2rem] border border-slate-200 bg-White p-6 shadow-sm">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-md font-body uppercase tracking-[0.35em] text-slate-500">1. Account details</p>
                  <h2 className="mt-2 font-body text-2xl font-semibold text-slate-950">Contact information</h2>
                </div>
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
                  Secure checkout
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Inputbox
                  id="name"
                  name="name"
                  label="Full name"
                  type="text"
                  required={true}
                  placeholder="John Doe"
                  validation={formik}
                />
                <Inputbox
                  id="phone"
                  name="phone"
                  label="Mobile number"
                  type="tel"
                  required={true}
                  placeholder="+91-9876543210"
                  validation={formik}
                />
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-White p-6 shadow-sm">
              <div className="mb-6">
                <p className="text-md font-body uppercase tracking-[0.35em] text-slate-500">2. Delivery address</p>
                <h2 className="mt-2 font-body text-2xl font-semibold text-slate-950">Where should we send it?</h2>
              </div>

              <div className="space-y-4">
                <Inputbox
                  id="address"
                  name="address"
                  label="Address"
                  type="text"
                  required={true}
                  placeholder="Flat, area, street, landmark"
                  validation={formik}
                />

                <div className="grid gap-4 sm:grid-cols-3">
                  <Inputbox
                    id="city"
                    name="city"
                    label="City"
                    type="text"
                    required={true}
                    placeholder="Ahmedabad"
                    validation={formik}
                  />
                  <Inputbox
                    id="zipCode"
                    name="zipCode"
                    label="Postal code"
                    type="text"
                    required={true}
                    placeholder="380054"
                    validation={formik}
                  />
                  <div className="flex flex-col">
                    <label className="mb-2 text-sm font-medium text-slate-900">Country</label>
                    <select
                      id="country"
                      name="country"
                      value="India"
                      disabled
                      className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                    >
                      <option>India</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="sticky top-8 space-y-6 rounded-[2rem] border border-slate-200 bg-White p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm uppercase font-body tracking-[0.35em] text-slate-500">Order summary</p>
                  <h2 className="mt-2 text-2xl font-body font-semibold text-slate-950">Your cart</h2>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
                  {cartData.length} item{cartData.length === 1 ? "" : "s"}
                </span>
              </div>

              {cartData.length > 0 ? (
                <div className="space-y-4">
                  {cartData.map((item) => (
                    <div key={item._id} className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-White shadow-sm">
                        {item.product_pics ? (
                          <LazyLoadImage
                            src={item.product_pics[0]}
                            alt={typeof item.name === "string" ? item.name : item.name.englishname}
                            effect="blur"
                            className="h-12 w-12 rounded-2xl object-cover"
                          />
                        ) : (
                          <FaShoppingCart className="text-slate-400 text-2xl" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-base font-semibold text-slate-950">
                          {typeof item.name === "string" ? item.name : item.name.englishname}
                        </p>
                        <p className="text-sm text-slate-500">Qty {item.quantity}</p>
                      </div>
                      <p className="text-lg font-semibold text-slate-950">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-10 text-center">
                  <FaShoppingCart className="mx-auto text-5xl text-slate-300" />
                  <p className="mt-4 text-lg font-medium text-slate-500">Your cart is empty</p>
                </div>
              )}

              <div className="space-y-3 text-slate-700">
                <div className="flex justify-between text-sm font-body ">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-body  text-emerald-600">
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-body ">
                  <span>Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <PaymentButton
                amount={total}
                cartData={cartData}
                validation={formik}
                onPaymentSuccess={handlePaymentSuccess}
              />
              <p className="text-center text-xs text-slate-500">
                Tax included. Shipping calculated at checkout.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
};

export default CheckoutSection;
