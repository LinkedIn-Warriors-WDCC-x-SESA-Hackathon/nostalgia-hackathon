import React from "react";
import longformBLT from "../assets/longformBLT.png";
import Logo from "../assets/Logo.png";
import PageLayout from "../components/PageLayout";

const TradingPage = () => {
  return (
    <PageLayout title="Trading Page">
      <div className="min-h-screen bg-beige">
        <div className=" h-[124px] bg-beige-darker flex items-center px-4">
          <img
            src={Logo}
            alt="Logo"
            className="h-auto max-h-[80px] object-contain"
          />
          <div className="flex-1 flex justify-center mr-115">
            <img
              src={longformBLT}
              alt="Long Form BLT"
              className="h-auto max-h-[100px] object-contain"
            />
          </div>
          <div className="w-[120px]"></div>
        </div>

        <div className="flex justify-center mt-17">
          <div className="flex flex-col items-center mr-5">
            <div className="bg-purple rounded-[20px] w-125 h-110 shadow-md flex items-center justify-center relative">
              <h2 className="text-4xl font-bold text-center mb-2 -mt-122">
                Your Lunchbox
              </h2>
              <div>
                <div className="bg-purple-lighter rounded-[20px] w-43 h-49 shadow-md absolute top-4 right-4" />
                <div className="bg-purple-lighter rounded-[20px] w-43 h-49 shadow-md absolute bottom-4 right-4" />
              </div>
              <div className="bg-purple-lighter rounded-[20px] w-70 h-102 shadow-md absolute top-4 bottom-4 left-4" />
            </div>
          </div>

          <div className="flex">
            <div className="bg-white rounded-[20px] w-32 h-110 shadow-md mr-3" />
            <div className="bg-white rounded-[20px] w-32 h-110 shadow-md ml-3" />
          </div>

          <div className="flex flex-col items-center mr-5">
            <div className="bg-teal rounded-[20px] w-125 h-110 shadow-md ml-5 flex items-center justify-center relative">
              <h2 className="text-4xl font-bold text-center mb-2 -mt-122">
                Name's Lunchbox
              </h2>
              <div>
                <div className="bg-teal-lighter rounded-[20px] w-43 h-49 shadow-md absolute top-4 left-4" />
                <div className="bg-teal-lighter rounded-[20px] w-43 h-49 shadow-md absolute bottom-4 left-4" />
              </div>
              <div className="bg-teal-lighter rounded-[20px] w-70 h-102 shadow-md absolute top-4 bottom-4 right-4" />
            </div>
          </div>
        </div>
        <div className=""></div>
      </div>
    </PageLayout>
  );
};

export default TradingPage;
