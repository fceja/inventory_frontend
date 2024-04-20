const ROOT_PATH = ""

const PAGE_PATH_VALUES = Object.freeze({
    DASHBOARD: 'dashboard',
    FOLDERS: 'folders/:folderId',
    ITEMS: 'items/:itemId',
    NOT_FOUND: 'notFound',
    UPDATE: 'update',

})

export const PAGE_PATHS = Object.freeze({
    DASHBOARD: `${ROOT_PATH}/${PAGE_PATH_VALUES.DASHBOARD}`,
    FOLDERS: `${ROOT_PATH}/${PAGE_PATH_VALUES.FOLDERS}`,
    ITEMS: `${ROOT_PATH}/${PAGE_PATH_VALUES.ITEMS}`,
    NOT_FOUND: `${ROOT_PATH}/${PAGE_PATH_VALUES.NOT_FOUND}`,
    UPDATE: `${ROOT_PATH}/${PAGE_PATH_VALUES.UPDATE}`,
})