import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from "redux";

import "@scss/components/mainFolderPage/SubFolderNode.scss"
import { RootState } from "@store/ConfigureStore";
import { PAGE_PATHS } from "@common/Constants"
import { setSelectedFolderId, setSelectedFolderName, FolderActionT } from "@store/folder/FolderActions";
import FolderModal from "@components/_modals/folder/FolderModal"
import { SubFolderModelI } from "@common/Models"
import { setIsFolderModalOpen, ModalActionT } from "@store/modal/ModalActions";

interface PropsI {
    subFolderData: SubFolderModelI
}

const SubFolderNode: React.FC<PropsI> = (props) => {
    const { subFolderData } = props
    const dispatch: Dispatch<FolderActionT | ModalActionT> = useDispatch();
    const { isFolderModalOpen } = useSelector((state: RootState) => state.modalState);

    const handleInfoClick = () => {
        dispatch(setSelectedFolderId(subFolderData.folderId))
        dispatch(setSelectedFolderName(subFolderData.name))
        dispatch(setIsFolderModalOpen(true))
    }

    return (
        <div className="folder-node">
            < Link to={`${PAGE_PATHS.MAIN_FOLDERS.replace(':folderId', `${subFolderData.folderId}`)}`} >
                <div className='img-container'>
                    <img src="/src/assets/icons/svg/folder-solid.svg" />
                </div>
                <div className="folder-info">
                    <div>{`${subFolderData.name} ${subFolderData.nodeType}`}</div>
                </div>
            </ Link >
            <div className="info-container">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    onClick={handleInfoClick}
                >
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                </svg>
            </div>
            {isFolderModalOpen &&
                <FolderModal />
            }
        </div >
    )
}
export default SubFolderNode
