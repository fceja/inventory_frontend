import { useEffect, useState } from 'react';
import { Dispatch } from "redux";
import { useDispatch, useSelector } from 'react-redux';

import { AuthActionT } from "@store/auth/AuthActions";
import { FolderActionT } from "@store/folder/FolderActions";
import { RootState } from "@store/ConfigureStore";
import FoldersApi from "@api/FoldersApi"

interface statsDataI {
    folderTotal: number | null
    itemTotal: number | null
    quantityTotal: number | null
    priceTotal: number | null
}

const FolderStats = () => {
    const dispatch: Dispatch<AuthActionT | FolderActionT> = useDispatch();
    const authState = useSelector((state: RootState) => state.authState);
    const folderState = useSelector((state: RootState) => state.folderState);
    const [statsData, setStatsData] = useState<statsDataI>(
        { folderTotal: null, itemTotal: null, quantityTotal: null, priceTotal: null }
    )

    useEffect(() => {
        const fetchData = async () => {
            if (!folderState.curLevelFolderId) return;

            const response = await FoldersApi(dispatch, authState).getAggregatedDataByFolderId(folderState.curLevelFolderId);
            if (response && response.status === 200 && response.data.success) {
                setStatsData(response.data.folder)
            }
        }
        fetchData();
    }, [folderState.curLevelFolderId]);

    return (
        <div className="folder-stats">
            {statsData &&
                <>
                    <label className="folder-stats-count">Folder Total: {statsData.folderTotal}</label>
                    <label className="folder-stats-items-count">Item Total: {statsData.itemTotal}</label>
                    <label className="folder-stats-items-quantity">Quantity Total: {statsData.quantityTotal}</label>
                    <label className="folder-stats-total-value">Value Total: ${statsData.priceTotal}</label>
                </>
            }
        </div >
    )
}

export default FolderStats