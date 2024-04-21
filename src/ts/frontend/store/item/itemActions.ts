export const SET_SELECTED_ITEM_ID = "SET_SELECTED_ITEM_ID"

interface SetSelectedItemIdAction {
    type: typeof SET_SELECTED_ITEM_ID;
    payload: { selectedItemId: number }
}

export type ItemActionT = SetSelectedItemIdAction

export const setSelectedItemId = (itemId: number): ItemActionT => {
    return {
        type: SET_SELECTED_ITEM_ID,
        payload: { selectedItemId: itemId }
    }
}