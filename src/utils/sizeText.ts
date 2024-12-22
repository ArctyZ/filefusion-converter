export function sizeText(size: number) {
    if (size > 1000000) {
        return `${(size / 1000000).toFixed(1)} MB`
    } else if (size > 1000) {
        return `${(size / 1000).toFixed(1)} KB`
    } else if (size === 0) {
        return `${size} Byte`
    } else{
        return `${size} Bytes`
    }
}