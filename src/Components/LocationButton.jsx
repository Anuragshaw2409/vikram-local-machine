import React from 'react'
import { Locationatom } from '../store/atoms/Locationatom'
import { useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom';

function LocationButton({location,indexes}) {
    const setLocation = useSetRecoilState(Locationatom);
    const navigate = useNavigate();
    
  return (
    <>
      <button className='w-[30%]  p-2 m-1 bg-slate-200 text-black font-bold rounded-2xl text-lg shadow-lg shadow-black' onClick={()=>{
        setLocation(indexes);
        navigate('/player');
      }}>{location}</button>
    </>
  )
}

export default LocationButton
