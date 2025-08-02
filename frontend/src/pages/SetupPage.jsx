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
                    <div className="w-100 bg-beige-darkest">
                        <div className="bg-beige-darker p-4">
                            <div className="flex gap-4 mb-4">
                                <img src={Logo} className="h-36"></img>
                                <img
                                    src={BearLunchTrading}
                                    className="h-36"
                                ></img>
                            </div>

                            <input
                                type="text"
                                className="bg-white p-2 rounded-full w-full my-2"
                                placeholder="Search..."
                            ></input>
                        </div>

                        <div className="grid grid-cols-2 gap-4 p-4">
                            <LunchItem name="Apple" image=""></LunchItem>
                            <LunchItem name="Banana" image=""></LunchItem>
                            <LunchItem name="Celery" image=""></LunchItem>
                            <LunchItem name="Cookies" image=""></LunchItem>
                        </div>
                    </div>

                    <div>
                        <img src={BLT} className="h-50" />

                        <BuildingLunchbox />
                    </div>
                </div>
            </PageLayout>
        </>
    );
};

export default SetupPage;
