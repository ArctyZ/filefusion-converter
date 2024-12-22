"use client";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Items } from "@/types/Items";
import { transcode } from "@/utils/transcode";
import { loadFFmpeg } from "@/utils/ffmped-wasm-load";
import {getFileIcon} from "@/utils/fileIcon";
import { sizeText } from "@/utils/sizeText";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import Dropzone from "react-dropzone";

// components
import { Button } from "@/components/ui/button";
import { Skeleton } from "./ui/skeleton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
  } from "@/components/ui/select"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


// icons
import { FaFileArrowUp } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { Badge } from "./ui/badge";
import { Item } from "@radix-ui/react-select";
import { log } from "console";



const acceptedFiles = {
  "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp"],
  "audio/*": [".mp3", ".wav", ".ogg", ".m4a"],
  "video/*": [".mp4", ".mov", ".avi", ".mkv"],
};

export default function DropzoneBox() {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [items, setItems] = useState<Items[]>()
  const [selected, setSelected] = useState<string>("")
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState<string>("video")
  const[isConcerting, setIsConverting] = useState<booleean>(false)
  const [isDone, setIsDone] = useState<booleean>(false)
  const [isReady, setIsReady] = useState<booleean>(false)
  const [files, setFiles] = useState([])

  const ffmpegRef = useRef(null)
  const { toast } = useToast();

  // Functions
  const handleHover = (): void => setIsHover(!isHover);
  const typeErrorToast = () => {
    return toast({
      variant: "destructive",
      title: "Type Error!",
      description: "Please enter a valid files type",
      duration: 3000,
    });
  };

  const handleUpload = (datas: Array<File>): void => {
    handleHover();
    const tmp_file: Items[] = []
    datas.forEach((data) => {
        tmp_file.push({
            file: data,
            file_name: data.name,
            file_size: data.size,
            file_type: data.type,
            from: data.name.slice(((data.name.lastIndexOf(".") - 1) >>> 0) + 2),
            to: null,
            isConverting: false,
            isConverted: false,
            isError: false
        })
    })
    setItems(tmp_file)
    
  };

  const handleUpdate = (file_name: string, to: string) => {
      setItems(items?.map((item) : Items => {
          if(file_name === item.file_name) return {...item, to: to}

          return items
      }))
  }

  const handleDelete = (item: Items) => {
      setItems(items?.filter((i) => i.file_name !== item.file_name))
  }

  const handleStatus = () : void => {
    let item_status = true;
    items?.forEach((item : Items) => {
        if(!item.to) item_status = false
    })
    setIsReady(item_status)
  }

  if(items?.length){
    console.log(items);
    
    return(
        <div className="border-1 w-full mt-5 flex flex-col">
            {items.map((item, index) => {
                
                return <div key={index}>
                    {!isLoaded && <Skeleton className="w-full"/>}
                    <div className="flex gap-2 items-center">
                        <span>{getFileIcon(item.file_type)}</span>
                        <span className="text-semibold">{item.file_name}</span>
                        <span>{sizeText(item.file_size)}</span>
                    </div>

                    {item.isError ? 
                    <div>
                        <Badge variant="destructive" className="flex gap-2 items-center">Error<MdError/></Badge>
                    </div>: item.isConverting ? 
                    <div>
                        <Badge variant="secondary" className="flex gap-2 items-center">Converting<FaSpinner className="animate-spin"/></Badge>
                    </div> : item.isConverted ? 
                    <div>
                        <Badge variant="default" className="flex gap-2 items-center">Converted<FaCheckCircle/></Badge>
                    </div> :
                    <Select>
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Select a format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {item.file_type.split("/").includes("image") ?
                        acceptedFiles["image/*"].map((type : string, index: number) => {
                            if(type.includes(item.from)) return ""
                            return <SelectItem key={index} value={type}>{type}</SelectItem>
                        }) : item.file_type.split("/").includes("audio")  ?
                        acceptedFiles["audio/*"].map((type: string, index: number) => {
                            if(type.includes(item.from)) return ""
                            return <SelectItem key={index} value={type}>{type}</SelectItem>
                        }): item.file_type.split("/").includes("video") ? 
                        acceptedFiles["video/*"].map((type: string, index: number) => {
                            if(type.includes(item.from)) return ""
                            return <SelectItem key={index} value={type}>{type}</SelectItem>
                        }) : "" 
                    }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                }
                </div>
            })}

        </div>
    )
  }

  return (
    <Dropzone
      onDrop={handleUpload}
      accept={acceptedFiles}
      onDragEnter={handleHover}
      onDragLeave={handleHover}
      onDropRejected={() => {
        typeErrorToast();
        handleHover();
      }}
      onError={() => {
        typeErrorToast();
        handleHover();
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className={`mt-5 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed duration-500 ${isHover ? "border-blue-800" : ""}`}
        >
          <input {...getInputProps()} />
          {isHover ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <FaFileArrowUp size={40} />
              <span className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                Drop files here
              </span>
            </div>
          ) : (
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
          )}
        </div>
      )}
    </Dropzone>
  );
}
