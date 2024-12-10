export interface Entry{
    message: string;
    author: string;
    id: string;
    image: string | null
}

export interface  EntryWithoutId {
    message:string,
    author:string,
    image: string | null,
}