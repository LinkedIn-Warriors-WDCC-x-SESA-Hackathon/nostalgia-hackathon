import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import longformBLT from "../assets/longformBLT.png";
import Logo from "../assets/Logo.png";
import Button from "../components/Button";
import { useUser } from "../context/useUser";
import { getLunchboxByName } from "../api/lunchboxApi";
import {makeOffer} from "../api/offerApi"

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

const TradingPage = () => {
  const { name: otherName } = useParams();
  const { name: thisName } = useUser();
  const [yourItems, setYourItems] = useState([]);
  const [leftWhiteBoxItems, setLeftWhiteBoxItems] = useState([]);
  const [otherItems, setOtherItems] = useState([]); // Add this
  const [rightWhiteBoxItems, setRightWhiteBoxItems] = useState([]); // Add this
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const myLunchbox = await getLunchboxByName(thisName)
      const otherLunchbox = await getLunchboxByName(otherName)
      setYourItems(myLunchbox)
      setOtherItems(otherLunchbox)
    })()
  }, [])

  const handleMakeOfferClick = async () => {
    await makeOffer({
      sender: thisName,
      receiver: otherName,
      offering: leftWhiteBoxItems,
      wanting: rightWhiteBoxItems
    })
    navigate('/listings')
  }

  // Move one item from purple box to white box (max 4)
  const moveToWhiteBox = (item) => {
    console.log("Moving item:", item);
    if (leftWhiteBoxItems.length >= 4) return;

    const newYourItems = [...yourItems];
    const itemIndex = newYourItems.indexOf(item);
    if (itemIndex !== -1) {
      newYourItems[itemIndex] = null;
    }

    setYourItems(newYourItems);
    setLeftWhiteBoxItems([...leftWhiteBoxItems, item]);
  };

  const moveBackToPurpleBox = (item) => {
    console.log("Moving item back:", item);

    setLeftWhiteBoxItems(leftWhiteBoxItems.filter((i) => i !== item));

    const newYourItems = [...yourItems];
    const originalIndex = initialYourItems.indexOf(item);
    if (originalIndex !== -1) {
      newYourItems[originalIndex] = item;
    }

    setYourItems(newYourItems);
  };

  // Add these functions for teal box
  const moveToRightWhiteBox = (item) => {
    console.log("Moving teal item:", item);
    if (rightWhiteBoxItems.length >= 4) return;

    const newOtherItems = [...otherItems];
    const itemIndex = newOtherItems.indexOf(item);
    if (itemIndex !== -1) {
      newOtherItems[itemIndex] = null;
    }

    setOtherItems(newOtherItems);
    setRightWhiteBoxItems([...rightWhiteBoxItems, item]);
  };

  const moveBackToTealBox = (item) => {
    console.log("Moving item back to teal:", item);

    setRightWhiteBoxItems(rightWhiteBoxItems.filter((i) => i !== item));

    const newOtherItems = [...otherItems];
    const originalIndex = initialOtherItems.indexOf(item);
    if (originalIndex !== -1) {
      newOtherItems[originalIndex] = item;
    }

    setOtherItems(newOtherItems);
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
            <h2 className="text-4xl font-bold text-center mb-2 -mt-2">
              Your Lunchbox
            </h2>
            <div className="bg-purple rounded-3xl w-125 h-110 shadow-md flex items-center justify-center relative overflow-hidden">
              {/* Two small lighter purple boxes on the right */}
              <div className="absolute top-4 right-4 flex flex-col gap-4 z-10">
                {yourItems.slice(0, 2).map((item) => (
                  <div
                    key={Math.random()}
                    className="bg-purple-lighter rounded-3xl w-43 h-49 shadow-md flex items-center justify-center cursor-pointer"
                    onClick={() => moveToWhiteBox(item)}
                    title="Click to move to white box"
                  >
                    <img
                      src={`/public/items/${item}.svg`}
                      alt={item}
                      className="max-h-32 max-w-32 object-contain"
                    />
                  </div>
                ))}
              </div>
              {/* One big lighter purple box on the left with up to 4 items in a 2x2 grid */}
              <div className="absolute top-4 right-4 flex flex-col gap-4 z-10">
                {[0, 1].map((idx) => {
                  const item = yourItems[idx];
                  return (
                    <div
                      key={Math.random()}
                      className="bg-purple-lighter rounded-3xl w-43 h-49 shadow-md flex items-center justify-center"
                      style={{ cursor: item ? "pointer" : "default" }}
                      onClick={item ? () => moveToWhiteBox(item) : undefined}
                      title={item ? "Click to move to white box" : ""}
                    >
                      {item && (
                        <img
                          src={`/public/items/${item}.svg`}
                          alt={item}
                          className="max-h-32 max-w-32 object-contain"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              {/* One big lighter purple box on the left with up to 4 items in a 2x2 grid */}
              <div className="absolute top-4 bottom-4 left-4 flex items-center justify-center z-10">
                <div className="bg-purple-lighter rounded-3xl w-70 h-102 shadow-md grid grid-cols-2 grid-rows-2 gap-4 items-center justify-center p-4">
                  {[0, 1, 2, 3].map((idx) => {
                    const item = yourItems[idx + 2];
                    return (
                      <div
                        key={Math.random()}
                        className="flex items-center justify-center"
                        style={{ cursor: item ? "pointer" : "default" }}
                        onClick={item ? () => moveToWhiteBox(item) : undefined}
                        title={item ? "Click to move to white box" : ""}
                      >
                        {item && (
                          <img
                            src={`/public/items/${item}.svg`}
                            alt={item}
                            className="max-h-20 max-w-20 object-contain"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Middle white boxes */}
          <div className="flex">
            {/* Left white box: show up to 4 items */}
            {/* Left white box: show up to 4 items */}
            <div className="bg-white rounded-3xl w-32 h-110 shadow-md mr-3 flex items-center justify-center p-2">
              <div className="grid grid-rows-4 gap-4 h-full w-full place-items-center">
                {leftWhiteBoxItems.slice(0, 4).map((item) => (
                  <img
                    key={Math.random()}
                    src={`/public/items/${item}.svg`}
                    alt={item}
                    className="max-h-12 max-w-12 object-contain cursor-pointer"
                    onClick={() => moveBackToPurpleBox(item)}
                    title="Click to move back to purple box"
                  />
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl w-32 h-110 shadow-md ml-3 flex items-center justify-center p-2">
              <div className="grid grid-rows-4 gap-4 h-full w-full place-items-center">
                {rightWhiteBoxItems.slice(0, 4).map((item) => (
                  <img
                    key={Math.random()}
                    src={`/public/items/${item}.svg`}
                    alt={item}
                    className="max-h-12 max-w-12 object-contain cursor-pointer"
                    onClick={() => moveBackToTealBox(item)}
                    title="Click to move back to teal box"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Name's Lunchbox */}
          <div className="flex flex-col items-center mr-5 -mt-10">
            <h2 className="text-4xl font-bold text-center mb-2 -mt-2 z-30 relative pointer-events-none select-none">
              Name's Lunchbox
            </h2>
            <div className="bg-teal rounded-3xl w-125 h-110 shadow-md ml-5 flex items-center justify-center relative overflow-hidden">
              {/* Two small lighter teal boxes on the left */}
              <div className="absolute top-4 left-4 flex flex-col gap-4 z-10">
                {[0, 1].map((idx) => {
                  const item = otherItems[idx];
                  return (
                    <div
                      key={Math.random()}
                      className="bg-teal-lighter rounded-3xl w-43 h-49 shadow-md flex items-center justify-center"
                      style={{ cursor: item ? "pointer" : "default" }}
                      onClick={
                        item ? () => moveToRightWhiteBox(item) : undefined
                      }
                      title={item ? "Click to move to white box" : ""}
                    >
                      {item && (
                        <img
                          src={`/public/items/${item}.svg`}
                          alt={item}
                          className="max-h-32 max-w-32 object-contain"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              {/* One big lighter teal box on the right with up to 4 items in a 2x2 grid */}
              <div className="absolute top-4 bottom-4 right-4 flex items-center justify-center z-10">
                <div className="bg-teal-lighter rounded-3xl w-70 h-102 shadow-md grid grid-cols-2 grid-rows-2 gap-4 items-center justify-center p-4">
                  {[0, 1, 2, 3].map((idx) => {
                    const item = otherItems[idx + 2];
                    return (
                      <div
                        key={Math.random()}
                        className="flex items-center justify-center"
                        style={{ cursor: item ? "pointer" : "default" }}
                        onClick={
                          item ? () => moveToRightWhiteBox(item) : undefined
                        }
                        title={item ? "Click to move to white box" : ""}
                      >
                        {item && (
                          <img
                            src={`/public/items/${item}.svg`}
                            alt={item}
                            className="max-h-20 max-w-20 object-contain"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10 mr-6">
        <Button onClick={handleMakeOfferClick}>Make Offer</Button>
      </div>
    </div>
  );
};

export default TradingPage;
