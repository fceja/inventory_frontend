import { useEffect, useState } from 'react';
import FoldersApi from "@api/FoldersApi"

interface statsDataI {
    folderTotal: number | null
    itemTotal: number | null
    quantityTotal: number | null
    valueTotal: number | null
}

interface PropsI {
    folderId: number
}

const FolderStats: React.FC<PropsI> = (props) => {
    const { folderId } = props;

    const [statsData, setStatsData] = useState<statsDataI>(
        { folderTotal: null, itemTotal: null, quantityTotal: null, valueTotal: null }
    )

    useEffect(() => {
        const fetchData = async () => {
            if (folderId === null || !(folderId >= 0)) return;

            const response = await FoldersApi().getAggregatedDataByFolderId(folderId);
            if (response && response.status === 200 && response.data.success) {
                setStatsData(response.data.folder)
            }
        }
        fetchData()
    }, [folderId])

    return (
        <div className="folder-stats">
            {statsData &&
                <>
                    <label className="folder-stats-count">Folder Total: {statsData.folderTotal}</label>
                    <label className="folder-stats-items-count">Item Total: {statsData.itemTotal}</label>
                    <label className="folder-stats-items-quantity">Quantity Total: {statsData.quantityTotal}</label>
                    <label className="folder-stats-total-value">Value Total: ${statsData.valueTotal}</label>
                </>
            }
        </div >
    )
}

export default FolderStats