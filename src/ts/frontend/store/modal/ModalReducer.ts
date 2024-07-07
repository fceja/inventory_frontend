import {
    SET_IS_ADD_ITEM_MODAL_OPEN,
    SET_IS_ITEM_MODAL_OPEN,
    SET_IS_FOLDER_MODAL_OPEN,
    SET_IS_FOLDER_TREE_MODAL_OPEN,
    SET_IS_LOGIN_MODAL_OPEN,
    ModalActionT
} from "@store/modal/ModalActions"

const initialState = {
    isAddItemModalOpen: false,
    isItemModalOpen: false,
    isFolderModalOpen: false,
    isFolderTreeModalOpen: false,
    isLoginModalOpen: true
}

const modalReducer = (state = initialState, action: ModalActionT) => {
    switch (action.type) {
        case SET_IS_ADD_ITEM_MODAL_OPEN:
            return {
                ...state,
                isAddItemModalOpen: action.payload.isAddItemModalOpen
            }

        case SET_IS_FOLDER_MODAL_OPEN:
            return {
                ...state,
                isFolderModalOpen: action.payload.isFolderModalOpen
            }

        case SET_IS_FOLDER_TREE_MODAL_OPEN:
            return {
                ...state,
                isFolderTreeModalOpen: action.payload.isFolderTreeModalOpen
            }

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