import { useState } from "react";
const DisplayNameAlert = ({ show, onSubmit }) => {
    const [displayName, setDisplayName] = useState("");

    const handleInputChange = (e) => {
        setDisplayName(e.target.value);
    };
    return (
        show && (
            <div className="fixed inset-0 bg-[rgba(207,187,143,0.8)] flex items-center justify-center">
                <div className="bg-beige rounded-2xl px-12 py-24 max-w-md w-full mx-4 text-center">
                    <p className="font-bold text-2xl py-4">Enter your name:</p>
                    <input
                        type="text"
                        className="bg-white rounded-full w-full p-2 mt-2"
                        value={displayName}
                        onChange={handleInputChange}
                    />
                    <button
                        className="bg-yellow text-black rounded-full px-4 py-2 mt-8 w-50"
                        onClick={onSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        )
    );
};

export default DisplayNameAlert;
