import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from "redux";

import { AuthActionT } from "@store/auth/AuthActions";
import { RootState } from "@store/ConfigureStore";
import SearchApi from "@api/SearchApi";

const SearchPage = () => {
    const [searchInput, setSearchInput] = useState("");
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

    useEffect(() => {
        if (searchInput && handleSubmit) {
            const fetchData = async () => {
                const response = await SearchApi(dispatch, authState).getAutoCompleteData(searchInput, includeFolders, includeItems);
                if (response && response.status === 200 && response.data.success) {
                    console.log(`response.data`);
                    console.log(response.data);
                    setData(response.data);
                }
            };
            fetchData();
        }
    }, [searchInput, handleSubmit]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
        setHandleSubmit(false);
    };

    return (
        <>
            <div>This is Search.</div>
            <form onSubmit={(event) => event.preventDefault()}>
                <input
                    type="search"
                    value={searchInput}
                    placeholder="Search..."
                    onChange={handleInputChange}
                />
                <label htmlFor="folders">Folders</label>
                <input
                    type="checkbox"
                    id="foldersCheckbox"
                    name="folders"
                    onChange={(event) => setIncludeFolders(event.target.checked)}
                    checked
                />
                <label htmlFor="items">Items</label>
                <input
                    type="checkbox"
                    id="itemsCheckbox"
                    name="items"
                    onChange={(event) => setIncludeItems(event.target.checked)}
                    checked
                />
            </form>
        </>
    );
}

export default SearchPage;
