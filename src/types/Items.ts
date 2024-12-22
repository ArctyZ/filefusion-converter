/* eslint-disable @typescript-eslint/no-explicit-any */
export type Items = {
    file: any;
    file_name: string;
    file_size: number;
    from: string;
    to:string | null;
    file_type:string;
    isConverting: boolean;
    isConverted: boolean;
    isError: boolean;
    url?: string;
    output?: any;
}