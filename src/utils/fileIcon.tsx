import { FaRegFileAudio } from "react-icons/fa";
import { FaRegFileImage } from "react-icons/fa";
import { FaRegFileVideo } from "react-icons/fa";
import { FaRegFile } from "react-icons/fa";

const acceptedFiles = {
    "images": [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    "audio": [".mp3", ".wav", ".ogg", ".m4a"],
    "video": [".mp4", ".mov", ".avi", ".mkv"],
  };


export  function getFileIcon(fileName: string) {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if(acceptedFiles.images.includes(extension as string)) return <FaRegFileImage/>
    if(acceptedFiles.audio.includes(extension as string)) return <FaRegFileAudio/>
    if(acceptedFiles.video.includes(extension as string)) return <FaRegFileVideo/>
    return <FaRegFile/>
}