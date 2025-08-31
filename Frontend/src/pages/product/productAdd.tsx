import { FC, useEffect, useState } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { Label, Button } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { HiTrash} from "react-icons/hi";
import { Form, Input, FormFeedback } from "reactstrap";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AddProductlist, getCategorylist, getCompanylist, getCroplist, getPackingTypelist, GetProductViewlist, ResetProductlist, UpdateProductlist } from "../../Store/actions";
import MultiImageUploadPreview from "../../components/multiimageuploader";
import { toast } from "react-toastify";

  interface DescriptionData {
    id: string;
    englishHeader: string;
    englishValue: string;
    gujaratiHeader: string;
    gujaratiValue: string;
  }
  
  interface TechName {
    gujarati_tech_name: string;
    english_tech_name: string;
  }
  
  interface CompanyData {
    _id: string;
    name_eng: string;
    name_guj: string;
  }

  interface Category {
    _id: string;
    name_eng: string;
    name_guj: string;
  }
  
  interface PackingType {
    _id : string;
    type_eng: string;
    type_guj: string;
  }
  
  interface Name {
    gujaratiname: string;
    englishname: string;
  }

  interface ProductDetails {
    _id: string;
    added_at: string;
    name: Name;
    tech_name: TechName;
    avl_qty: number | string;
    batch_no:  string;
    hsn_code: string;
    c_gst: number | string;
    s_gst: number | string;
    company: CompanyData;
    categories: Category;
    crops: Category;
    price: number | string;
    discount: number;
    packaging: number | string;
    packagingtype: PackingType;
    description: DescriptionData[];
    product_pics: any[];
    rating: any;
    is_active: boolean;
    is_deleted: boolean;
  }

