export function getFileExtension(fileName: string) {
    return fileName.split(".").pop();
}

export function removeFileExtension(fileName: string){
    return fileName.split(".").slice(0, -1).join(".")
}