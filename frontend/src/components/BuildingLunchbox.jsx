import React from "react";

// Lunchbox for "build your lunch box" page
const BuildingLunchbox = ({ selectedItems = [], onItemClick }) => {
    // Helper function to render an item or empty slot
    const renderItem = (item) => {
        if (item) {
            return (
                <img
                    src={`/public/items/${item.id}.svg`}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-contain cursor-pointer hover:opacity-75 transition-opacity p-12"
                    onClick={() => onItemClick(item)}
                />
            );
        }
        return null;
    };

    return (
        <div className="bg-teal-darker w-full aspect-[8/5] rounded-2xl flex p-8 m-16">
            <div className="w-1/3 pr-8 flex flex-col gap-8">
                {/* First item */}
                <div className="bg-teal h-1/2 rounded-2xl flex items-center justify-center relative">
                    {renderItem(selectedItems[0])}
                </div>
                {/* Fourth item */}
                <div className="bg-teal h-1/2 rounded-2xl flex items-center justify-center relative">
                    {renderItem(selectedItems[3])}
                </div>
            </div>

            <div className="bg-teal w-2/3 rounded-2xl flex flex-col">
                {/* Top half: items 2 and 3 */}
                <div className="h-1/2 flex">
                    <div className="w-1/2 flex items-center justify-center relative">
                        {renderItem(selectedItems[1])}
                    </div>
                    <div className="w-1/2 flex items-center justify-center relative">
                        {renderItem(selectedItems[2])}
                    </div>
                </div>

                {/* Bottom half: items 5 and 6 */}
                <div className="h-1/2 flex">
                    <div className="w-1/2 flex items-center justify-center relative">
                        {renderItem(selectedItems[4])}
                    </div>
                    <div className="w-1/2 flex items-center justify-center relative">
                        {renderItem(selectedItems[5])}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuildingLunchbox;
