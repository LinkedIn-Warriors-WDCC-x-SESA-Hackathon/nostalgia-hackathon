import PageLayout from "../components/PageLayout";
import Logo from "../assets/Logo.png";
import BearLunchTrading from "../assets/BearLunchTrading.png";
import LunchItem from "../components/LunchItem";
import BLT from "../assets/BLT.png";
import BuildingLunchbox from "../components/BuildingLunchbox";
import { useState } from "react";

const SetupPage = () => {
    const foodItems = [
        { id: "apple", name: "Apple" },
        { id: "carrot", name: "Carrot" },
        { id: "celery", name: "Celery" },
        { id: "cheese", name: "Cheese" },
        { id: "egg", name: "Egg" },
        { id: "hummus", name: "Hummus" },
        { id: "juice", name: "Juice" },
        { id: "potatochips", name: "Potato Chips" },
    ];

    const [selectedItems, setSelectedItems] = useState([]);

    const handleItemClick = (item) => {
        if (!selectedItems.find((selected) => selected.id === item.id)) {
            setSelectedItems([...selectedItems, item]);
        }
    };

    return (
        <>
            <PageLayout title="Create your listing">
                <div className="flex h-screen bg-beige">
                    <div className="w-120 bg-beige-darkest">
                        <div className="bg-beige-darker p-4">
                            <div className="flex gap-4 mb-4">
                                <img src={Logo} className="h-30"></img>
                                <img
                                    src={BearLunchTrading}
                                    className="h-30"
                                ></img>
                            </div>

                            <input
                                type="text"
                                className="bg-white p-2 rounded-full w-full my-2"
                                placeholder="Search..."
                            ></input>
                        </div>

                        <div className="grid grid-cols-2 gap-4 p-4">
                            {foodItems.map((item) => (
                                <LunchItem
                                    key={item.id}
                                    name={item.name}
                                    image={`/public/items/${item.id}.svg`}
                                    onClick={() => handleItemClick(item)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="w-full mx-8">
                        <div className="flex justify-between my-4">
                            <p className="text-2xl mt-12">
                                Set up your lunchbox listing!
                            </p>
                            <img src={BLT} className="h-30" />
                        </div>

                        <BuildingLunchbox selectedItems={selectedItems} />
                    </div>
                </div>
            </PageLayout>
        </>
    );
};

export default SetupPage;
