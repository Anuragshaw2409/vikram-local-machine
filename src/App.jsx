
import './App.css'
import RestState from './Components/RestState'
import Header from './Components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LangPage from './Components/LangPage'
import LocationPlayer from './Components/LocationPlayer'
import Bye from './Components/Bye'
import Location from "./Components/Location"
import {RecoilRoot} from 'recoil'


function App() {


  return (
    <>
    <RecoilRoot>

    <Header/> 
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<RestState/>}/>
      <Route path='/langpage' element={<LangPage/>}/>
      <Route path='/locationpage' element={<Location/>}/>
      <Route path='/player' element={<LocationPlayer/>}/>
      <Route path='/final' element={<Bye/>}/>
    </Routes>
    </BrowserRouter>  
    </RecoilRoot>
    {/* <TestImageViewer/> */}
   </>
  )
}

export default App
