// src/components/ParticlesBackground.jsx
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particleColor = "#818cf8";

    if (init) {
        return (
            <Particles
                id="tsparticles"
                // Add this className to push the canvas to the background
                className="fixed -z-10"
                options={{
                    background: {
                        color: { value: 'transparent' },
                    },
                    fpsLimit: 60,
                    interactivity: {
                        events: {
                            onHover: {
                                enable: true,
                                mode: 'repulse',
                            },
                            resize: true,
                        },
                        modes: {
                            repulse: {
                                distance: 100,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: { value: particleColor },
                        links: {
                            color: particleColor,
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        move: {
                            direction: 'none',
                            enable: true,
                            outModes: { default: 'bounce' },
                            random: false,
                            speed: 2,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 80,
                        },
                        opacity: { value: 0.5 },
                        shape: { type: 'circle' },
                        size: { value: { min: 1, max: 5 } },
                    },
                    detectRetina: true,
                }}
            />
        );
    }

    return <></>;
};

export default ParticlesBackground;