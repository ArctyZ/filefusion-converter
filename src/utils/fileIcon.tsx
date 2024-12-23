import { FaRegFileAudio } from "react-icons/fa";
import { FaRegFileImage } from "react-icons/fa";
import { FaRegFileVideo } from "react-icons/fa";
import { FaRegFile } from "react-icons/fa";

const acceptedFiles = {
    images: ["jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "webp",
    "ico",
    "tif",
    "tiff",
    "svg",
    "raw"],
    audio: ["mp3", "wav", "ogg", "aac", "wma", "flac", "m4a"],
    video: ["mp4",
    "m4v",
    "mp4v",
    "3gp",
    "3g2",
    "avi",
    "mov",
    "wmv",
    "mkv",
    "flv",
    "ogv",
    "webm",
    "h264",
    "264",
    "hevc",
    "265"],
  };


export  function getFileIcon(fileName: string) {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    if(acceptedFiles.images.includes(extension as string)) return <FaRegFileImage size={25}/>
    if(acceptedFiles.audio.includes(extension as string)) return <FaRegFileAudio/>
    if(acceptedFiles.video.includes(extension as string)) return <FaRegFileVideo size={25}/>
    //default icon if there is no matching extension
    return <FaRegFile/>
}