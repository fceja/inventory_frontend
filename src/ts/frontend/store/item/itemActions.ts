export const SET_SELECTED_ITEM_ID = "SET_SELECTED_ITEM_ID"

interface SetSelectedItemIdAction {
    type: typeof SET_SELECTED_ITEM_ID;
    payload: { selectedItemId: string | null }
}

export type ItemActionT = SetSelectedItemIdAction


export const setSelectedItemId = (itemId: string | null): SetSelectedItemIdAction => {
    return {
        type: SET_SELECTED_ITEM_ID,
        payload: { selectedItemId: itemId }
    }
}