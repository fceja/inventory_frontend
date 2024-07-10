import { useEffect, useRef, useState } from "react";

interface SearchFormI {
    onSearch: (data: any) => void
}

const SearchForm = (props: SearchFormI) => {
    const { onSearch } = props
    const [handleSubmit, setHandleSubmit] = useState(false);
    const lastSearchTermRef = useRef("");
    const [searchQuery, setSearchQuery] = useState({
        query: "",
        includeFolders: true,
        includeItems: true,
    });
    const isSearchInputDisabled = !searchQuery.includeFolders && !searchQuery.includeItems;
    const showCheckboxError = isSearchInputDisabled;

    useEffect(() => {
        if (!searchQuery) return;

        const timer = setTimeout(() => {
            if (searchQuery.query.length > 2) { onSearch(searchQuery) }
        }, 750);

        return () => clearTimeout(timer);

    }, [searchQuery]);

    const handleCheckboxChange = (name: keyof typeof searchQuery) => {
        setSearchQuery(prevState => ({
            ...prevState,
            [name]: !prevState[name]
        }));
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(prevState => ({
            ...prevState,
            query: event.target.value
        }));

        setHandleSubmit(false)
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();

            if (searchQuery && handleSubmit) {
                if (lastSearchTermRef.current !== searchQuery.query) {
                    lastSearchTermRef.current = searchQuery.query
                    setHandleSubmit(true)
                }
            }
        }
    };

    return (
        <>
            <form onSubmit={(event) => event.preventDefault()}>
                <input
                    type="search"
                    value={searchQuery.query}
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
                            checked={searchQuery.includeFolders}
                        />
                    </label>
                    <label htmlFor="items" className={`${showCheckboxError && "error-underline"}`}>
                        Items
                        <input
                            type="checkbox"
                            id="itemsCheckbox"
                            name="includeItems"
                            onChange={() => handleCheckboxChange("includeItems")}
                            checked={searchQuery.includeItems}
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

export default SearchForm