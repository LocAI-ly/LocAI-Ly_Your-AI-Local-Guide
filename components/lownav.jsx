"use client"; // Ensure this component is treated as a client component
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/assets/LocAIly_Logo_1.svg';
import Home from '@/assets/home.svg';
import history from '@/assets/History.svg';
import settings from '@/assets/Settings.svg';
import chat from '@/assets/Chat.svg';
import plan from '@/assets/Planner.svg';
import lownav from '@/assets/Down_navbar.svg';
import './lownav.css'; 

const Lownav = () => {
    return(
    <div className='lowBody'>
        <div className='lownav' >
            <Image
                src={lownav}
                alt="lownav"
                className='lownav'
              />
            <div className='buttons'>
            <div className='btn'>
                <Link href={"@/app/learn"}>
                    <Image
                src={plan}
                alt="plan"
                    />
                </Link>
            </div>
            
                <div className='btn'>
                <Link href={"@/app/learn"}>
                  <Image
                    src={history}
                    alt="history"
                  />
                </Link>
            </div>
            <div className='btn chat'>
                <Link href={"@/app/learn"}>
                  <Image
                    src={chat}
                    alt="chat"
                  />
                </Link>
            </div>
            <div className='btn'>
                <Link href={"@/app/learn"}>
                  <Image
                    src={settings}
                    alt="settings"
                  />
                </Link>
            </div>
                <div className='btn'>
                <Link href={"@/app/learn"}>
                  <Image
                    src={Home}
                    alt="Home"
                  />
                </Link>
            </div>
            </div>
        </div>
        </div>
    );
}

export default Lownav;