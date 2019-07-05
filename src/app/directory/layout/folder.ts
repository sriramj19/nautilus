export class Folder {
    name: string;
    contents?: Folder[];
    id: number;
}

export class FolderNode {
    data: Folder;
    previous: Folder;
}