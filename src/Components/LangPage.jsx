import React, { useState, useEffect } from 'react'
import vikram from '../assets/image-vikram.png'
import {  useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom';
import { choosenLanguage } from '../store/atoms/Language';
import ChooseLang from "../assets/audio/ChooseLangMerged.mp3"
import annyang from 'annyang';




function LangPage() {
    
    const navigate = useNavigate();

  
    const setLanguage = useSetRecoilState(choosenLanguage);

    function handleHindiButton() {
        setLanguage('Hindi');
       
        navigate('/locationpage');
    }
    function handleEnglishButton() {
        
        setLanguage('En');
        
        navigate('/locationpage');
    }
    

    useEffect(() => {
    
    
        if (annyang) {
          let commands = {
    
            '*text': (text) => {
              console.log(text);
              let greetings = text.toLowerCase().includes("english");
              if (greetings) {
                console.log("english detected");
                handleEnglishButton();
                
                
              }
               greetings = text.toLowerCase().includes("hindi");
              if (greetings) {
                console.log("hindi detected");
                handleHindiButton();
                
                
              }
              
            }
            
          };
          
          annyang.addCommands(commands);
          console.log("Started");
          
          return ()=>{
            annyang.removeCommands();
            annyang.abort();
            // console.log("Paused Moving to next page");
          }
        }
        
}, []);




    return (
        <>
            <audio src={ChooseLang} autoPlay onEnded={()=>
          annyang.start({autoRestart: true, continuous: false})}></audio>

            <div className="buttonContainer absolute lg:left-[5%] lg:bottom-[20%] top-[40%] w-full flex lg:w-auto lg:block">
                <button className='text-4xl text-blue-700 font-bold bg-gray-200 shadow-black mx-2  shadow-xl lg:w-[250%] w-[50%] py-5 rounded-3xl my-3' onClick={handleHindiButton}>हिंदी</button>
                <br />
                <button className='text-4xl text-blue-700 font-bold bg-gray-200 shadow-black mx-2  shadow-xl lg:w-[250%] w-[50%] py-5 rounded-3xl my-3'onClick={handleEnglishButton}>English</button>

            </div>
            <div className='bg-gray-200 bg-opacity-40 h-auto w-auto absolute  flex-col justify-center text-center lg:top-1/4 lg:p-4 rounded-2xl lg:right-[5%] p-2 m-2'>
                <h1 className='text-white lg:text-4xl text-2xl font-bold '>Choose your preferred language</h1>
                <br />

                <h3 className='p-1 bg-gradient-to-r from-purple-600 to-custom-blue text-transparent lg:text-4xl text-2xl font-bold bg-clip-text  '>अपनी पसंदीदा भाषा चुनें</h3>

            </div>
            <img src={vikram} alt="" className='lg:w-1/3 absolute bottom-0  left-1/2 -translate-x-1/2' />
            <div className="homeContainer lg:h-20 lg:w-20 h-10 w-10 border-2 border-white rounded-full hover:cursor-pointer  absolute lg:right-[2%] right-[7%] top-[2%]">
                <i className="fa-solid fa-house lg:text-5xl text-white lg:p-3 text-2xl p-1" onClick={() => navigate('/')}></i>
            </div>
        </>
    )
}

export default LangPage;
