import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {  FaShoppingCart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AddLeadlist, ResetLeadlist } from '../../Store/Lead/action';
import { useLocation, useNavigate } from "react-router-dom";
import ToastMessage from "../../component/ToastMessage";

interface CartProps {
  cartOpen?: boolean;
  onClose?: () => void;
}

const CartSection: React.FC<CartProps> = ({ cartOpen, onClose }) => {
  const [CartData, setCartData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (productId: string) => {
    const storedCart = localStorage.getItem("product");
    if (!storedCart) return;
    const cartItems = JSON.parse(storedCart);
    const updatedCart = cartItems.filter((item: any) => item._id !== productId);
    localStorage.setItem("product", JSON.stringify(updatedCart));
    setCartData(updatedCart);
    window.dispatchEvent(new Event("cartChanged"));
  };

  useEffect(() => {
    const loadCart = () => {
      const storedCart = localStorage.getItem("product");
      if (storedCart) {
        const cartItems = JSON.parse(storedCart);
        setCartData(cartItems);
      }
    };

    loadCart();
    window.addEventListener("cartChanged", loadCart);

    return () => {
      window.removeEventListener("cartChanged", loadCart);
    };
  }, []);

  const totalAmount = CartData.reduce((sum: number, item: any) => {
    return sum + item.price * item.quantity;
  }, 0);


  const Checkoutcall = () =>{
      if (CartData.length === 0) {
        toast.error("Your cart is empty. Please add items to proceed to checkout.");
        return;
      } else {
        navigate("/checkout");
      }
  }

  // const [initialValues, setinitialValues] = useState({
  //   name: "",
  //   email: "",
  //   phone_number: "",
  // });

  // const validation = useFormik({
  //   enableReinitialize: true,
  //   initialValues: initialValues,

  //   validationSchema: Yup.object({
  //     name: Yup.string().required("Please enter  name"),
  //     phone_number: Yup.string()
  //       .required("Please enter phone number")
  //       .matches(/^\d+$/, "Phone number must be digits only")
  //       .min(10, "Phone number must be at least 10 digits")
  //       .max(10, "Phone number must be at most 10 digits"),
  //   }),

  //   onSubmit: (values) => {
  //     let requserdata = {
  //       name: values?.name,
  //       products : CartData.map((item: any) => ({
  //         _id: item._id,
  //         quantity: item.quantity,
  //       })),
  //       mobile_number: values?.phone_number,
  //       type: "order",
  //     };
  //     dispatch(AddLeadlist(requserdata));
  //     validation.resetForm();
  //      setFormSubmitted(true);  
  //   },
  // });

    // // ------------- Get data from redux code start ------------- 
    //   const Adddetail :any = useSelector((state:any) => state.Lead.AddLeaddatalist); 
             
    //   useEffect(() => { 
    //       const isProductPage = location.pathname.startsWith("/product");
    //     if (formSubmitted  && Adddetail &&  isProductPage ) { 
    //        localStorage.removeItem("product")
    //         setCartData([]);
    //         window.dispatchEvent(new Event("cartChanged"));
    //           if (onClose) {
    //             onClose();
    //           }
    //              toast.success("Our Advisor will contact you soon.")
    //           // dispatch(ResetLeadlist())
    //         setTimeout(() =>{
    //              toast.success("Our Advisor will contact you soon.")
    //           navigate("/")
    //         },3000)
    //     }
    //   }, [Adddetail]); 
    // // ------------- Get data from redux code end -------------

  return (
    <>
      <div
        className={`fixed top-0 right-0 z-[9999] h-full w-full  md:w-[25rem] bg-White shadow-lg transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-labelledby="My Cart"
        role="dialog"
      >
        <div className="flex justify-between px-4  ">
          <h4 className=" items-center  text-[2rem] font-semibold font-heading">
            <span className="text-green-600 self-center flex gap-x-3">
              Cart <FaShoppingCart className="self-center" />
            </span>
          </h4>
          <button
            onClick={onClose}
            className="text-SharkGray hover:text-TranquilBlack"
            aria-label="Close"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="p-2 md:p-4 ">
          <div className="sm:h-[30rem] sm:max-h-[30rem] overflow-scroll">
            {CartData.length > 0 ? (
              <div className="space-y-4">
                {CartData &&  CartData.map((item: any, k: number) => (
                    <div   key={k} className="flex gap-4 items-center p-4 border rounded-xl shadow-sm bg-White hover:shadow-md transition"   >
                      {/* Product Image */}
                      <div className="w-16 h-16 flex items-center justify-center rounded-lg border bg-White">
                        <LazyLoadImage
                          effect="blur"
                          src={item?.product_pics[0]}
                          alt={item?.title}
                          className="w-[3rem] h-[3rem] object-contain"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <p className="text-md font-semibold font-heading  max-w-[12rem] truncate text-DarkBackground truncate">
                          {item?.name?.englishname.toUpperCase()}
                        </p>

                        <div className="flex items-center gap-2 mt-1 text-sm text-TranquilBlack">
                          <span>₹{item?.price}</span>
                          <span className="font-medium">×</span>
                          <span>{item?.quantity}</span>
                        </div>

                        <p className="mt-1 text-base font-semibold text-green-700">
                          ₹{(item?.price * item?.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(item?._id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Remove from cart"
                      >
                        <MdDelete className="text-2xl" />
                      </button>
                    </div>
                  ))}
              </div>
            ) : (
           <div className="flex justify-center self-center">  <img src="/images/empty-cart.jpg"  height={260} width={260} /> </div>
            )}
          </div>
        
          <div className="p-4 border-t">
            { CartData.length > 0  ?
              <button onClick={Checkoutcall} className="w-full bg-green-600 text-White py-2 rounded-lg text-xl hover:bg-green-700 transition font-Body" > Checkout : {totalAmount.toFixed(0)} Rs.  </button>
              :
              <div className="w-full bg-green-300 text-White py-2 rounded-lg text-xl text-center transition font-Body" > Checkout : {totalAmount.toFixed(0)} Rs.  </div>
            }
          </div>
        </div>
      </div>

      <ToastMessage />
    </>
  );
};

export default CartSection;
