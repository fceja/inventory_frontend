import { useState } from "react"

import "@scss/pages/FolderPage.scss"
import FolderAddNodes from "@components/folder/FolderAddNodes"
import FolderContentFetchData from "@components/folder/FolderContentFetchData"
import FolderNavigation from "@components/folder/FolderNavigation"
import FolderNodes from "@components/folder/FolderNodes"
import FolderStats from "@components/folder/FolderStats"
import NotFoundPage from "@pages/NotFoundPage";

const FolderContentPage = () => {
    const [folderContentResults, setFolderContentResults] = useState<{
        folder: any | null,
        folderNodes: any[] | null
    }>({
        folder: null,
        folderNodes: null
    })

    const handleDataReceived = ({ folder, folderNodes }: { folder: any | null, folderNodes: any[] | null }) => {
        setFolderContentResults({ folder: folder, folderNodes: folderNodes });
    };

    return (
        <>
            <FolderContentFetchData onDataReceived={handleDataReceived} />

            {!folderContentResults.folder ?
                <NotFoundPage />
                :
                <div className="folder-page">

                    <FolderNavigation />
                    <FolderStats />
                    <FolderNodes nodeData={folderContentResults} />
                    <FolderAddNodes />
                </div>
            }
        </>
    )
}

export default FolderContentPage
