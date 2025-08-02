import React from "react";
import Button from "./Button";

const Lunchbox = ({
    primaryColor = "bg-purple-300",
    tilt = 0,
    size = "medium",
    className = "",
    items = [], // Array of items to display in the lunchbox
    boxColor = "bg-white bg-opacity-80", // Color of the internal compartment boxes
    onMakeOffer = () => {}, // Callback for when "Make Offer" button is clicked
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

    // Default items if none provided
    const defaultItems = ["apple", "cheese", "carrot", "juice"];
    const displayItems = items.length > 0 ? items : defaultItems;

    // Generate transform style for tilt
    const transformStyle =
        tilt !== 0 ? { transform: `rotate(${tilt}deg)` } : {};

    return (
        <div className="relative group">
            <div
                className={`${primaryColor} ${config.container} ${config.padding} rounded-2xl shadow-lg ${className}`}
                style={transformStyle}
            >
                {/* Grid layout for lunchbox compartments - 2 left boxes, 1 right box */}
                <div className="flex gap-4 h-full">
                    {/* Left side - two stacked boxes */}
                    <div className="flex flex-col gap-4 w-1/3">
                    {/* Top left box - item 1 */}
                    <div
                        className={`flex-1 ${boxColor} rounded-xl flex items-center justify-center p-4 shadow-inner`}
                    >
                        {displayItems[0] && (
                            <img
                                src={"/items/" + displayItems[0] + ".svg"}
                                alt={displayItems[0]}
                                className="w-24 h-24 object-contain"
                            />
                        )}
                    </div>
                    {/* Bottom left box - item 4 */}
                    <div
                        className={`flex-1 ${boxColor} rounded-xl flex items-center justify-center p-4 shadow-inner`}
                    >
                        {displayItems[3] && (
                            <img
                                src={"/items/" + displayItems[3] + ".svg"}
                                alt={displayItems[3]}
                                className="w-24 h-24 object-contain"
                            />
                        )}
                    </div>
                </div>
                {/* Right side - one large box divided into top and bottom halves */}
                <div className="flex flex-col gap-4 w-2/3">
                    {/* Top half - items 2 and 3 */}
                    <div
                        className={`flex-1 ${boxColor} rounded-xl flex p-4 shadow-inner`}
                    >
                        <div className="flex-1 flex items-center justify-center">
                            {displayItems[1] && (
                                <img
                                    src={"/items/" + displayItems[1] + ".svg"}
                                    alt={displayItems[1]}
                                    className="w-24 h-24 object-contain"
                                />
                            )}
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                            {displayItems[2] && (
                                <img
                                    src={"/items/" + displayItems[2] + ".svg"}
                                    alt={displayItems[2]}
                                    className="w-24 h-24 object-contain"
                                />
                            )}
                        </div>
                    </div>
                    {/* Bottom half - items 5 and 6 */}
                    <div
                        className={`flex-1 ${boxColor} rounded-xl flex p-4 shadow-inner`}
                    >
                        <div className="flex-1 flex items-center justify-center">
                            {displayItems[4] && (
                                <img
                                    src={"/items/" + displayItems[4] + ".svg"}
                                    alt={displayItems[4]}
                                    className="w-24 h-24 object-contain"
                                />
                            )}
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                            {displayItems[5] && (
                                <img
                                    src={"/items/" + displayItems[5] + ".svg"}
                                    alt={displayItems[5]}
                                    className="w-24 h-24 object-contain"
                                />
                            )}
                        </div>
                    </div>
                </div>
                </div>
            </div>
            
            {/* Hover overlay with "Make Offer" button */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                 style={{
                     ...transformStyle,
                     background: `linear-gradient(rgba(243, 232, 210, 0.7), rgba(243, 232, 210, 0.7))`
                 }}>
                <Button 
                    onClick={onMakeOffer}
                    className="bg-orange hover:bg-orange-darker text-black font-bold px-8 py-4 text-lg"
                >
                    MAKE OFFER
                </Button>
            </div>
        </div>
    );
};

export default Lunchbox;
