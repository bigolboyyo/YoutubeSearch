import React, { useState, useRef } from "react";
import PageButtons from "./PageButtons";
import usePagination from "./usePagination";

const YouTubeSearch = ({ queue, setQueue }) => {
  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  const YTS = "https://www.youtube.com/watch?v=";

  const [searchQuery, setSearchQuery] = useState("");
  const [videoResults, setVideoResults] = useState([]);
  const { currentPage, goToPage, getPageItems, totalPages } = usePagination(10);
  const [nextPageToken, setNextPageToken] = useState("");
  const [morePageNumber, setMorePageNumber] = useState(5);
  const inputRef = useRef(null);

  const handleSearch = async (nextPage = "", newQuery = "") => {
    try {
      let query = newQuery || searchQuery;
      let apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${query}&key=${API_KEY}`;

      if (nextPage) {
        apiUrl += `&pageToken=${nextPage}`;
      } else if (!newQuery) {
        setNextPageToken("");
      }

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (nextPage) {
        setVideoResults([...videoResults, ...data.items]);
      } else {
        setVideoResults(data.items);
      }

      setNextPageToken(data.nextPageToken || "");

      console.log(apiUrl);
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
    if (newPage >= morePageNumber) {
      setMorePageNumber(morePageNumber + 5);
      await handleSearch(nextPageToken);
    }
  };

  const handleSearchClick = async () => {
    setSearchQuery(inputRef.current.value);
    await handleSearch("", searchQuery);
  };

  const videoResultsPerPage = getPageItems(videoResults);
  const totalVideoPages = totalPages(videoResults);

  return (
    <div className="container">
      <PageButtons
        totalPages={totalVideoPages}
        currentPage={currentPage}
        onPageChange={(newPage) => handlePageChange(newPage, searchQuery)}
        morePageNumber={morePageNumber}
        searchQuery={searchQuery}
      />
      <div className="user-input">
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          ref={inputRef}
        />
        <button onClick={handleSearchClick}>Search</button>
        {/* //TODO: Leaving off here 
            // Need to make sure the input value is update for the first search
            // pagination just about complete after
            // double check if a 2nd new search causes state/render issues
        */}
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
