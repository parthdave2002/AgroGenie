import React, { useEffect } from 'react'

const Privacypagesection = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [])

  return (
    <div className='p-6'>
      <div className="max-w-1600 mx-auto px-4">
        <h2 className="text-[1.5rem] md:text-[2rem] font-heading font-semibold my-5"> Privacy Policy </h2>
        <p className='mb-6 text-[1rem]'>1. When you use our website, we may ask for a few details like your name, contact info OTP Verification. But don’t worry – we only use your information to serve you better. </p>
        <p className='mb-6 text-[1rem]'>2. We use your information to </p>
        <p className='mb-6 text-[1rem]'>3. Keep internal records </p>
        <p className='mb-6 text-[1rem]'>4. Improve our products and services. </p>
        <p className='mb-6 text-[1rem]'>5. Let you know about offers, new products, or helpful tips. </p>
        <p className='mb-6 text-[1rem]'>6. Understand your preferences so we can customize your experience. </p>
        <p className='mb-6 text-[1rem]'>7. We may update this privacy policy from time to time. Check this page now and then to stay informed. </p>
        <p className='mb-6 text-[1rem]'>8. Your privacy is safe with us. </p>
     
      </div>

      <div className="max-w-1600 mx-auto px-4  mt-[3rem]">
        <h2 className="text-[1.5rem] md:text-[2rem] font-heading font-semibold "> Shipping / Delivery </h2>
        <h4 className='mb-8 text-[1rem]'>At AgriBharat, we do our best to deliver your order quickly and safely, no matter where you are! </h4>
        <h3 className='mb-4 text-[1.3rem] font-bold'> • How We Ship</h3>
        <p className='mb-3 text-[1rem]'>1.	We usually deliver your order within 6 to 10 working days. </p>
        <p className='mb-3 text-[1rem]'>2. We use trusted courier partners like India Post, Shipyaari, Delhivery, FedEx, Xpressbees, Gati, Ecom Express, and others. </p>
        <p className='mb-3 text-[1rem]'>3. Bulk or transport orders may take a little longer (around 2 to 3 days to dispatch). </p>
        <p className='mb-3 text-[1rem]'>4. Note: Orders sent via India Post may take longer than usual. </p>
        <p className='mb-3 text-[1rem]'>5. First-Time Order Confirmation. </p>
        <p className='mb-3 text-[1rem]'>6. If you're ordering for the first time, one of our team members will call you to confirm your address and pin code. </p>
        <p className='mb-3 text-[1rem]'>7. If we can't deliver to your location, we may ask you to provide an alternate address. </p>


        <div>
            <h3 className='mb-4 text-[1.3rem] font-bold'> • What to Do If Package Looks Damaged</h3>
            <p className='mb-3 text-[1rem]'>1.	If the box looks tampered with or damaged, please don’t accept the delivery. </p>
            <p className='mb-3 text-[1rem]'>2. Take clear photos of the package and tell the delivery person :  “The package is damaged. I’m not accepting it.”. </p>
            <p className='mb-3 text-[1rem]'>3. Then, Contact us at phone no : 9100029429/9100029329 with your order number and the photos. We’ll sort it out quickly and send a replacement if needed.</p>
        </div>

        <div>
            <h3 className='mb-4 text-[1.3rem] font-bold'> • Delivery Time</h3>
            <p className='mb-3 text-[1rem]'>1.	The delivery time you see on the product or website is just an estimate. </p>
            <p className='mb-3 text-[1rem]'>2. Actual delivery may vary depending on. </p>
            <p className='mb-3 text-[1rem]'>3. Product availability.</p>
            <p className='mb-3 text-[1rem]'>4. Weather.</p>
            <p className='mb-3 text-[1rem]'>5. Your location.</p>
            <p className='mb-3 text-[1rem]'>6. Courier company performance.</p>
        </div>

        <div>
            <h3 className='mb-4 text-[1.3rem] font-bold'> • Delayed or Failed Delivery</h3>
            <p className='mb-3 text-[1rem]'>1. We always aim to deliver your product on time. But sometimes, things like weather or courier delays may cause a delay of delivery. </p>
            <p className='mb-3 text-[1rem]'>2. If there's a delay or delivery issue, we’ll do everything we can to fix it. </p>
            <p className='mb-3 text-[1rem]'>3. However, AgriBharat is not responsible for any loss caused due to delay or non-delivery.</p>
            <p className='mb-3 text-[1rem]'>4. ODA (Out of Delivery Area) if your location is remote or not covered, you may need to pick up the parcel from the nearest courier office. Don’t worry — we’ll give you the address and stay in touch till you get it.</p>
        </div>

           <div>
            <h3 className='mb-4 text-[1.3rem] font-bold'> • Need Help ?? </h3>
            <p className='mb-3 text-[1rem]'>1. We're always here for you. </p>
            <p className='mb-3 text-[1rem]'>2.  Just call us at Phone no. </p>
        </div>
      </div>
    </div>
  )
}

export default Privacypagesection