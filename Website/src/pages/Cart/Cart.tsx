import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Form, Input, FormFeedback, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AddLeadlist, ResetLeadlist } from '../../Store/Lead/action';
import { useLocation, useNavigate } from "react-router-dom";
import ToastMessage from "../../component/ToastMessage";
const IMG_URL = import.meta.env.VITE_API_URL; 
// const IMG_URL = import.meta.env["VITE_API_URL"];

interface CartProps {
  cartOpen?: boolean;
  onClose?: () => void;
}

const CartSection: React.FC<CartProps> = ({ cartOpen, onClose }) => {
  const [CartData, setCartData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleDelete = (productId: string) => {
    const storedCart = localStorage.getItem("product");
    if (!storedCart) return;
    const cartItems = JSON.parse(storedCart);
    const updatedCart = cartItems.filter((item: any) => item._id !== productId);
    localStorage.setItem("product", JSON.stringify(updatedCart));
    setCartData(updatedCart);
    window.dispatchEvent(new Event("cartChanged"));
  };

  const [formSubmitted, setFormSubmitted] = useState(false);
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

  const [initialValues, setinitialValues] = useState({
    name: "",
    email: "",
    phone_number: "",
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,

    validationSchema: Yup.object({
      name: Yup.string().required("Please enter  name"),
      phone_number: Yup.string()
        .required("Please enter phone number")
        .matches(/^\d+$/, "Phone number must be digits only")
        .min(10, "Phone number must be at least 10 digits")
        .max(10, "Phone number must be at most 10 digits"),
    }),

    onSubmit: (values) => {
      let requserdata = {
        name: values?.name,
        products : CartData.map((item: any) => ({
          _id: item._id,
          quantity: item.quantity,
        })),
        mobile_number: values?.phone_number,
        type: "order",
      };
      dispatch(AddLeadlist(requserdata));
      validation.resetForm();
       setFormSubmitted(true);  
    },
  });

    // ------------- Get data from redux code start ------------- 
      const Adddetail :any = useSelector((state:any) => state.Lead.AddLeaddatalist); 
             
      useEffect(() => { 
          const isProductPage = location.pathname === "/product" || location.pathname.startsWith("/product-detail");
        if (formSubmitted  && Adddetail &&  isProductPage ) { 
           localStorage.removeItem("product")
            setCartData([]);
            window.dispatchEvent(new Event("cartChanged"));
              if (onClose) {
                onClose();
              }
              toast.success(t('advisor_contact_success'));
              // dispatch(ResetLeadlist())
            setTimeout(() =>{
              toast.success(t('advisor_contact_success'));
              navigate("/")
            },3000)
        }
      }, [Adddetail]); 
    // ------------- Get data from redux code end -------------

  return (
    <>
      <div
        className={`fixed top-0 right-0 z-[9999] h-full w-full  md:w-[25rem] bg-white shadow-lg transition-transform duration-300 ${
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
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="p-2 md:p-4 ">
          <div className="md:h-[20rem]  md:max-h-[18rem] overflow-scroll">
            {CartData.length > 0 ? (
              <div className="space-y-4">
                {CartData &&  CartData.map((item: any, k: number) => (
                    <div   key={k} className="flex gap-4 items-center p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition"   >
                      {/* Product Image */}
                      <div className="w-16 h-16 flex items-center justify-center rounded-lg border bg-gray-50">
                        <LazyLoadImage
                          effect="blur"
                          src={`${IMG_URL}/public/product/${item?.product_pics[0]}`}
                          alt={item?.title}
                          className="w-[3rem] h-[3rem] object-contain"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <p className="text-md font-semibold font-heading  max-w-[12rem] truncate text-gray-900 truncate">
                          {item?.name?.englishname}
                        </p>

                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-700">
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
         
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
              className="bg-white rounded-lg p-3 border rounded-xl shadow-sm bg-white hover:shadow-md transition my-3 text-gray-900 "
            >
               <div className="flex flex-col">
              <div className="mb-2 flex justify-between">
                <label className="text-md block uppercase tracking-wide self-center">   {t("First name")} <span className="text-red-500">*</span> </label>
                <div className="">
                  <Input
                    id="name"
                    name="name"
                    className="w-[13rem] md:w-[15rem]  border-b border-green-600 focus:outline-none py-2"
                    placeholder={t("enter_name")}
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.name || ""}
                    invalid={
                      validation.touched.name && validation.errors.name
                        ? true
                        : false
                    }
                  />
                  {validation.touched.name && validation.errors.name ? (
                    <FormFeedback
                      type="invalid"
                      className="text-red-500 text-sm"
                    >
                      {validation.errors.name}
                    </FormFeedback>
                  ) : null}
                </div>
              </div>

              <div className=" mt-3  flex justify-between">
                <label className="text-md block uppercase tracking-wide self-center">  {t("Phone")} <span className="text-red-500">*</span>  </label>

                <div className="mt-1">
                  <Input
                    id="phone_number"
                    name="phone_number"
                    className="w-[13rem] md:w-[15rem] border-b border-green-600 focus:outline-none py-2"
                    placeholder={t("enter_contect")}
                    type="number"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.phone_number || ""}
                    invalid={
                      validation.touched.phone_number &&
                      validation.errors.phone_number
                        ? true
                        : false
                    }
                  />
                  {validation.touched.phone_number &&  validation.errors.phone_number ? (
                    <FormFeedback  type="invalid"  className="text-red-500 text-sm"> {validation.errors.phone_number}   </FormFeedback>
                  ) : null}
                </div>
              </div>
         
          </div>
          <div className="p-4 border-t">
            {  CartData.length > 0  ?
            <button  type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg text-xl hover:bg-green-700 transition font-heading" > Place Order : {totalAmount.toFixed(0)} Rs.  </button>
              :
            <div className="w-full bg-green-300 text-white py-2 rounded-lg text-xl text-center transition font-heading" > Place Order : {totalAmount.toFixed(0)} Rs.  </div>
            }
          </div>
             </Form>
        </div>
      </div>

      <ToastMessage />
    </>
  );
};

export default CartSection;
