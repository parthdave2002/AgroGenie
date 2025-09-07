import React from "react";

const ShopFasterSection: React.FC = () => {
  return (
    // <section className="py-5 my-5">
    //   <div className="max-w-1600 mx-auto px-4">
    //     <div
    //       className="bg-yellow-100 py-20 rounded-[40px] bg-no-repeat"
    //       style={{ backgroundImage: "url('images/bg-pattern-2.png')" }}
    //     >
    //       <div className="max-w-7xl mx-auto px-4">
    //         <div className="flex flex-col md:flex-row items-center gap-8">
    //           <div className="md:w-1/3">
    //             <img src="images/phone.png" alt="phone" className="float-left w-full h-auto"  />
    //           </div>
    //           <div className="md:w-2/3">
    //             <h2 className="my-10 font-heading text-4xl font-bold"> Shop faster with foodmart App </h2>
    //             <p className="mb-6 text-base leading-relaxed"> Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Sagittis sed ptibus liberolectus nonet psryroin. Amet sed lorem posuere sit iaculis amet, ac urna. Adipiscing fames semper erat ac in suspendisse iaculis. Amet blandit tortor praesent  ante vitae. A, enim pretiummi senectus magna. Sagittis sed ptibus liberolectus non et psryroin. </p>
    //             <div className="flex flex-wrap gap-2">
    //               <img src="images/app-store.jpg" alt="app-store" />
    //               <img src="images/google-play.jpg" alt="google-play" />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>


    <section className="py-20 px-6 bg-amber-50 rounded-3xl max-w-7xl mx-auto my-20">
      <div className="flex flex-col md:flex-row items-center gap-16">

        <div className="flex-shrink-0 w-full max-w-xs md:max-w-sm bg-transparent">
          <img
            src="images/phone.png"
            alt="Foodmart App on Phone"
            className="rounded-3xl max-h-600 mx-auto"
            style={{ objectFit: "contain" }}
          />
        </div>


        <div className="flex-1 max-w-xl text-left">
          <h2 className="text-3xl font-semibold mb-6 font-heading">
            Shop faster with foodmart App
          </h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis sed ptibus
            liberolectus nonet psryroin. Amet sed lorem posuere sit iaculis amet, ac urna.
            Adipiscing fames semper erat ac in suspendisse iaculis. Amet blandit tortor
            praesent ante vitae. A, enim pretiummi senectus magna. Sagittis sed ptibus
            liberolectus non et psryroin.
          </p>
          <div className="flex gap-6">
            <a href="#" aria-label="Download on the App Store">
              <img src="images/app-store.jpg" alt="App Store" className="h-14" />
            </a>
            <a href="#" aria-label="Get it on Google Play">
              <img src="images/google-play.jpg" alt="Google Play" className="h-14" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopFasterSection;
