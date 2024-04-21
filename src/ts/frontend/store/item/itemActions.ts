export const SET_SELECTED_ITEM_ID = "SET_SELECTED_ITEM_ID"

interface SetSelectedItemIdAction {
    type: typeof SET_SELECTED_ITEM_ID;
    payload: { selectedItemId: number | null }
}

export type ItemActionT = SetSelectedItemIdAction

export const setSelectedItemId = (itemId: number | null): ItemActionT => {
    return {
        type: SET_SELECTED_ITEM_ID,
        payload: { selectedItemId: itemId }
    }
}