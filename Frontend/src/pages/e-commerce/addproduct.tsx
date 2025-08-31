import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Tabs,
  TabsHeader,
  TabsBody,
  TabPanel,
  Tab,
} from "@material-tailwind/react";
import { Label, TextInput } from "flowbite-react";
import product from "../../img/logo.png";

const EcommerceAddProductsPage: FC = function () {
  const [activeTab, setActiveTab] = useState("Product Name");
  const [ActiveCard, setActiveCard] = useState(true);

  const data = [
    {
      label: "Product Name",
      value: "Product Name",
    },
    {
      label: "Product Image",
      value: "Product Image",
    },

    {
      label: "Product Description",
      value: "Product Description",
    },

    {
      label: "Product Information",
      value: "Product Information",
    },

    {
      label: "Shipping Data",
      value: "Shipping Data",
    },
  ];

  const Wizardlist = [
    {
      label: "Product Name",
    },
    {
      label: "Product Image",
    },

    {
      label: "Product Description",
    },

    {
      label: "Product SKU",
    },

    {
      label: "Product Category",
    },

    {
      label: "Product Subcategory",
    },

    {
      label: "Product Varient",
    },
    {
      label: "Shpping Data",
    },
  ];

  return (
    <div className="h-full">
      <NavbarSidebarLayout isFooter={false}>
        <div className="flex">
          {ActiveCard == true ? (
            <Card
              variant="gradient"
              className="w-full max-w-[20rem] p-8 dark:bg-CardColor dark:text-white dark:border-gray-700"
            >
              <Button
                type="button"
                className="bg-white  text-black  dark:bg-CardColor dark:text-white self-end mb-3"
                onClick={() => {
                  setActiveCard(false);
                }}
              >
                X
              </Button>
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
              >
                <img src={product} alt="Product Photo" />
              </CardHeader>

              <CardBody className="p-0">
                {Wizardlist.map((item) => (
                  <Button className="text-dark bg-grey-200 min-w-full max-w-full dark:bg-gray-700 dark:hover:text-indigo-600 mt-6">
                    {" "}
                    {item.label}{" "}
                  </Button>
                ))}
              </CardBody>
            </Card>
          ) : null}

          <Card
            variant="gradient"
            className="w-full dark:bg-CardColor  p-8 ml-5 "
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 mb-8 rounded-none justify-between pb-5 text-center flex"
            >
              <img
                src={product}
                alt="Product Photo"
                height="10vh"
                width="10%"
              />

              {ActiveCard == false ? (
                <Button
                  onClick={() => {
                    setActiveCard(true);
                  }}
                >
                  Open menu
                </Button>
              ) : null}
            </CardHeader>

            <CardBody className="p-0">
              <Tabs value={activeTab}>
                <TabsHeader
                  className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 dark:text-white-200 "
                  indicatorProps={{
                    className:
                      "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none  dark:text-white-200",
                  }}
                >
                  {data.map(({ label, value }) => (
                    <Tab
                      key={value}
                      value={value}
                      onClick={() => setActiveTab(value)}
                      className={
                        activeTab === value
                          ? "text-blue-500"
                          : "text-black dark:text-white dark:hover:text-indigo-600"
                      }
                    >
                      {label}
                    </Tab>
                  ))}
                </TabsHeader>

                <TabsBody>
                  {/* Tab-1 */}
                  <TabPanel
                    className="dark:text-white"
                    key={"Product Name"}
                    value={"Product Name"}
                  >
                    <div className="flex">
                      <Card className="dark:bg-gray-700">
                        <CardBody className="flex flex-col">
                          {Wizardlist.map((item) => (
                            <Button className="text-dark bg-grey-200 dark:text-white dark:bg-gray-800 dark:hover:text-indigo-600 mt-3">
                              {" "}
                              {item.label}{" "}
                            </Button>
                          ))}
                        </CardBody>
                      </Card>

                      <Card className="w-full ml-4 h-full dark:bg-gray-700">
                        <CardBody>
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
                            <Label htmlFor="productSKU">Product SKU</Label>
                            <TextInput
                              id="productSKU"
                              name="productSKU"
                              placeholder="#194556"
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
                            <Label htmlFor="productSKU">Product SKU</Label>
                            <TextInput
                              id="productSKU"
                              name="productSKU"
                              placeholder="#194556"
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
                        </CardBody>
                        <CardFooter>
                          <Button className="float-right mb-3  mb-3 mr-4">
                            {" "}
                            Save
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </TabPanel>

                  {/* Tab -2 */}
                  <TabPanel
                    className="dark:text-white"
                    key={"Product Image"}
                    value={"Product Image"}
                  >
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
                  </TabPanel>

                  {/* Tab-3 */}
                  <TabPanel
                    className="dark:text-white"
                    key={"Product Description"}
                    value={"Product Description"}
                  >
                    <div className="grid grid-cols-2 grid-flow-row gap-4 mt-3">
                      
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
                        <Label htmlFor="productSKU">Product SKU</Label>
                        <TextInput
                          id="productSKU"
                          name="productSKU"
                          placeholder="#194556"
                          className="mt-1"
                        />
                      </div>
                     
                    </div>

                    <div className="grid grid-cols-2 grid-flow-row gap-4 mt-3">
                      
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
                        <Label htmlFor="productSKU">Product SKU</Label>
                        <TextInput
                          id="productSKU"
                          name="productSKU"
                          placeholder="#194556"
                          className="mt-1"
                        />
                      </div>
                     
                    </div>

                    <div className="grid grid-cols-2 grid-flow-row gap-4 mt-3">
                      
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
                        <Label htmlFor="productSKU">Product SKU</Label>
                        <TextInput
                          id="productSKU"
                          name="productSKU"
                          placeholder="#194556"
                          className="mt-1"
                        />
                      </div>
                     
                    </div>

                    <div className="grid grid-cols-2 grid-flow-row gap-4 mt-3">
                      
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
                        <Label htmlFor="productSKU">Product SKU</Label>
                        <TextInput
                          id="productSKU"
                          name="productSKU"
                          placeholder="#194556"
                          className="mt-1"
                        />
                      </div>
                     
                    </div>

                  </TabPanel>

                  {/* Tab-4 */}
                  <TabPanel
                    className="dark:text-white"
                    key={"Product Information"}
                    value={"Product Information"}
                  >
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
                  </TabPanel>

                  {/* Tab-5 */}
                  <TabPanel
                    className="dark:text-white"
                    key={"Shipping Data"}
                    value={"Shipping Data"}
                  >
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
                  </TabPanel>
                </TabsBody>
              </Tabs>
            </CardBody>
          </Card>
        </div>
      </NavbarSidebarLayout>
    </div>
  );
};

export default EcommerceAddProductsPage;
