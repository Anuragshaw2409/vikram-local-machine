import React from 'react'
import vikram from '../assets/image-vikram.png'
import { useEffect, useState } from 'react'
import annyang from 'annyang';
import greet from '../assets/audio/Welcome.mp3'
import { useNavigate } from 'react-router-dom';
// setText(["Hi, this is your JBIT guide","To assist","Say...Hi Vikram"])

function RestState() {
  const [saidVikram, setSaidVikram] = useState(null);
  const navigate = useNavigate();
  const [text,setText]=useState(["Hi, this is your JBIT guide","To assist","Say...Hi Vikram"]);
  useEffect(()=>{
    if(saidVikram){
      setText(["Hi, Welcome to JBIT","नमस्ते, जेबीआईटी में आपका स्वागत है",null])
    }
  },[saidVikram])
  
  
  useEffect(() => {
    // const intervalId =setInterval(()=>{
    //   text==["Hi, this is your JBIT guide","To assist","Say...Hi Vikram"]?setText(["नमस्ते, मैं आपका जेबीआईटी मार्गदर्शक हूं", "सहायता के लिए","कहे...नमस्ते विक्रम"]):setText(["Hi, this is your JBIT guide","To assist","Say...Hi Vikram"])
    // },3000);
    
    
    
    if (annyang) {
      let commands = {

        '*text': (text) => {
          console.log(text);
          const greetings = text.toLowerCase().includes("vikram");
          if (greetings) {
            console.log("greetings detected");
            // console.log(annyang.isListening());
            annyang.abort();
            
            
            setSaidVikram(1);
            
            
          }
          
        }
        
      };
      
      annyang.addCommands(commands);
      annyang.start({autoRestart: true, continuous: false});
      console.log("Started");
      
      return ()=>{
        annyang.pause();
        annyang.removeCommands();
        // clearInterval(intervalId);
        // console.log("Paused Moving to next page");
      }
      
      
      
    }
  }, []);
  
  
  
  
  
  
  
  
  
  
  return (
    <>

      {saidVikram && <audio src={greet} autoPlay onEnded={()=>{ navigate('/langpage'); }} ></audio>}
        <div className='bg-gray-200 bg-opacity-40 h-auto w-auto absolute  flex-col justify-center text-center lg:top-1/4 p-4 rounded-2xl lg:right-[5%] m-3 '>
        <h1 className='text-white text-4xl font-bold '>{text[0]}</h1>
        <br />
        <h3 className='text-white text-4xl font-bold  '>{text[1]},</h3>
        <br />
        <h3 className='p-1 bg-gradient-to-r from-purple-600 to-custom-blue text-transparent text-4xl font-bold bg-clip-text  '>{text[2]}</h3>

      </div>
      <img src={vikram} alt="" className='lg:w-1/3 absolute bottom-0  left-1/2 -translate-x-1/2 w-full' />
    </>
  )
}

export default RestState
