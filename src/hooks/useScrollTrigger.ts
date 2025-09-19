import { useState, useEffect } from 'react';

interface ScrollTriggerConfig {
  triggerPercentage?: number; // Percentage of page scrolled to trigger banner
  bannerType: 'newsletter' | 'offer' | 'promotion';
  title: string;
  description: string;
  ctaText: string;
  cooldownMinutes?: number; // Minutes to wait before showing again
  triggerType?: 'scroll' | 'exit-intent' | 'both';
}

interface BannerData {
  type: 'newsletter' | 'offer' | 'promotion';
  title: string;
  description: string;
  ctaText: string;
}

export const useScrollTrigger = (config: ScrollTriggerConfig) => {
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const triggerBanner = () => {
    if (hasTriggered) return;

    // Check if enough time has passed since last trigger
    const lastTrigger = localStorage.getItem('lastBannerTrigger');
    const cooldownMs = (config.cooldownMinutes || 10) * 60 * 1000; // Default 10 minutes

    if (!lastTrigger || Date.now() - parseInt(lastTrigger) > cooldownMs) {
      setIsBannerVisible(true);
      setHasTriggered(true);
      localStorage.setItem('lastBannerTrigger', Date.now().toString());
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (hasTriggered || config.triggerType === 'exit-intent') return;

      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollTop / docHeight) * 100;

      if (scrollPercentage >= (config.triggerPercentage || 30)) {
        triggerBanner();
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (hasTriggered || config.triggerType === 'scroll') return;
      
      // Check if mouse is leaving the viewport from the top
      if (e.clientY <= 0) {
        triggerBanner();
      }
    };

    // Add scroll listener if scroll trigger is enabled
    if (config.triggerType !== 'exit-intent') {
      window.addEventListener('scroll', handleScroll);
    }

    // Add exit intent listener if exit-intent trigger is enabled
    if (config.triggerType !== 'scroll') {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [config.triggerPercentage, hasTriggered, config.cooldownMinutes, config.triggerType]);

  const closeBanner = () => {
    setIsBannerVisible(false);
  };

  const resetTrigger = () => {
    setHasTriggered(false);
  };

  const bannerData: BannerData = {
    type: config.bannerType,
    title: config.title,
    description: config.description,
    ctaText: config.ctaText,
  };

  return {
    isBannerVisible,
    closeBanner,
    resetTrigger,
    bannerData,
  };
}; 