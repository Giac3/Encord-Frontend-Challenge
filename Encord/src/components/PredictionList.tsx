import React from 'react'
import PredictionTile from './PredictionTile'

const PredictionList = ({predictions}:any) => {
  return (
    predictions.map((prediction:any) => {
        return <PredictionTile key={prediction.predictionTime} prediction={prediction}/>
    })
  )
}

export default PredictionList
