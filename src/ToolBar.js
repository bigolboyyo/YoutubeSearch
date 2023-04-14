import React from "react";
import Queue from "./Queue";

const Toolbar = ({
  isQueueOpen,
  toggleQueue,
  queue,
  addToQueue,
  removeFromQueue,
  moveUpInQueue,
  moveDownInQueue,
  clearQueue,
}) => {
  return (
    <div className="toolbar">
      <Queue
        queue={queue}
        isOpen={isQueueOpen}
        onRemove={removeFromQueue}
        onMoveUp={moveUpInQueue}
        onMoveDown={moveDownInQueue}
        onStop={clearQueue}
        onPlay={() => console.log("Play queue")}
      />
    </div>
  );
};

export default Toolbar;
