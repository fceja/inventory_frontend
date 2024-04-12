import { useEffect } from "react"

import "@scss/pages/FolderPage.scss"
import FolderNavigation from "@components/folderNavigation/FolderNavigation"
import FolderStats from "@components/folderStats/FolderStats"
import FolderNodes from "@components/folderNodes/FolderNodes"

const FolderPage = () => {
    useEffect(() => {
        // if browser url path {folderId} is '0', update to 'main'
        if (window.location.pathname.split('/folders/')[1] === '0') {
            const newURL = window.location.pathname.replace('/folders/0', '/folders/main');
            window.history.pushState({}, '', newURL);
        }

    }, [])

    return (
        <div className="folder-content">
            <FolderNavigation />
            <FolderStats />
            <FolderNodes />
        </div>
    )
}

export default FolderPage