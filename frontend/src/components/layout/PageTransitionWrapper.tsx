'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface RouteAnimationProfile {
  name: string;
  themeLabel: string;
  accentGradient: string;
  initial: Record<string, any>;
  animate: Record<string, any>;
  exit: Record<string, any>;
  transition: Record<string, any>;
}

/**
 * Returns a unique, distinct signature animation for each page.
 * Plays whenever the user redirects or navigates to that specific page.
 */
function getRouteProfile(pathname: string): RouteAnimationProfile {
  // Normalize pathname (e.g. strip trailing slash if needed)
  const path = pathname.toLowerCase();

  // 1. HOME: Mandala Horizon Bloom — Radial scale-up with radiant clearance
  if (path === '/' || path === '') {
    return {
      name: 'home-mandala',
      themeLabel: 'Courtyard Welcome',
      accentGradient: 'from-[#D96C8F] via-[#C76B42] to-[#F4A300]',
      initial: {
        opacity: 0,
        scale: 0.93,
        y: 28,
        filter: 'blur(12px)',
      },
      animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
      },
      exit: {
        opacity: 0,
        scale: 1.03,
        y: -15,
        filter: 'blur(6px)',
      },
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    };
  }

  // 2. EVENTS: Chronicle 3D Page Sweep — Perspective horizontal sweep
  if (path.startsWith('/events')) {
    return {
      name: 'events-chronicle',
      themeLabel: 'Festival Calendar',
      accentGradient: 'from-[#1F7A8C] via-[#234E70] to-[#1E3A5F]',
      initial: {
        opacity: 0,
        x: 65,
        rotateY: -8,
        filter: 'blur(8px)',
      },
      animate: {
        opacity: 1,
        x: 0,
        rotateY: 0,
        filter: 'blur(0px)',
      },
      exit: {
        opacity: 0,
        x: -45,
        rotateY: 5,
        filter: 'blur(6px)',
      },
      transition: {
        duration: 0.52,
        ease: [0.22, 1, 0.36, 1],
      },
    };
  }

  // 3. BLOG: Manuscript Scroll Reveal — Vertical literary cascade with subtle 3D tilt
  if (path.startsWith('/blog')) {
    return {
      name: 'blog-manuscript',
      themeLabel: 'Sacred Chronicles',
      accentGradient: 'from-[#C76B42] via-[#D8B384] to-[#F4A300]',
      initial: {
        opacity: 0,
        y: 50,
        rotateX: 7,
        filter: 'blur(8px)',
      },
      animate: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
      },
      exit: {
        opacity: 0,
        y: -30,
        filter: 'blur(5px)',
      },
      transition: {
        duration: 0.54,
        ease: [0.2, 0.9, 0.3, 1],
      },
    };
  }

  // 4. GALLERY: Aperture Lens Focus & Bokeh Bloom — Camera optic expansion into sharp crystal focus
  if (path.startsWith('/gallery')) {
    return {
      name: 'gallery-aperture',
      themeLabel: 'Memory Lens',
      accentGradient: 'from-[#D96C8F] via-[#234E70] to-[#1E3A5F]',
      initial: {
        opacity: 0,
        scale: 1.08,
        filter: 'blur(14px) brightness(1.2)',
      },
      animate: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px) brightness(1)',
      },
      exit: {
        opacity: 0,
        scale: 0.94,
        filter: 'blur(8px)',
      },
      transition: {
        duration: 0.58,
        ease: [0.25, 1, 0.35, 1],
      },
    };
  }

  // 5. PEOPLE: Sangha Convergence — Multi-vector entrance representing community gathering
  if (path.startsWith('/people')) {
    return {
      name: 'people-convergence',
      themeLabel: 'Sangha Circle',
      accentGradient: 'from-[#8FAF88] via-[#1F7A8C] to-[#234E70]',
      initial: {
        opacity: 0,
        x: -42,
        y: 22,
        scale: 0.96,
        filter: 'blur(8px)',
      },
      animate: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      },
      exit: {
        opacity: 0,
        x: 30,
        y: -15,
        filter: 'blur(5px)',
      },
      transition: {
        duration: 0.52,
        ease: [0.22, 1, 0.36, 1],
      },
    };
  }

  // 6. DONATE: Seva Golden Ascent — Devotional upward float with warm golden energy
  if (path.startsWith('/donate')) {
    return {
      name: 'donate-seva-ascent',
      themeLabel: 'Sacred Seva',
      accentGradient: 'from-[#F4A300] via-[#C76B42] to-[#D96C8F]',
      initial: {
        opacity: 0,
        y: 56,
        scale: 0.94,
        filter: 'blur(10px)',
      },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      },
      exit: {
        opacity: 0,
        y: -30,
        scale: 1.02,
        filter: 'blur(6px)',
      },
      transition: {
        duration: 0.56,
        ease: [0.16, 1, 0.3, 1],
      },
    };
  }

  // 7. ADMIN: Executive Command Drop — Crisp top-down tactical snap
  if (path.startsWith('/admin')) {
    return {
      name: 'admin-command-drop',
      themeLabel: 'Administrative HUD',
      accentGradient: 'from-[#1E3A5F] via-[#234E70] to-[#1F7A8C]',
      initial: {
        opacity: 0,
        y: -38,
        scale: 0.98,
        filter: 'blur(6px)',
      },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      },
      exit: {
        opacity: 0,
        y: 20,
        filter: 'blur(4px)',
      },
      transition: {
        duration: 0.46,
        ease: [0.2, 0.8, 0.2, 1],
      },
    };
  }

  // 8. LOGIN: Sanctuary Keyhole Focus — Deep center zoom
  if (path.startsWith('/login')) {
    return {
      name: 'login-sanctuary',
      themeLabel: 'Gateway Portal',
      accentGradient: 'from-[#D96C8F] via-[#F4A300] to-[#C76B42]',
      initial: {
        opacity: 0,
        scale: 0.87,
        filter: 'blur(14px)',
      },
      animate: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
      },
      exit: {
        opacity: 0,
        scale: 1.04,
        filter: 'blur(6px)',
      },
      transition: {
        duration: 0.5,
        ease: [0.18, 1, 0.32, 1],
      },
    };
  }

  // 9. PROFILE: Personal Ledger Slide — Clean lateral glide from user drawer
  if (path.startsWith('/profile')) {
    return {
      name: 'profile-ledger',
      themeLabel: 'Member Profile',
      accentGradient: 'from-[#1F7A8C] via-[#8FAF88] to-[#234E70]',
      initial: {
        opacity: 0,
        x: -55,
        filter: 'blur(8px)',
      },
      animate: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
      },
      exit: {
        opacity: 0,
        x: 45,
        filter: 'blur(4px)',
      },
      transition: {
        duration: 0.48,
        ease: [0.22, 1, 0.36, 1],
      },
    };
  }

  // Default fallback
  return {
    name: 'default-fade',
    themeLabel: 'Heritage View',
    accentGradient: 'from-[#D96C8F] to-[#234E70]',
    initial: {
      opacity: 0,
      y: 24,
      filter: 'blur(6px)',
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
    },
    exit: {
      opacity: 0,
      y: -15,
      filter: 'blur(4px)',
    },
    transition: {
      duration: 0.45,
      ease: [0.2, 0.8, 0.2, 1],
    },
  };
}

export function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const profile = getRouteProfile(pathname);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Smooth scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="relative w-full overflow-x-clip [perspective:1400px]">
      {/* Dynamic signature aura bar at top of main view */}
      <motion.div
        key={`aura-${pathname}`}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: [0, 0.9, 0.4, 0] }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-none fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${profile.accentGradient} z-50 origin-left shadow-sm`}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={profile.initial}
          animate={profile.animate}
          exit={profile.exit}
          transition={profile.transition}
          className="w-full [transform-style:preserve-3d] will-change-[transform,opacity,filter]"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
