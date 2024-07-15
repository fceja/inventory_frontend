const ROOT_PATH = ""

const PAGE_PATH_VALUES = Object.freeze({
    DASHBOARD: 'dashboard',
    MAIN_FOLDERS: 'folders/:folderId',
    LOGIN: 'login',
    NOT_FOUND: 'notFound',
    SEARCH: 'search',

})

export const PAGE_PATHS = Object.freeze({
    DASHBOARD: `${ROOT_PATH}/${PAGE_PATH_VALUES.DASHBOARD}`,
    MAIN_FOLDERS: `${ROOT_PATH}/${PAGE_PATH_VALUES.MAIN_FOLDERS}`,
    LOGIN: `${ROOT_PATH}/${PAGE_PATH_VALUES.LOGIN}`,
    NOT_FOUND: `${ROOT_PATH}/${PAGE_PATH_VALUES.NOT_FOUND}`,
    SEARCH: `${ROOT_PATH}/${PAGE_PATH_VALUES.SEARCH}`,
})