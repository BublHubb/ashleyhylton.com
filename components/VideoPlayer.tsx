function VideoPlayer({ url }: { url: string }) {
  return <video src={url} controls id="video-player" />;
}

export default VideoPlayer;
