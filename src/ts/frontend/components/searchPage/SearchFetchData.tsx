import { useEffect, useRef, useState } from "react";

import { FolderModelI, ItemModelI } from "@common/Models"
import SearchApi from "@api/SearchApi";

interface Props {
    onDataReceived: (data: { folders: FolderModelI[], items: ItemModelI[] }) => void;
}

const SearchFetchData: React.FC<Props> = ({ onDataReceived }) => {
    const [checkboxState, setCheckboxState] = useState({
        includeFolders: true,
        includeItems: true
    })
    const [handleSubmit, setHandleSubmit] = useState(false);
    const isSearchInputDisabled = !checkboxState.includeFolders && !checkboxState.includeItems;
    const lastSearchTermRef = useRef("");
    const [searchTerm, setSearchInput] = useState("");
    const showCheckboxError = isSearchInputDisabled;

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

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();

            if (searchTerm && handleSubmit) {
                if (lastSearchTermRef.current !== searchTerm) {
                    lastSearchTermRef.current = searchTerm
                    setHandleSubmit(true)
                }
            }
        }
    };

    useEffect(() => {
        if (!searchTerm || !handleSubmit) return;
        lastSearchTermRef.current = searchTerm;

        try {
            const fetchData = async () => {
                const response = await SearchApi().getAutoCompleteData(searchTerm, checkboxState.includeFolders, checkboxState.includeItems);
                if (response && response.status === 200 && response.data.success) {
                    onDataReceived(response.data.results)
                }
            }
            fetchData();
        } catch (error) { console.error(error) }
        finally { setHandleSubmit(false) }

    }, [searchTerm, handleSubmit])

    useEffect(() => {
        if (!searchTerm) return;

        const timer = setTimeout(() => {
            if (searchTerm.length > 2) {
                setHandleSubmit(true)
            }
        }, 750);

        return () => clearTimeout(timer);
    }, [searchTerm]);


    return (
        <>
            <form onSubmit={(event) => event.preventDefault()}>
                <input
                    type="search"
                    value={searchTerm}
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
        </>
    )
}

export default SearchFetchData