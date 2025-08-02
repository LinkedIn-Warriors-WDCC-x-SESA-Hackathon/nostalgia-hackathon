import React from 'react';
import longformBLT from '../assets/longformBLT.png';
import Logo from '../assets/Logo.png';
import Button from '../components/Button';
import NotificationIcon from '../components/NotificationIcon';
import Lunchbox from '../components/Lunchbox';

const ListingsPage = () => {
  
  // Handler for when a user wants to make an offer
  const handleMakeOffer = (lunchboxIndex) => {
    console.log(`Making offer for lunchbox ${lunchboxIndex}`);
    // TODO: Navigate to offer page or show offer modal
  };
 
  return (
    <div className="min-h-screen bg-beige pb-16">
      <div className=" h-[124px] bg-beige-darker flex items-center px-4">
        <img src={Logo} alt="Logo" className="h-auto max-h-[80px] object-contain" />
        <div className="flex-1 flex justify-center mr-160">
          <img src={longformBLT} alt="Long Form BLT" className="h-auto max-h-[100px] object-contain" />
        </div>
        <div className="w-[120px]"></div>
      </div>
      
      {/* Notification icon on the left side */}
      <div className="absolute top-[124px] left-6 z-50 mt-4">
        <NotificationIcon count={3} />
      </div>
      
      {/* Button on the right side */}
      <div className="absolute top-[124px] right-6 z-50 mt-4">
        <Button>
          EDIT LUNCHBOX
        </Button>
      </div>
      
      {/* Sample lunchboxes with different colors and tilts - stacked vertically between notification and button */}
      <div className="flex flex-col items-center justify-start mt-16 mx-4 px-20">
        {/* Purple lunchbox - default */}
        <Lunchbox 
          primaryColor="bg-purple-darker"
          tilt={0}
          size="medium"
          items={['apple', 'cheese', 'carrot', 'juice']}
          boxColor="bg-[#E6D8ED]"
          onMakeOffer={() => handleMakeOffer(1)}
        />
        
        {/* Blue lunchbox - tilted left */}
        <div className="mt-24">
          <Lunchbox 
            primaryColor="bg-teal-darker"
            tilt={-5}
            size="medium"
            items={['egg', 'hummus', 'celery', 'potatoChips']}
            boxColor="bg-teal"
            onMakeOffer={() => handleMakeOffer(2)}
          />
        </div>
        
        {/* Pink lunchbox - tilted right - extra spacing */}
        <div className="mt-32">
          <Lunchbox 
            primaryColor="bg-[#DF9D9E]"
            tilt={5}
            size="medium"
            items={['cheese', 'apple', 'juice', 'carrot']}
            boxColor="bg-[#F3D4D4]"
            onMakeOffer={() => handleMakeOffer(3)}
          />
        </div>
      </div>
      
    </div>
  );
}

export default ListingsPage