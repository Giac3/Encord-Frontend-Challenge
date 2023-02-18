import React, { useEffect, useState } from 'react'
import PredicationDialogue from './PredicationDialogue'

const ImageTile = ({image,handleNewPrediction}:any) => {
    const [time, setTime] = useState<string>("")
    const [showSendPrediction, setShowSendPrediction] = useState<boolean>(false)

    useEffect(() => {
        var date = new Date(image.timestamp);
        let split = date.toString().split(" ")
        
        setTime(`${split[1]} ${split[2]} ${split[4]}`)
        
    }, [])


  return (
    <>
    <div className='w-full items-center  gap-9 h-20 bg-rose-50 rounded-md flex'>
            <img draggable={false} className='m-1 h-[75px] w-[75px]' src={image.image}/>
            <div className=' h-[75px]  w-[60px]  items-center justify-center   text-xs'>
                <div className='bg-blue-200 p-1 rounded-md shadow-md flex items-center justify-center'>Name</div>
                <div className='overflow-y-auto mt-1 text-center overflow-x-hidden h-[50px]'>
                {image.name}
                </div>
                
                </div>
                <div className=' h-[75px]  w-[60px]  items-center justify-center   text-xs'>
                <div className='bg-blue-200 p-1 rounded-md shadow-md flex items-center justify-center'>Size</div>
                <div className='overflow-y-auto mt-4 text-center overflow-x-hidden h-[50px]'>
                {image.size * 0.001 < 1000 ? `${Math.round((image.size * 0.001) * 10) / 10} kb` : `${Math.round((image.size * 0.000001) * 10) / 10} Mb` }  
                </div>
                
                </div>
                <div className=' h-[75px]  w-[60px]  items-center justify-center   text-xs'>
                <div className='bg-blue-200 p-1 rounded-md shadow-md flex items-center justify-center'>Uploaded</div>
                <div className='overflow-y-auto mt-2 text-center overflow-x-hidden h-[50px]'>
                {time}
                </div>
                
                </div>
            <button onClick={() => {setShowSendPrediction(true)}} className='bg-green-200 duration-300 hover:bg-purple-200 rounded-md h-10 p-1 shadow-md'>Predict</button>
          </div>
          {
            showSendPrediction? <PredicationDialogue handleNewPrediction={handleNewPrediction} image={image} setShowSendPrediction={setShowSendPrediction}/>:null
          }
          </>
  )
}

export default ImageTile
