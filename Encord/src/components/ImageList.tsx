import React from 'react'
import ImageTile from './ImageTile'

const ImageList = ({images,handleNewPrediction}:any) => {
  return (
    images.map((image:any) => {
        return <ImageTile key={image.timestamp} image={image} handleNewPrediction={handleNewPrediction} />
    })
  )
}

export default ImageList
