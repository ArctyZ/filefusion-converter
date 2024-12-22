/* eslint-disable @typescript-eslint/no-explicit-any */
import { Items } from "@/types/Items";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { getFileExtension, removeFileExtension } from "./fileExtension";


export async function transcode(items: Items, ffmpeg: FFmpeg): Promise<any> {
    const {file_name, file_type, file, to} = items;
    const input = getFileExtension(file_name);
    const output = removeFileExtension(file_name) + "." + to;
    await ffmpeg.writeFile(input as string, await fetchFile(file));
    await ffmpeg.exec(["-i", input as string, output as string]);
    const data = await ffmpeg.readFile(output as string);
    const url = URL.createObjectURL(new Blob([data], {type: file_type}));
    return {url, output}

}





