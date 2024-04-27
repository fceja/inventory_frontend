import { useEffect, useMemo, useRef, useState } from "react";

import "@scss/pages/SearchPage.scss"
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
    const [checkboxState, setCheckboxState] = useState({
        includeFolders: true,
        includeItems: true
    })
    const [foldersData, setFoldersData] = useState<FolderDataI[] | null>(null);
    const handleSubmitRef = useRef(false);
    const isLoadingRef = useRef(false)
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

    const fetchData = async () => {
        if (!searchInput || !handleSubmitRef.current) return;
        lastSearchTermRef.current = searchInput

        try {
            const response = await SearchApi().getAutoCompleteData(searchInput, checkboxState.includeFolders, checkboxState.includeItems);
            if (response && response.status === 200 && response.data.success) {
                if (checkboxState.includeFolders && response.data.results.folders.length > 0) {
                    setFoldersData(response.data.results.folders)
                }


                if (checkboxState.includeItems && response.data.results.items.length > 0) {
                    setItemsData(response.data.results.items)
                };
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleCheckboxChange = (name: keyof typeof checkboxState) => {
        setCheckboxState(prevState => ({
            ...prevState,
            [name]: !prevState[name]
        }))
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);

        handleSubmitRef.current = false
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();

            if (searchInput && handleSubmitRef.current) {
                if (lastSearchTermRef.current !== searchInput) {
                    lastSearchTermRef.current = searchInput
                    fetchData();
                }
            }
        }
    };

    useEffect(() => {
        if (!searchInput) return;

        const timer = setTimeout(() => {
            if (searchInput.length > 2) {
                handleSubmitRef.current = true
                isLoadingRef.current = true
                fetchData()
                isLoadingRef.current = false
            }
        }, 1000);

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
                {isLoadingRef.current ? null : (
                    checkboxState.includeFolders && handleSubmitRef.current && (
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
                {isLoadingRef.current ? null : (
                    checkboxState.includeItems && handleSubmitRef.current && (
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
