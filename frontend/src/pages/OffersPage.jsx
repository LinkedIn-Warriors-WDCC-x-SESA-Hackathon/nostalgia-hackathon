import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../assets/Logo.png";
import longformBLT from "../assets/longformBLT.png";
import "../index.css";
import Button from "../components/Button";
import { findOfferWithId, acceptOffer, declineOffer } from "../api/offerApi";

const OffersPage = () => {
  const navigate = useNavigate(); // React Router's navigation hook
  const { id } = useParams();
  const [offer, setOffer] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const retrievedOffer = await findOfferWithId(id)
      setOffer(retrievedOffer)
      setLoading(false)
    })()
    
  }, [])

  const accept = async () => {
    await acceptOffer(id);
    navigate('/listings')
  }

  const decline = async () => {
    await declineOffer(id);
    navigate('/listings')
  }

  const loadedView = <>
    <div className="flex flex-col items-center mt-[-40px]">
      <h2 className="text-black text-3xl font-bold mb-2 text-center">
        {`${offer?.sender ?? ""}'s Trade Offer`}
      </h2>

      <div className="relative bg-[#CFBB8F] w-[700px] h-[435px] rounded-2xl shadow-lg flex items-center justify-center">
        <button className="absolute left-[-60px] w-[40px] top-1/2 -translate-y-1/2 bg-[#CFBB8F] text-black px-3 py-2 rounded-full hover:bg-orange-darker">
          &lt;
        </button>

        <div className="flex flex-row gap-7">
          <div className="flex flex-col items-center">
            <p className="text-black text-xl font-bold mb-2">Offer</p>
            <div className="bg-white w-[300px] h-[350px] rounded-3xl"></div>
              
          </div>

          <div className="flex flex-col items-center">
            <p className="text-black text-xl font-bold mb-2">Request</p>
            <div className="bg-white w-[300px] h-[350px] rounded-3xl"></div>
          </div>
        </div>

        <button className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-[40px] bg-[#CFBB8F] text-black px-3 py-2 rounded-full hover:bg-orange-darker">
          &gt;
        </button>
      </div>
    </div>

    <div className="flex justify-center mt-4 gap-4">
      <button onClick={decline} className="bg-orange text-black text-3xl px-4 py-2 w-[300px] h-[60px] rounded-2xl hover:bg-orange-darker">
        DECLINE
      </button>
      <button onClick={accept} className="bg-yellow text-black text-3xl px-4 py-2 w-[300px] h-[60px] rounded-2xl hover:bg-yellow-darker">
        ACCEPT
      </button>
    </div>
  </>

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
              className="text-black px-4 py-2 rounded"
              style={{ hover: "var(--color-orange-darker)" }}
            >
              Back
            </Button>
          </div>


          {loading ?  null : loadedView}
          
        </div>
    </>
  );
};

export default OffersPage;
