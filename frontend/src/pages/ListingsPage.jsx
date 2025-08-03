import longformBLT from "../assets/longformBLT.png";
import Logo from "../assets/Logo.png";
import Button from "../components/Button";
import NotificationIcon from "../components/NotificationIcon";
import OffersWidget from "../components/OffersWidget";

import Lunchbox from "../components/Lunchbox";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllLunchBoxes } from "../api/lunchboxApi";
import { findOffers } from "../api/offerApi";
import { useUser } from "../context/useUser";

const ListingsPage = () => {
    const navigate = useNavigate();
    const [lunchboxes, setLunchboxes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offers, setOffers] = useState([]);
    const [hasNewOffer, setHasNewOffer] = useState(false);
    const [previousOfferCount, setPreviousOfferCount] = useState(0);
    const [showOffersWidget, setShowOffersWidget] = useState(false);
    // Pull data from useUser
    const { lunchbox, setLunchbox, name, setName } = useUser();

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
        const tilts = [-3, -2, -1, 1, 2, 3]; // left, right
        const randomIndex = Math.floor(Math.random() * tilts.length);
        return tilts[randomIndex];
    };

    // Function to get random layout
    const getRandomLayout = () => {
        const layouts = ["default", "flipped", "merged"];
        const randomIndex = Math.floor(Math.random() * layouts.length);
        return layouts[randomIndex];
    };

    useEffect(() => {
        const fetchLunchboxes = async () => {
            try {
                const data = await getAllLunchBoxes();
                // Add random colors, tilt, and layout to each lunchbox
                const lunchboxesWithColors = data.map((lunchbox) => ({
                    ...lunchbox,
                    colors: getRandomColors(),
                    tilt: getRandomTilt(),
                    layout: getRandomLayout(),
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

    // Poll for new offers every 5 seconds
    useEffect(() => {
        let intervalId;

        const pollOffers = async () => {
            if (name) {
                // Only poll if we have a user name
                try {
                    const newOffers = await findOffers(undefined, name); // sender=null, receiver=name
                    if (newOffers) {
                        // Check if we have new offers
                        if (
                            newOffers.length > previousOfferCount &&
                            previousOfferCount > 0
                        ) {
                            setHasNewOffer(true);
                            // Reset the highlight after 3 seconds
                            setTimeout(() => setHasNewOffer(false), 3000);
                        }

                        setOffers(newOffers);
                        setPreviousOfferCount(newOffers.length);
                        console.log(
                            `Found ${newOffers.length} offers for ${name}`
                        );
                    }
                } catch (error) {
                    console.error("Error polling offers:", error);
                }
            }
        };

        // Initial poll
        pollOffers();

        // Set up interval to poll every 5 seconds
        if (name) {
            intervalId = setInterval(pollOffers, 5000);
        }

        // Cleanup interval on unmount or when name changes
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [name]); // Re-run when name changes

    // Handler for when a user wants to make an offer
    const handleMakeOffer = (lunchboxName) => {
        console.log(`Making offer for ${lunchboxName}'s lunchbox`);
        // TODO: Navigate to offer page or show offer modal
        navigate(`/trading/${lunchboxName}`);
    };

    // Handler for edit lunchbox button
    const handleEditLunchbox = () => {
        navigate("/");
    };

    // Handler for notification icon click
    const handleNotificationClick = () => {
        setShowOffersWidget(!showOffersWidget);
    };

    // Handler for seeing an offer
    const handleSeeOffer = (offerId) => {
        navigate(`/offers/${offerId}`);
        setShowOffersWidget(false); // Close the widget after navigation
    };

    //

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
                <NotificationIcon
                    count={offers.length}
                    hasNewNotification={hasNewOffer}
                    onClick={handleNotificationClick}
                />

                {/* Offers Widget */}
                <OffersWidget
                    offers={offers}
                    isVisible={showOffersWidget}
                    onClose={() => setShowOffersWidget(false)}
                    onSeeOffer={handleSeeOffer}
                />
            </div>

            {/* Button on the right side */}
            <div className="absolute top-[124px] right-6 z-50 mt-4">
                <Button onClick={handleEditLunchbox}>EDIT LUNCHBOX</Button>
            </div>

            {/* Lunchboxes with random colors and tilts - stacked vertically between notification and button */}
            <div className="flex flex-col items-center justify-start mt-16 mx-4 px-20">
                {lunchboxes.map((lunchbox) => (
                    <div
                        key={lunchbox.name}
                        className="flex flex-col items-center mb-8"
                    >
                        {/* Name and avatar above lunchbox */}
                        <div className="flex items-center mb-4 z-10 w-full">
                            <div className="w-12 h-12 bg-white rounded-full border-2 border-gray-200"></div>
                            <p className="ml-3 font-semibold text-lg">
                                {lunchbox.name}
                            </p>
                        </div>

                        {/* Lunchbox */}
                        <div className="relative my-8">
                            <Lunchbox
                                primaryColor={lunchbox.colors.primaryColor}
                                tilt={lunchbox.tilt}
                                size="medium"
                                items={lunchbox.lunchbox}
                                boxColor={lunchbox.colors.boxColor}
                                layout={lunchbox.layout}
                                onMakeOffer={() =>
                                    handleMakeOffer(lunchbox.name)
                                }
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListingsPage;
