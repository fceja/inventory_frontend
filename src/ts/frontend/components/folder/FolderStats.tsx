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
    valueTotal: number | null
}

const FolderStats = () => {
    const dispatch: Dispatch<AuthActionT | FolderActionT> = useDispatch();
    const authState = useSelector((state: RootState) => state.authState);
    const { folderId } = useSelector((state: RootState) => state.folderState);

    const [statsData, setStatsData] = useState<statsDataI>(
        { folderTotal: null, itemTotal: null, quantityTotal: null, valueTotal: null }
    )

    useEffect(() => {
        if (folderId === null || !(folderId >= 0)) return;

        const fetchData = async () => {
            const response = await FoldersApi(dispatch, authState).getAggregatedDataByFolderId(folderId);
            if (response && response.status === 200 && response.data.success) {
                setStatsData(response.data.folder)
            }
        }
        fetchData();
    }, [folderId]);

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