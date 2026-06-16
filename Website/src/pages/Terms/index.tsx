import React, { useEffect, useState } from 'react'

const Termspagesection = () => {

  const [activeTab, setActiveTab] = useState("terms");

  const tabs = [
    { id: "terms", label: "Terms & Condition" },
    { id: "privacy", label: "Privacy Policy" },
    { id: "shipping", label: "Shipping Policy" },
    { id: "return", label: "Return & Refund" },
  ];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [])

  return (
    <section className=" relative  py-10  bg-White  bg-[url('/images/ad-bg-pattern.png')]  bg-repeat bg-[length:600px_600px] ">
      <div className=' relative z-10 py-6 px-6 md:px-12 lg:px-24 max-w-1600 mx-auto'>

        <div className="flex justify-center w-full px-4">
          <div className="flex flex-wrap justify-center bg-WhiteMarble rounded-xl overflow-hidden w-full sm:w-auto">
            {tabs.map((tab, index) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-medium transition-colors duration-300   ${activeTab === tab.id ? "bg-[#1d4a34] text-White" : "text-TranquilBlack hover:bg-SoothingBlueGrey"}  ${index === 0 ? "rounded-l-xl" : ""}  ${index === tabs.length - 1 ? "rounded-r-xl" : ""}`} >  {tab.label} </button>
            ))}
          </div>
        </div>

        <div className="w-full  mt-8 text-TranquilBlack">
          {activeTab === "terms" && (
            <div className='font-body'>
              <h2 className="text-[1.5rem] md:text-[2rem]  font-semibold my-5">Terms & Conditions </h2>

              <div className=' text-[1rem] font-semibold mb-1'>AgroGenie Ventures LLP, Anand (Gujarat)</div>
              <p className=' text-[1rem] mb-1'> <b>Effective Date: </b> 22/06/2021,  </p>
              <p className=' text-[1rem] mb-8'> <b>Last Updated:  </b>26/08/2025</p>


              <p className='font-semibold text-[1.2rem] mb-2'>1. Introduction</p>

              <p className='mb-8 text-[1rem]'> These Terms and Conditions ("Terms") govern your use of AgroGenie Ventures LLP’s
                website, ecommerce platform, and purchase of our products (quality seeds). By using our
                services or placing an order, you accept these Terms. If you don’t agree, please refrain from
                using our services.
              </p>

              <p className='font-semibold text-[1.2rem] mb-2 mt-4'>2. Definitions</p>
              <p className='mb-1 text-[1rem]'>• <b>Company:</b> AgroGenie Ventures LLP, Anand (Gujarat)</p>
              <p className='mb-1 text-[1rem]'>• <b>Customer:</b> Any person or business purchasing our seeds</p>
              <p className='mb-1 text-[1rem]'>• <b>Dealer:</b> Authorized distributor of AgroGenie products</p>
              <p className='mb-8 text-[1rem]'>• <b>Product(s):</b> Seeds, planting material or farming-related items supplied by us</p>

              <p className='font-semibold text-[1.2rem] mb-2 mt-4'>3. Eligibility</p>
              <p className='mb-1 text-[1rem]'>By using our services, you confirm you are:</p>
              <p className='mb-1 text-[1rem]'>• At least 18 years of age</p>
              <p className='mb-8 text-[1rem]'>• Legally capable of entering into a contract</p>

              <p className='font-semibold text-[1.2rem] mb-2 mt-4'>4. Product Description</p>
              <p className='mb-1 text-[1rem]'>• We strive to provide accurate product information (variety, quantity, germination, etc.).</p>
              <p className='mb-8 text-[1rem]'>• However, agricultural crop results depend on weather, soil, and external agronomic conditions; we <b> do not guarantee yield  </b>or crop performance.</p>

              <p className='font-semibold text-[1.2rem] mb-2 mt-4'>5. Ordering and Acceptance</p>
              <p className='mb-1 text-[1rem]'>• Orders can be placed through our website or our approved distribution network of dealers.</p>
              <p className='mb-1 text-[1rem]'>• An order is considered accepted only after full payment is received by us or confirmation by our authorized distribution network.</p>
              <p className='mb-8 text-[1rem]'>• AgroGenie reserves the right to accept or refuse orders for any reason, including errors in product description, unforeseen inventory issues, or any suspicious or fraudulent activity.</p>

              <p className='font-semibold text-[1.2rem] mb-2 mt-4'>6. Pricing & Payments</p>
              <p className='mb-1 text-[1rem]'>• Prices are shown in INR and may include applicable taxes (GST, if any), unless otherwise stated at checkout.</p>
              <p className='mb-1 text-[1rem]'>• Accepted payment methods:</p>
              <p className='ml-4 mb-1 text-[1rem]'>•   Online : Payment gateway using Credit card, Debit card, UPI, or Net banking.</p>
              <p className='ml-4 mb-3 text-[1rem]'>•  Offline :  Cash collection by the authorized distribution network after presenting bills, or self-bank transfer.</p>
              <p className='mb-8 text-[1rem]'>• Customers must ensure the accuracy of payment information; payment must be completed before order dispatch.</p>

              <p className='font-semibold text-[1.2rem] mb-2 mt-4'>7. Delivery Terms</p>
              <p className='mb-1 text-[1rem]'>• Delivery will take place via courier service, transport provider, or our authorized distribution network, based on location and selection.</p>
              <p className='mb-1 text-[1rem]'>• Estimated delivery timelines vary based on location and connectivity from the centre; generally, delivery takes place within 3–7 business days.</p>
              <p className='mb-8 text-[1rem]'>• However, we are not liable for delays beyond our control (strikes, floods, etc.), and any risk of loss transfers to you upon delivery to the delivery partner only.</p>
              {/* 
            <p className='mb-1 text-[1rem]'>To exercise any of your rights, contact our <b> Grievance Officer : </b></p>
            <p className='mb-1 text-[1rem]'><b>Name:</b> Grievance Office, AgroGenie Ventures LLP</p>
            <p className='mb-1 text-[1rem]'><b>Address:</b> B-5, Hariba Vyapar Bhuvan, GPO Road, Anand – 388001, Gujarat</p>
            <p className='mb-8 text-[1rem]'><b>Email:</b> agrogenieseeds@gmail.com</p> */}

              <p className='font-semibold text-[1.2rem] mb-2 mt-4'>8. Returns and Refunds</p>
              <p className='mb-1 text-[1rem]'>• You must inspect the seed packets upon receipt. Returns are allowed only if packets are torn, damaged, or if incorrect items were delivered.</p>
              <p className='mb-1 text-[1rem]'>• Return must be initiated and the product returned to our office within 7 days of receipt via contacting us or any of our authorized distributors in the network.</p>
              <p className='mb-1 text-[1rem]'>• Returned items must be unused and undamaged. We will bear the return shipping costs if the return is due to our error; otherwise, it will be borne by the customer.</p>
              <p className='mb-1 text-[1rem]'>• Refund is processed through:</p>
              <p className='ml-4 mb-1 text-[1rem]'>•  Original payment mode through authorized distributor network</p>
              <p className='ml-4 mb-8 text-[1rem]'>•  Or a credit note valid for future purchases, with a validity of 180 days.</p>

              <p className='font-semibold text-[1.2rem] mb-2 mt-4'>9. Liability & Limitation</p>
              <p className='mb-1 text-[1rem]'>• To the fullest extent permitted by law, we disclaim liability for crop failure, negligence by dealers, indirect or consequential losses, or business interruption.</p>
              <p className='mb-1 text-[1rem]'>• We are not responsible for:</p>
              <p className='ml-4 mb-1 text-[1rem]'>• Crop loss or poor yield</p>
              <p className='ml-4 mb-1 text-[1rem]'>• Improper usage, storage, or sowing</p>
              <p className='mb-8 text-[1rem]'>• Our total maximum liability is limited to the<b> invoice value </b> of seeds supplied.</p>

              <p className='font-semibold text-[1.2rem] mb-2 mt-4'>10. Representations & Warranties</p>
              <p className='mb-1 text-[1rem]'>• We represent that we hold the intellectual property rights to the products.</p>
              <p className='mb-8 text-[1rem]'>• Subject to applicable seed laws and regulations, we do not guarantee absolute performance of seeds. Agricultural outcomes may vary due to external factors not under our control.</p>

              <p className='font-semibold text-[1.2rem] mb-2 mt-4'>11. Force Majeure</p>
              <p className='mb-8 text-[1rem] '>We are not liable for delays or failure to perform due to circumstances beyond our control (e.g., natural disasters, pandemics, supply chain disruptions). In such cases, we will notify you and resume performance when able. We are not responsible for any losses that occur due to such circumstances. </p>

              <p className='font-semibold text-[1.2rem] mb-2 mt-4'>12. Dispute Resolution</p>
              <p className='mb-1 text-[1rem]'>• These Terms are governed by the laws of India.</p>
              <p className='mb-8 text-[1rem]'>• Any dispute arising shall first be mediated. If unresolved, disputes shall be subject to arbitration at Anand (Gujarat) jurisdiction only.</p>

              <p className='font-semibold text-[1.2rem] mb-2 mt-4'>13. Modification of Terms</p>
              <p className='mb-8 text-[1rem] '>We may revise these Terms. Updates will be posted with a new “Effective Date”. Continued use after revisions constitutes acceptance.. </p>

              <p className='font-semibold text-[1.2rem] mb-2 mt-4'>14. Contact Information</p>
              <p className='mb-1 text-[1rem]'> <b>AgroGenie Ventures LLP </b></p>
              <p className='mb-1 text-[1rem]'>• <b> Address </b> :  B-5, Hariba Vyapar Bhuvan, GPO Road, Anand – 388001, Gujarat. </p>
              <p className='mb-8 text-[1rem]'>• <b>Email </b>: agrogenieseeds@gmail.com.</p>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className='font-body'>
              <h2 className="text-[1.5rem] md:text-[2rem]  font-semibold my-5">Privacy Policy </h2>

              <div className=' text-[1rem] font-semibold mb-1'>AgroGenie Ventures LLP, Anand (Gujarat)</div>
              <p className=' text-[1rem] mb-1'> <b>Effective Date: </b> 22/06/2021,  </p>
              <p className=' text-[1rem] mb-8'> <b>Last Updated:  </b>26/08/2025</p>


              <p className='font-semibold text-[1.2rem] mb-2'>1. Introduction</p>
              <div className='mb-2 text-[1rem]'> AgroGenie Ventures LLP ("we", "our", "us") respects your privacy and is committed to protecting your personal data through our compliance with applicable data protection laws. This Privacy Policy explains how we collect, store, use, and share your personal information when you use our website, services, or interact with us directly or through our distribution network.  </div>
              <p className='mb-8 text-[1rem]'> By using our website or services, you agree to the collection and use of information as described in this policy.</p>

              <p className=' font-semibold text-[1.2rem] mb-2 mt-4'>2. Definitions</p>
              <p className='mb-1 text-[1rem]'>• <b> Personal Data : </b> Information that can directly or indirectly identify you </p>
              <p className='mb-1 text-[1rem]'>•  <b> Processing : </b> Any operation performed on Personal Data (like collecting, storing, using) and any interaction involving personal data (e.g., orders, returns, queries)</p>
              <p className='mb-1 text-[1rem]'>•  <b> Data Subject : </b> Any natural person whose data is being processed </p>
              <p className='mb-1 text-[1rem]'>•  <b> Customer : </b> Anyone buying seeds via our ecommerce platform or distribution networks</p>
              <p className='mb-1 text-[1rem]'>•  <b> Visitor : </b> Who is visiting our website or any of our distribution network</p>
              <p className='mb-8 text-[1rem]'>• Processing may be delayed during peak seasons or public holidays.</p>

              <p className=' font-semibold text-[1.2rem] mb-2 mt-4'>3. Information we might collect</p>
              <p className='mb-2 text-[1rem] font-semibold'>A. Personal Information </p>
              <p className='mb-1 text-[1rem]'>•  Full Name </p>
              <p className='mb-1 text-[1rem]'>•  Phone number </p>
              <p className='mb-1 text-[1rem]'>•  Email address </p>
              <p className='mb-1 text-[1rem]'>•  Delivery & billing address </p>
              <p className='mb-1 text-[1rem]'>•  Payment information (collected securely via third-party gateway)</p>
              <p className='mb-4 text-[1rem]'>•  Communication data when you contact us (via email, social media, support or phone numbers)</p>


              <p className='mb-2 text-[1rem] font-semibold'>B. Transactional Information </p>
              <p className='mb-1 text-[1rem]'>•  Order history and delivery tracking data from delivery or courier service providers </p>
              <p className='mb-4 text-[1rem]'>•  Payment confirmations from payment gateway service providers </p>

              <p className='mb-2 text-[1rem] font-semibold'>C. Technical Information (Automatically Collected) </p>
              <p className='mb-1 text-[1rem]'>•  IP address </p>
              <p className='mb-1 text-[1rem]'>•  Browser type </p>
              <p className='mb-1 text-[1rem]'>•  Location data (if enabled) </p>
              <p className='mb-1 text-[1rem]'>•  Access time </p>
              <p className='mb-1 text-[1rem]'>•  Device details</p>
              <p className='mb-1 text-[1rem]'>•  Pages visited on our website</p>
              <p className='mb-1 text-[1rem]'>•  Cookies and session IDs </p>
              <p className='mb-8 text-[1rem]'>• Other similar technologies </p>

              <p className=' font-semibold text-[1.2rem] mb-2 mt-4'> 4. Purposes of Processing & Legal Bases </p>
              <p className='mb-1 text-[1rem]'>• <b> Order Processing and Fulfilments  : </b> Confirming orders, payment processing and seed dispatch </p>
              <p className='mb-1 text-[1rem]'>•  <b> Payment verification and security : </b> Confirmation of payment for order fulfilment</p>
              <p className='mb-1 text-[1rem]'>•  <b> Account & Dealer Management : </b> Profile creation for dealers or distributors network </p>
              <p className='mb-1 text-[1rem]'>•  <b> Communication : </b> Order updates, responses to inquiries, support, promotional offers where you’ve opted in</p>
              <p className='mb-1 text-[1rem]'>•  <b> Website analytics and improvement : </b> User behaviour research, site performance, ordering patterns</p>
              <p className='mb-1 text-[1rem]'>•  <b> Regulatory Compliance : </b>  Fraud Prevention, fulfilling legal obligations, verifying identity</p>
              <p className='mb-1 text-[1rem]'>•  <b> Dispute Resolution : </b> Addressing complaints or handling returns</p>
              <p className='mb-3 text-[1rem]'>•  <b> Internal record-keeping : </b> For internal reference and over legal </p>
              <p className='mb-8 text-[1rem]'> Legal bases may include: contract performance, legal compliance, your consent, or our legitimate interests..</p>

              <p className='font-semibold text-[1.2rem] mb-2 mt-4'>5. Data Sharing & Disclosure</p>
              <p className='mb-1 text-[1rem]'>• <b>Service Providers:</b> Payment gateways (transaction processing), logistics/courier partners (order delivery), IT service vendors (website hosting, analytics)</p>
              <p className='mb-1 text-[1rem]'>• <b>Dealers/Distributors:</b> To coordinate delivery, order pick-up, and dealer payments</p>
              <p className='mb-1 text-[1rem]'>• <b>Legal Authorities:</b> If required by applicable law for court orders or government investigations</p>
              <p className='mb-1 text-[1rem]'>• <b>Business Transfers:</b> In the case of a merger, acquisition, or sale of assets, with required contractual safeguards</p>
              <p className='mb-8 text-[1rem]'>We do not sell personal data to any third parties.</p>

              <p className='font-semibold text-[1.2rem] mb-2 mt-4'>6. Data Security</p>
              <p className='mb-1 text-[1rem]'>We implement robust security measures to protect your data, including:</p>
              <p className='mb-1 text-[1rem]'>• SSL encryption</p>
              <p className='mb-1 text-[1rem]'>• Firewalls</p>
              <p className='mb-1 text-[1rem]'>• Access control systems</p>
              <p className='mb-1 text-[1rem]'>• Regular security audits</p>
              <p className='mb-8 text-[1rem]'>In the event of a personal data breach, we will notify you and the appropriate authorities as required by law.</p>

              <p className='font-semibold text-[1.2rem] mb-2 mt-4'>7. Your Rights</p>
              <p className='mb-1 text-[1rem]'>You may have the following rights regarding your personal data:</p>
              <p className='mb-1 text-[1rem]'>• Access or rectification of your personal data</p>
              <p className='mb-1 text-[1rem]'>• Request corrections in your personal data</p>
              <p className='mb-1 text-[1rem]'>• Withdraw consent at any time</p>
              <p className='mb-1 text-[1rem]'>• Request deletion ("Right to be forgotten") if retention isn’t legally required</p>
              <p className='mb-3 text-[1rem]'>• Lodge complaints with a supervisory authority</p>

              <p className='mb-1 text-[1rem]'>To exercise any of your rights, contact our <b> Grievance Officer : </b></p>
              <p className='mb-1 text-[1rem]'><b>Name:</b> Grievance Office, AgroGenie Ventures LLP</p>
              <p className='mb-1 text-[1rem]'><b>Address:</b> B-5, Hariba Vyapar Bhuvan, GPO Road, Anand – 388001, Gujarat</p>
              <p className='mb-8 text-[1rem]'><b>Email:</b> agrogenieseeds@gmail.com</p>

              <p className='font-semibold text-[1.2rem] mb-2 mt-4'>8. Data Retention</p>
              <p className='mb-3 text-[1rem]'>We retain your data : </p>
              <p className='mb-1 text-[1rem]'>• As long as necessary for business or legal obligations.</p>
              <p className='mb-8 text-[1rem]'>• Afterward, data is securely deleted or anonymized.</p>

              <p className='font-semibold text-[1.2rem] mb-2 mt-4'>9. Cookies Policy</p>
              <p className='mb-8 text-[1rem]'>Our website uses cookies and tracking technologies to improve user experience. You can disable cookies in your browser settings, though this may affect site functionality.</p>

              <p className='font-semibold text-[1.2rem] mb-2 mt-4'>10. Children’s Privacy</p>
              <p className='mb-8 text-[1rem]'>Our services are not intended for minors (under 18 years). We do not knowingly collect personal data from minors.</p>

              <p className='font-semibold text-[1.2rem] mb-2 mt-4'>11. Updates to this Policy</p>
              <p className='mb-8 text-[1rem]'>We may update this policy. Revisions will be posted with a revised effective date. For significant changes, we might notify affected users via email, social media or over phone calls.</p>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className='font-body'>
              <h2 className="text-[1.5rem] md:text-[2rem]  font-semibold my-5"> Shipping Policy </h2>

              <div className=' text-[1rem] font-semibold mb-1'>AgroGenie Ventures LLP, Anand (Gujarat)</div>
              <p className=' text-[1rem] mb-1'> <b>Effective Date: </b> 22/06/2021,  </p>
              <p className=' text-[1rem] mb-8'> <b>Last Updated:  </b>26/08/2025</p>


              <p className='font-semibold text-[1.2rem] mb-2'>1. Shipping Coverage</p>

              <div> We ship seeds across India through :  </div>
              <p className='mb-1 text-[1rem]'>• Reputed courier partners.</p>
              <p className='mb-3 text-[1rem]'>• Transporter companies.</p>
              <p className='mb-3 text-[1rem]'>• Authorized distribution network.</p>

              <p className=' font-semibold text-[1.2rem] mb-2 mt-4'>2. Shipping Regions & Timing</p>
              <p className='mb-1 text-[1rem]'>• Estimated delivery timelines varied based on location and connectivity from the centre. Generally, domestic delivery takes place within 3–7 business days.</p>
              <p className='mb-1 text-[1rem]'>• If we ship internationally, the estimated delivery time is 15-20 days and shipping charges, customs and duties should be borne by the customer.</p>
              <p className='mb-8 text-[1rem]'>• However, rural or remote areas required additional time for delivery.</p>

              <p className=' font-semibold text-[1.2rem] mb-2 mt-4'>3. Order Processing</p>

              <p className='mb-1 text-[1rem]'>• Orders are processed within <b> 1–2 working days </b> of payment confirmation</p>
              <p className='mb-8 text-[1rem]'>• Processing may be delayed during peak seasons or public holidays.</p>

              <p className=' font-semibold text-[1.2rem] mb-2 mt-4'>4. Shipping Charges</p>
              <p className='mb-2 text-[1rem]'>Shipping charges vary based on: </p>
              <ul>
                <li> Weight </li>
                <li > Location </li>
                <li > Mode of transport </li>
              </ul>

              <p className='mb-1 text-[1rem]'>•  Shipping cost will be visible at checkout (or informed by dealer) </p>
              <p className='mb-8 text-[1rem]'>•  For Bulk orders, we are offering special shipping prices and special discounts</p>

              <p className=' font-semibold text-[1.2rem] mb-1 mt-4'>5. Shipment Tracking</p>
              <p className='mb-1 text-[1rem]'>• For courier or transport shipments, we will a provide tracking number via email or message over mobile: </p>
              <p className='mb-8 text-[1rem]'>•  In case of purchase through the authorized dealer network, the Dealer will update about the dispatch or availability for pick-up </p>

              <p className=' font-semibold text-[1.2rem] mb-2 mt-4'>6. Delivery Issues </p>
              <p className='mb-8 text-[1rem]'>• After confirmation of order, if your order is delayed, damaged, or lost, contact us within <b>  3 days </b> of the expected delivery date with your order details and issue description, and we’ll resolve your issue.</p>

              <p className=' font-semibold text-[1.2rem] mb-2 mt-4'>7. Refusal or Non-Receipt  </p>
              <p className='mb-1 text-[1rem]'>• If delivery fails due to customer unavailability or wrong address: : </p>
              <ul>
                <li>Reattempt may be made </li>
                <li className='mb-8'>Return shipping and re-dispatch costs may apply</li>
              </ul>

              <p className=' font-semibold text-[1.2rem] mb-2 mt-4'>8. Hazardous Goods </p>
              <p className='mb-8 text-[1rem]'>• Our Seeds are safe for standard handling and pose no risk during transit unless specified otherwise. Please inform us of any special packaging or documentation requirements for specific seed or for your regions.</p>

              <p className='mb-1 text-[1rem]'>•  For any shipping-related query, contact our <b> Grievance Officer </b>:</p>
              <p className='mb-1 text-[1rem]'>• <b> Name </b> : Grievance Office, AgroGenie Ventures LLP</p>
              <p className='mb-1 text-[1rem]'>• <b> Address </b> :  B-5, Hariba Vyapar Bhuvan, GPO Road, Anand – 388001, Gujarat. </p>
              <p className='mb-8 text-[1rem]'>• <b>Email </b>: agrogenieseeds@gmail.com.</p>
            </div>
          )}

          {activeTab === "return" && (
            <div className='font-body'>
              <h2 className="text-[1.5rem] md:text-[2rem]  font-semibold my-5">Return & Refund Policy </h2>

              <div className=' text-[1rem] font-semibold mb-1'>AgroGenie Ventures LLP, Anand (Gujarat)</div>
              <p className=' text-[1rem] mb-1'> <b>Effective Date: </b> 22/06/2021,  </p>
              <p className=' text-[1rem] mb-8'> <b>Last Updated:  </b>26/08/2025</p>


              <p className='font-semibold text-[1.2rem] mb-2'>1. Eligibility for Return</p>

              <div>  Returns are accepted <b> only if : </b> </div>
              <p className='mb-1 text-[1rem]'>• Seed packet is <b> torn, damaged, </b> or has visible damage, rendering the product unfit for use.</p>
              <p className='mb-3 text-[1rem]'>• Incorrect seeds or items were delivered that don’t match the product ordered.</p>

              <div>Returns are <b> not accepted for : </b> </div>
              <p className='mb-1 text-[1rem]'>• Opened, used, or sowed packets</p>
              <p className='mb-1 text-[1rem]'>• Product returned after 7 days of delivery.</p>
              <p className='mb-8 text-[1rem]'>• Dislike or crop failure.</p>

              <p className=' font-semibold text-[1.2rem] mb-2 mt-4'>2. Product condition for return</p>
              <p className='mb-1 text-[1rem]'>• Products must be in original, unused, and undamaged condition, inside the original packaging.</p>
              <p className='mb-8 text-[1rem]'>• Seeds that have been opened, used, contaminated, or otherwise altered cannot be returned.</p>

              <p className=' font-semibold text-[1.2rem] mb-2 mt-4'>3. Return Process</p>

              <p className='mb-1 text-[1rem]'>• Notify us or any of our dealers within <b> 7 days </b> of receiving the product</p>
              <p className='mb-1 text-[1rem]'>• Provide:.</p>
              <ul>
                <li> Order number</li>
                <li> Photos of the damaged packet </li>
                <li className='mb-8'> Reason for return</li>
              </ul>

              <p className=' font-semibold text-[1.2rem] mb-2 mt-4'>4. Return Address</p>
              <p className='mb-2 text-[1rem]'>Returns must be sent to: </p>
              <p className='mb-1 text-[1rem]'>• <b> AgroGenie Ventures LLP. </b></p>
              <p className='mb-1 text-[1rem]'>• <b> Address: B-5, Hariba Vyapar Bhuvan, GPO Road, Anand – 388001, Gujarat. </b></p>
              <p className='mb-8 text-[1rem]'>• <b>Email : </b> agrogenieseeds@gmail.com.</p>

              <p className=' font-semibold text-[1.2rem] mb-1 mt-4'>5. Refund Process</p>
              <p className='mb-1 text-[1rem]'>• Upon receipt and inspection, if the return is validated, a refund is processed through : </p>
              <ul>
                <li> Authorized distribution network when paid offline</li>
                <li className='mb-8'> A credit note with a validity of 180 days for any future purchase with us </li>
              </ul>

              <p className=' font-semibold text-[1.2rem] mb-2 mt-4'>6. Return Shipping Cost </p>
              <p className='mb-1 text-[1rem]'>• We will happily bear the return shipping costs if the return is due to our error, like damaged or torn packets or wrong delivery.</p>
              <p className='mb-8 text-[1rem]'>• In case the Customer changes their mind, all shipping charges will be on the customer.</p>

              <p className=' font-semibold text-[1.2rem] mb-2 mt-4'>7. Dispute or Disagreement  </p>
              <p className='mb-1 text-[1rem]'>• If there’s a dispute on return or refund : </p>
              <ul>
                <li>AgroGenie will investigate within <b> 5 business days </b> and propose a resolution</li>
                <li className='mb-8'>Always a fair solution will be offered to the satisfaction of our customers</li>
              </ul>

            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Termspagesection