import { useState } from "react";
import YouTubeSearch from "./YoutubeSearch";
import "./App.css";
import publicImage from "./publicImage";

// import ToolBar from "./ToolBar";

function App() {
  // const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [queue, setQueue] = useState([]);

  // const toggleQueue = () => {
  //   setIsQueueOpen(!isQueueOpen);
  // };

  // const addToQueue = (video) => {
  //   setQueue([...queue, video]);
  // };

  // const removeFromQueue = (index) => {
  //   setQueue(queue.filter((_, i) => i !== index));
  // };

  // const moveUpInQueue = (index) => {
  //   if (index > 0) {
  //     const newQueue = [...queue];
  //     const temp = newQueue[index];
  //     newQueue[index] = newQueue[index - 1];
  //     newQueue[index - 1] = temp;
  //     setQueue(newQueue);
  //   }
  // };

  // const moveDownInQueue = (index) => {
  //   if (index < queue.length - 1) {
  //     const newQueue = [...queue];
  //     const temp = newQueue[index];
  //     newQueue[index] = newQueue[index + 1];
  //     newQueue[index + 1] = temp;
  //     setQueue(newQueue);
  //   }
  // };

  // const clearQueue = () => {
  //   setQueue([]);
  // };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${publicImage("mnt-ctg-bkg-transformed.jpeg")})`,
      }}
    >
      <div className="container">
        {/* <ToolBar
          isQueueOpen={isQueueOpen}
          toggleQueue={toggleQueue}
          queue={queue}
          addToQueue={addToQueue}
          removeFromQueue={removeFromQueue}
          moveUpInQueue={moveUpInQueue}
          moveDownInQueue={moveDownInQueue}
          clearQueue={clearQueue}
        /> */}
      </div>
      <YouTubeSearch queue={queue} setQueue={setQueue} />
    </div>
  );
}

export default App;
