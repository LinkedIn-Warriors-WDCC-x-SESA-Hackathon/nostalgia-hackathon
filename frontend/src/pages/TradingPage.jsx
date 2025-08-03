import React from "react";
import { useNavigate } from "react-router-dom";
import longformBLT from "../assets/longformBLT.png";
import Logo from "../assets/Logo.png";

import Button from "../components/Button";

const initialYourItems = [
  "Apple",
  "Biscuits",
  "Juice",
  "Sandwich",
  "Yogurt",
  "Banana",
];
const initialOtherItems = [
  "Apple",
  "Biscuits",
  "Juice",
  "Sandwich",
  "Yogurt",
  "Banana",
];
const itemImages = {
  Apple: "/items/apple.svg",
  Biscuits: "/items/biscuits.svg",
  Juice: "/items/juice.svg",
  Sandwich: "/items/sandwich.svg",
  Yogurt: "/items/yogurt.svg",
  Banana: "/items/banana.svg",
};

const TradingPage = () => {
  const navigate = useNavigate();

  const handleEditLunchbox = () => {
    navigate('/');
  };

  return (

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

        <div className="flex justify-center">
          <div className="flex justify-center mt-17">
            {/* Your Lunchbox */}
            <div className="flex flex-col items-center mr-5 -mt-10">
              <h2 
                className="text-4xl font-bold text-center mb-2 -mt-2 cursor-pointer hover:text-orange transition-colors"
                onClick={handleEditLunchbox}
                title="Click to edit your lunchbox"
              >
                Your Lunchbox
              </h2>
              <div className="bg-purple rounded-3xl w-125 h-110 shadow-md flex items-center justify-center relative overflow-hidden">
                {/* Two small lighter purple boxes on the right */}
                <div className="absolute top-4 right-4 flex flex-col gap-4 z-10">
                  {[0, 1].map((idx) =>
                    initialYourItems[idx] ? (
                      <div
                        key={initialYourItems[idx]}
                        className="bg-purple-lighter rounded-3xl w-43 h-49 shadow-md flex items-center justify-center"
                      >
                        <img
                          src={itemImages[initialYourItems[idx]]}
                          alt={initialYourItems[idx]}
                          className="max-h-32 max-w-32 object-contain"
                        />
                      </div>
                    ) : (
                      <div
                        key={idx}
                        className="bg-purple-lighter rounded-3xl w-43 h-49 shadow-md"
                      />
                    )
                  )}
                </div>
                {/* One big lighter purple box on the left with up to 4 items in a 2x2 grid */}
                <div className="absolute top-4 bottom-4 left-4 flex items-center justify-center z-10">
                  <div className="bg-purple-lighter rounded-3xl w-70 h-102 shadow-md grid grid-cols-2 grid-rows-2 gap-4 items-center justify-center p-4">
                    {initialYourItems.slice(2, 6).map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-center"
                      >
                        <img
                          src={itemImages[item]}
                          alt={item}
                          className="max-h-20 max-w-20 object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Middle white boxes (unchanged) */}
            <div className="flex">
              <div className="bg-white rounded-3xl w-32 h-110 shadow-md mr-3" />
              <div className="bg-white rounded-3xl w-32 h-110 shadow-md ml-3" />
            </div>

            {/* Name's Lunchbox (for symmetry, similar logic can be applied) */}
            <div className="flex flex-col items-center mr-5 -mt-10">
              <h2 className="text-4xl font-bold text-center mb-2 -mt-2 z-30 relative pointer-events-none select-none">
                Name's Lunchbox
              </h2>
              <div className="bg-teal rounded-3xl w-125 h-110 shadow-md ml-5 flex items-center justify-center relative overflow-hidden">
                {/* Two small lighter teal boxes on the left */}
                <div className="absolute top-4 left-4 flex flex-col gap-4 z-10">
                  {[0, 1].map((idx) =>
                    initialOtherItems[idx] ? (
                      <div
                        key={initialOtherItems[idx]}
                        className="bg-teal-lighter rounded-3xl w-43 h-49 shadow-md flex items-center justify-center"
                      >
                        <img
                          src={itemImages[initialOtherItems[idx]]}
                          alt={initialOtherItems[idx]}
                          className="max-h-32 max-w-32 object-contain"
                        />
                      </div>
                    ) : (
                      <div
                        key={idx}
                        className="bg-teal-lighter rounded-3xl w-43 h-49 shadow-md"
                      />
                    )
                  )}
                </div>
                {/* One big lighter teal box on the right with up to 4 items in a 2x2 grid */}
                <div className="absolute top-4 bottom-4 right-4 flex items-center justify-center z-10">
                  <div className="bg-teal-lighter rounded-3xl w-70 h-102 shadow-md grid grid-cols-2 grid-rows-2 gap-4 items-center justify-center p-4">
                    {initialOtherItems.slice(2, 6).map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-center"
                      >
                        <img
                          src={itemImages[item]}
                          alt={item}
                          className="max-h-20 max-w-20 object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10 mr-6">
          <Button>Make Offer</Button>
        </div>
      </div>

  );
};

export default TradingPage;
