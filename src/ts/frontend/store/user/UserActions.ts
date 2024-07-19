import { Action } from "redux";

export const CLEAR_USER_DATA = "CLEAR_USER_DATA";
export const SET_USER_ID = "SET_USER_ID";
export const SET_USER_ROLE = "SET_USER_ROLE";

interface ClearUserDataAction extends Action {
    type: typeof CLEAR_USER_DATA;
    payload: { userId: number; userRole: string }
}

interface SetUserIdAction extends Action {
    type: typeof SET_USER_ID;
    payload: { userId: number }
}

interface SetUserRoleAction extends Action {
    type: typeof SET_USER_ROLE;
    payload: { userRole: string }
}

export type UserActionT =
    ClearUserDataAction
    | SetUserIdAction
    | SetUserRoleAction

export const clearUserData = () => {
    return {
        type: CLEAR_USER_DATA,
        payload: { userId: null, userRole: null }
    }
}

export const setUserId = (userId: number) => {
    return {
        type: SET_USER_ID,
        payload: { userId: userId }
    }
}

export const setUserRole = (userRole: string) => {
    return {
        type: SET_USER_ROLE,
        payload: { userRole: userRole }
    }
}

