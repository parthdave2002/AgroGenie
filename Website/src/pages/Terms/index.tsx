import React, { useEffect } from 'react'

const  Termspagesection = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [])

  return (
    <div className='p-6'>
      <div className="max-w-1600 mx-auto px-4">
        <h2 className="text-[1.5rem] md:text-[2rem] font-heading font-semibold my-5"> Terms & Conditions </h2>

        <p className=' text-[1rem]'> Effective Date: 01/01/2025</p>
        <div  className='mb-6 text-[1rem]'>Welcome to AgriBharat (“Website” or “Platform”). These Terms and Conditions (“Terms”) govern your access to and use of our website and services. By accessing or using AgriBharat, you accept and agree to be bound by the following terms. If you do not agree, please discontinue use immediately.</div>
       
        <p className='mb-2 font-semibold font-heading text-[1.2rem]'>1. General Use of Website </p>
        <p className='text-[1rem] font-semibold font-heading '>a. Eligibility </p>
        <p className='mb-6 text-[1rem]'> You must be at least 18 years old or under supervision of a legal guardian to use this website. By using our services, you confirm that you meet this requirement.  </p>
        <p className=' text-[1rem] font-semibold font-heading '>b. Informational Purpose  </p>
        <p className='mb-8 text-[1rem]'>Content is for general agricultural reference and product guidance. While we strive for accuracy, we do not warrant that product information, pricing, or descriptions are error-free, complete, or current. </p>

        <p className='mb-2 font-semibold font-heading text-[1.2rem]'>2. Products and Services </p>
        <p className='text-[1rem] font-semibold font-heading'>a. Product Availability </p>
        <p className='mb-4 text-[1rem]'> All products listed are subject to stock availability. We reserve the right to cancel or modify an order if a product is unavailable, discontinued, or inaccurately listed.</p>
        <p className='text-[1rem] font-semibold font-heading'>b. Pricing  </p>
        <p className='mb-4 text-[1rem]'>Prices displayed are inclusive of applicable taxes unless stated otherwise. We reserve the right to update pricing without prior notice. </p>
        <p className='text-[1rem] font-semibold font-heading'>c. Orders  </p>
        <p className='mb-8 text-[1rem]'>Once an order is placed, you will receive an email or SMS confirmation. This confirmation does not signify our acceptance; we reserve the right to cancel any order due to stock issues, payment failures, or policy violations.</p>

        <p className='mb-2 font-semibold font-heading text-[1.2rem]'>3. Delivery & Shipping </p>
        <p className='text-[1rem] font-semibold font-heading'>a. Delivery Areas </p>
        <p className='mb-4 text-[1rem]'> AgriBharat currently delivers within selected regions of India. Please check availability during checkout. </p>
        <p className=' text-[1rem] font-semibold font-heading'>b. Delivery Timelines </p>
        <p className='mb-4 text-[1rem]'>Standard delivery is within [7–10 business days], but may vary based on location, weather, or logistical constraints. </p>
        <p className=' text-[1rem] font-semibold font-heading'>c. Delays  </p>
        <p className='mb-8 text-[1rem]'>We are not liable for delivery delays caused by events outside our control (e.g., natural disasters, strikes, transport issues). </p>

        <p className='mb-2 font-semibold font-heading  text-[1rem]'>4. Returns, Refunds, and Cancellations</p>
        <p className='text-[1rem] font-semibold font-heading'>a. Return Policy </p>
        <p className='mb-4 text-[1rem]'> Products can be returned within 7 days of delivery if:</p>
          <p className='mb-2 text-[1rem]'>• Damaged or defective on arrival</p>
          <p className='mb-2 text-[1rem]'>• Incorrect product delivered</p>
          <p className='mb-4 text-[1rem]'>• Expired product</p>
        <p className=' text-[1rem] font-semibold font-heading'>b. Refunds</p>
        <p className='mb-4 text-[1rem]'>Once your return is approved, refunds will be processed within 7–10 working days to the company wallet. </p>
        <p className='text-[1rem] font-semibold font-heading'>c. Order Cancellations </p>
        <p className='mb-8 text-[1rem]'>You can cancel an order before it is shipped. After dispatch, cancellations are not allowed, but you may request a return (if applicable). </p>


        <p className='mb-2 font-semibold font-heading  text-[1rem]'>5. Payments</p>
        <p className='text-[1rem] font-semibold font-heading'>a. Accepted Methods </p>
        <p className='mb-2 text-[1rem]'> We accept payments via: Cash on Delivery right now. In future, we will also accept payment through modes like:</p>
          <p className='mb-2 text-[1rem]'>• UPI</p>
          <p className='mb-2 text-[1rem]'>• Debit/Credit Cards</p>
          <p className='mb-4 text-[1rem]'>• Net Banking</p>
        <p className='text-[1rem] font-semibold font-heading'>b. Payment Security</p>
        <p className='mb-8 text-[1rem]'>All online payments are processed securely through encrypted gateways. We do not store your payment details. </p>


        <p className='font-semibold font-heading  text-[1rem]'> 6. User Responsibilities</p>
          <p className='mb-2 text-[1rem]'>• Do not misuse the website or its content.</p>
          <p className='mb-2 text-[1rem]'>• Do not upload false or misleading information.</p>
          <p className='mb-2 text-[1rem]'>• Do not engage in unauthorized access, fraud, or abuse of discount codes or offers.</p>
          <p className='mb-8 text-[1rem]'>• 	You are responsible for maintaining the confidentiality of your login credentials.</p>


        <p className=' text-[1rem] font-semibold font-heading'>7. Intellectual Property </p>
        <p className='mb-8 text-[1rem]'>All website content – including images, text, logos, product catalogs, videos, and software – is the property of AgriBharat or its licensors. Reproduction or reuse without written consent is strictly prohibited. </p>

        <p className='text-[1rem] font-semibold font-heading'>8. Third-Party Links </p>
        <p className='mb-8 text-[1rem]'>Our website may contain links to third-party websites for additional information. We do not endorse or guarantee the content or practices of these sites and shall not be held responsible for any interaction with them.</p>

        <p className='text-[1rem] font-semibold font-heading'>9. Account Termination</p>
        <p className='mb-8 text-[1rem]'>We reserve the right to terminate or suspend any user account found to be in violation of these Terms or engaging in fraud, harassment, or harmful activity.</p>

        <p className='text-[1rem] font-semibold font-heading'>10. Limitation of Liability</p>
          <p className='mb-2 text-[1rem]'>AgriBharat shall not be liable for any indirect, incidental, punitive, or consequential damages arising out of: </p>
          <p className='mb-2 text-[1rem]'>• Use or inability to use our services</p>
          <p className='mb-2 text-[1rem]'>• Product defects not directly attributable to us</p>
          <p className='mb-2 text-[1rem]'>• Delay or non-delivery of orders</p>
          <p className='mb-8 text-[1rem]'>• You are responsible for maintaining the confidentiality of your login credentials.</p>

        <p className='text-[1rem] font-semibold font-heading'>11. Governing Law & Jurisdiction</p>
        <p className='mb-8 text-[1rem]'>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Ahmedabad, Gujarat. </p>

        <p className='text-[1rem] font-semibold font-heading'>12. Modifications to Terms</p>
        <p className='mb-8 text-[1rem]'>We may revise these Terms at any time without prior notice. Continued use of the website implies your acceptance of the latest version. </p>

        <p className='text-[1rem] font-semibold font-heading'>13. Contact Information</p>
        <p className='mb-2 text-[1rem]'>If you have any questions or concerns about these Terms, you may contact us at:</p>
        <p className='mb-2 text-[1rem]'>Email: agribharat.info@gmail.com</p>
        <p className='mb-8 text-[1rem]'>Phone: +91 9100029429/9100029329 </p>


        <h2 className="text-[1.5rem] md:text-[2rem] font-heading font-semibold my-5"> Privacy Policy  </h2>
        <p className=' text-[1rem]'> Effective Date: 01/01/2025</p>
        <div className='mb-8 text-[1rem]'>AgriBharat (“we”, “our”, “us”) is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit or make a purchase from [www.agribharat.com] (the “Website”). By using our website, you agree to the terms of this policy.</div>

        <p className='mb-2 font-heading font-semibold text-[1rem]'>1. Information We Collect </p>
        <p className='mb-4 text-[1rem]'>When you interact with our website, we may collect the following information:</p>
          <p className='mb-2 text-[1rem]'>• Full name </p>
          <p className='mb-2 text-[1rem]'>• Mobile number</p>
          <p className='mb-2 text-[1rem]'>• Address and PIN code</p>
          <p className='mb-2 text-[1rem]'>• Email address</p>
          <p className='mb-6 text-[1rem]'>• Order history</p>
          <p className='mb-2 text-[1rem]'>• OTP verification data</p>
          <p className='mb-6 text-[1rem]'>• Location data (for delivery estimates)</p>

        <p className='mb-4 text-[1rem]'>We collect this information when you:</p>
          <p className='mb-2 text-[1rem]'>• Register or create an account</p>
          <p className='mb-6 text-[1rem]'>• Place an order</p>
          <p className='mb-2 text-[1rem]'>• Contact customer support</p>
          <p className='mb-8 text-[1rem]'>• Subscribe to offers or updates</p>

        <p className='mb-2 font-heading font-semibold text-[1rem]'>2. How We Use Your Information </p>
        <p className='mb-4 text-[1rem]'>We only collect and use your personal data to improve your experience and fulfill our services. This includes: </p>
          <p className='mb-2 text-[1rem]'>• Internal record keeping</p>
          <p className='mb-2 text-[1rem]'>• Processing and delivering your orders</p>
          <p className='mb-2 text-[1rem]'>• Sending order status updates</p>
          <p className='mb-2 text-[1rem]'>• Customizing your shopping experience</p>
          <p className='mb-2 text-[1rem]'>• Offering relevant promotions or product recommendations</p>
          <p className='mb-4 text-[1rem]'>• Conducting service improvement and user feedback analysis</p>
        <p className='mb-8 text-[1rem]'>We will never sell, lease, or share your information with third parties for marketing purposes without your explicit consent. </p>


        <p className='mb-2 font-heading font-semibold text-[1rem]'>3. Data Protection & Security</p>
        <p className='mb-4 text-[1rem]'>We implement appropriate physical, electronic, and managerial procedures to safeguard your personal data from unauthorized access, misuse, or disclosure. This includes:</p>
          <p className='mb-2 text-[1rem]'>• Secure servers and encrypted payment gateways</p>
          <p className='mb-2 text-[1rem]'>• OTP verification for secure transactions</p>
          <p className='mb-4 text-[1rem]'>• Restricted access to personal data</p>
        <p className='mb-8 text-[1rem]'>However, while we strive to protect your data, no method of transmission over the internet is 100% secure. Use the website at your own discretion.</p>

        <p className='mb-2 font-heading font-semibold text-[1rem]'>4. Sharing with Third Parties</p>
        <p className='mb-4 text-[1rem]'>We only share your data with third parties for operational purposes, such as:</p>
          <p className='mb-2 text-[1rem]'>• Courier partners for delivery (e.g., Delhivery, India Post, Xpressbees, FedEx, etc.)</p>
          <p className='mb-2 text-[1rem]'>• Payment gateways for secure transaction processing</p>
        <p className='mb-8 text-[1rem]'>These service providers are required to maintain the confidentiality and integrity of your information.</p>

        <p className='font-heading font-semibold text-[1rem]'>5. User Rights</p>
        <p className='mb-4 text-[1rem]'>You have the right to:</p>
          <p className='mb-2 text-[1rem]'>• Access your personal information</p>
          <p className='mb-2 text-[1rem]'>• Correct any inaccuracies</p>
          <p className='mb-4 text-[1rem]'>• Request deletion (subject to regulatory or operational obligations)</p>
          <p className='mb-4 text-[1rem]'>• Opt-out of promotional messages</p>
        <p className='mb-8 text-[1rem]'>To make a request, contact us at: agribharat.info@gmail.com</p>

        <p className='font-heading font-semibold text-[1rem]'>6. Policy Updates</p>
        <p className='mb-8 text-[1rem]'>We may update this Privacy Policy occasionally to reflect changes in legal, regulatory, or operational requirements. Updates will be posted on this page, and we encourage you to review this policy periodically. </p>

        <p className='font-heading font-semibold text-[1rem]'>7. Children’s Privacy</p>
        <p className='mb-8 text-[1rem]'>Our services are not intended for individuals under the age of 18 without parental guidance. We do not knowingly collect data from children. </p>

        <p className='font-heading font-semibold text-[1rem]'>13. Contact Information</p>
        <p className='mb-2 text-[1rem]'>If you have any questions about this Privacy Policy or how your data is handled, reach out to us:</p>
        <p className='mb-2 text-[1rem]'>Customer Support: +91-9100029429 / +91-9100029329</p>
        <p className='mb-8 text-[1rem]'>Email: agribharat.info@gmail.com </p>

        <h2 className="text-[1.5rem] md:text-[2rem] font-heading font-semibold my-5"> Cancellation and Refund policy  </h2>
        <p className=' text-[1rem]'> Effective Date: 01/01/2025</p>
        <div className='mb-6 text-[1rem]'>At AgriBharat, we are committed to providing farmers with quality products and a smooth shopping experience. Here's how our cancellation, refund, and replacement processes work:</div>

        <p className='font-heading font-semibold text-[1rem]'>1. Order Cancellation</p>
          <p className='mb-2 text-[1rem]'>• You can cancel your order before it is shipped by contacting our Customer Support Team.</p>
          <p className='mb-2 text-[1rem]'>• Cancellation requests must be confirmed by us to be considered valid.</p>
          <p className='mb-8 text-[1rem]'>• Once the order has been dispatched, cancellation is not possible but can be returned.</p>

        <p className=' font-heading font-semibold text-[1rem]'>2. Refund Policy (For Online Payments)</p>
        <p className='mb-4 text-[1rem]'>a. If the Order is Cancelled Before Shipping: </p>
          <p className='mb-2 text-[1rem]'>• Refund will be credited to your AgriBharat Wallet within 24 hours.</p>
          <p className='mb-2 text-[1rem]'>• Any payment gateway fee will be deducted from the refund amount, if any.</p>
        <p className='mb-4 text-[1rem]'>b. If the Order is Cancelled After Shipping:</p>
          <p className='mb-2 text-[1rem]'>• Refund will be processed only after the product is returned.</p>
          <p className='mb-2 text-[1rem]'>• Deductions will include:</p>
          <p className='mb-2 text-[1rem]'>• Any payment processing fee</p>
          <p className='mb-2 text-[1rem]'>• Courier charges for both delivery and return</p>
          <p className='mb-8 text-[1rem]'>• Refunds are credited to the AgriBharat Wallet only, not to the original payment method.</p>


        <p className=' font-heading font-semibold text-[1rem]'>3. Replacement Policy (For Damaged or Defective Products)</p>
        <p className='mb-4 text-[1rem]'>We offer free replacement in the following situations: </p>
          <p className='mb-2 text-[1rem]'>• The product is damaged during delivery (e.g., broken pesticide bottles or packets).</p>
          <p className='mb-2 text-[1rem]'>• There are manufacturing defects in electronic products (e.g., battery pumps, battery torches).</p>
          <p className='mb-4 text-[1rem]'>• Products like tarpaulins, green nets, or mulching sheets have visible manufacturing issues.</p>
        <p className='mb-4 text-[1rem]'>To request a replacement, please: </p>
          <p className='mb-2 text-[1rem]'>• Share clear photos of the product and packaging</p>
          <p className='mb-2 text-[1rem]'>• Provide your order number and contact details</p>
          <p className='mb-8 text-[1rem]'>• Contact our support team within 7 days of receiving the product</p>


        <p className=' font-heading font-semibold text-[1rem]'>4. Customer Change of Mind (No Longer Wants the Product)</p>
        <p className='mb-4 text-[1rem]'>If the farmer decides not to keep the product after delivery: </p>
          <p className='mb-2 text-[1rem]'>• The paid amount will be credited to the AgriBharat Wallet.</p>
          <p className='mb-2 text-[1rem]'>• This wallet balance will remain valid for a year.</p>
          <p className='mb-8 text-[1rem]'>• The balance can be used as a discount on any future purchases.</p>

        <p className=' font-heading font-semibold text-[1rem]'>5. How to Contact Us</p>
        <p className='mb-2 text-[1rem]'>For any cancellation, refund, or replacement requests:</p>
        <p className='mb-2 text-[1rem]'>Phone: +91-9100029429 / +91-9100029329</p>
        <p className='mb-8 text-[1rem]'>Email: agribharat.info@gmail.com </p>

      </div>
    </div>
  )
}

export default  Termspagesection