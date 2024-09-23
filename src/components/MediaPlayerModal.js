import React from 'react';
import { Modal, Button } from 'antd';

// Helper function to check if the link is a YouTube link
const isYouTubeLink = (url) => {
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  return youtubeRegex.test(url);
};

const MediaPlayerModal = ({ visible, mediaLink, onClose }) => {
  const handleVideoError = (event) => {
    console.error('Error loading video:', event);
  };

  const handleVideoCanPlay = () => {
    console.log('Video is ready to play.');
  };

  // Extract YouTube video ID if it's a YouTube link
  const getYouTubeEmbedUrl = (url) => {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  return (
    <Modal
      title="Media Player"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Close
        </Button>,
      ]}
      width={800}
    >
      {mediaLink ? (
        isYouTubeLink(mediaLink) ? (
          // Embed YouTube video using iframe
          <iframe
            width="100%"
            height="450"
            src={getYouTubeEmbedUrl(mediaLink)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          // Use HTML5 video player for regular video links
          <video
            controls
            style={{ width: '100%' }}
            onError={handleVideoError}
            onCanPlay={handleVideoCanPlay}
          >
            <source src={mediaLink} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )
      ) : (
        <p>No media link provided</p>
      )}
    </Modal>
  );
};

export default MediaPlayerModal;
