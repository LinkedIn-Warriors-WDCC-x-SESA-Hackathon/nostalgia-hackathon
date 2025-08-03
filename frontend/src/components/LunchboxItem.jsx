import React from "react";

const LunchboxItem = ({ item, size = "w-28 h-28" }) => {
    if (!item) {
        return null;
    }

    return (
        <img
            src={`/items/${item}.svg`}
            alt={item}
            className={`${size} object-contain`}
        />
    );
};

export default LunchboxItem;
