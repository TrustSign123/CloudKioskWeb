import KioskContext from "./kioskContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Kioskstate = (props) => {
  // const host = "http://localhost:5000/api/";
  const host = "https://cloudkiosk-2-0.onrender.com/api/";
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [kiosks, setKiosks] = useState([]);
  const [media, setMedia] = useState([]);
  const [groups, setGroups] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [fileSize, setFileSize] = useState(0);
  const [userProfile, setUserProfile] = useState([]);

  let navigate = useNavigate();
  const notify = (message, type) => {
    toast[type](message);
  };

  const logout = () => {
    navigate("/");
    localStorage.removeItem("token");
    setLoading(false);
    setKiosks([]), setUserProfile([]);
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${host}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const json = await response.json();
      if (json.success) {
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${host}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        notify(`${response.statusText}`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      if (json.success) {
        setLoading(false);
        // Save the auth token and redirect
        localStorage.setItem(`token`, json.authtoken);
        navigate("/screens");
      } else {
        setLoading(false);
        console.error("error");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  const profile = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${host}auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      const json = await response.json();
      setUserProfile(json);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  const fetchKiosk = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${host}kioskMachine/get-kiosk`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        notify(`${response.statusText}`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      setKiosks(json.kiosks);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  const createKiosk = async (kioskCode) => {
    try {
      const response = await fetch(`${host}kioskMachine/kiosk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          kioskCode,
        }),
      });

      if (!response.ok) {
        notify(`${response.statusText}`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      setKiosks(kiosks.concat(json));
      navigate("/screens");
      notify(`${json.message}`, "success");
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const editKiosk = async (kioskName, orientation, interval, kioskCode, id) => {
    setLoading(true);
    try {
      const response = await fetch(`${host}kioskMachine/kiosk/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          kioskName,
          orientation,
          interval,
          kioskCode,
        }),
      });

      if (!response.ok) {
        notify(`Failed to edit this kiosk`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      let newkiosk = JSON.parse(JSON.stringify(kiosks));
      // Logic to edit in client
      for (let index = 0; index < newkiosk.length; index++) {
        const element = newkiosk[index];
        if (element._id === id) {
          newkiosk[index].kioskName = kioskName;
          newkiosk[index].settings[0].orientation = orientation;
          newkiosk[index].settings[0].interval = interval;
          break;
        }
      }
      setKiosks(newkiosk);
      // console.log(kiosks);
      notify(`${json.message}`, "success");

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  const deleteKiosk = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${host}kioskMachine/kiosk/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        notify(`Failed to delete this kiosk`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      const newKiosks = kiosks.filter((kiosk) => {
        return kiosk._id !== id;
      });
      setKiosks(newKiosks);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  const fetchMedia = async () => {
    try {
      const response = await fetch(`${host}media/media-display`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        notify(`${response.statusText}`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      // console.log(media)
      setMedia(json.media);
      setFileSize(json.fileSize);
    } catch (error) {
      console.error(error);
    }
  };

  const addKioskContent = async (media) => {
    setUploadStatus(true);
    try {
      const formData = new FormData();
      formData.append("media", media);
      const response = await fetch(`${host}media/media-uploads`, {
        method: "POST",
        body: formData,
        headers: {
          "auth-token": token,
        },
      });

      if (!response.ok) {
        notify(`Failed to add content`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();

      setUploadStatus(false);
      notify("add Successful", "success");
      setMedia((prevMedia) =>
        Array.isArray(prevMedia)
          ? prevMedia.concat(json.newMedia)
          : [json.newMedia]
      );
    } catch (error) {
      setUploadStatus(false);
      notify("add failed", "error");
      console.error(error);
    }
  };
  const deleteKioskContent = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${host}media/media-delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        notify(`Failed to delete this content`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      setLoading(false);
      const newMedia = media.filter((media) => {
        return media._id !== id;
      });
      setMedia(newMedia);
      notify("delete Successful", "success");
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const publishKioskContent = async (kioskCode, contentUrl, contentType) => {
    setLoading(true);
    try {
      const response = await fetch(`${host}media/publish-media`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          kioskCode,
          contentUrl,
          contentType,
        }),
      });

      if (!response.ok) {
        notify(`Failed to publish`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();

      setLoading(false);
      notify("add Successful", "success");
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const deletePublishContent = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${host}media/publish-delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        notify(`Failed to delete this content`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      setLoading(false);

      notify("delete Successful", "success");
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${host}group/get-groups`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        notify(`Failed fetch group`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      setGroups(json.groups);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  const createGroup = async (groupName) => {
    try {
      const response = await fetch(`${host}group/create-group`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          groupName,
        }),
      });

      if (!response.ok) {
        notify(`${response.statusText}`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      setGroups(groups.concat(json));
      notify(`${json.message}`, "success");
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const editGroup = async (groupName, id) => {
    setLoading(true);

    try {
      const response = await fetch(`${host}group/update-group/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          groupName,
        }),
      });

      if (!response.ok) {
        notify(`Failed to rename`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      let newGroup = JSON.parse(JSON.stringify(groups));
      // Logic to edit in client
      for (let index = 0; index < newGroup.length; index++) {
        const element = newGroup[index];
        if (element._id === id) {
          newGroup[index].groupName = groupName;
          break;
        }
      }
      setGroups(newGroup);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  const deleteGroup = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${host}group/delete-group/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        notify(`Failed to remove this group`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      const newGroup = groups.filter((group) => {
        return group._id !== id;
      });
      setGroups(newGroup);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  const moveToGroup = async (groupId, kioskId) => {
    try {
      const response = await fetch(`${host}group/move-to-group`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          groupId,
          kioskId,
        }),
      });

      if (!response.ok) {
        notify(`${response.statusText}`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      notify(`${json.message}`, "success");
      const newKiosks = kiosks.filter((kiosk) => {
        return kiosk._id !== kioskId;
      });
      setKiosks(newKiosks);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const ungroup = async (groupId, kioskId) => {
    try {
      const response = await fetch(`${host}group/ungroup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          groupId,
          kioskId,
        }),
      });

      if (!response.ok) {
        notify(`${response.statusText}`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      notify(`${json.message}`, "success");
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlaylist = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${host}media/playlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        notify(`Failed fetch playlist`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      setPlaylists(json.playlist);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const createPlaylist = async (playlistName, contents, contentsType) => {
    try {
      const response = await fetch(`${host}media/create-playlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          playlistName,
          contents,
          contentsType,
        }),
      });

      if (!response.ok) {
        notify(`Playlist create successfully`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      setPlaylists(playlists.concat(json));
      notify(`${json.message}`, "success");
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePlaylist = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${host}media/playlist-delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        notify(`Failed to remove this playlist`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      const newPlaylist = playlists.filter((playlist) => {
        return playlist._id !== id;
      });
      setPlaylists(newPlaylist);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const scheduleKioskContent = async (
    kioskCode,
    kioskContent,
    kioskContentType,
    startDate,
    endDate
  ) => {
    setLoading(true);
    try {
      const response = await fetch(`${host}schedule/schedule/${kioskCode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          kioskContent,
          kioskContentType,
          startDate,
          endDate,
        }),
      });

      if (!response.ok) {
        notify(`Failed to publish`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();

      setLoading(false);
      notify("add Successful", "success");
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const deleteScheduleKioskContent = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${host}schedule/schedule/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        notify(`Failed to delete this content`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      setLoading(false);

      notify("delete Successful", "success");
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    profile();
    fetchKiosk();
    fetchMedia();
    fetchGroups();
    fetchPlaylist();
  }, []);
  return (
    <KioskContext.Provider
      value={{
        host,
        loading,
        uploadStatus,
        userProfile,
        kiosks,
        media,
        groups,
        playlists,
        fileSize,
        logout,
        register,
        login,
        profile,
        fetchKiosk,
        createKiosk,
        editKiosk,
        deleteKiosk,
        fetchMedia,
        addKioskContent,
        deleteKioskContent,
        publishKioskContent,
        deletePublishContent,
        fetchGroups,
        createGroup,
        editGroup,
        deleteGroup,
        moveToGroup,
        ungroup,
        fetchPlaylist,
        createPlaylist,
        deletePlaylist,
        scheduleKioskContent,
        deleteScheduleKioskContent,
      }}
    >
      {props.children}
    </KioskContext.Provider>
  );
};

export default Kioskstate;
