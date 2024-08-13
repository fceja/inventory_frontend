import { useEffect, useState } from "react"
import { useSelector } from 'react-redux';

import "@scss/components/_modals/FolderNodeModal.scss"
import { RootState } from "@store/ConfigureStore";
import FoldersApi from "@api/FoldersApi"

interface statsDataI {
    folderTotal: number | null
    itemTotal: number | null
    quantityTotal: number | null
    valueTotal: number | null
}

const FolderNodeModal = () => {
    const { selectedFolderId, selectedFolderName } = useSelector((state: RootState) => state.folderState);
    const [statsData, setStatsData] = useState<statsDataI>({
        folderTotal: null,
        itemTotal: null,
        quantityTotal: null,
        valueTotal: null
    })

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
            <div className="folder-title">Folder Info</div>
            <div className="folder-node-info">
                <div className="folder-details">
                    {statsData &&
                        <>
                            <div className="folder-name">Name: {selectedFolderName}</div>
                            <div className="folder-count">Subfolders: {statsData.folderTotal}</div>
                        </>
                    }
                </div>
            </div>
            <div className="item-title">Item Info</div>
            <div className="item-node-info">
                <div className="folder-item-details">
                    {statsData &&
                        <>
                            <div className="folder-items-count">Subitem total: {statsData.itemTotal}</div>
                            <div className="folder-items-quantity">Aggregated Qnty total: {statsData.quantityTotal}</div>
                            <div className="folder-total-value">Aggregated value total: ${statsData.valueTotal}</div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
export default FolderNodeModal