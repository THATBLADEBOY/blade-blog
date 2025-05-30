import React from 'react'

const VideoComponent = ({ src, type }) => {
  return (
    <video controls autoPlay loop width='100%'>
      <source src={src} type={type} />
      Sorry, your browser doesn't support embedded videos.
    </video>
  )
}

export default VideoComponent
