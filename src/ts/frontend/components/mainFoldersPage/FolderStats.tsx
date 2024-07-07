import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from "@store/ConfigureStore";
import FoldersApi from "@api/FoldersApi"

interface statsDataI {
    folderTotal: number | null
    itemTotal: number | null
    quantityTotal: number | null
    valueTotal: number | null
}

const FolderStats = React.memo(() => {
    const { folderId } = useSelector((state: RootState) => state.folderState);

    const [statsData, setStatsData] = useState<statsDataI>(
        { folderTotal: null, itemTotal: null, quantityTotal: null, valueTotal: null }
    )

    useEffect(() => {
        const fetchData = async () => {
            if (folderId === null || folderId === undefined || !(folderId >= 0)) return;

            const response = await FoldersApi().getAggregatedDataByFolderId(folderId);
            if (response && response.status === 200 && response.data.success) {
                setStatsData(response.data.folder)
            }
        }
        fetchData()
    }, [folderId])

    return (
        <>
            {statsData &&
                <div className="folder-stats">
                    <label className="folder-stats-count">Folder Total: {statsData.folderTotal}</label>
                    <label className="folder-stats-items-count">Item Total: {statsData.itemTotal}</label>
                    <label className="folder-stats-items-quantity">Quantity Total: {statsData.quantityTotal}</label>
                    <label className="folder-stats-total-value">Value Total: ${statsData.valueTotal}</label>
                </div >
            }
        </>
    )
})

export default FolderStats