import { useEffect, useState } from "react";

const SearchPage = () => {
    const [searchInput, setSearchInput] = useState("")
    const [includeFolders, setIncludeFolders] = useState(false)
    const [includeItems, setIncludeItems] = useState(false)

    useEffect(() => {
        if (searchInput.length > 2) handleSubmit()

    }, [searchInput])

    const handleSubmit = () => {
        console.log('submitting')
        console.log(searchInput)
        console.log(includeFolders)
        console.log(includeItems)
    }

    return (
        <>
            <div>This is Search.</div>
            {/* <form onSubmit={handleSubmit}> */}
            <form onSubmit={(event) => event.preventDefault()}>
                <input
                    type="search"
                    value={searchInput}
                    placeholder="Search..."
                    onChange={(event) => setSearchInput(event.target.value)}
                />
                <label htmlFor="folders">Folders</label>
                <input
                    type="checkbox"
                    id="foldersCheckbox"
                    name="folders"
                    onChange={(event) => setIncludeFolders(event.target.checked)}
                />
                <label htmlFor="items">Items</label>
                <input
                    type="checkbox"
                    id="itemsCheckbox"
                    name="items"
                    onChange={(event) => setIncludeItems(event.target.checked)}
                />
            </form>
        </>
    )
}

export default SearchPage