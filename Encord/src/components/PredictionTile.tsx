import React, { useEffect, useState } from 'react'
import FullPrediction from './FullPrediction'

const PredictionTile = ({prediction}:any) => {
    const [time, setTime] = useState<string>("")
    const [showPredicted, setShowPredicted] = useState<boolean>(false)

    useEffect(() => {
        var date = new Date(prediction.predictionTime);
        let split = date.toString().split(" ")
        
        setTime(`${split[1]} ${split[2]} ${split[4]}`)
        
    }, [])


  return (
    <>
    <div className='w-full items-center  gap-6 h-20 bg-rose-50 rounded-md flex'>
            <img draggable={false} className='m-1 h-[75px] w-[75px]' src={prediction.image}/>
            <div className=' h-[75px]  w-[60px]  items-center justify-center   text-xs'>
                <div className='bg-blue-200 p-1 rounded-md shadow-md flex items-center justify-center'>Title</div>
                <div className='overflow-y-auto mt-1 text-center overflow-x-hidden h-[50px]'>
                {prediction.title}
                </div>
                
                </div>
                <div className=' h-[75px]  w-[60px]  items-center justify-center   text-xs'>
                <div className='bg-blue-200 p-1 w-[70px] rounded-md shadow-md flex items-center justify-center'>Description</div>
                <div className='overflow-y-auto mt-1 w-[70px] break-words text-center overflow-x-hidden h-[50px]'>
                {prediction.description}
                </div>
                
                </div>
                
                <div className=' h-[75px]  w-[60px]  items-center justify-center   text-xs'>
                <div className='bg-blue-200 p-1 w-[100px] rounded-md shadow-md flex items-center justify-center'>Prediction Time</div>
                <div className='overflow-y-auto mt-2 w-[100px] text-center overflow-x-hidden h-[50px]'>
                {time}
                </div>
                
                </div>
            <button onClick={() => {setShowPredicted(true)}} className='bg-green-200 ml-14 duration-300 hover:bg-purple-200 rounded-md h-10 p-1 shadow-md'>VIEW</button>
          </div>
          {
            showPredicted? <FullPrediction setShowPredicted={setShowPredicted} prediction={prediction}/>:null
          }
          </>
  )
}

export default PredictionTile
