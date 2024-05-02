export interface FolderModelI {
    folderId: number,
    name: string,
    nodeType?: string;
    parentFolderId: number | null;
    level: number;

}

export interface SubFolderModelI {
    folderId: number,
    name: string,
    nodeType: string;
}

export interface ItemModelI {
    itemId: string,
    name: string,
    nodeType: string;
}