import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {choosenLanguage} from '../store/atoms/Language'
import { useRecoilValue } from 'recoil';
import ConfirmHindi from "../assets/audio/confirmHindi.mp3"
import ConfirmEnglish from "../assets/audio/confirmEnglish.m4a"
import annyang from 'annyang'


function ConfirmationModal({setReached}) {
    const [userSaid, setUserSaid] =useState(0);
    useEffect(() => {
        if (annyang) {
            annyang.setLanguage("en-IN");
            annyang.addCallback('result', function (phrases) {
                console.log(phrases);

                
            });
            
            annyang.start({autoRestart:true,continuos:false});
            console.log("Started");

        }

        return () => {
            annyang.removeCommands();
            annyang.abort();
        }
    }, []);







    const lang = useRecoilValue(choosenLanguage);
    let audioComponent=null;
  const language = useRecoilValue(choosenLanguage);
  if(language =='En'){
      audioComponent = <audio src={ConfirmEnglish} autoPlay />
  }
  else
  audioComponent =<audio src={ConfirmHindi} autoPlay />
    let question;
    let buttonText;
    if(lang=='Hindi'){
        question ="क्या आप अपने स्थान पर पहुँच गये?";
        buttonText=["हाँ", "नहीं, दोहराएँ"];
    }
    else{
        question = "Did you get to the location?";
        buttonText = ["Yes" , "No, Replay"];

    }

    const navigate = useNavigate();

    return (
        <>
       {audioComponent}
            <div className="continerFull w-screen h-screen bg-slate-500 bg-opacity-50 absolute top-0 left-0 z-10">

                <div className="modalBox w-[40%] h-[40%] bg-white rounded-lg absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
                    <div className="head absolute top-[10%]"><h1 className='text-3xl font-bold'>{question}</h1></div>
                    <div className="buttonBox absolute w-full flex justify-evenly">
                        <button className='text-2xl font-bold w-[30%] h-16 rounded-lg text-white bg-purple-600'onClick={()=>navigate('/final')}>{buttonText[0]}</button>
                        <button className='text-2xl font-bold w-[30%] h-16 rounded-lg text-white bg-purple-600'onClick={()=>{navigate('/player');setReached(false);}}>{buttonText[1]}</button>
                    </div>
                </div>


            </div>
        </>
    )
}

export default ConfirmationModal
