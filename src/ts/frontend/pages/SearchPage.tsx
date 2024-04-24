import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from "redux";

import "@scss/pages/SearchPage.scss"
import { AuthActionT } from "@store/auth/AuthActions";
import { RootState } from "@store/ConfigureStore";
import SearchApi from "@api/SearchApi";

const SearchPage = () => {
    const [searchInput, setSearchInput] = useState("");
    const [isSearchInputDisabled, setIsSearchInputDisabled] = useState(false)
    const [lastSearchTerm, setlastSearchTerm] = useState("");
    const [foldersLastSearchTerm, setFoldersLastSearchTerm] = useState("");
    const [itemsLastSearchTerm, setItemsLastSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const [includeFolders, setIncludeFolders] = useState(true);
    const [includeItems, setIncludeItems] = useState(true);
    const [showCheckboxError, setShowCheckboxError] = useState(false)

    const [foldersData, setFoldersData] = useState<FolderDataI[] | null>(null);
    const [itemsData, setItemsData] = useState<ItemDataI[] | null>(null);

    const [handleSubmit, setHandleSubmit] = useState(false);

    const dispatch: Dispatch<AuthActionT> = useDispatch();
    const authState = useSelector((state: RootState) => state.authState);

    const fetchData = async () => {
        setIsLoading(true)
        setFoldersData(null)
        setItemsData(null)

        try {
            const response = await SearchApi(dispatch, authState).getAutoCompleteData(searchInput, includeFolders, includeItems);
            if (response && response.status === 200 && response.data.success) {
                if (includeFolders && response.data.results.folders.length > 0) setFoldersData(response.data.results.folders);

                if (includeItems && response.data.results.items.length > 0) setItemsData(response.data.results.items);
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
        setHandleSubmit(false);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();

            if (searchInput && handleSubmit) {
                if (lastSearchTerm !== searchInput) {
                    setlastSearchTerm(searchInput)
                    fetchData();
                }
            }
        }
    };
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

    useEffect(() => {
        const timer = setTimeout(() => {
            searchInput.length > 2 ? setHandleSubmit(true) : setHandleSubmit(false);
        }, 700);

        return () => clearTimeout(timer);
    }, [searchInput]);

    useEffect(() => {
        if (searchInput && handleSubmit) {
            setlastSearchTerm(searchInput)
            fetchData();
        }
    }, [searchInput, handleSubmit]);


    useEffect(() => {
        if (includeFolders && handleSubmit && searchInput
            && (searchInput !== foldersLastSearchTerm)) {
            setFoldersLastSearchTerm(searchInput)
            fetchData();
        }
    }, [includeFolders])

    useEffect(() => {
        if (includeItems && handleSubmit && searchInput
            && (searchInput !== itemsLastSearchTerm)) {
            setItemsLastSearchTerm(searchInput)
            fetchData();
        }
    }, [includeItems])

    useEffect(() => {
        if (!includeFolders && !includeItems) {
            setIsSearchInputDisabled(true)
            setShowCheckboxError(true)
        } else {
            setIsSearchInputDisabled(false)
            setShowCheckboxError(false)
        }
    }, [includeFolders, includeItems])


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
                            name="folders"
                            onChange={(event) => setIncludeFolders(event.target.checked)}
                            checked={includeFolders}
                        />

                    </label>
                    <label htmlFor="items" className={`${showCheckboxError && "error-underline"}`}>
                        Items
                        <input
                            type="checkbox"
                            id="itemsCheckbox"
                            name="items"
                            onChange={(event) => setIncludeItems(event.target.checked)}
                            checked={includeItems}
                        />
                    </label>
                </div>
            </form>
            {showCheckboxError &&
                <div className={"folder-item-error error"}>Must select at least one option.</div>
            }
            <div className="search-results">
                {isLoading ? null : (
                    includeFolders && handleSubmit && (
                        <div className="folder-results">
                            Folder results:
                            {foldersData ? (
                                <ul>
                                    {foldersData.map(elem => (
                                        <li className="li-folder" key={elem.folderId}>{elem.name}</li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="empty">[None]</div>
                            )}
                        </div>
                    )
                )}
                {isLoading ? null : (
                    includeItems && handleSubmit && (
                        <div className="item-results">
                            Item results:
                            {itemsData ? (
                                <ul>
                                    {itemsData.map(elem => (
                                        <li className="li-item" key={elem.itemId}>{elem.name}</li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="empty">[None]</div>
                            )}
                        </div>
                    )
                )}
            </div >
        </div>
    );
}

export default SearchPage;
