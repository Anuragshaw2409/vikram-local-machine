import React from 'react'
import video from '../assets/lab.mp4'
import ReactPlayer from 'react-player'

function VideoPlayer() {
  return (
    <div>
      <ReactPlayer url={video} controls={false} playing={true} muted={true}/>
    </div>
  )
}

export default VideoPlayer

