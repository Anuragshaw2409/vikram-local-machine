import React, { useEffect } from 'react'
import vikram from '../assets/image-vikram.png'
import { useNavigate } from 'react-router-dom'
import {choosenLanguage} from '../store/atoms/Language'
import { useRecoilValue } from 'recoil';
import ByeHindi from "../assets/audio/ThankYouHindi.mp3"
import ByeEnglish from "../assets/audio/ThankYouEnglish.m4a"

function Bye() {
  let audioComponent=null;
  const language = useRecoilValue(choosenLanguage);
  if(language =='En'){
      audioComponent = <audio src={ByeEnglish} autoPlay/>
  }
  else
  audioComponent =<audio src={ByeHindi} autoPlay/>

    const navigate = useNavigate();
    const lang = useRecoilValue(choosenLanguage);
    let byeText = ["Thank you for visiting us","Have a nice day"];
    if(lang=='Hindi'){
      byeText = ["हमसे मिलने आने के लिए आपका धन्यवाद","आपका दिन शुभ हो"];
    }

    useEffect(()=>{

        setTimeout(()=>{
            navigate('/');
        },10000);

    },[]);
  return (
    <>
    {audioComponent}
      <div className='bg-gray-200 bg-opacity-60 h-auto w-auto absolute  flex-col justify-center text-center top-1/4 p-4 rounded-2xl right-[5%]'>
        <h1 className='p-1 bg-gradient-to-t from-purple-800 to-custom-blue text-transparent text-4xl font-bold bg-clip-text  '>{byeText[0]}</h1>
        <br />
        <h3 className='p-1 bg-gradient-to-t from-purple-800 to-custom-blue text-transparent text-4xl font-bold bg-clip-text   '>{byeText[1]}</h3>
        

      </div>
      <img src={vikram} alt="" className='w-1/3 absolute bottom-0 p-0 left-1/2 -translate-x-1/2' />
    </>
  )
}

export default Bye
