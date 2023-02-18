import React, { useEffect, useState } from 'react'
import PredictionList from './PredictionList'


const FullPrediction = ({prediction, setShowPredicted}:any) => {
    const [image, setImage] = useState<HTMLImageElement>()
    

    useEffect(() => {
        let img =  document.getElementById('img')! as HTMLImageElement;
        setImage(img)
    }, [])

  return (
    <div className='h-full flex flex-col items-center justify-center w-full bg-white bg-opacity-60 absolute top-0 left-0 '>
        <div className='flex items-center justify-center  scale-[1]'>
      <img id='img' src={prediction.image} className=" w-[500px] h-[400px]"/>
      {
       image!?prediction.prediction.map((pred:any) => {
            
        let w = (pred.bbox.x2 - pred.bbox.x1)* (500 / image.naturalWidth)
        let h = (pred.bbox.y2 - pred.bbox.y1)*(400 / image.naturalHeight)
        return <div key={pred.bbox.x1} style={{width: w, height: h, top: pred.bbox.y1*(400 / image.naturalHeight), left: pred.bbox.x1* (500 / image.naturalWidth), position: 'absolute',  backgroundColor: "rgba(3, 138, 255, .1)"}}>
            <p className='absolute text-sm text-white bottom-0 right-0 flex'>{pred.label} ({Math.round(pred.score*100)}%)</p>
        </div>
    }):null 
      }
      </div>
      <button onClick={() => {setShowPredicted(false)}} className='bg-red-200 z-20 mt-10 p-1 rounded-md shadow-md duration-300 hover:bg-purple-200'>Back</button>
    </div>
  )
}

export default FullPrediction
