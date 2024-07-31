import { Link } from "react-router-dom";

import "@scss/components/mainFolderPage/SubFolderNode.scss"
import { PAGE_PATHS } from "@common/Constants"
import { SubFolderModelI } from "@common/Models"

interface PropsI {
    subFolderData: SubFolderModelI
}

const SubFolderNode: React.FC<PropsI> = (props) => {
    const { subFolderData } = props

    return (
        <Link to={`${PAGE_PATHS.MAIN_FOLDERS.replace(':folderId', `${subFolderData.folderId}`)}`} >
            <div className={"folder-node"}>{`${subFolderData.name} ${subFolderData.nodeType}`}</div>
        </Link>
    )
}
export default SubFolderNode