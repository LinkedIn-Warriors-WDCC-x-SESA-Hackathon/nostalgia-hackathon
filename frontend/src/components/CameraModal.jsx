import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';

const CameraModal = ({ isOpen, onClose, onCapture }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen) {
            startCamera();
        } else {
            stopCamera();
        }

        return () => {
            stopCamera();
        };
    }, [isOpen]);

    const startCamera = async () => {
        try {
            setError(null);
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { 
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'user' // Use front camera by default
                },
                audio: false
            });
            
            setStream(mediaStream);
            setHasPermission(true);
            
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (err) {
            console.error('Error accessing camera:', err);
            setHasPermission(false);
            setError('Unable to access camera. Please check your permissions.');
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const video = videoRef.current;
            
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0);
            
            // Convert to blob and call onCapture
            canvas.toBlob((blob) => {
                if (onCapture) {
                    onCapture(blob);
                }
                handleClose();
            }, 'image/jpeg', 0.8);
        }
    };

    const handleClose = () => {
        stopCamera();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-beige rounded-2xl p-6 max-w-4xl max-h-[90vh] w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Camera Scanner</h2>
                    <button
                        onClick={handleClose}
                        className="text-2xl font-bold hover:text-orange transition-colors"
                    >
                        ×
                    </button>
                </div>

                <div className="flex flex-col items-center">
                    {error ? (
                        <div className="text-center p-8">
                            <p className="text-red-600 mb-4">{error}</p>
                            <Button onClick={startCamera}>Try Again</Button>
                        </div>
                    ) : hasPermission === false ? (
                        <div className="text-center p-8">
                            <p className="mb-4">Camera permission denied. Please enable camera access in your browser settings.</p>
                            <Button onClick={startCamera}>Retry</Button>
                        </div>
                    ) : (
                        <>
                            <div className="relative bg-black rounded-lg overflow-hidden mb-4">
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="w-full max-w-2xl h-auto"
                                />
                                {/* Overlay for scanning guidance */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="border-2 border-white border-dashed w-64 h-64 rounded-lg opacity-50"></div>
                                </div>
                            </div>
                            
                            <canvas ref={canvasRef} className="hidden" />
                            
                            <div className="flex gap-4">
                                <Button onClick={capturePhoto} className="bg-green-500 hover:bg-green-600">
                                    Capture
                                </Button>
                                <Button onClick={handleClose} className="bg-gray-500 hover:bg-gray-600">
                                    Cancel
                                </Button>
                            </div>
                            
                            <p className="text-sm text-gray-600 mt-4 text-center">
                                Position food items within the dashed rectangle and click capture to scan them
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CameraModal;
