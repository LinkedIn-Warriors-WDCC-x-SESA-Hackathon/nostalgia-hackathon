import React from "react";
import PageLayout from "../components/PageLayout";
import Logo from "../assets/Logo.png";
import BearLunchTrading from "../assets/BearLunchTrading.png";
import LunchItem from "../components/LunchItem";
import BLT from "../assets/BLT.png";
import BuildingLunchbox from "../components/BuildingLunchbox";

const SetupPage = () => {
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
                            <LunchItem
                                name="Apple"
                                image="/public/items/apple.svg"
                            ></LunchItem>
                            <LunchItem
                                name="Carrot"
                                image="/public/items/carrot.svg"
                            ></LunchItem>
                            <LunchItem
                                name="Celery"
                                image="/public/items/celery.svg"
                            ></LunchItem>
                            <LunchItem
                                name="Cheese"
                                image="/public/items/cheese.svg"
                            ></LunchItem>
                        </div>
                    </div>

                    <div className="w-full mx-8">
                        <div className="flex justify-between my-4">
                            <p className="text-2xl mt-12">
                                Set up your lunchbox listing!
                            </p>
                            <img src={BLT} className="h-30" />
                        </div>

                        <BuildingLunchbox />
                    </div>
                </div>
            </PageLayout>
        </>
    );
};

export default SetupPage;
