import { useEffect, useState } from "react"
// import { useSelector } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { RootState } from "@store/ConfigureStore";
import { setSelectedFolderId, setSelectedFolderName, FolderActionT } from "@store/folder/FolderActions";
import FoldersApi from "@api/FoldersApi"

interface statsDataI {
    folderTotal: number | null
    itemTotal: number | null
    quantityTotal: number | null
    valueTotal: number | null
}

const Folder = () => {
    const dispatch: Dispatch<FolderActionT> = useDispatch();
    const { selectedFolderId, selectedFolderName } = useSelector((state: RootState) => state.folderState);

    const [statsData, setStatsData] = useState<statsDataI>(
        { folderTotal: null, itemTotal: null, quantityTotal: null, valueTotal: null }
    )

    const handleClose = () => {
        dispatch(setSelectedFolderId(null))
        dispatch(setSelectedFolderName(null))
    }

    useEffect(() => {
        const fetchData = async () => {
            if (selectedFolderId === null || selectedFolderId === undefined || !(selectedFolderId >= 0)) return;

            const response = await FoldersApi().getAggregatedDataByFolderId(selectedFolderId);
            if (response && response.status === 200 && response.data.success) {
                setStatsData(response.data.folder)
            }
        }
        fetchData()
    }, [selectedFolderId])

    return (
        <div className="folder-container">
            <div className="folder-header">
                <div
                    onClick={handleClose}
                    className="folder-close"
                >
                    <div className="folder-close-bar"></div>
                    <div className="folder-close-bar"></div>
                </div>
            </div>
            <span>Folder Info</span>
            <div className="folder-details">
                {statsData &&
                    <>
                        <label className="folder-name">Name: {selectedFolderName}</label>
                        <label className="folder-count">Sub-folders: {statsData.folderTotal}</label>
                    </>
                }
            </div>
            <span>Item Info</span>
            <div className="folder-item-details">
                {statsData &&
                    <>
                        <label className="folder-items-count">Item Total: {statsData.itemTotal}</label>
                        <label className="folder-items-quantity">Quantity Total: {statsData.quantityTotal}</label>
                        <label className="folder-total-value">Value Total: ${statsData.valueTotal}</label>
                    </>
                }
            </div>
            <div className="btn-edit">
                <button>Edit</button>
            </div>
        </div>
    )
}
export default Folder