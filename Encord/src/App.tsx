import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { FcAddImage } from 'react-icons/fc'
import test from './assets/test.png'
import ImageList from './components/ImageList'
import PredictionList from './components/PredictionList'
import encord from './assets/encord.avif'

function App() {
  const [images, setImages] = useState<object[]>([])
  const [predictions, setPredictions] = useState<object[]>([])
  const [showImageList, setShowImageList] = useState<boolean>(true)
  const [showPredictionList, setShowPredictionList] = useState<boolean>(false)


/*
Ideally here i would like to store changes to the image and prediction arrays in local storage
This cannot be done with object urls so i would have to convert the object url to a data url
like base64 in order to store the data. I tried but I found out that JSON does not support blobs
as a type of data and local storage requires JSON formatted data for storage.
*/

  const handleAddImage = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    
    if (e.target.files![0]) {
      setImages(prev => [...prev,{
        image: URL.createObjectURL(e.target.files![0]),
        name: e.target.files![0].name,
        size: e.target.files![0].size,
        timestamp: new Date().valueOf(),
        prediction: {},
      }])
    }
    
  }

  const handleNewPrediction = (object:object) => {
    setPredictions(prev => [...prev, object])
  }

  
  
  

  return (
    <>
    <img draggable={false} src={encord} className=" w-25 z-20 h-10 absolute top-2 left-2 shadow-md p-2 flex"></img>
    <div className=' bg-green-200 fixed flex items-center justify-center w-screen h-screen'>
      
      {
        showImageList? <h1 className='absolute top-8 text-3xl font-sans'>Images</h1>:<h1 className='absolute top-8 text-3xl font-sans'>Predictions</h1>
      }
      
      
      <input type="file" onChange={handleAddImage} className='hidden' id='file'/>
        <label className='flex gap-2 p-2 bg-rose-50 cursor-pointer rounded-md shadow-md absolute top-20' htmlFor='file' >
          Add Image
          <FcAddImage className=' scale-[1.5] mt-1' />
        </label>
        <div className='flex-col mt-24'>
        <div className='h-[500px] flex flex-col overflow-y-auto gap-1 p-1 w-[500px] rounded-md shadow-md bg-[#6D6DE5]'>
          {
            showImageList?<ImageList images={images} handleNewPrediction={handleNewPrediction}/>:null
          }
          {
            showPredictionList?<PredictionList predictions={predictions}/>:null
          }
          
        </div>
        <div className='flex gap-4 mt-4 items-center justify-center'>
          <button onClick={() => {setShowImageList(true), setShowPredictionList(false)}} className='rounded-md bg-rose-50 w-[100px] shadow-md p-2 m'>Images</button>
          <button onClick={() => {setShowPredictionList(true),setShowImageList(false)}}  className='rounded-md bg-rose-50 w-[100px] shadow-md p-2 m'>Predictions</button>
        </div>
        </div>
    </div>
    </>
  )
}

export default App
