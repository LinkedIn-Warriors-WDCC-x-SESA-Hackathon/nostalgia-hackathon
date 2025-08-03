import React from 'react';

const OffersWidget = ({ offers, isVisible, onClose, onSeeOffer }) => {
    if (!isVisible) return null;

    return (
        <>
            {/* Backdrop to close widget when clicked */}
            <div 
                className="fixed inset-0 z-40" 
                onClick={onClose}
            />
            
            {/* Widget */}
            <div className="absolute top-12 left-0 z-50 bg-white border border-gray-300 rounded-lg shadow-lg w-80 max-h-96 overflow-y-auto">
                {/* Header */}
                <div className="bg-orange text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
                    <h3 className="font-semibold">Trade Offers</h3>
                    <button 
                        onClick={onClose}
                        className="text-white hover:text-gray-200 text-xl font-bold"
                    >
                        ×
                    </button>
                </div>

                {/* Offers List */}
                <div className="max-h-80 overflow-y-auto">
                    {offers.length === 0 ? (
                        <div className="p-4 text-gray-500 text-center">
                            No offers yet
                        </div>
                    ) : (
                        offers.map((offerData) => (
                            <div key={offerData.id} className="border-b border-gray-200 p-4 hover:bg-gray-50 flex justify-between items-center">
                                <div className="text-gray-900">
                                    <span className="font-medium">{offerData.offer.sender}</span> sent you an offer
                                </div>
                                
                                <button
                                    onClick={() => onSeeOffer(offerData.id)}
                                    className="bg-orange hover:bg-orange-darker text-white px-3 py-1 rounded text-sm font-medium"
                                >
                                    See Offer
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default OffersWidget;
