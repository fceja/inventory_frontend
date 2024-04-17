const ROOT_PATH = ""

const PAGE_PATH_VALUES = Object.freeze({
    DASHBOARD: 'dashboard',
    FOLDER: 'folder/main',
    ITEM: 'item',
    NOT_FOUND: 'notFound',
    UPDATE: 'update',

})

export const PAGE_PATHS = Object.freeze({
    DASHBOARD: `${ROOT_PATH}/${PAGE_PATH_VALUES.DASHBOARD}`,
    FOLDER: `${ROOT_PATH}/${PAGE_PATH_VALUES.FOLDER}`,
    ITEM: `${ROOT_PATH}/${PAGE_PATH_VALUES.ITEM}`,
    NOT_FOUND: `${ROOT_PATH}/${PAGE_PATH_VALUES.NOT_FOUND}`,
    UPDATE: `${ROOT_PATH}/${PAGE_PATH_VALUES.UPDATE}`,
})