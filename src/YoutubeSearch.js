import React, { useState } from "react";
import PageButtons from "./PageButtons";
import usePagination from "./usePagination";

const YouTubeSearch = ({ queue, setQueue }) => {
  const YTS = "https://www.youtube.com/watch?v=";

  const [searchQuery, setSearchQuery] = useState("");
  const [videoResults, setVideoResults] = useState([]);
  const { currentPage, goToPage, getPageItems, totalPages } = usePagination(10);
  const [nextPageToken, setNextPageToken] = useState("");

  const handleSearch = async (nextPage = "") => {
    try {
      const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

      let apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchQuery}&key=${API_KEY}`;

      if (nextPage) {
        apiUrl += `&pageToken=${nextPage}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();
      setVideoResults(data.items);
      setNextPageToken(data.nextPageToken || "");
    } catch (error) {
      console.error(error);
      alert(
        "Sorry, there was an error with your search. Please try again later."
      );
    }
  };

  const handleQueue = (video) => {
    setQueue([...queue, video]);
  };

  const handlePageChange = async (newPage) => {
    const nextPage = newPage < 1 ? 1 : newPage;
    goToPage(nextPage);
    await handleSearch(nextPage === 1 ? "" : nextPageToken, nextPage);
  };

  const videoResultsPerPage = getPageItems(videoResults);

  return (
    <div className="container">
      <PageButtons
        totalPages={totalPages(videoResults)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <div className="user-input">
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button onClick={() => handleSearch()}>Search</button>
      </div>
      <div>
        {videoResultsPerPage && videoResultsPerPage.length > 0 ? (
          videoResultsPerPage.map((video) => (
            <div className="video" key={video.id.videoId}>
              <iframe
                title={video.snippet.title}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <a
                href={`${YTS}${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>{video.snippet.title}</h3>
              </a>
              <button onClick={() => handleQueue(video)}>Add to Queue</button>
            </div>
          ))
        ) : (
          <p>No videos found</p>
        )}
      </div>
    </div>
  );
};

export default YouTubeSearch;
