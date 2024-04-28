import "@scss/components/modals/FolderModal.scss"
import Modal from "@components/modals/Modal";
import Folder from "@components/folder/Folder"

const FolderModal = () => {
    return (
        <Modal className="folder-modal" isOpen={true}>
            <Folder />
        </Modal>
    );
};

export default FolderModal;
