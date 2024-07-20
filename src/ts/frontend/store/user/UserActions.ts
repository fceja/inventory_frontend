export const CLEAR_USER_DATA = "CLEAR_USER_DATA";
export const SET_USER_DATA = "SET_USER_DATA";
export const SET_USER_ID = "SET_USER_ID";
export const SET_USER_ROLE = "SET_USER_ROLE";

interface ClearUserDataAction {
    type: typeof CLEAR_USER_DATA;
    payload: { userId: null; userRole: null }
}

interface SetUserDataAction {
    type: typeof SET_USER_DATA;
    payload: { userId: number; userRole: string }
}

interface SetUserIdAction {
    type: typeof SET_USER_ID;
    payload: { userId: number }
}

interface SetUserRoleAction {
    type: typeof SET_USER_ROLE;
    payload: { userRole: string }
}

export type UserActionT =
    ClearUserDataAction
    | SetUserDataAction
    | SetUserIdAction
    | SetUserRoleAction

export const clearUserData = (): ClearUserDataAction => {
    return {
        type: CLEAR_USER_DATA,
        payload: { userId: null, userRole: null }
    }
}

export const setUserData = (userId: number, userRole: string): SetUserDataAction => {
    return {
        type: SET_USER_DATA,
        payload: { userId: userId, userRole: userRole }
    }
}

export const setUserId = (userId: number): SetUserIdAction => {
    return {
        type: SET_USER_ID,
        payload: { userId: userId }
    }
}

export const setUserRole = (userRole: string): SetUserRoleAction => {
    return {
        type: SET_USER_ROLE,
        payload: { userRole: userRole }
    }
}

