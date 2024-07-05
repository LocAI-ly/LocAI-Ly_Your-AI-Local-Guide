"use client"; // Ensure this component is treated as a client component
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo1 from '@/assets/LocAIly_Logo_1.svg';
import Logo2 from '@/assets/logo_2.svg';
import home from '@/assets/Home.svg';
import history from '@/assets/History.svg';
import settings from '@/assets/Settings.svg';

import planner from '@/assets/Planner.svg';
import './sidenav.css'; 

const Sidenav = () => {
  const [logo, setLogo] = useState(Logo1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 724 && window.innerWidth <= 1301) {
        setLogo(Logo2);
      } else {
        setLogo(Logo1);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="sidenav">
      <div className='top Image'>
        <Image
          priority
          src={logo}
          alt="LocAI.ly Logo"
        />
      </div>
      <div className='mid'>
        <div className='homeBtn'>
          <Link href={"@/app/learn"}>
            <Image
              src={home}
              alt="Home"
            />
          </Link>
        </div>
        <div className='remainingBtn'>
          <div>
            <Image
              src={history}
              alt="History"
            />
          </div>
          <div>
            <Image
              src={settings}
              alt="Settings"
            />
          </div>
          <div>
            <Image
              src={planner}
              alt="plan"
            />
          </div>
        </div>
      </div>
      <div className='low'>
        <div className='logoutBtn'>
          <a className='Image'>
            
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
