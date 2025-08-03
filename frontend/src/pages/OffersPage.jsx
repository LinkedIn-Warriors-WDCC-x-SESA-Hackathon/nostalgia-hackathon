import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../assets/Logo.png";
import longformBLT from "../assets/longformBLT.png";
import "../index.css";
import Button from "../components/Button";
import { findOfferWithId, acceptOffer, declineOffer } from "../api/offerApi";
import LunchItem from "../components/LunchItem";

import { itemNameMap } from "../util/items";

const OffersPage = () => {
    const navigate = useNavigate(); // React Router's navigation hook
    const { id } = useParams();
    const [offer, setOffer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const retrievedOffer = await findOfferWithId(id);
            setOffer(retrievedOffer);
            setLoading(false);
        })();
    }, [id]);

    const accept = async () => {
        await acceptOffer(id);
        navigate("/listings");
    };

    const decline = async () => {
        await declineOffer(id);
        navigate("/listings");
    };

    const loadedView = (
        <>
            <div className="flex flex-col items-center mt-[-40px]">
                <h2 className="text-black text-3xl font-bold mb-2 text-center">
                    {`${offer?.sender ?? ""}'s Trade Offer`}
                </h2>

                <div className="relative bg-[#CFBB8F] w-[700px] h-[435px] rounded-2xl shadow-lg flex items-center justify-center">
                    <button className="absolute left-[-60px] w-[40px] top-1/2 -translate-y-1/2 bg-[#CFBB8F] text-black px-3 py-2 rounded-full hover:bg-orange-darker cursor-pointer">
                        &lt;
                    </button>

                    <div className="flex flex-row gap-7">
                        <div className="flex flex-col items-center">
                            <p className="text-black text-xl font-bold mb-2">
                                Items you will receive
                            </p>
                            <div className="bg-white w-[300px] h-[350px] rounded-3xl text-black p-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {(offer?.offering ?? []).map((item) => {
                                        return (
                                            <div
                                                className="flex items-center justify-center text-center"
                                                key={item}
                                            >
                                                <div>
                                                    <img
                                                        src={`/public/items/${item}.svg`}
                                                        className="inline-block h-16 mt-4"
                                                    ></img>
                                                    <p>
                                                        {itemNameMap.get(item)}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <p className="text-black text-xl font-bold mb-2">
                                Items you will give
                            </p>
                            <div className="bg-white w-[300px] h-[350px] rounded-3xl p-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {(offer?.wanting ?? []).map((item) => {
                                        return (
                                            <div
                                                className="flex items-center justify-center text-center"
                                                key={item}
                                            >
                                                <div>
                                                    <img
                                                        src={`/public/items/${item}.svg`}
                                                        className="inline-block h-16 mt-4"
                                                    ></img>
                                                    <p>
                                                        {itemNameMap.get(item)}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-[40px] bg-[#CFBB8F] text-black px-3 py-2 rounded-full hover:bg-orange-darker cursor-pointer">
                        &gt;
                    </button>
                </div>
            </div>

            <div className="flex justify-center mt-4 gap-4">
                <button
                    onClick={decline}
                    className="bg-orange text-black text-2xl px-4 py-2 w-[250px] h-[50px] rounded-2xl hover:bg-orange-darker cursor-pointer"
                >
                    DECLINE
                </button>
                <button
                    onClick={accept}
                    className="bg-yellow text-black text-2xl px-4 py-2 w-[250px] h-[50px] rounded-2xl hover:bg-yellow-darker cursor-pointer"
                >
                    ACCEPT
                </button>
            </div>
        </>
    );

    return (
        <>
            <div className="min-h-screen bg-beige">
                <div className="h-[124px] bg-beige-darker flex items-center px-4">
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

                <div className="mt-4 px-4">
                    <Button
                        onClick={() => navigate(-1)}
                        className="text-black px-4 py-2 rounded cursor-pointer"
                        style={{ hover: "var(--color-orange-darker)" }}
                    >
                        Back
                    </Button>
                </div>

                {loading ? null : loadedView}
            </div>
        </>
    );
};

export default OffersPage;
