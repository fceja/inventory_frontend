import {
    SET_IS_ITEM_MODAL_OPEN,
    SET_IS_LOGIN_MODAL_OPEN,
    ModalActionT
} from "@store/modal/ModalActions"

const initialState = {
    isItemModalOpen: false,
    isLoginModalOpen: true
}

const modalReducer = (state = initialState, action: ModalActionT) => {
    switch (action.type) {
        case SET_IS_ITEM_MODAL_OPEN:
            return {
                ...state,
                isItemModalOpen: action.payload.isItemModalOpen
            }

        case SET_IS_LOGIN_MODAL_OPEN:
            return {
                ...state,
                isLoginModalOpen: action.payload.isLoginModalOpen
            }

        default:
            return state;
    }
}

export default modalReducer