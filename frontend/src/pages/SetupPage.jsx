import Logo from "../assets/Logo.png";
import BearLunchTrading from "../assets/BearLunchTrading.png";
import LunchItem from "../components/LunchItem";
import BLT from "../assets/BLT.png";
import BuildingLunchbox from "../components/BuildingLunchbox";
import CameraModal from "../components/CameraModal";
import { useState } from "react";
import Button from "../components/Button";
import DisplayNameAlert from "../components/DisplayNameAlert";
import { submitLunchbox } from "../api/lunchboxApi";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/useUser";

const SetupPage = () => {
    const {setName} = useUser()
    
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
    const [showCameraModal, setShowCameraModal] = useState(false);

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

    const navigate = useNavigate();

    const handleDisplayNameSubmit = async (displayName) => {
        try {
            // Convert selectedItems to array of item IDs for the API
            const lunchboxItems = selectedItems.map((item) => item.id);

            // Submit the lunchbox to the API
            await submitLunchbox(displayName, lunchboxItems);
            
            setName(displayName)


            // Close the modal and navigate to listings page
            setShowDisplayNameAlert(false);
            // TODO: Navigate to listings page
            navigate("/listings");
        } catch (error) {
            console.error("Error submitting lunchbox:", error);
            // You might want to show an error message to the user here
        }
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

    // Camera handlers
    const handleOpenCamera = () => {
        setShowCameraModal(true);
    };

    const handleCloseCamera = () => {
        setShowCameraModal(false);
    };

    const handleCapturePhoto = (photoBlob) => {
        // Here you could implement AI/ML food recognition
        // For now, we'll just log that a photo was captured
        console.log('Photo captured:', photoBlob);
        
        // You could send this to an AI service to identify food items
        // and automatically add them to selectedItems
        alert('Photo captured! In a real implementation, this would use AI to identify food items.');
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

                <div className="w-full mx-8 flex flex-col h-screen justify-between">
                    <div className="flex justify-between items-center my-4">
                        <p className="text-2xl mt-12">
                            Set up your lunchbox listing!
                        </p>
                        <img src={BLT} className="h-30" />
                    </div>

                    <div className="flex items-center justify-center flex-1">
                        <BuildingLunchbox
                            selectedItems={selectedItems}
                            onItemClick={handleItemClick}
                        />
                    </div>

                    <div className="flex justify-between my-8">
                        <Button 
                            onClick={handleOpenCamera}
                            className="bg-teal hover:bg-teal-darker"
                        >
                            Scan Lunchbox
                        </Button>
                        <Button onClick={handleStartTradingClicked}>
                            Start Trading
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

            <CameraModal
                isOpen={showCameraModal}
                onClose={handleCloseCamera}
                onCapture={handleCapturePhoto}
            />

    </>);
};

export default SetupPage;
