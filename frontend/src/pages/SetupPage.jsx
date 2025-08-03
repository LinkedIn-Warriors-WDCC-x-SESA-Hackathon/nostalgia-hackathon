import Logo from "../assets/Logo.png";
import BearLunchTrading from "../assets/BearLunchTrading.png";
import LunchItem from "../components/LunchItem";
import BLT from "../assets/BLT.png";
import Panic from "../assets/Panic.png";
import BuildingLunchbox from "../components/BuildingLunchbox";
import { useState } from "react";
import Button from "../components/Button";
import DisplayNameAlert from "../components/DisplayNameAlert";
import { submitLunchbox } from "../api/lunchboxApi";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/useUser";

const SetupPage = () => {
  const { setName } = useUser();
  const navigate = useNavigate(); // Move this up with other hooks

  // Add panic handler
  const handlePanic = () => {
    navigate("/panic");
  };

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

  const handleDisplayNameSubmit = async (displayName) => {
    try {
      // Convert selectedItems to array of item IDs for the API
      const lunchboxItems = selectedItems.map((item) => item.id);

      // Submit the lunchbox to the API
      await submitLunchbox(displayName, lunchboxItems);
      setName(displayName);

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

  return (
    <>
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
          <div className="flex justify-between my-4">
            <p className="text-2xl mt-12">Set up your lunchbox listing!</p>
            <img src={BLT} className="h-30" />
          </div>

          <div className="flex items-center justify-center flex-1">
            <BuildingLunchbox
              selectedItems={selectedItems}
              onItemClick={handleItemClick}
            />
          </div>

          <div className="flex justify-end my-8">
            <Button onClick={handleStartTradingClicked}>Start trading</Button>
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
      <div className="fixed bottom-5 left-94 z-50">
        <img
          src={Panic}
          alt="Panic"
          className="cursor-pointer w-20 h-20 drop-shadow-xl"
          style={{
            filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))",
          }}
          onClick={handlePanic}
        />
      </div>
    </>
  );
};

export default SetupPage;
