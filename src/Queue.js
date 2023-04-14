import React, { useState } from "react";

const Queue = ({ queue, onRemove, onMoveUp, onMoveDown, onStop, onPlay }) => {
  const [isTabOpen, setIsTabOpen] = useState(false);

  const toggleTab = () => {
    setIsTabOpen(!isTabOpen);
  };

  return (
    <div className="queue">
      <button className="queue-tab" onClick={toggleTab}>
        {isTabOpen ? "Close" : "Queue"}
      </button>
      {isTabOpen && (
        <div className="queue-content">
          {queue.length === 0 ? (
            <p>No videos in queue.</p>
          ) : (
            <ul>
              {queue.map((video, index) => (
                <li key={video.kind.id}>
                  <img src={video.thumbnail} alt={video.title} />
                  <div>
                    <h3>{video.title}</h3>
                    <div>
                      <button onClick={() => onRemove(index)}>Remove</button>
                      <button onClick={() => onMoveUp(index)}>Move Up</button>
                      <button onClick={() => onMoveDown(index)}>
                        Move Down
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="queue-controls">
            <button onClick={onStop}>Stop</button>
            <button onClick={onPlay}>Play</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Queue;
