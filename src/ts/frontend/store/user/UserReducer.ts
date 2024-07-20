import {
    CLEAR_USER_DATA,
    SET_USER_DATA,
    SET_USER_ID,
    SET_USER_ROLE,
    UserActionT
} from "@store/user/UserActions"

interface InitialStateI {
    userId: number | null;
    userRole: string | null
}

const initialState: InitialStateI = {
    userId: null,
    userRole: null,
}

const userReducer = (state = initialState, action: UserActionT) => {
    switch (action.type) {
        case CLEAR_USER_DATA:
            return {
                ...state,
                userId: action.payload.userId,
                userRole: action.payload.userRole
            }

        case SET_USER_DATA:
            return {
                ...state,
                userId: action.payload.userId,
                userRole: action.payload.userRole
            }

        case SET_USER_ID:
            return {
                ...state,
                userId: action.payload.userId,
            }

        case SET_USER_ROLE:
            return {
                ...state,
                userRole: action.payload.userRole
            }

        default:
            return state;
    }
}

export default userReducer;