const ProductAddPage : FC = function () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [file, setFile] = useState<File[] >([]);
    const [productImage, setProductImage] = useState <(File | string)[]>([]);
    const [validateProduct, setvalidateProduct] = useState(0);

    useEffect(() =>{
        if(file?.length && file?.length > 0 || productImage?.length && productImage?.length > 0){
            setvalidateProduct(0)
        }else if(file?.length == 0 ){
            setvalidateProduct(1)
            return;
        }
    },[file, productImage])

    useEffect(() =>{
        if(CompanyListData.length == 0) dispatch(getCompanylist({all:"true"})); 
        if (PackingTypeListData.length == 0) dispatch(getPackingTypelist());
        if (CategoryListData.length == 0) dispatch(getCategorylist());
        if (CropListData.length == 0) dispatch(getCroplist({all:"true"}));
    },[])

    // ------------- Company Get Data From Reducer Code Start --------------
        const [ CompanyListData, setCompanyListData] = useState([]);
        const Companylist = useSelector((state: any) => state.Company.Companylist,);
        const companyoption = CompanyListData ?.filter((item: any) => item.is_active)  .map((item: any) => ({ label: item.name_eng, value: item._id }));
        const [selectedCompanyOption, setSelectedCompanyOption] = useState<{label: string, value:string} | null>(null);
        const [selectedCompanyid, setSelectedCompanyid] = useState<string | null>(null);
        const [validateCompany, setValidateCompany] = useState(0);
  
        useEffect(() => {        
            setCompanyListData(Companylist? Companylist : []);
        },[Companylist]);

        const IsCompanydata = (data: any) => {
          if (!data) {
            setSelectedCompanyid("");
            setSelectedCompanyOption(null);
            setValidateCompany(1)
          } else {
            setSelectedCompanyid(data.value);
            setSelectedCompanyOption(data);
            setValidateCompany(0)
          }
        };
    //  ------------- Company Get Data From Reducer Code end --------------
  
    // ------------- Packing Type Get Data From Reducer Code Start --------------
        const [PackingTypeListData, setPackingTypeListData] = useState([]);
        const Packingtypelist  = useSelector((state: any) => state.PackingType.Packingtypelist,);
        const packingtypeoption = PackingTypeListData && PackingTypeListData ?.filter((item: any) => item.is_active)  .map((item: any) => ({ label: item.type_eng, value: item._id }));
        const [selectedpackingTypeOption, setSelectedpackingTypeOption] = useState<{label: string, value:string} | null>(null);
        const [selectedpackingTypeid, setSelectedpackingTypeid] = useState<string | null>(null);
        const [validatepackingType, setValidatepackingType] = useState(0);

        useEffect(() => {
            setPackingTypeListData(Packingtypelist ? Packingtypelist : []);
        }, [Packingtypelist]);
      
        const IspackingTypedata = (data: any) => {
          if (!data) {
            setSelectedpackingTypeid("");
            setSelectedpackingTypeOption(null);
            setValidatepackingType(1)
          } else {
            setSelectedpackingTypeid(data.value);
            setSelectedpackingTypeOption(data);
            setValidatepackingType(0)
          }
        };
    //  ------------- Packing Type Get Data From Reducer Code end --------------

    // ------------- Category Get Data From Reducer Code Start --------------
        const [CategoryListData, setCategoryListData] = useState([]);
        const  Categorylist  = useSelector((state: any) => state.Category.Categorylist,);
        const categoryoption = CategoryListData && CategoryListData?.filter((item: any) => item.is_active).map((item: any) => ({ label: item.name_eng, value: item._id }));
        const [selectedCategoryOption, setSelectedCategoryOption] = useState<{ label: string, value: string } | null>(null);
        const [selectedCategoryid, setSelectedCategoryid] = useState<string | null>(null);
        const [validateCategory, setValidateCategory] = useState(0);

        useEffect(() => {
            setCategoryListData(Categorylist ? Categorylist : []);
        }, [Categorylist]);

        const IsCategorydata = (data: any) => {
            if (!data) {
                setSelectedCategoryid("");
                setSelectedCategoryOption(null);
                setValidateCategory(1)
            } else {
                setSelectedCategoryid(data.value);
                setSelectedCategoryOption(data);
                setValidateCategory(0)
            }
        };
    //  ------------- Category Get Data From Reducer Code end --------------
    
    // ------------- Crop Get Data From Reducer Code Start --------------
        const [CropListData, setCropListData] = useState([]);
        const  Croplist  = useSelector((state: any) => state.Crop.Cropdatalist);
        const cropoption = CropListData && CropListData?.filter((item: any) => item.is_active).map((item: any) => ({ label: item.name_eng, value: item._id }));
  const [selectedcropOption, setSelectedcropOption] = useState<{ label: string, value: string }[] | []>([]);
        const [selectedCropid, setSelectedCropid] = useState<string | string[]>([]);
        const [validateCrop, setValidateCrop] = useState(0);

        useEffect(() => {
            setCropListData(Croplist ? Croplist : []);
        }, [Croplist]);

        const IsCropdata = (data: any) => {
            if (!data) {
                setSelectedCropid([]);
                setSelectedcropOption([]);
                setValidateCrop(1)
            } else {
                const selectedIds = data.map((item: any) => item.value);
                setSelectedCropid(selectedIds);
                setSelectedcropOption(data);
                setValidateCrop(0)
            }
        };
    //  ------------- Crop Get Data From Reducer Code end --------------

    // -------------------- product description code start -----------------
        const [inputs, setInputs] = useState<DescriptionData[]>([   { id: "", gujaratiHeader: "", englishHeader: "", gujaratiValue: "", englishValue: "" }]);
        const [descriptionErrors, setDescriptionErrors] = useState<{ [key: string]: Partial<DescriptionData> }>({});
        const handleChange = (id: string, field: keyof DescriptionData, newValue: string) => {
            setInputs((prev) =>
                prev.map((item) => (item.id === id ? { ...item, [field]: newValue } : item))
            );
        };

        const handleAddField = () => {
            if(inputs.length !== 10 ){
                setInputs([...inputs, { id: String(Date.now()), gujaratiHeader: "", englishHeader: "", gujaratiValue: "", englishValue: "" }]);
            }
            else{
                toast.error("Only 10 description added for product")
            }
        };

        const handleRemoveField = (id: string) => {
            setInputs((prev) => prev.filter((item) => item.id !== id));
        };
    // -------------------- product description code end -----------------

    // ------ status code start ------
        const [selectedactiveOption, setSelectedactiveOption] = useState(null);
        const [selectedactiveid, setSelectedactiveid] = useState<null | boolean>(null);
        const [validateactive, setValidateactive] = useState(0);
    
        const IsActivedata = (data: any) => {
        if (!data) {
            setSelectedactiveid(null);
            setSelectedactiveOption(null);
            setValidateactive(1)
        } else {
            setSelectedactiveid(data.value);
            setSelectedactiveOption(data);
            setValidateactive(0)
        }
        };
    // ------ status code end ------

    const [initialValues, setinitialValues] = useState<ProductDetails>({
        added_at: '',
        avl_qty: '',
        batch_no: '',
        c_gst: 0,
        company: {
            _id: '',
            name_eng: '',
            name_guj: ''
        },
        categories: {
            _id: '',   
            name_eng: '',
            name_guj: ''
        },
        crops: {
            _id: '',   
            name_eng: '',
            name_guj: ''
        },
        description: [ {
            id: "",
            englishHeader: "",
            englishValue: "",
            gujaratiHeader: "",
            gujaratiValue: ""
          }],
        discount: 0,
        hsn_code: '',
        is_active: true,
        is_deleted: false,
        name: {
            gujaratiname: '',
            englishname: ''
        },
        packaging: '',
        packagingtype: {
            _id : '',
            type_eng: '',
            type_guj: ''
        },
        price: '',
        product_pics: [],
        rating: null,
        s_gst: 0,
        tech_name: {
            gujarati_tech_name: '',
            english_tech_name: ''
        },
        _id: ''
    });

    const validateDescriptions = () => {
    const errors: { [key: string]: Partial<DescriptionData> } = {};

    inputs.forEach((item) => {
        const fieldErrors: Partial<DescriptionData> = {};

        if (!item.englishHeader?.trim()) fieldErrors.englishHeader = "English Header is required";
        if (!item.gujaratiHeader?.trim()) fieldErrors.gujaratiHeader = "Gujarati Header is required";
        if (!item.englishValue?.trim()) fieldErrors.englishValue = "English Value is required";
        if (!item.gujaratiValue?.trim()) fieldErrors.gujaratiValue = "Gujarati Value is required";

        if (Object.keys(fieldErrors).length > 0) {
        errors[item.id] = fieldErrors;
        }
    });

    setDescriptionErrors(errors);
    return Object.keys(errors).length === 0;
    };

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
    
        validationSchema: Yup.object({
            name: Yup.object({
                englishname: Yup.string().required("Please enter english product name"),
                gujaratiname: Yup.string().required("Please enter gujarati product name"),
            }),
            // tech_name: Yup.object({
            //     english_tech_name: Yup.string().required("Please enter english product technical name"),
            //     gujarati_tech_name: Yup.string().required("Please enter gujarati product technical  name"),
            // }),
          packaging: Yup.string().required("Please enter product packing"),
          avl_qty: Yup.string().required("Please enter product qty"),
          price: Yup.string().required("Please enter product price"),
          discount: Yup.string().required("Please enter product discount"),
          batch_no: Yup.string().required("Please enter product batch number"),
          hsn_code: Yup.string().required("Please enter product hsn code"),
          c_gst: Yup.string().required("Please enter product cgst"),
        }),
        
        onSubmit: (values) => {
              const isValidDescriptions = validateDescriptions();
                if (!isValidDescriptions) {
                    toast.error("Please fill all product descriptions.");
                    return;
                }

            if(file?.length === 0 && productImage?.length === 0){
                setvalidateProduct(1)
                return;
            }
            if(selectedactiveid ==  null){
                setValidateactive(1)
                return;
            }

            if(selectedCategoryid == null){
                setValidateCategory(1)
                return;
            }

            // if(selectedCropid.length === 0){
            //     setValidateCrop(1)
            //     return;
            // }

            if(selectedpackingTypeid == null){
                setValidatepackingType(1)
                return;
            }

            if(selectedCompanyid == null){
                setValidateCompany(1)
                return;
            }

            const formData = new FormData();
            formData.append("name[gujaratiname]", values?.name?.gujaratiname);
            formData.append("name[englishname]", values?.name?.englishname);
            formData.append("tech_name[gujarati_tech_name]", values?.tech_name?.gujarati_tech_name);
            formData.append("tech_name[english_tech_name]", values?.tech_name?.english_tech_name);
            formData.append("packaging", JSON.stringify(values?.packaging));
            formData.append("price", JSON.stringify(values?.price));
            formData.append("discount", values?.discount?.toString() ?? "0");
            formData.append("packagingtype",  String(selectedpackingTypeid));
            formData.append("company", String(selectedCompanyid));
            formData.append("categories", String(selectedCategoryid));
            formData.append("crops",  JSON.stringify(selectedCropid));
            formData.append("batch_no", values?.batch_no);
            formData.append("hsn_code", values?.hsn_code);
            formData.append("c_gst",  JSON.stringify(values?.c_gst));
            formData.append("s_gst",  JSON.stringify(values?.c_gst));
            formData.append("avl_qty",  JSON.stringify(values?.avl_qty));
            inputs.forEach((item, index) => {
                formData.append(`description[${index}][gujaratiHeader]`, item.gujaratiHeader);
                formData.append(`description[${index}][englishHeader]`, item.englishHeader);
                formData.append(`description[${index}][gujaratiValue]`, item.gujaratiValue);
                formData.append(`description[${index}][englishValue]`, item.englishValue);
            });
            formData.append("is_active", JSON.stringify(selectedactiveid));
            if (file) {
                file.forEach((data) => {
                    formData.append("product_pics", data);
                });
            }

            if(id){
                formData.append("id", id);
                dispatch(UpdateProductlist(formData));
            }
            else{
                dispatch(AddProductlist(formData));
            }
        
        },
    });

    const isactiveoption =[
        { label :"Active", value : true },
        { label :"Inactive", value : false }
    ]

    // ------------- Get  Data From Reducer Code Start --------------
        const AddCompanyDatalist  = useSelector((state: any) =>  state.Product.AddProductlist );
        const UpdateProductlistdata  = useSelector((state: any) =>  state.Product.UpdateProductlist );


        useEffect(() => {  
            if(AddCompanyDatalist?.success == true || UpdateProductlistdata?.success == true){
                if(AddCompanyDatalist?.success ){
                    toast.success(AddCompanyDatalist?.msg)
                }else if(UpdateProductlistdata?.success){
                    toast.success(UpdateProductlistdata?.msg)
                }
                dispatch(ResetProductlist())
                navigate(ParentLink)
                validation.resetForm();
                setSelectedactiveid(null);
                setSelectedactiveOption(null);
                setValidateactive(1)
            }
        }, [AddCompanyDatalist, UpdateProductlistdata]);
    //  ------------- Get Data From Reducer Code end --------------

    // -------------  Sigle Data from reducer --------------
    useEffect(() => {
        dispatch(ResetProductlist())
        if (id) {
            let requserdata = { id: id };
            dispatch(GetProductViewlist(requserdata))
        }
    }, [id])

    const [ProductList, setProductList] = useState<ProductDetails>();
    const  Productlist  = useSelector((state: any) => state.Product.singleProductlist);

    useEffect(() => {
        setProductList(Productlist?.data);
    }, [Productlist]);

    useEffect(() => {
        setinitialValues(prev => ({
            ...prev,
            name: {
                ...prev.name,
                englishname: ProductList?.name?.englishname ?? "",
                gujaratiname: ProductList?.name?.gujaratiname ?? ""
            },
            tech_name: {
                ...prev.tech_name,
                english_tech_name: ProductList?.tech_name?.english_tech_name ?? "",
                gujarati_tech_name: ProductList?.tech_name?.gujarati_tech_name ?? ""
            },
            packaging: ProductList?.packaging ?? "",
            avl_qty: ProductList?.avl_qty ?? "",
            price: ProductList?.price ?? "",
            discount: ProductList?.discount ?? 0,
            batch_no: ProductList?.batch_no ?? "",
            hsn_code: ProductList?.hsn_code ? JSON.parse(ProductList.hsn_code) : "",
            c_gst: ProductList?.c_gst ?? "",
            s_gst: ProductList?.s_gst ?? "",
        }));

        if (ProductList?.description) {
            const formattedDescription = ProductList?.description.map((desc:any) => ({
              id: desc._id,
              englishHeader: desc.englishHeader,
              englishValue: desc.englishValue,
              gujaratiHeader: desc.gujaratiHeader,
              gujaratiValue: desc.gujaratiValue,
            }));
      
            setInputs(formattedDescription);
        }

        if (ProductList?.product_pics) {
            const formattedDescription = ProductList?.product_pics.map((desc) =>  desc );
            setFile([]);
            setProductImage(formattedDescription);
            setvalidateProduct(0)
        }
        if (ProductList?.company && companyoption.length > 0) {
            const selectedRole = companyoption.find((role: any) => role.value === ProductList?.company?._id);
            setSelectedCompanyOption(selectedRole || null);
            setSelectedCompanyid(selectedRole?.value);
        }
        if (ProductList?.packagingtype && packingtypeoption.length > 0) {
            const selectedGender = packingtypeoption.find((gender: any) => gender.value === ProductList.packagingtype?._id);
            setSelectedpackingTypeOption(selectedGender || null);
            setSelectedpackingTypeid(selectedGender ? String(selectedGender.value) : "");
        }

        if (ProductList?.is_active !== undefined && ProductList?.is_active !== null && isactiveoption.length > 0) {
            const selectedSatus: any = isactiveoption.find((gender: any) => gender.value === ProductList.is_active);
            setSelectedactiveOption(selectedSatus);
            setSelectedactiveid(selectedSatus?.value ?? null);
        }

        if (ProductList?.categories && categoryoption.length > 0) {
            const selectedCategory: any = categoryoption.find((dropdown: any) => dropdown.value === ProductList.categories?._id);
            setSelectedCategoryOption(selectedCategory || null);
            setSelectedCategoryid(selectedCategory?.value);
        }

        // if (ProductList?.crops && cropoption.length > 0) {
        //     const selectedCrops: any = cropoption.find((dropdown: any) => dropdown.value === ProductList.crops?._id);
        //     setSelectedCropOption(selectedCrops || null);
        //     setSelectedCropid(selectedCrops?.value);
        // }

         if (Array.isArray(ProductList?.crops)) {
            const cropOptions = ProductList?.crops.map((crop: any) => ({
                label: crop.name_eng,
                value: crop._id
            }));
            setSelectedcropOption(cropOptions);
            setSelectedCropid(ProductList.crops.map((crop: any) => crop._id));
        }
    }, [ProductList]);
    // -------------  Sigle Data from reducer --------------

    let Name =  id ? "Update Product" : "Product Add";
    let ParentName = "Product List";
    let ParentLink = "/product/list";

    return (
        <>  
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
                <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink}  />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); 
                        validation.handleSubmit(); 
                        return false; 
                        }} >
                        
                        <div className="mb-4">
                            <label className="dark:text-gray-100 text-[1.2rem]"> Product Image <span className='text-red-500'>*</span> </label>
                            <MultiImageUploadPreview onFileSelect={setFile} defaultImage={productImage} onDefaultImageChange={setProductImage} />
                            {validateProduct == 1 ? ( <FormFeedback type="invalid" className="text-Red text-sm"> Please select product photo </FormFeedback> ) : null}
                        </div>
                        
                      
                        <div className="dark:bg-gray-800 flex-1 p-4 rounded-lg border border-gray-300 dark:border-gray-500 space-y-3 mb-4">
                            <div className="text-[1.2rem] font-bold dark:text-gray-100"> Product Name</div>
                            <div className="flex-1 mt-[1rem] ">
                                <Label htmlFor="Name">Name ( Eng ) <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                    <Input
                                        id="englishname"
                                        name="name.englishname"
                                        className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                        placeholder="Product english name"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values?.name?.englishname || ""}
                                        invalid={validation.touched?.name?.englishname && validation.errors?.name?.englishname ? true : false}
                                    />
                                    {validation.touched.name?.englishname && validation.errors?.name?.englishname ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.name?.englishname} </FormFeedback>) : null}
                                </div>
                            </div>

                            <div className="flex-1 mt-[1rem] ">
                                <Label htmlFor="Name">Name ( Guj ) <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                    <Input
                                        id="gujaratiname"
                                        name="name.gujaratiname"
                                        className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                        placeholder="Product gujarati name"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values?.name?.gujaratiname || ""}
                                        invalid={validation.touched?.name?.gujaratiname && validation.errors?.name?.gujaratiname ? true : false}
                                    />
                                    {validation.touched?.name?.gujaratiname && validation.errors?.name?.gujaratiname ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.name?.gujaratiname} </FormFeedback>) : null}
                                </div>
                            </div>
                        </div>
                            
                        <div className="dark:bg-gray-800  flex-1 p-4 rounded-lg border border-gray-300  dark:border-gray-500 space-y-3 mb-4">
                            <div className="text-[1.2rem] font-bold dark:text-gray-100"> Technical Name</div>
                            <div className="flex-1 mt-[1rem] ">
                                <Label htmlFor="tech_name">Technical Name ( Eng )</Label>
                                <div className="mt-1">
                                    <Input
                                        id="tech_name_eng"
                                        name="tech_name.english_tech_name"
                                        className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                        placeholder="Product technical name"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values?.tech_name?.english_tech_name || ""}
                                        invalid={validation.touched?.tech_name?.english_tech_name && validation.errors?.tech_name?.english_tech_name ? true : false}
                                    />
                                    {validation.touched?.tech_name?.english_tech_name && validation.errors?.tech_name?.english_tech_name ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.tech_name?.english_tech_name} </FormFeedback>) : null}
                                </div>
                            </div>

                            <div className="flex-1 mt-[1rem] ">
                                <Label htmlFor="Name">Technical Name ( Guj )  </Label>
                                <div className="mt-1">
                                    <Input
                                        id="gujarati_tech_name"
                                        name="tech_name.gujarati_tech_name"
                                        className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                        placeholder="Product technical  name"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values?.tech_name?.gujarati_tech_name || ""}
                                        invalid={validation.touched?.tech_name?.gujarati_tech_name && validation.errors?.tech_name?.gujarati_tech_name ? true : false}
                                    />
                                    {validation.touched?.tech_name?.gujarati_tech_name && validation.errors?.tech_name?.gujarati_tech_name ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.tech_name?.gujarati_tech_name} </FormFeedback>) : null}
                                </div>
                            </div>
                        </div>

                        <div className="md:flex gap-x-[2rem]">
                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="packaging">Packing <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Input
                                    id="packaging"
                                    name="packaging"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Product packing"
                                    type="number"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.packaging ?? ""}
                                    invalid={ validation.touched.packaging && validation.errors.packaging ? true : false}
                                />
                                {validation.touched.packaging && validation.errors.packaging ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.packaging} </FormFeedback> ) : null}
                                </div>
                            </div>

                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="Status">Packing Type <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Select
                                    className="w-full dark:text-white"
                                    classNames={{
                                        control: () => "react-select__control",
                                        singleValue: () => "react-select__single-value",
                                        menu: () => "react-select__menu",
                                        option: ({ isSelected }) =>
                                            isSelected ? "react-select__option--is-selected" : "react-select__option",
                                        placeholder: () => "react-select__placeholder",
                                    }}
                                    value={selectedpackingTypeOption}
                                    onChange={(e) => { IspackingTypedata(e) }}
                                    options={packingtypeoption}
                                    isClearable={true}
                                />
                                {validatepackingType == 1 ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> Please Select packing type </FormFeedback>
                                ) : null}
                                </div>
                            </div>

                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="Status">Category <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Select
                                    className="w-full dark:text-white"
                                    classNames={{
                                        control: () => "react-select__control",
                                        singleValue: () => "react-select__single-value",
                                        menu: () => "react-select__menu",
                                        option: ({ isSelected }) =>
                                            isSelected ? "react-select__option--is-selected" : "react-select__option",
                                        placeholder: () => "react-select__placeholder",
                                    }}
                                    value={selectedCategoryOption}
                                    onChange={(e) => { IsCategorydata(e) }}
                                    options={categoryoption}
                                    isClearable={true}
                                />
                                {validateCategory == 1 ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> Please Select category </FormFeedback>
                                ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="md:flex gap-x-[2rem]">

                              <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="Status">Crop  </Label>
                                <div className="mt-1">
                                <Select
                                    className="w-full dark:text-white"
                                    classNames={{
                                        control: () => "react-select__control",
                                        singleValue: () => "react-select__single-value",
                                        menu: () => "react-select__menu",
                                       option: ({ isSelected }) =>
                                            isSelected ? "react-select__option--is-selected" : "react-select__option",
                                            placeholder: () => "react-select__placeholder",
                                        }}
                                    value={selectedcropOption}
                                    onChange={(e) => { IsCropdata(e) }}
                                    options={cropoption}
                                    isClearable={true}
                                     isMulti={true}
                                />
                                {/* {validateCrop == 1 ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> Please Select crop </FormFeedback>
                                ) : null} */}
                                </div>
                            </div>

                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="qty"> QTY <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Input
                                    id="avl_qty"
                                    name="avl_qty"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Product QTY"
                                    type="number"
                                    min="0"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.avl_qty ?? ""}
                                    invalid={ validation.touched.avl_qty && validation.errors.avl_qty ? true : false}
                                />
                                {validation.touched.avl_qty && validation.errors.avl_qty ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.avl_qty} </FormFeedback> ) : null}
                                </div>
                            </div>

                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="price"> Price <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Input
                                    id="price"
                                    name="price"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Product Price"
                                    type="number"
                                    min="0"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.price ?? ""}
                                    invalid={ validation.touched.price && validation.errors.price ? true : false}
                                />
                                {validation.touched.price && validation.errors.price ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.price} </FormFeedback> ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="md:flex gap-x-[2rem]">
                             <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="discount"> Discount <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Input
                                    id="discount"
                                    name="discount"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Product discount"
                                    type="number"
                                    min="0" 
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.discount ?? ""}
                                    invalid={ validation.touched.discount && validation.errors.discount ? true : false}
                                />
                                {validation.touched.discount && validation.errors.discount ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.discount} </FormFeedback> ) : null}
                                </div>
                            </div>

                            <div className="flex-1 mt-[1rem] ">
                                <Label htmlFor="Status">Company <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Select
                                    className="w-full dark:text-white"
                                    classNames={{
                                        control: () => "react-select__control",
                                        singleValue: () => "react-select__single-value",
                                        menu: () => "react-select__menu",
                                        option: ({ isSelected }) =>
                                            isSelected ? "react-select__option--is-selected" : "react-select__option",
                                        placeholder: () => "react-select__placeholder",
                                    }}
                                    value={selectedCompanyOption}
                                    onChange={(e) => { IsCompanydata(e) }}
                                    options={companyoption}
                                    isClearable={true}
                                />
                                {validateCompany == 1 ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> Please Select company  </FormFeedback>
                                ) : null}
                                </div>
                            </div>

                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="batch_no"> Batch No <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Input
                                    id="batch_no"
                                    name="batch_no"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Product batch no"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.batch_no}
                                    invalid={ validation.touched.batch_no && validation.errors.batch_no ? true : false}
                                />
                                {validation.touched.batch_no && validation.errors.batch_no ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.batch_no} </FormFeedback> ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="md:flex gap-x-[2rem]">
                             <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="hsn_code"> HSN code <span className='text-red-500'>*</span> </Label>
                                <div className="mt-1">
                                <Input
                                    id="hsn_code"
                                    name="hsn_code"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Product hsn code"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.hsn_code}
                                    invalid={ validation.touched.hsn_code && validation.errors.hsn_code ? true : false}
                                />
                                {validation.touched.hsn_code && validation.errors.hsn_code ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.hsn_code} </FormFeedback> ) : null}
                                </div>
                            </div>
                            
                            <div className="flex gap-x-2">
                                <div className="flex-1 mt-[1rem] ">
                                    <Label htmlFor="c_gst"> CGST <span className='text-red-500'>*</span> </Label>
                                    <div className="mt-1">
                                    <Input
                                        id="c_gst"
                                        name="c_gst"
                                        className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-[10rem]"
                                        placeholder="Product CGST"
                                        type="number"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.c_gst}
                                        invalid={ validation.touched.c_gst && validation.errors.c_gst ? true : false}
                                    />
                                    {validation.touched.c_gst && validation.errors.c_gst ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.c_gst} </FormFeedback> ) : null}
                                    </div>
                                </div>

                                <div className="flex-1 mt-[1rem] ">
                                    <Label htmlFor="s_gst"> SGST <span className='text-red-500'>*</span> </Label>
                                    <div className="mt-1">
                                    <Input
                                        id="s_gst"
                                        name="s_gst"
                                        className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm  w-[10rem]"
                                        placeholder="Product SGST"
                                        type="number"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.c_gst }
                                        invalid={ validation.touched.s_gst && validation.errors.s_gst ? true : false}
                                    />
                                    {validation.touched.s_gst && validation.errors.s_gst ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.s_gst} </FormFeedback> ) : null}
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 mt-[1rem] ">
                            <Label htmlFor="Status">Status <span className='text-red-500'>*</span> </Label>
                            <div className="mt-1">
                            <Select
                                className="w-full dark:text-white"
                                classNames={{
                                    control: () => "react-select__control",
                                    singleValue: () => "react-select__single-value",
                                    menu: () => "react-select__menu",
                                    option: ({ isSelected }) =>
                                        isSelected ? "react-select__option--is-selected" : "react-select__option",
                                    placeholder: () => "react-select__placeholder",
                                }}
                              
                                value={selectedactiveOption}
                                onChange={(e) => { IsActivedata(e) }}
                                options={isactiveoption}
                                isClearable={true}
                            />
                            {validateactive == 1 ? (
                                <FormFeedback type="invalid" className="text-Red text-sm"> Please Select status </FormFeedback>
                            ) : null}
                            </div>
                            </div>
                        </div>

                        <div className=" text-white r w-full mt-[2rem] mx-auto">
                            <div className="flex justify-between">
                            <div className="mb-4 dark:text-gray-100 text-gray-900 text-[1.5rem] font-semibold"> Product Description</div>
                            <div onClick={handleAddField} className="mb-4 px-2 py-1 w-[12rem] text-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer"> Add New Description </div>
                            </div>

                            {inputs.map((item, index) => (
                                <div key={item.id} className="dark:bg-gray-800 p-4 rounded-lg border border-gray-300  dark:ring-gray-500 space-y-3 mb-4">
                                    <div className="grid lg:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1 dark:text-gray-100 text-gray-700">English Header</label>
                                            <Input
                                                type="text"
                                                placeholder="Header"
                                                value={item.englishHeader}
                                                onChange={(e) => handleChange(item.id, "englishHeader", e.target.value)}
                                                onBlur={() => {
                                                    if (!item.englishHeader?.trim()) {
                                                        setDescriptionErrors(prev => ({
                                                        ...prev,
                                                        [item.id]: { ...prev[item.id], englishHeader: "English Header is required" }
                                                        }));
                                                    }
                                                }}
                                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white  bg-gray-200 text-gray-700"
                                            />
                                            {descriptionErrors?.[item.id]?.englishHeader && (
                                                <p className="text-red-500 text-sm mt-1">{descriptionErrors[item.id]?.englishHeader}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1 dark:text-gray-100 text-gray-700">Gujarati Header</label>
                                            <Input
                                                type="text"
                                                placeholder="Header"
                                                value={item.gujaratiHeader}
                                                onChange={(e) => handleChange(item.id, "gujaratiHeader", e.target.value)}
                                                  onBlur={() => {
                                                    if (!item.gujaratiHeader?.trim()) {
                                                        setDescriptionErrors(prev => ({
                                                        ...prev,
                                                        [item.id]: { ...prev[item.id], gujaratiHeader: "Gujarati Header is required" }
                                                        }));
                                                    }
                                                }}
                                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white  bg-gray-200 text-gray-700"
                                            />
                                            {descriptionErrors?.[item.id]?.gujaratiHeader && (
                                                <p className="text-red-500 text-sm mt-1">{descriptionErrors[item.id]?.gujaratiHeader}</p>
                                            )}
                                        </div>  
                                    </div>

                                    <div className="grid lg:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1 dark:text-gray-100 text-gray-700">English Value</label>
                                            <Input
                                                type="textarea"
                                                placeholder="Value"
                                                value={item.englishValue}
                                                onChange={(e) => handleChange(item.id, "englishValue", e.target.value)}
                                                 onBlur={() => {
                                                    if (!item.englishValue?.trim()) {
                                                        setDescriptionErrors(prev => ({
                                                        ...prev,
                                                        [item.id]: { ...prev[item.id], englishValue: "English value is required" }
                                                        }));
                                                    }
                                                }}
                                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white bg-gray-200 text-gray-800"
                                            />
                                            {descriptionErrors?.[item.id]?.englishValue && (
                                                <p className="text-red-500 text-sm mt-1">{descriptionErrors[item.id]?.englishValue}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1 dark:text-gray-100 text-gray-700">Gujarati Value</label>
                                            <Input
                                                type="textarea"
                                                placeholder="Value"
                                                value={item.gujaratiValue}
                                                onChange={(e) => handleChange(item.id, "gujaratiValue", e.target.value)}
                                                 onBlur={() => {
                                                    if (!item.gujaratiValue?.trim()) {
                                                        setDescriptionErrors(prev => ({
                                                        ...prev,
                                                        [item.id]: { ...prev[item.id], gujaratiValue: "Gujarati value is required" }
                                                        }));
                                                    }
                                                }}
                                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white bg-gray-200 text-gray-800"
                                            />
                                             {descriptionErrors?.[item.id]?.gujaratiValue && (
                                                <p className="text-red-500 text-sm mt-1">{descriptionErrors[item.id]?.gujaratiValue}</p>
                                            )}
                                        </div>
                                    </div>

                                    {index > 0 && (

                                            <div onClick={() => handleRemoveField(item.id)} className="text-red-500 hover:text-red-600 text-right justify-items-end">
                                                <HiTrash size={20} />
                                            </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-x-3 justify-end mt-[1rem]">
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit" > {id ? "Update Product": "Add Product"} </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate(ParentLink)}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default ProductAddPage;