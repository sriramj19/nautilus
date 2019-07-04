export class Folder {
    name: string;
    contents?: Folder[];
}

export class FolderNode {
    data: Folder;
    previous: Folder;
}