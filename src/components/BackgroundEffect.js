import React, { useEffect } from 'react';

const BackgroundEffect = () => {
    useEffect(() => {
        // VANTA background - using exact original code
        const initVanta = () => {
            if (window.VANTA && window.VANTA.WAVES) {
                window.VANTA.WAVES({
                    el: "#tsparticles",
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    scale: 1.0,
                    scaleMobile: 1.0,
                    shininess: 21.0,
                    waveHeight: 34.5,
                    waveSpeed: 0.4,
                    zoom: 0.65
                });
            }
        };

        // Initialize immediately if VANTA is already loaded
        if (window.VANTA && window.VANTA.WAVES) {
            initVanta();
        } else {
            // Wait for VANTA to load
            const checkVanta = setInterval(() => {
                if (window.VANTA && window.VANTA.WAVES) {
                    initVanta();
                    clearInterval(checkVanta);
                }
            }, 100);

            // Cleanup interval after 10 seconds
            setTimeout(() => clearInterval(checkVanta), 10000);
        }
    }, []);

    return <div id="tsparticles" className="vanta-background" />;
};

export default BackgroundEffect;
