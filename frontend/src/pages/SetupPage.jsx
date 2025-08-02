import Logo from "../assets/Logo.png";
import BearLunchTrading from "../assets/BearLunchTrading.png";
import LunchItem from "../components/LunchItem";
import BLT from "../assets/BLT.png";
import BuildingLunchbox from "../components/BuildingLunchbox";
import { useState } from "react";
import Button from "../components/Button";
import DisplayNameAlert from "../components/DisplayNameAlert";

const SetupPage = () => {
    
    const foodItems = [
        { id: "apple", name: "Apple" },
        { id: "bagel", name: "Bagel" },
        { id: "banana", name: "Banana" },
        { id: "biscuits", name: "Biscuits" },
        { id: "candy", name: "Candy" },
        { id: "carrot", name: "Carrot" },
        { id: "celery", name: "Celery" },
        { id: "cheese", name: "Cheese" },
        { id: "chocolate", name: "Chocolate" },
        { id: "croissant", name: "Croissant" },
        { id: "donut", name: "Donut" },
        { id: "driedfruit", name: "Dried Fruit" },
        { id: "egg", name: "Egg" },
        { id: "hummus", name: "Hummus" },
        { id: "jelly", name: "Jelly" },
        { id: "juice", name: "Juice" },
        { id: "milkbox", name: "Milk Box" },
        { id: "onigiri", name: "Onigiri" },
        { id: "popcorn", name: "Popcorn" },
        { id: "potatochips", name: "Potato Chips" },
        { id: "pretzels", name: "Pretzels" },
        { id: "sandwich", name: "Sandwich" },
        { id: "yogurt", name: "Yogurt" },
    ];

    const [selectedItems, setSelectedItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const [showDisplayNameAlert, setShowDisplayNameAlert] = useState(false);
    const [displayName, setDisplayName] = useState("");

    // Filter food items based on search query
    const filteredFoodItems = foodItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleStartTradingClicked = () => {
        setShowDisplayNameAlert(true);
    };

    const handleDisplayNameSubmit = () => {
        // Go to listings page
        console.log(displayName)
    };

    const handleDisplayNameClose = () => {
        setShowDisplayNameAlert(false);
    };

    const handleItemClick = (item) => {
        const isAlreadySelected = selectedItems.find(
            (selected) => selected.id === item.id
        );

        if (isAlreadySelected) {
            // Remove item if already selected
            setSelectedItems(
                selectedItems.filter((selected) => selected.id !== item.id)
            );
        } else if (selectedItems.length < 6) {
            // Add item if not selected and under the limit of 6
            setSelectedItems([...selectedItems, item]);
        }
    };
    
    return (<>

            <div className="flex h-screen bg-beige">
                <div className="w-120 bg-beige-darkest flex flex-col">
                    <div className="bg-beige-darker p-4">
                        <div className="flex gap-4 mb-4">
                            <img src={Logo} className="h-30"></img>
                            <img src={BearLunchTrading} className="h-30"></img>
                        </div>

                        <input
                            type="text"
                            className="bg-white p-2 rounded-full w-full my-2"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        ></input>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-4 overflow-y-auto flex-1 auto-rows-min content-start">
                        {filteredFoodItems.map((item) => (
                            <LunchItem
                                key={item.id}
                                name={item.name}
                                image={`/public/items/${item.id}.svg`}
                                onClick={() => handleItemClick(item)}
                            />
                        ))}
                    </div>
                </div>

                <div className="w-full mx-8 flex flex-col h-full">
                    <div className="flex justify-between my-4">
                        <p className="text-2xl mt-12">
                            Set up your lunchbox listing!
                        </p>
                        <img src={BLT} className="h-30" />
                    </div>

                    <div className="flex items-center">
                        <BuildingLunchbox
                            selectedItems={selectedItems}
                            onItemClick={handleItemClick}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button onClick={handleStartTradingClicked}>
                            Start trading
                        </Button>
                    </div>
                </div>
            </div>

            <DisplayNameAlert
                show={showDisplayNameAlert}
                onSubmit={handleDisplayNameSubmit}
                onClose={handleDisplayNameClose}
                displayName={displayName}
                setDisplayName={setDisplayName}
            />

    </>);
};

export default SetupPage;
