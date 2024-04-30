export const SET_IS_ADD_ITEM_MODAL_OPEN = "SET_IS_ADD_ITEM_MODAL_OPEN"
export const SET_IS_ITEM_MODAL_OPEN = "SET_IS_ITEM_MODAL_OPEN"
export const SET_IS_LOGIN_MODAL_OPEN = "SET_IS_LOGIN_MODAL_OPEN"

interface SetIsAddItemModalOpenAction {
    type: typeof SET_IS_ADD_ITEM_MODAL_OPEN;
    payload: { isAddItemModalOpen: boolean }
}

interface SetIsItemModalOpenAction {
    type: typeof SET_IS_ITEM_MODAL_OPEN;
    payload: { isItemModalOpen: boolean }
}

interface SetIsLoginModalOpenAction {
    type: typeof SET_IS_LOGIN_MODAL_OPEN;
    payload: { isLoginModalOpen: boolean }
}

export type ModalActionT = SetIsAddItemModalOpenAction | SetIsItemModalOpenAction | SetIsLoginModalOpenAction

export const setIsAddItemModalOpen = (open: boolean): ModalActionT => {
    return {
        type: SET_IS_ADD_ITEM_MODAL_OPEN,
        payload: { isAddItemModalOpen: open }
    }
}

export const setIsItemModalOpen = (open: boolean): ModalActionT => {
    return {
        type: SET_IS_ITEM_MODAL_OPEN,
        payload: { isItemModalOpen: open }
    }
}

export const setIsLoginModalOpen = (open: boolean): ModalActionT => {
    return {
        type: SET_IS_LOGIN_MODAL_OPEN,
        payload: { isLoginModalOpen: open }
    }
}