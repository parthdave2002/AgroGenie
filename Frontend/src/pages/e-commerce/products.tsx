/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Badge,
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  Textarea,
  TextInput,
} from "flowbite-react";
import Select from "react-select";
import type { FC } from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Drawer, Typography, IconButton } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Tooltips from "../../components/tooltip";
import {
  HiCog,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiPencilAlt,
  HiTrash,
  HiUpload,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Link } from "react-router-dom";

const EcommerceProductsPage: FC = function () {
  // selectize
  const [Action, setAction] = useState(false);
  const [selectedOption, setSelectedOption] = useState();

  //  drawer
  const [isOpen, setOpen] = useState(false);

  const solutions = [
    {
      name: "Education Dashboard",
      description: "Html templates",
      ref: "#194556",
      label: "Dashboard",
      duedate: "09-06-23",
      SKU: "#194556",
      Amt: "50,000",
      currency: "INR",
      technology: "React JS",
      id: "01",
      paid: "6,200",
      status: "Active",
    },
    {
      name: "Education Dashboard",
      description: "Html templates",
      ref: "#194556",
      label: "Dashboard",
      duedate: "09-06-23",
      SKU: "#194556",
      Amt: "50,000",
      currency: "INR",
      technology: "React JS",
      id: "01",
      paid: "6,200",
      status: "Active",
    },
    {
      name: "Education Dashboard",
      description: "Html templates",
      ref: "#194556",
      label: "Dashboard",
      duedate: "09-06-23",
      SKU: "#194556",
      Amt: "50,000",
      currency: "INR",
      technology: "React JS",
      id: "01",
      paid: "6,200",
      status: "Active",
    },
    {
      name: "Education Dashboard",
      description: "Html templates",
      ref: "#194556",
      label: "Dashboard",
      duedate: "09-06-23",
      SKU: "#194556",
      Amt: "50,000",
      currency: "INR",
      technology: "React JS",
      id: "01",
      paid: "6,200",
      status: "Active",
    },
    {
      name: "Education Dashboard",
      description: "Html templates",
      ref: "#194556",
      label: "Dashboard",
      duedate: "09-06-23",
      SKU: "#194556",
      Amt: "50,000",
      currency: "INR",
      technology: "React JS",
      id: "01",
      paid: "6,200",
      status: "Active",
    },
    {
      name: "Education Dashboard",
      description: "Html templates",
      ref: "#194556",
      label: "Dashboard",
      duedate: "09-06-23",
      SKU: "#194556",
      Amt: "50,000",
      currency: "INR",
      technology: "React JS",
      id: "01",
      paid: "6,200",
      status: "Active",
    },
    {
      name: "Education Dashboard",
      description: "Html templates",
      ref: "#194556",
      label: "Dashboard",
      duedate: "09-06-23",
      SKU: "#194556",
      Amt: "50,000",
      currency: "INR",
      technology: "React JS",
      id: "01",
      paid: "6,200",
      status: "Active",
    },

    {
      name: "Education Dashboard",
      description: "Html templates",
      ref: "#194556",
      label: "Dashboard",
      duedate: "09-06-23",
      SKU: "#194556",
      Amt: "50,000",
      currency: "INR",
      technology: "React JS",
      id: "01",
      paid: "6,200",
      status: "Active",
    },
    {
      name: "Education Dashboard",
      description: "Html templates",
      ref: "#194556",
      label: "Dashboard",
      duedate: "09-06-23",
      SKU: "#194556",
      Amt: "50,000",
      currency: "INR",
      technology: "React JS",
      id: "01",
      paid: "6,200",
      status: "Active",
    },
    {
      name: "Education Dashboard",
      description: "Html templates",
      ref: "#194556",
      label: "Dashboard",
      duedate: "09-06-23",
      SKU: "#194556",
      Amt: "50,000",
      currency: "INR",
      technology: "React JS",
      id: "01",
      paid: "6,200",
      status: "Active",
    },
    {
      name: "Education Dashboard",
      description: "Html templates",
      ref: "#194556",
      label: "Dashboard",
      duedate: "09-06-23",
      SKU: "#194556",
      Amt: "50,000",
      currency: "INR",
      technology: "React JS",
      id: "01",
      paid: "6,200",
      status: "Active",
    },
    {
      name: "Education Dashboard",
      description: "Html templates",
      ref: "#194556",
      label: "Dashboard",
      duedate: "09-06-23",
      SKU: "#194556",
      Amt: "50,000",
      currency: "INR",
      technology: "React JS",
      id: "01",
      paid: "6,200",
      status: "Active",
    },
    {
      name: "Education Dashboard",
      description: "Html templates",
      ref: "#194556",
      label: "Dashboard",
      duedate: "09-06-23",
      SKU: "#194556",
      Amt: "50,000",
      currency: "INR",
      technology: "React JS",
      id: "01",
      paid: "6,200",
      status: "Active",
    },
  ];

  const options = [
    { value: "Edit", label: "Edit" },
    { value: "Add", label: "Add" },
    { value: "Delete", label: "Delete" },
  ];



  return (
    <NavbarSidebarLayout isFooter={false}>


      <div className="block items-center justify-between border-b border-gray-200  p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4 flex  justify-between">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Home</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/e-commerce/products">
                E-commerce
              </Breadcrumb.Item>
              <Breadcrumb.Item>Products</Breadcrumb.Item>
            </Breadcrumb>

            {/* {Action == true ? (
              <Select
                className="w-60"
                value={selectedOption}
                onChange={(e) => {
                  setSelectedOption(e);
                }}
                options={options}
                isClearable={true}
              />
            ) : null} */}

            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All products
            </h1>

            <div className="hidden space-x-1 border-l border-gray-100 pl-2 dark:border-gray-700 md:flex">
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Configure</span>
                <HiCog className="text-2xl" />
              </a>
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Delete</span>
                <HiTrash className="text-2xl" />
              </a>
              <Link
                to="/e-commerce/add-products"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Purge</span>
                <HiExclamationCircle className="text-2xl" />
              </Link>

              <div className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Settings</span>
                <HiDotsVertical className="text-2xl" />
              </div>
            </div>
          </div>


          <div className="block items-center sm:flex">
            <SearchForProducts />
            <FromDateToDate />

            {/* <Select
              className="w-full"
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e);
              }}
              options={options}
              isClearable={true}
            /> */}

            <div className="relative ml-4">
              <Button color="primary">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  ></path>
                </svg>
              </Button>
            </div>

            <div className="flex w-full items-center sm:justify-end">
              <AddProductModal />
            </div>
          </div>
        </div>
      </div>


      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <Table.Head className="bg-gray-100 dark:bg-gray-700">
                  <Table.HeadCell>
                    <span className="sr-only">Toggle selected</span>
                    <Checkbox />
                  </Table.HeadCell>
                  <Table.HeadCell>Action</Table.HeadCell>
                  <Table.HeadCell>Product Name</Table.HeadCell>
                  <Table.HeadCell> Ref</Table.HeadCell>
                  <Table.HeadCell>Label</Table.HeadCell>
                  <Table.HeadCell>Due Date</Table.HeadCell>
                  <Table.HeadCell>SKU</Table.HeadCell>
                  <Table.HeadCell>Amt</Table.HeadCell>
                  <Table.HeadCell>Currency</Table.HeadCell>
                  <Table.HeadCell>Technology</Table.HeadCell>
                  <Table.HeadCell>ID</Table.HeadCell>
                  <Table.HeadCell>Paid</Table.HeadCell>
                  <Table.HeadCell> Remain </Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
                  {solutions.map((item, k) => (
                    <Table.Row
                      key={k}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Table.Cell
                        className="w-4 py-0"
                        style={{ paddingTop: "1", paddingBottom: "1" }}
                      >
                        <Checkbox />
                      </Table.Cell>

                      <Table.Cell
                        className="w-4"
                        style={{ paddingTop: "1", paddingBottom: "1" }}
                      >
                        <HiDotsVertical
                          onClick={() => {
                            setAction(!Action);
                          }}
                        />
                      </Table.Cell>

                      <Table.Cell
                        className="whitespace-nowrap text-sm font-normal text-gray-500 dark:text-gray-400 "
                        style={{ padding: "0" }}
                      >
                        <Tooltips tooltip={item.name}>
                          <div
                            className="text-base font-semibold text-gray-900 dark:text-white"
                            style={{
                              paddingTop: "1",
                              paddingBottom: "1",
                              cursor: "pointer",
                            }}
                            onClick={() => setOpen(!isOpen)}
                          >
                            {item.name}
                          </div>
                        </Tooltips>

                        <div
                          className="text-sm font-normal text-gray-500 dark:text-gray-400"
                          style={{ paddingTop: "1", paddingBottom: "1" }}
                        >
                          {item.description}
                        </div>
                      </Table.Cell>

                      <Table.Cell
                        className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white py-0"
                        style={{ paddingTop: "1", paddingBottom: "1" }}
                      >
                        {item.ref}
                      </Table.Cell>

                      <Table.Cell
                        className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white py-0"
                        style={{ paddingTop: "1", paddingBottom: "1" }}
                      >
                        {item.label}
                      </Table.Cell>

                      <Table.Cell
                        className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"
                        style={{ paddingTop: "1", paddingBottom: "1" }}
                      >
                        {item.duedate}
                      </Table.Cell>

                      <Table.Cell
                        className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"
                        style={{ paddingTop: "1", paddingBottom: "1" }}
                      >
                        {item.SKU}
                      </Table.Cell>

                      <Table.Cell
                        className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white py-0"
                        style={{ paddingTop: "1", paddingBottom: "1" }}
                      >
                        {item.Amt}
                      </Table.Cell>

                      <Table.Cell
                        className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white py-0"
                        style={{ paddingTop: "1", paddingBottom: "1" }}
                      >
                        {item.currency}
                      </Table.Cell>

                      <Table.Cell
                        className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white py-0"
                        style={{ paddingTop: "1", paddingBottom: "1" }}
                      >
                        {item.technology}
                      </Table.Cell>

                      <Table.Cell
                        className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white py-0"
                        style={{ paddingTop: "1", paddingBottom: "1" }}
                      >
                        {item.id}
                      </Table.Cell>

                      <Table.Cell
                        className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"
                        style={{ paddingTop: "1", paddingBottom: "1" }}
                      >
                        {item.paid}
                      </Table.Cell>

                      <Table.Cell
                        className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white py-0"
                        style={{ paddingTop: "1", paddingBottom: "1" }}
                      >
                        {item.paid}
                      </Table.Cell>

                      <Table.Cell
                        className="whitespace-nowrap  text-base font-medium text-gray-900 dark:text-white py-0"
                        style={{ paddingTop: "1", paddingBottom: "1" }}
                      >
                        <Badge color="success"> {item.status}</Badge>
                      </Table.Cell>

                      <Table.Cell
                        className="space-x-2 whitespace-nowrap py-0"
                        style={{ paddingTop: "1", paddingBottom: "1" }}
                      >
                        <div className="flex items-center gap-x-3">
                          <EditProductModal />
                          <DeleteProductModal />
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* <Pagination /> */}

      <Drawer
        placement="right"
        open={isOpen}
        onClose={() => {
          setOpen(false);
        }}
        className="p-4 z-30 dark:bg-CardColor"
      >
        <div className="mb-6 flex items-center justify-between  dark:text-Cultured">
          <Typography variant="h5" color="blue-gray">
            Product Details
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => {
              setOpen(false);
            }}
          >
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>

        <div>
          <div>
            <Label htmlFor="productName">Product name</Label>
            <TextInput
              id="productName"
              name="productName"
              placeholder='Apple iMac 27"'
              className="mt-1"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="productSKU">Product SKU</Label>
            <TextInput
              id="productSKU"
              name="productSKU"
              placeholder="#194556"
              className="mt-1"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="productAMT">Product AMT</Label>
            <TextInput
              id="productAMT"
              name="productAMT"
              placeholder="$50,000"
              className="mt-1"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="Technology">Technology</Label>
            <TextInput
              id="Technology"
              name="Technology"
              placeholder="React Js"
              className="mt-1"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="id">Product Id</Label>
            <TextInput id="id" name="id" placeholder="01" className="mt-1" />
          </div>

          <div className="mt-3">
            <Label htmlFor="Paid">Paid</Label>
            <TextInput
              id="Paid"
              name="Paid"
              placeholder="$20,000"
              className="mt-1"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="Pending">Pending</Label>
            <TextInput
              id="Pending"
              name="Pending"
              type="number"
              placeholder="$30,000"
              className="mt-1"
            />
          </div>
          <div className="lg:col-span-2 mt-3">
            <Label htmlFor="producTable.Celletails">Product details</Label>
            <Textarea
              id="producTable.Celletails"
              name="producTable.Celletails"
              placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
              rows={6}
              className="mt-1"
            />
          </div>
        </div>
      </Drawer>
    </NavbarSidebarLayout>
  );
};

const SearchForProducts: FC = function () {
  return (
    <form className="mb-4 sm:mb-0 sm:pr-3" action="#" method="GET">
      <Label htmlFor="products-search" className="sr-only">
        Search
      </Label>
      <div className="relative mt-1 lg:w-64 xl:w-96">
        <TextInput
          id="products-search"
          name="products-search"
          placeholder="Search for products"
        />
      </div>
    </form>
  );
};

const FromDateToDate: FC = function () {
  return (
    <>
      <form className="mb-4 sm:mb-0 sm:pr-3 flex" action="#" method="GET">
        <div className="relative ml-5 mt-1 dark:text-white"> From:</div>
        <div className="relative ml-2  mt-1 lg:w-32 xl:w-48">
          <TextInput
            type="date"
            id="from-date"
            name="from-date"
            placeholder="From Date"
          />
        </div>

        <div className="relative ml-5 mt-1 dark:text-white"> To:</div>

        <div className="relative ml-2 mt-1 lg:w-32 xl:w-48">
          <TextInput
            type="date"
            id="to-date"
            name="to-date"
            placeholder="To Date"
          />
        </div>
      </form>
    </>
  );
};

const AddProductModal: FC = function () {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button color="primary" onClick={() => setOpen(!isOpen)}>
        <FaPlus className="mr-3 text-sm" />
        Add product
      </Button>
      <Modal
        className="drop-shadow-2xl backdrop-blur-sm bg-Gainsboro "
        onClose={() => setOpen(false)}
        show={isOpen}
      >
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Add product</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="productName">Product name</Label>
                <TextInput
                  id="productName"
                  name="productName"
                  placeholder='Apple iMac 27"'
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <TextInput
                  id="category"
                  name="category"
                  placeholder="Electronics"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="brand">Brand</Label>
                <TextInput
                  id="brand"
                  name="brand"
                  placeholder="Apple"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <TextInput
                  id="price"
                  name="price"
                  type="number"
                  placeholder="$2300"
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="producTable.Celletails">Product details</Label>
                <Textarea
                  id="producTable.Celletails"
                  name="producTable.Celletails"
                  placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
                  rows={6}
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <div className="flex w-full items-center justify-center">
                  <label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <HiUpload className="text-4xl text-gray-300" />
                      <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
                        Upload a file or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={() => setOpen(false)}>
            Add product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const EditProductModal: FC = function () {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button color="primary" onClick={() => setOpen(!isOpen)}>
        <HiPencilAlt className="mr-2 text-lg" />
        Edit item
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Edit product</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="productName">Product name</Label>
                <TextInput
                  id="productName"
                  name="productName"
                  placeholder='Apple iMac 27"'
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <TextInput
                  id="category"
                  name="category"
                  placeholder="Electronics"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="brand">Brand</Label>
                <TextInput
                  id="brand"
                  name="brand"
                  placeholder="Apple"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <TextInput
                  id="price"
                  name="price"
                  type="number"
                  placeholder="$2300"
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="productDetails">Product details</Label>
                <Textarea
                  id="productDetails"
                  name="productDetails"
                  placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
                  rows={6}
                  className="mt-1"
                />
              </div>
              <div className="flex space-x-5">
                <div>
                  <img
                    alt="Apple iMac 1"
                    src="/images/products/apple-imac-1.png"
                    className="h-24"
                  />
                  <a href="#" className="cursor-pointer">
                    <span className="sr-only">Delete</span>
                    <HiTrash className="-mt-5 text-2xl text-red-600" />
                  </a>
                </div>
                <div>
                  <img
                    alt="Apple iMac 2"
                    src="/images/products/apple-imac-2.png"
                    className="h-24"
                  />
                  <a href="#" className="cursor-pointer">
                    <span className="sr-only">Delete</span>
                    <HiTrash className="-mt-5 text-2xl text-red-600" />
                  </a>
                </div>
                <div>
                  <img
                    alt="Apple iMac 3"
                    src="/images/products/apple-imac-3.png"
                    className="h-24"
                  />
                  <a href="#" className="cursor-pointer">
                    <span className="sr-only">Delete</span>
                    <HiTrash className="-mt-5 text-2xl text-red-600" />
                  </a>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="flex w-full items-center justify-center">
                  <label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <HiUpload className="text-4xl text-gray-300" />
                      <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
                        Upload a file or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={() => setOpen(false)}>
            Save all
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const DeleteProductModal: FC = function () {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button color="primary" onClick={() => setOpen(!isOpen)}>
        <HiTrash className="mr-2 text-lg" />
        Delete item
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <Modal.Header className="px-3 pt-3 pb-0">
          <span className="sr-only">Delete product</span>
        </Modal.Header>
        <Modal.Body className="px-6 pb-6 pt-0">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-600" />
            <p className="text-lg text-gray-500 dark:text-gray-300">
              Are you sure you want to delete this product?
            </p>
            <div className="flex items-center gap-x-3">
              <Button color="failure" onClick={() => setOpen(false)}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpen(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EcommerceProductsPage;
