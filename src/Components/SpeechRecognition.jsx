import React,{useEffect,useState} from 'react'
import annyang from 'annyang';





function SpeechRecognition() {

    const[load, setLoad]=useState(null);
    const[listening, setListening]= useState("-slash");
    
  
    const speak = (word) => {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.voice = speechSynthesis.getVoices()[0]; // You can customize the voice if needed
      const synth = window.speechSynthesis;
      synth.speak(utterance);
    };

   
   

    useEffect(() => {
        if (annyang) {
            let commands = {
                'wake up': () => {
                    // Do something when the wake-up phrase is detected
                    console.log('Wake up phrase detected');
                },
                '*text': (text)=>{
                    const containsLibrary = text.toLowerCase().includes("library");
                    console.log(text);
                    if(containsLibrary){
                        console.log("Library detected");
                        // console.log(annyang.pause());
                        speak("Going to Library");
                    }
                    const containsCafeteria = text.toLowerCase().includes("cafeteria");
                    if(containsCafeteria){
                        console.log("Cafeteria detected");
                        console.log(annyang.isListening());
                        speak("Going to Cafeteria");
                    }
                    const greetings = text.toLowerCase().includes("vikram");
                    if(greetings){
                        console.log("greetings detected");
                        console.log(annyang.isListening());
                        
                        setLoad(1);
                        
                        
                    }
                    
                }
                // Add more commands as needed
            };

            annyang.addCommands(commands);
            annyang.start();
        }
    }, []);

    return (
    <>
       {load && <audio src={greet} autoPlay onEnded={()=>{setLoad(null)}}></audio>}
       <button className='border-2 border-black h-8 w-8'><i className={`scale- fa-solid fa-microphone${listening}`} onMouseDown={()=>{annyang.start(); console.log("MIc On"); setListening(""); setTimeout(()=>{annyang.pause(); console.log("mic off"); setListening("-slash")},5000)}} ></i>
       
       </button>
    </>)

}

export default SpeechRecognition;
