export const SET_IS_ITEM_MODAL_OPEN = "SET_IS_ITEM_MODAL_OPEN"
export const SET_IS_LOGIN_MODAL_OPEN = "SET_IS_LOGIN_MODAL_OPEN"

interface SetIsItemModalOpenAction {
    type: typeof SET_IS_ITEM_MODAL_OPEN;
    payload: { isItemModalOpen: boolean }
}

interface SetIsLoginModalOpenAction {
    type: typeof SET_IS_LOGIN_MODAL_OPEN;
    payload: { isLoginModalOpen: boolean }
}

export type ModalActionT = SetIsItemModalOpenAction | SetIsLoginModalOpenAction

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