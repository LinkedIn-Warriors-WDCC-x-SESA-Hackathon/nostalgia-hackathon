import React from 'react';
import longformBLT from '../assets/longformBLT.png';
import Logo from '../assets/Logo.png';
import Button from '../components/Button';
import NotificationIcon from '../components/NotificationIcon';

const ListingsPage = () => {
 
  return (
    <div className="min-h-screen bg-beige">
      <div className=" h-[124px] bg-beige-darker flex items-center px-4">
        <img src={Logo} alt="Logo" className="h-auto max-h-[80px] object-contain" />
        <div className="flex-1 flex justify-center mr-160">
          <img src={longformBLT} alt="Long Form BLT" className="h-auto max-h-[100px] object-contain" />
        </div>
        <div className="w-[120px]"></div>
      </div>
      
      {/* Fixed notification icon on the left side */}
      <div className="fixed top-[124px] left-6 z-50 mt-4">
        <NotificationIcon count={3} />
      </div>
      
      {/* Fixed button on the right side */}
      <div className="fixed top-[124px] right-6 z-50 mt-4">
        <Button>
          EDIT LUNCHBOX
        </Button>
      </div>
      
    </div>
  );
}

export default ListingsPage