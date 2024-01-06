import React, { useState, useEffect } from "react";

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [gifs, setGifs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchRandomData = () => {
      const randomQuery = "random"; // Replace with your logic to generate a random query
      console.log("Fetching random data with query:", randomQuery);

      // Fetch random data for photos, gifs, and videos
      // Modify the URLs accordingly
      fetch(
        `https://api.unsplash.com/photos?query=${randomQuery}&client_id=uirCqe-7BdC_BM5HR-dyGg9HD2Ob32V4gkCLseo49CU`
      )
        .then((response) => response.json())
        .then((data) => {
          //   console.log("Random photos:", data);
          setPhotos(data);
        })
        .catch((error) => console.error("Random photos API error:", error));

      fetch(
        `https://api.giphy.com/v1/gifs/trending?api_key=O37nEkvNcT1VZEhI1TIm4tKdrmIOw9eE&limit=10`
      )
        .then((response) => response.json())
        .then((data) => {
          //   console.log("Random gifs:", data);
          setGifs(data.data);
        })
        .catch((error) => console.error("Random gifs API error:", error));

      fetch(`https://api.pexels.com/videos/popular?per_page=10&page=1`, {
        headers: {
          Authorization:
            "yRvnmPgQhJWEZJwO1yCDvvqV6tDp8yqBiSqbXcnid5RVtQeKCBrw0MsX ",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          //   console.log("Random videos:", data);
          setVideos(data.videos);
        })
        .catch((error) => console.error("Random videos API error:", error));
    };

    if (!searchTerm) {
      fetchRandomData();
      return;
    }

    console.log("Fetching data with search term:", searchTerm);

    // Fetch data from Unsplash API (photos) with search term
    fetch(
      `https://api.unsplash.com/photos?query=${searchTerm}&client_id=uirCqe-7BdC_BM5HR-dyGg9HD2Ob32V4gkCLseo49CU`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log("Unsplash data:", data);
        setPhotos(data);
      })
      .catch((error) => console.error("Unsplash API error:", error));

    // Fetch data from Giphy API (gifs) with search term
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=O37nEkvNcT1VZEhI1TIm4tKdrmIOw9eE&q=${searchTerm}&limit=10`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log("Giphy data:", data);
        setGifs(data.data);
      })
      .catch((error) => console.error("Giphy API error:", error));

    // Fetch data from Pexels API (videos) with search term
    fetch(
      `https://api.pexels.com/videos/search?query=${searchTerm}&per_page=10&page=1`,
      {
        headers: {
          Authorization:
            "yRvnmPgQhJWEZJwO1yCDvvqV6tDp8yqBiSqbXcnid5RVtQeKCBrw0MsX ",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log("Pexels data:", data);
        setVideos(data.videos);
      })
      .catch((error) => console.error("Pexels API error:", error));
  }, [searchTerm]);

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center px-4 py-2 mr-2 justify-center">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="px-2 py-1 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => handleTabClick(0)}
          className={`flex items-center px-4 py-2 border-b ${
            activeTab === 0 ? "border-blue-600" : "border-gray-300"
          }`}
        >
          Photos
        </button>
        <button
          onClick={() => handleTabClick(1)}
          className={`flex items-center px-4 py-2 border-b ${
            activeTab === 1 ? "border-blue-600" : "border-gray-300"
          }`}
        >
          Gifs
        </button>
        <button
          onClick={() => handleTabClick(2)}
          className={`flex items-center px-4 py-2 border-b ${
            activeTab === 2 ? "border-blue-600" : "border-gray-300"
          }`}
        >
          Videos
        </button>
      </div>
      <div className="mt-4">
        {activeTab === 0 && (
          <div className="grid grid-cols-2 grid-rows-5 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="overflow-hidden h-60">
                <img
                  src={photo.urls.small}
                  className="w-full h-full object-cover rounded-lg"
                  alt={`Photo ${index}`}
                />
              </div>
            ))}
          </div>
        )}
        {activeTab === 1 && (
          <div className="grid grid-cols-2 grid-rows-5 gap-4">
            {gifs.map((gif, index) => (
              <div key={index} className="overflow-hidden h-60">
                <img
                  src={gif.images.fixed_height.url}
                  className="w-full h-full object-cover rounded-lg"
                  alt={`Gif ${index}`}
                />
              </div>
            ))}
          </div>
        )}
        {activeTab === 2 && (
          <div className="grid grid-cols-2 grid-rows-5 gap-4">
            {videos.map((video, index) => (
              <div key={index} className="overflow-hidden h-60">
                <video
                  width="100%"
                  height="auto"
                  autoPlay
                  muted
                  className="w-full h-full object-cover rounded-lg"
                >
                  <source src={video.video_files[0].link} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TabComponent;
