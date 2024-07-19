import { useEffect, useRef, useState } from "react";

import "@scss/components/searchPage/SearchForm.scss";

export type SearchFormT = {
    searchQuery: string
    includeFolders: boolean
    includeItems: boolean
}

interface SearchFormI {
    onFormSubmit: (searchFormData: SearchFormT) => void
}

const SearchForm = (props: SearchFormI) => {
    const { onFormSubmit } = props
    const [formData, setFormData] = useState<SearchFormT>({
        searchQuery: "",
        includeFolders: true,
        includeItems: true,
    });
    const [handleSubmit, setHandleSubmit] = useState(false);
    const lastSearchQueryRef = useRef("");
    const isSearchInputDisabled = !formData.includeFolders && !formData.includeItems;
    const showCheckboxError = isSearchInputDisabled;

    useEffect(() => {
        if (!formData) return;

        const timer = setTimeout(() => {
            if (formData.searchQuery.length > 2) { onFormSubmit(formData) }
        }, 750);

        return () => clearTimeout(timer);

    }, [formData]);

    const handleCheckboxChange = (name: keyof typeof formData) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: !prevState[name]
        }));
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevState => ({
            ...prevState,
            searchQuery: event.target.value
        }));

        setHandleSubmit(false)
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();

            if (formData && handleSubmit) {
                if (lastSearchQueryRef.current !== formData.searchQuery) {
                    lastSearchQueryRef.current = formData.searchQuery
                    setHandleSubmit(true)
                }
            }
        }
    };

    return (
        <>
            <form className="search-form" onSubmit={(event) => event.preventDefault()}>
                <input
                    type="search"
                    value={formData.searchQuery}
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
                            checked={formData.includeFolders}
                        />
                    </label>
                    <label htmlFor="items" className={`${showCheckboxError && "error-underline"}`}>
                        Items
                        <input
                            type="checkbox"
                            id="itemsCheckbox"
                            name="includeItems"
                            onChange={() => handleCheckboxChange("includeItems")}
                            checked={formData.includeItems}
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