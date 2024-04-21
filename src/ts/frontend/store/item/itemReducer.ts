import {
    SET_SELECTED_ITEM_ID,
    ItemActionT
} from "@store/item/ItemActions"

const initialState = {
    selectedItemId: null
}

const itemReducer = (state = initialState, action: ItemActionT) => {
    switch (action.type) {
        case SET_SELECTED_ITEM_ID:
            return {
                ...state,
                selectedItemId: action.payload.selectedItemId
            }
        default:
            return state;
    }
}

export default itemReducer