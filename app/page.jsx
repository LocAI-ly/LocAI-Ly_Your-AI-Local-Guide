// Home.js
"use client";
import Sidenav from "@/components/sidenav";
import Lownav from "@/components/lownav";
import React, { useState, useEffect, useRef } from 'react';
import minimize from '@/assets/minimize.svg';
import { Link } from 'next/link';
import Map from '@/components/Services/map';
import chatbtn from '@/assets/botbtn.svg';
import OverviewBtn from '@/assets/OverviewBtn.svg';
import Image from "next/image";
import './globals.css'; // Assuming your CSS file is correctly imported

const search = "Search";

export default function LocAILy() {
  const [leftPanelEnlarge, setLeftPanelEnlarge] = useState(false);
  const [rightPanelEnlarge, setRightPanelEnlarge] = useState(false);
  const [leftPanelVisible, setLeftPanelVisible] = useState(true);
  const [rightPanelVisible, setRightPanelVisible] = useState(true);
  const [winCheck, setWinCheck] = useState(false);

  useEffect(() => {
    const updateWinCheck = () => {
      setWinCheck(window.innerWidth >= 724);
      console.log("Window width:", window.innerWidth, "winCheck:", window.innerWidth >= 724);
    };

    // Initial check
    updateWinCheck();

    // Update on resize
    window.addEventListener('resize', updateWinCheck);
    return () => {
      window.removeEventListener('resize', updateWinCheck);
    };
  }, []);

  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);

  const handleLeftPanelClick = () => {
    setLeftPanelVisible(true);
  };
  const enlargeLeftPanel=()=>{
    setLeftPanelEnlarge(true);
  }
  const enlargeRightPanel=()=>{
    setRightPanelEnlarge(true);
  }
  const handleRightPanelClick = () => {
    setRightPanelVisible(true);
  };

  const mapClick = () => {
    setLeftPanelVisible(false);
    setRightPanelVisible(false);
    setLeftPanelEnlarge(false);
    setLeftPanelEnlarge(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (leftPanelRef.current && !leftPanelRef.current.contains(event.target)) {
        setLeftPanelEnlarge(false);
      }
      if (rightPanelRef.current && !rightPanelRef.current.contains(event.target)) {
        setRightPanelEnlarge(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  console.log(winCheck);
  return (
    <div className="body">
      <div className={ `${ winCheck ? 'blur' : ''} ${rightPanelEnlarge || leftPanelEnlarge ? '' :'destroy'}`}></div>
      <div className={`leftArea ${ winCheck && leftPanelEnlarge ? 'enlarge' : ''}`} ref={leftPanelRef}>
        
        <div className={`leftPanel ${ winCheck ? (leftPanelVisible ? '' : 'toggle') + (leftPanelEnlarge ? ' enlarge' : '') : ''}`} onClick={enlargeLeftPanel}>
          <div className={`Overview ${ winCheck && leftPanelEnlarge ? 'enlarge' : ''} `}>
            <h3>Overview</h3>
            <div className={`overviewData`}>
              <div className="left">
              <div className="left"></div>
              <div className="left"></div>
              <div className="left"></div>
              </div>
              <div className="right">
              <div className="right"></div>
              <div className="right"></div>
              <div className="right"></div>
              </div>
            </div>           
          </div>
        </div>
      </div>

      <div className={`map`}>
        
        <Image
          src={OverviewBtn}
          alt="overview"
          onClick={handleLeftPanelClick}
          className={`ovShift ${leftPanelVisible ? 'toggle' : ''}`}
        />
        <Image
          src={chatbtn}
          alt="chat"
          onClick={handleRightPanelClick}
          className={`cbShift ${rightPanelVisible ? 'toggle' : ''}`}
        />
        <div className="map"onClick={mapClick}>
          <Map/>
        </div>
      </div>

      <div className={`rightArea ${winCheck && rightPanelEnlarge ? 'enlarge' : ''}`} ref={rightPanelRef}>
        <div className={`rightPanel ${winCheck && (rightPanelVisible ? '' : 'toggle') + (rightPanelEnlarge ? 'enlarge' : '')}`} onClick={enlargeRightPanel}>
          <div className={`chatbot ${winCheck && rightPanelEnlarge ? 'enlarge' : ''}`}>
          <h3>Local-Bot</h3>
            <div className={`overviewData`}>
              <div className="left">
              <div className="left"></div>
              <div className="left"></div>
              <div className="left"></div>
              </div>
              <div className="right">
              <div className="right"></div>
              <div className="right"></div>
              <div className="right"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
