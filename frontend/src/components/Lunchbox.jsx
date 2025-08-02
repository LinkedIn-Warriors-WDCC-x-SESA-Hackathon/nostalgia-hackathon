import React from "react";

const Lunchbox = ({
  primaryColor = "bg-purple-300",
  tilt = 0,
  size = "medium",
  className = "",
  items = [], // Array of items to display in the lunchbox
  boxColor = "bg-white bg-opacity-80", // Color of the internal compartment boxes
}) => {
  // Size configurations
  const sizeConfig = {
    small: {
      container: "w-[40rem] h-[20rem]",
      padding: "p-6",
    },
    medium: {
      container: "w-[64rem] h-[32rem]",
      padding: "p-8",
    },
    large: {
      container: "w-[80rem] h-[40rem]",
      padding: "p-10",
    },
  };

  const config = sizeConfig[size];

  // Map of available food items
  const foodAssets = {
    apple: "/items/apple.svg",
    carrot: "/items/carrot.svg",
    celery: "/items/celery.svg",
    cheese: "/items/cheese.svg",
    egg: "/items/egg.svg",
    hummus: "/items/hummus.svg",
    juice: "/items/juice.svg",
    potatoChips: "/items/potato chips.svg",
  };

  // Default items if none provided
  const defaultItems = ["apple", "cheese", "carrot", "juice"];
  const displayItems = items.length > 0 ? items : defaultItems;

  // Generate transform style for tilt
  const transformStyle = tilt !== 0 ? { transform: `rotate(${tilt}deg)` } : {};

  return (
    <div
      className={`${primaryColor} ${config.container} ${config.padding} rounded-2xl shadow-lg ${className}`}
      style={transformStyle}
    >
      {/* Grid layout for lunchbox compartments - 2 left boxes, 1 right box */}
      <div className="flex gap-4 h-full">
        {/* Left side - two stacked boxes */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Top left box */}
          <div
            className={`flex-1 ${boxColor} rounded-xl flex items-center justify-center p-4 shadow-inner`}
          >
            {foodAssets[displayItems[0]] && (
              <img
                src={foodAssets[displayItems[0]]}
                alt={displayItems[0]}
                className="w-16 h-16 object-contain"
              />
            )}
          </div>
          {/* Bottom left box */}
          <div
            className={`flex-1 ${boxColor} rounded-xl flex items-center justify-center p-4 shadow-inner`}
          >
            {foodAssets[displayItems[1]] && (
              <img
                src={foodAssets[displayItems[1]]}
                alt={displayItems[1]}
                className="w-16 h-16 object-contain"
              />
            )}
          </div>
        </div>
        {/* Right side - one large box */}
        <div
          className={`flex-1 ${boxColor} rounded-xl flex items-center justify-center p-4 shadow-inner`}
        >
          {foodAssets[displayItems[2]] && (
            <img
              src={foodAssets[displayItems[2]]}
              alt={displayItems[2]}
              className="w-20 h-20 object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Lunchbox;
