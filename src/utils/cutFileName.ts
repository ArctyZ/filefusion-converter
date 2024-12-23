
export function cutFileName(fileName: string) {
    const maxString = 15;
    
    const nameSplitted = fileName.split('.');
    const name = nameSplitted[0];
    const extension = nameSplitted[1];
    // const randomString = randStr(maxString - name.length)
    
    
    if (name.length > maxString) return name.substring(0, 5) + '...' + name.substring(name.length - 5, maxString) + '.' + extension;
    else if (name.length < maxString) return name  + '.' + extension;
}



function randStr(length : number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
      counter += 1;
    }
    return result;
}