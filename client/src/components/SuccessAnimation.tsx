'use client';

import { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

const SuccessAnimation = () => {
    const animationContainer = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let animationInstance: AnimationItem | null = null;

        if (animationContainer.current) {
            animationInstance = lottie.loadAnimation({
                container: animationContainer.current,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                path: '/success.json'
            });
        }

        return () => {
            if (animationInstance) {
                animationInstance.destroy();
            }
        };
    }, []);

    return (
        <div className='max-w-sm -mt-20 -mb-16 md:-mt-32 md:-mb-28' ref={animationContainer}></div>
    );
}

export default SuccessAnimation;