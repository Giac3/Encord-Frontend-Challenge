import React, { useRef, useState } from 'react'
import {AiFillCloseCircle} from 'react-icons/ai'

const PredicationDialogue = ({image,setShowSendPrediction, handleNewPrediction}:any) => {
    const titleRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const descRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>
    const [predictionSuccess, setPredictionSuccess] = useState<boolean>(false)
    const [predictionFailed, setPredictionFailed] = useState<boolean>(false)
    const [titleError, setTitleError] = useState<boolean>(false)
    const [descError, setDescError] = useState<boolean>(false)

    const url = "http://localhost:3000/predict"
    const handlePrediction = async () => {

        if (titleRef.current.value === "" || descRef.current.value === "") {

          if (titleRef.current.value === "") {
            setTitleError(true)
            setTimeout(() => {
              setTitleError(false)
            }, 300);
          }
          if (descRef.current.value === "") {
            setDescError(true)
            setTimeout(() => {
              setDescError(false)
            }, 300);
          }
          
        } else {
            try {
            
                const res = await  fetch(url)
                const data = await res.json()                
                handleNewPrediction({
                    image: image.image,
                    title: titleRef.current.value,
                    description: descRef.current.value,
                    prediction: data.predictions,
                    predictionTime: new Date().valueOf()
                })
    
                setPredictionSuccess(true)
                setTimeout(() => {
                    setShowSendPrediction(false)
                }, 1000);
    
            } catch(error) {
                setPredictionFailed(true)
                setTimeout(() => {
                    setShowSendPrediction(false)
                }, 1000);
            }
        }
        
    }


  return (
    <div className='h-[600px] w-[500px] flex items-center justify-center -mt-1 -ml-1 rounded-md absolute bg-slate-500 bg-opacity-60'>
        <div className='w-[300px] absolute items-center justify-center flex bg-rose-50 rounded-md h-[200px]'>
      <button onClick={() => {setShowSendPrediction(false)}} className='right-2 top-2 absolute'>
        <AiFillCloseCircle className='text-red-500 scale-[2]'/>
      </button><div className='flex flex-col items-center gap-2'>
      {
        titleError?<input ref={titleRef} placeholder='Prediction Title' className='outline-none duration-300 text-white bg-red-500 rounded-md p-1'/>:<input ref={titleRef} placeholder='Prediction Title' className='outline-none text-white bg-purple-300 rounded-md p-1'/>
      }
      {
        descError?<textarea ref={descRef} placeholder='Description' className='outline-none duration-300 w-[250px] h-[80px] resize-none text-xs text-white bg-red-500 rounded-md p-1'/>:<textarea ref={descRef} placeholder='Description' className='outline-none w-[250px] h-[80px] resize-none text-xs text-white bg-purple-300 rounded-md p-1'/>
      }
      
      
      <button onClick={handlePrediction} className=' bg-green-200 duration-300 hover:bg-purple-300 w-20 p-1 rounded-md shadow-md'>Send</button>
      </div>
      </div>
      {
        predictionSuccess?<div className='w-[300px] absolute items-center justify-center flex bg-rose-50 rounded-md h-[200px]'>
        <div className='rounded-md bg-green-200 p-2 shadow-md'>Prediction Successful</div>
        </div>:null
      }
      {
        predictionFailed?<div className='w-[300px] absolute items-center justify-center flex bg-rose-50 rounded-md h-[200px]'>
        <div className='rounded-md bg-red-400 p-2 shadow-md'>Sorry there was an error</div>
        </div>:null
      }
    </div>
  )
}

export default PredicationDialogue
