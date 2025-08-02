import React from "react";
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

    useEffect(() => {
        const fetchLunchboxes = async () => {
            try {
                const data = await getAllLunchBoxes();
                setLunchboxes(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching lunchboxes:", error);
                setLunchboxes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchLunchboxes();

        console.log(lunchboxes); // Debugging line to check fetched lunchboxes
    }, []);

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

                {/* Sample lunchboxes with different colors and tilts - stacked vertically between notification and button */}
                <div className="flex flex-col items-center justify-start mt-16 mx-4 px-20">
                    {lunchboxes.map((lunchbox) => (
                        <div className="mt-24" key={lunchbox.name}>
                            <Lunchbox
                                primaryColor={`bg-purple-darker`}
                                tilt={0}
                                size="medium"
                                items={lunchbox.lunchbox}
                                boxColor={`bg-[#E6D8ED]`}
                            />
                        </div>
                    ))}

                    {/* Blue lunchbox - tilted left */}
                    <div className="mt-24">
                        <Lunchbox
                            primaryColor="bg-teal-darker"
                            tilt={-5}
                            size="medium"
                            items={["egg", "hummus", "celery", "potatochips"]}
                            boxColor="bg-teal"
                        />
                    </div>

                    {/* Pink lunchbox - tilted right - extra spacing */}
                    <div className="mt-32">
                        <Lunchbox
                            primaryColor="bg-[#DF9D9E]"
                            tilt={5}
                            size="medium"
                            items={["bagel", "apple", "juice", "carrot"]}
                            boxColor="bg-[#F3D4D4]"
                        />
                    </div>
                </div>
            </div>

    );
};

export default ListingsPage;
