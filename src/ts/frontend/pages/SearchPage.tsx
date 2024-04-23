import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from "redux";

import "@scss/pages/SearchPage.scss"
import { AuthActionT } from "@store/auth/AuthActions";
import { RootState } from "@store/ConfigureStore";
import SearchApi from "@api/SearchApi";

const SearchPage = () => {
    const [searchInput, setSearchInput] = useState("");
    const [lastSearchTerm, setlastSearchTerm] = useState("");
    const [includeFolders, setIncludeFolders] = useState(true);
    const [includeItems, setIncludeItems] = useState(true);
    const [handleSubmit, setHandleSubmit] = useState(false);
    const [data, setData] = useState(null);

    const dispatch: Dispatch<AuthActionT> = useDispatch();
    const authState = useSelector((state: RootState) => state.authState);

    useEffect(() => {
        const timer = setTimeout(() => {
            searchInput.length > 2 ? setHandleSubmit(true) : setHandleSubmit(false);
        }, 700);

        return () => clearTimeout(timer);
    }, [searchInput]);

    const fetchData = async () => {
        const response = await SearchApi(dispatch, authState).getAutoCompleteData(searchInput, includeFolders, includeItems);
        if (response && response.status === 200 && response.data.success) {
            setData(response.data);
        }
    };

    useEffect(() => {
        if (searchInput && handleSubmit) {
            setlastSearchTerm(searchInput)
            fetchData();
        }
    }, [searchInput, handleSubmit]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
        setHandleSubmit(false);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            console.log('triggered')
            event.preventDefault();

            if (searchInput && handleSubmit) {
                if (lastSearchTerm !== searchInput) {
                    setlastSearchTerm(searchInput)
                    fetchData();
                }
            }
        }
    };

    return (
        <div className="search-content">
            <form onSubmit={(event) => event.preventDefault()}>

                <input
                    type="search"
                    value={searchInput}
                    placeholder="Search..."
                    onChange={(event) => handleInputChange(event)}
                    onKeyDown={(event) => handleKeyPress(event)}
                />
                <div className="folders-checkbox">
                    <label htmlFor="folders">Folders</label>
                    <input
                        type="checkbox"
                        id="foldersCheckbox"
                        name="folders"
                        onChange={(event) => setIncludeFolders(event.target.checked)}
                        checked={includeFolders}
                    />
                </div>
                <div className="items-checkbox">
                    <label htmlFor="items">Items</label>
                    <input
                        type="checkbox"
                        id="itemsCheckbox"
                        name="items"
                        onChange={(event) => setIncludeItems(event.target.checked)}
                        checked={includeItems}
                    />
                </div>
            </form>
        </div>
    );
}

export default SearchPage;
