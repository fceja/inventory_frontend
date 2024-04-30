import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from "redux";

import "@scss/pages/SearchPage.scss"
import { RootState } from "@store/ConfigureStore";
import { setSelectedFolderId, setSelectedFolderName, FolderActionT } from "@store/folder/FolderActions";
import FolderModal from "@components/modals/FolderModal"
import { setSelectedItemId, ItemActionT } from "@store/item/ItemActions";
import ItemModal from "@components/modals/ItemModal"
import Loading from "@common/components/Loading"
import { setIsFolderModalOpen, setIsItemModalOpen, ModalActionT } from "@store/modal/ModalActions";
import SearchApi from "@api/SearchApi";

interface FolderDataI {
    folderId: number,
    name: string,
    nodeType: string;
}

interface ItemDataI {
    itemId: string,
    name: string,
    nodeType: string;
}

const SearchPage = () => {
    const dispatch: Dispatch<FolderActionT | ItemActionT | ModalActionT> = useDispatch();
    const { isFolderModalOpen, isItemModalOpen } = useSelector((state: RootState) => state.modalState);

    const [checkboxState, setCheckboxState] = useState({
        includeFolders: true,
        includeItems: true
    })
    const [foldersData, setFoldersData] = useState<FolderDataI[] | null>(null);
    const [handleSubmit, setHandleSubmit] = useState(false);
    const [isComplete, setIsComplete] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [itemsData, setItemsData] = useState<ItemDataI[] | null>(null);
    const lastSearchTermRef = useRef("");
    const [searchInput, setSearchInput] = useState("");

    const memoizedState = useMemo(() => {
        if (!checkboxState.includeFolders && !checkboxState.includeItems) {
            return {
                isSearchInputDisabled: true,
                showCheckboxError: true
            };
        } else {
            return {
                isSearchInputDisabled: false,
                showCheckboxError: false
            };
        }
    }, [checkboxState]);
    const { isSearchInputDisabled, showCheckboxError } = memoizedState;

    const handleCheckboxChange = (name: keyof typeof checkboxState) => {
        setCheckboxState(prevState => ({
            ...prevState,
            [name]: !prevState[name]
        }))
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);

        setHandleSubmit(false)
    };

    const handleFolderClick = (folderId: number, name: string) => {
        dispatch(setSelectedFolderId(folderId))
        dispatch(setSelectedFolderName(name))
        dispatch(setIsFolderModalOpen(true))
    }

    const handleItemClick = (itemId: string) => {
        dispatch(setSelectedItemId(itemId))
        dispatch(setIsItemModalOpen(true))
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();

            if (searchInput && handleSubmit) {
                if (lastSearchTermRef.current !== searchInput) {
                    lastSearchTermRef.current = searchInput
                    setHandleSubmit(true)
                }
            }
        }
    };

    useEffect(() => {
        // handles data fetching
        if (!searchInput || !handleSubmit) return;

        lastSearchTermRef.current = searchInput

        try {
            const fetchData = async () => {
                setIsComplete(false)
                setFoldersData(null)
                setIsLoading(true)
                const response = await SearchApi().getAutoCompleteData(searchInput, checkboxState.includeFolders, checkboxState.includeItems);
                if (response && response.status === 200 && response.data.success) {
                    if (checkboxState.includeFolders && response.data.results.folders.length > 0) {
                        setFoldersData(response.data.results.folders)
                    }

                    if (checkboxState.includeItems && response.data.results.items.length > 0) {
                        setItemsData(response.data.results.items)
                    };

                    setIsComplete(true)
                }
            }
            fetchData();

        } catch (error) {
            console.error(error)
        } finally { setIsLoading(false) }

    }, [handleSubmit])

    useEffect(() => {
        // triggers data fetch if 3 or more characters entered
        if (!searchInput) return;

        const timer = setTimeout(() => {
            if (searchInput.length > 2) {
                setHandleSubmit(true)
            }
        }, 750);

        return () => clearTimeout(timer);
    }, [searchInput]);

    return (
        <div className="search-page">
            <form onSubmit={(event) => event.preventDefault()}>
                <input
                    type="search"
                    value={searchInput}
                    id={"search-input"}
                    placeholder="Search..."
                    onChange={(event) => handleInputChange(event)}
                    onKeyDown={(event) => handleKeyPress(event)}
                    disabled={isSearchInputDisabled}
                />
                <div className="checkboxes">
                    <label htmlFor={"folders"} className={`${showCheckboxError && "error-underline"}`}>
                        Folders
                        <input
                            type="checkbox"
                            id="foldersCheckbox"
                            name="includeFolders"
                            onChange={() => handleCheckboxChange("includeFolders")}
                            checked={checkboxState.includeFolders}
                        />
                    </label>
                    <label htmlFor="items" className={`${showCheckboxError && "error-underline"}`}>
                        Items
                        <input
                            type="checkbox"
                            id="itemsCheckbox"
                            name="includeItems"
                            onChange={() => handleCheckboxChange("includeItems")}
                            checked={checkboxState.includeItems}
                        />
                    </label>
                </div>
            </form>
            {showCheckboxError &&
                <div className={"folder-item-error error"}>Must select at least one option.</div>
            }
            <div className="search-results">
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        {checkboxState.includeFolders && handleSubmit && isComplete && (
                            <div className="folder-results">
                                Folder results:
                                {!foldersData ? (
                                    <div className="empty">[None]</div>
                                ) : (
                                    <ul>
                                        {foldersData.map((elem) => (
                                            <li
                                                className="li-folder"
                                                key={elem.folderId}
                                                onClick={() => handleFolderClick(elem.folderId, elem.name)}
                                            >
                                                {elem.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                        {checkboxState.includeItems && handleSubmit && isComplete && (
                            <div className="item-results">
                                Item results:
                                {!itemsData ? (
                                    <div className="empty">[None]</div>
                                ) : (
                                    <ul>
                                        {itemsData.map((elem) => (
                                            <li
                                                className="li-item"
                                                key={`li-item-${elem.itemId}`}
                                                onClick={() => handleItemClick(elem.itemId)}
                                            >
                                                {elem.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                        {isItemModalOpen &&
                            <ItemModal />
                        }
                        {isFolderModalOpen &&
                            <FolderModal />
                        }
                    </>
                )}
            </div>
        </div>
    );

}

export default SearchPage;
