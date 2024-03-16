import React, { useEffect, useState } from 'react'
import vikram from '../assets/image-vikram.png'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { choosenLanguage } from '../store/atoms/Language';
import { Locationatom } from '../store/atoms/Locationatom';
import LocationButton from './LocationButton';
import { useNavigate } from 'react-router-dom';
import annyang from 'annyang';
import LocationHindi from "../assets/audio/AskLocationHindi.mp3"
import LocationEnglish from "../assets/audio/AskLocationEnglish.m4a"



function Location() {
    let audioComponent =null;
   
    const setLocation = useSetRecoilState(Locationatom);

    const navigate = useNavigate();
    let keys = 0;
    const language = useRecoilValue(choosenLanguage);
    if(language =='En'){
        audioComponent = <audio src={LocationEnglish} autoPlay onEnded={()=>
            annyang.start({autoRestart: true, continuous: false})}/>
    }
    else
    audioComponent =<audio src={LocationHindi} autoPlay onEnded={()=>
        annyang.start({autoRestart: true, continuous: false})}/>

    console.log(language);
    let buttonText;
    let locations;
    if (language === 'En') {
        locations = ["Electrical Department", "Computer science Department", "Mechanical Department", "Civil Department", "Electronics Department", "AIML Department", "MBA Department", "Library", "Director", "Admission Cell", "Placement Cell", "IQAC Cell", "Registrar", "HR Office", "C.V. Raman Center", "Incubation Center", "Seminar Hall 1", "Seminar Hall 2", "Seminar Hall 3", "IoT Lab", "Volleyball Ground", "Basketball Court", "Cricket Ground", "Football Ground", "Badminton Court", "Gym", "Boys Hostel", "Girls Hostel", "Cafeteria", "Conference Hall", "Examination Cell", "STP Plant", "Bio gas plant", "Vermicompost plant", "Faculty apartment", "Workshop", "Vivekanand Hall"];
        buttonText = "Where do you want to go?"
    }
    else {
        locations = ["इलेक्ट्रिकल डिपार्टमेंट", "कंप्यूटर साइंस डिपार्टमेंट", "मैकेनिकल डिपार्टमेंट", "सिविल डिपार्टमेंट", "इलेक्ट्रॉनिक डिपार्टमेंट", "ए आई एम एल डिपार्टमेंट", "एम बी ए डिपार्टमेंट", "लाइब्रेरी", "डायरेक्टर", "एडमिशन सेल", "प्लेसमेंट सेल", "आई क्यू ए सी सेल", "रजिस्ट्रार", "एच आर ऑफिस", "सी वी रमन सेंटर", "इनक्यूबेशन सेंटर", " सेमिनार हॉल 1", "सेमिनार हॉल 2", "सेमिनार हॉल 3", "आई ओ टी लैब", "वॉलीबॉल ग्राउंड", "बास्केटबॉल कोर्ट", "क्रिकेट ग्राउंड", "फुटबॉल ग्राउंड", "बैडमिंटन कोर्ट", "जिम", "बॉयज हॉस्टल", "गर्ल्स हॉस्टल", "कैफेटेरिया", "कांफ्रेंस हॉल", "एग्जामिनेशन सेल", "एस टी पी प्लांट", "बायो गैस प्लांट", "वर्मीकम्पोस्ट प्लांट", "फैकल्टी अपार्टमेंट", "वर्कशॉप", "विवेकानंद हॉल"];
        buttonText = "आप कहाँ जाना चाहते हैं ?";
    }

    const matching = ["electrical", "computer", "mechanical", "Civil", "electronics", "aiml", "MBA", "library", "director", "admission", "placement", "iqac", "registrar", "HR", "Raman", "incubation", "1", "2", "3", "iot", "volleyball", "basketball", "cricket", "football", "badminton", "gym", "boys", "girls", "cafeteria", "conference", "examination", "stp", "biogas", "vermicompost", "faculty", "workshop", "vivekanand"];

    useEffect(() => {
        if (annyang) {
            annyang.setLanguage("en-IN");
            annyang.addCallback('result', function (phrases) {
                console.log(phrases);

                phrases.forEach((phrase) => {

                    for (let i = 0; i < matching.length; i++) {
                        if (phrase.includes(matching[i])) {
                            setLocation(i);
                            annyang.abort();
                            navigate('/player');
                        }
                    }

                })
            });
            
            
            console.log("Started");

        }

        return () => {
            annyang.removeCommands();
            annyang.abort();
        }
    }, []);

    return (
        <>
            {audioComponent}
            <div className="container ">

                <div className=" lg:w-[15%] bg-slate-200 lg:inline-block text-wrap text-center lg:p-8 lg:absolute rounded-3xl lg:bottom-[40%] lg:left-[17%] p-4 m-3"><h1 className='text-3xl font-bold'>{buttonText}</h1></div>

            <div className="locationContainer flex flex-row lg:absolute lg:right-[4%] flex-wrap  lg:w-[60%] lg:top-[7%]">

                {locations.map((location, index) => <LocationButton location={location} indexes={index} key={++keys} />)}
            </div>

                <img src={vikram} alt="" className='lg:w-[25%] lg:absolute bottom-0  lg:left-[2%] '  />
            </div>


            {/* buttons rendering here */}



            <div className="homeContainer lg:h-20 lg:w-20 h-10 w-10 border-2 border-white rounded-full hover:cursor-pointer  absolute lg:right-[2%] right-[7%] top-[2%]">
                <i className="fa-solid fa-house lg:text-5xl text-white lg:p-3 text-2xl p-1" onClick={() => navigate('/')}></i>
            </div>
        </>
    )
}

export default Location;