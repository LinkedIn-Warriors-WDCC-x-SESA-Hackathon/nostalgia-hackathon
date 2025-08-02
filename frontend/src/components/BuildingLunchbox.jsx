import React from "react";

// Lunchbox for "build your lunch box" page
const BuildingLunchbox = () => {
    return (
        <div className="bg-teal-darker w-150 h-100 rounded-2xl flex p-4 m-4">
            <div className="w-1/3 pr-4 flex flex-col gap-4">
                <div className="bg-teal h-1/2 rounded-2xl"></div>
                <div className="bg-teal h-1/2 rounded-2xl"></div>
            </div>
            <div className="bg-teal w-2/3 rounded-2xl"></div>
        </div>
    );
};

export default BuildingLunchbox;
