import React from 'react';

const VideoPreloader = () => {
  return (
    <div style={{ display: 'none' }}>
      <video preload="auto" src="./public/videos/v1.mp4" />
      <video preload="auto" src="./public/videos/v2.mp4" />
      <video preload="auto" src="./public/videos/v3.mp4" />
      <video preload="auto" src="./public/videos/v4.mp4" />
      <video preload="auto" src="./public/videos/v5.mp4" />
      <video preload="auto" src="./public/videos/v6.mp4" />
      <video preload="auto" src="./public/videos/v7.mp4" />
    </div>
  );
};

export default VideoPreloader;