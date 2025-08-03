import longformBLT from "../assets/longformBLT.png";
import Logo from "../assets/Logo.png";
import Button from "../components/Button";
import NotificationIcon from "../components/NotificationIcon";

import Lunchbox from "../components/Lunchbox";
import { useState, useEffect } from "react";
import { getAllLunchBoxes } from "../api/lunchboxApi";

const ListingsPage = () => {
    const [lunchboxes, setLunchboxes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Define three color combinations
    const colorCombinations = [
        { primaryColor: "bg-purple-darker", boxColor: "bg-[#E6D8ED]" },
        { primaryColor: "bg-teal-darker", boxColor: "bg-teal" },
        { primaryColor: "bg-[#DF9D9E]", boxColor: "bg-[#F3D4D4]" },
    ];

    // Function to get random color combination
    const getRandomColors = () => {
        const randomIndex = Math.floor(
            Math.random() * colorCombinations.length
        );
        return colorCombinations[randomIndex];
    };

    // Function to get random tilt
    const getRandomTilt = () => {
        const tilts = [-7, -5, -3, 3, 5, 7]; // left, right
        const randomIndex = Math.floor(Math.random() * tilts.length);
        return tilts[randomIndex];
    };

    useEffect(() => {
        const fetchLunchboxes = async () => {
            try {
                const data = await getAllLunchBoxes();
                // Add random colors and tilt to each lunchbox
                const lunchboxesWithColors = data.map((lunchbox) => ({
                    ...lunchbox,
                    colors: getRandomColors(),
                    tilt: getRandomTilt(),
                }));
                setLunchboxes(lunchboxesWithColors);
            } catch (error) {
                console.error("Error fetching lunchboxes:", error);
                setLunchboxes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchLunchboxes();
    }, []);

    // Handler for when a user wants to make an offer
    const handleMakeOffer = (lunchboxName) => {
        console.log(`Making offer for ${lunchboxName}'s lunchbox`);
        // TODO: Navigate to offer page or show offer modal
    };

    return (
        <div className="min-h-screen bg-beige pb-16">
            <div className=" h-[124px] bg-beige-darker flex items-center px-4">
                <img
                    src={Logo}
                    alt="Logo"
                    className="h-auto max-h-[80px] object-contain"
                />
                <div className="flex-1 flex justify-center mr-160">
                    <img
                        src={longformBLT}
                        alt="Long Form BLT"
                        className="h-auto max-h-[100px] object-contain"
                    />
                </div>
                <div className="w-[120px]"></div>
            </div>

            {/* Notification icon on the left side */}
            <div className="absolute top-[124px] left-6 z-50 mt-4">
                <NotificationIcon count={3} />
            </div>

            {/* Button on the right side */}
            <div className="absolute top-[124px] right-6 z-50 mt-4">
                <Button>EDIT LUNCHBOX</Button>
            </div>

            {/* Lunchboxes with random colors and tilts - stacked vertically between notification and button */}
            <div className="flex flex-col items-center justify-start mt-16 mx-4 px-20">
                {lunchboxes.map((lunchbox) => (
                    <div className={"mt-32"} key={lunchbox.name}>
                        <Lunchbox
                            primaryColor={lunchbox.colors.primaryColor}
                            tilt={lunchbox.tilt}
                            size="medium"
                            items={lunchbox.lunchbox}
                            boxColor={lunchbox.colors.boxColor}
                            onMakeOffer={() => handleMakeOffer(lunchbox.name)}
                        />
                    </div>
                ))}

                {/* Blue lunchbox - tilted left */}
                <div className="mt-24">
                    <Lunchbox
                        primaryColor="bg-teal-darker"
                        tilt={-5}
                        size="medium"
                        items={["egg", "hummus", "celery", "potatoChips"]}
                        boxColor="bg-teal"
                        onMakeOffer={() => handleMakeOffer("Alice")}
                    />
                </div>

                {/* Pink lunchbox - tilted right - extra spacing */}
                <div className="mt-32">
                    <Lunchbox
                        primaryColor="bg-[#DF9D9E]"
                        tilt={5}
                        size="medium"
                        items={["cheese", "apple", "juice", "carrot"]}
                        boxColor="bg-[#F3D4D4]"
                        onMakeOffer={() => handleMakeOffer("Bob")}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListingsPage;
