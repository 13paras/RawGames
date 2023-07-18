/* eslint-disable react/prop-types */
import ReactPlayer from "react-player";

const VideoPopup = ({ video, setShow, show }) => {
  return (
    <div
      className={` player-wrapper fixed bottom-0 left-0 right-0 top-0 z-50 items-center justify-center bg-black bg-opacity-20 ${
        show ? "flex" : "hidden"
      }`}
    >
      <span
        onClick={() => setShow(false)}
        className='badge badge-neutral badge-lg absolute top-[20%] cursor-pointer rounded hover:shadow-md hover:shadow-gray-600 active:scale-95'
      >
        close X
      </span>
      <ReactPlayer
        className='absolute aspect-video rounded-lg '
        url={video?.data?.max}
        width='50%'
        height='50%'
        controls
      />
    </div>
  );
};

export default VideoPopup;
