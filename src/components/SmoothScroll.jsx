import { useLayoutEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }) {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Synchronize Lenis scrolling with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Named ticker function for proper cleanup
    const tickerFunc = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerFunc);

    // Disable lag smoothing for ScrollTrigger because Lenis handles it
    gsap.ticker.lagSmoothing(0);

    // Initial refresh to ensure ScrollTrigger knows where we are
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFunc);
      ScrollTrigger.killAll(); // Clean up on unmount
    };
  }, []);

  return <>{children}</>;
}
