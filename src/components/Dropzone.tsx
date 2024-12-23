"use client";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Items } from "@/types/Items";
import { transcode } from "@/utils/transcode";
import { loadFFmpeg } from "@/utils/ffmped-wasm-load";
import { getFileIcon } from "@/utils/fileIcon";
import { sizeText } from "@/utils/sizeText";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { cutFileName } from "@/utils/cutFileName";
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
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// icons
import { FaFileArrowUp } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { Badge } from "./ui/badge";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";

const acceptedFiles = {
  "image/*": [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "webp",
    "ico",
    "tif",
    "tiff",
    "svg",
    "raw",
  ],
  "audio/*": ["mp3", "wav", "ogg", "aac", "wma", "flac", "m4a"],
  "video/*": [
    "mp4",
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
    "265",
  ],
};

export default function DropzoneBox() {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [items, setItems] = useState<Items[]>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");
  const [defaultValue, setDefaultValue] = useState<string>("video")
  const ffmpegRef = useRef(null as FFmpeg | null);
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
    const tmp_file: Items[] = [];
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
        isError: false,
      });
    });
    setItems(tmp_file);
  };

  const handleUpdate = (file_name: string, to: string) => {
    setItems(
      items?.map((item): Items => {
        if (file_name === item.file_name) return { ...item, to: to };

        return item;
      }),
    );
  };

  const handleDelete = (item: Items) => {
    handleHover();
    setItems(items?.filter((i) => i.file_name !== item.file_name));
  };

  const handleStatus = (): void => {
    let item_status = true;
    items?.forEach((item: Items) => {
      if (!item.to) item_status = false;
    });
    setIsReady(item_status);
  };

  const handleDownload = (item: Items) => {
    const temp_a = document.createElement("a");
    temp_a.href = item.url as string;
    temp_a.download = item.output;

    document.body.appendChild(temp_a);
    temp_a.click();

    URL.revokeObjectURL(temp_a.href);
    document.body.removeChild(temp_a);
  };

  const handleMultiDownload = (): void => {
    for (const item of items as Items[]) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      !item.isError && handleDownload(item);
    }
  };

  const reset = () => {
    handleHover();
    setIsDone(false);
    setItems([]);
    setIsReady(false);
    setIsConverting(false);
    setSelected("")
  };

  const load = async () => {
    const ffmpeg_res = await loadFFmpeg();
    ffmpegRef.current = ffmpeg_res;
    setIsLoaded(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const convert = async (): Promise<any> => {
    setIsConverting(true);
    let temp_items = items?.map((item) => {
      return { ...item, isConverting: true };
    });
    setItems(temp_items);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const item of temp_items as any) {
      try {
        const { url, output } = await transcode(item, ffmpegRef.current);
        temp_items = temp_items?.map((i) => {
          return i === item
            ? { ...i, isConverting: false, isConverted: true, url, output }
            : i;
        });
        setItems(temp_items);
      } catch (error) {
        temp_items = temp_items?.map((i) => {
          return i === item
            ? { ...i, isConverting: false, isConverted: false, isError: true }
            : i;
        });
        setItems(temp_items);
        console.log(`Error: ${error}`);
      }
      setIsDone(true);
      setIsConverting(false);
    }
  };

  useEffect(() => {
    if (!items?.length) {
      setIsDone(false);
      setIsReady(false);
      setIsConverting(false);
    } else {
      handleStatus();
    }
  }, [items]);

  //will load the ffmpeg and wasm when the site load
  useEffect(() => {
    load();
  }, []);

  if (items?.length) {
    return (
      <div className="border-1 mt-5 flex w-full flex-col items-center gap-3">
        {items.map((item, index) => {
          return (
            <div
              key={index}
              className="flex w-full flex-col items-center justify-between gap-3 rounded-xl border border-[rgb(0,0,0,0.1)] border-black p-4 dark:border-white sm:flex-row"
            >
              {!isLoaded && <Skeleton className="w-full" />}
              <div className="flex items-center gap-2 w-[30%]">
                <span>{getFileIcon(item.file_name)}</span>
                <span className="font-bold">{cutFileName(item.file_name)}</span>
                <span>({sizeText(item.file_size)})</span>
              </div>

              {item.isError ? (
                <div>
                  <Badge
                    variant="destructive"
                    className="flex items-center gap-2 text-sm"
                  >
                    Error
                    <MdError />
                  </Badge>
                </div>
              ) : item.isConverting ? (
                <div>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-2 text-sm"
                  >
                    Converting
                    <FaSpinner className="animate-spin" />
                  </Badge>
                </div>
              ) : item.isConverted ? (
                <div>
                  <Badge
                    variant="default"
                    className="flex items-center gap-2 text-sm"
                  >
                    Converted
                    <FaCheckCircle />
                  </Badge>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-lg">
                  <span>Convert to:</span>
                  <Select
                    onValueChange={(value) => {
                      if (acceptedFiles["audio/*"].includes(value)) {
                        setDefaultValue("audio");
                      } else if (acceptedFiles["video/*"].includes(value)) {
                        setDefaultValue("video");
                      }
                      handleUpdate(item.file_name, value);
                      setSelected(value);
                    }}
                    value={selected}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder={selected ? selected : "Select format"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="">
                        {item.file_type.split("/").includes("image") ? (
                          <div className="grid grid-cols-2">
                            {acceptedFiles["image/*"].map(
                              (type: string, index: number) => {
                                if (type.includes(item.from)) return "";
                                return (
                                  <SelectItem key={index} value={type}>
                                    {type}
                                  </SelectItem>
                                );
                              },
                            )}
                          </div>
                        ) : item.file_type.split("/").includes("audio") ? (
                          <div>
                            {acceptedFiles["audio/*"].map(
                              (type: string, index: number) => {
                                if (type.includes(item.from)) return "";
                                return (
                                  <SelectItem key={index} value={type}>
                                    {type}
                                  </SelectItem>
                                );
                              },
                            )}
                          </div>
                        ) : item.file_type.split("/").includes("video") ? (
                          <Tabs defaultValue={defaultValue} className="w-full">
                            <TabsList className="w-full">
                              <TabsTrigger value="video">Video</TabsTrigger>
                              <TabsTrigger value="audio">Audio</TabsTrigger>
                            </TabsList>
                            <TabsContent
                              value="video"
                              className="grid grid-cols-2"
                            >
                              {acceptedFiles["video/*"].map(
                                (type: string, index: number) => {
                                  if (type.includes(item.from)) return "";
                                  return (
                                    <SelectItem key={index} value={type}>
                                      {type}
                                    </SelectItem>
                                  );
                                },
                              )}
                            </TabsContent>
                            <TabsContent
                              value="audio"
                              className="grid grid-cols-2"
                            >
                              {acceptedFiles["audio/*"].map(
                                (type: string, index: number) => {
                                  if (type.includes(item.from)) return "";
                                  return (
                                    <SelectItem key={index} value={type}>
                                      {type}
                                    </SelectItem>
                                  );
                                },
                              )}
                            </TabsContent>
                          </Tabs>
                        ) : (
                          ""
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {item.isConverted ? (
                <span
                  className="cursor-pointer"
                  onClick={() => handleDownload(item)}
                >
                  <IoMdDownload size={25} />
                </span>
              ) : (
                <span
                  className="cursor-pointer"
                  onClick={() => handleDelete(item)}
                >
                  <MdDeleteOutline size={25} />
                </span>
              )}
            </div>
          );
        })}
        <div className="mr-3 mt-3 flex w-full items-center justify-end gap-2">
          {isDone ? (
            <div className="flex flex-col items-center gap-2">
              <Button
                onClick={() => {
                  handleMultiDownload();
                }}
                className="w-full"
              >
                {items.length > 1 ? "Donwload All" : "Download"}
              </Button>
              <Button onClick={() => reset()}>Convert another file</Button>
            </div>
          ) : (
            <div>
              <Button
                disabled={isConverting || !isReady}
                onClick={() => convert()}
              >
                {isConverting ? (
                  <div className="flex items-center gap-2">
                    Converting
                    <FaSpinner className="animate-spin" />
                  </div>
                ) : (
                  "Convert"
                )}{" "}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
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
