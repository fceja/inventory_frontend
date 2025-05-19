export const isStringAllZeroes = (inputString: string) => {
    return /^0+$/.test(inputString)
}

export const isStringANumber = (inputString: string) => {
    return !isNaN(parseFloat(inputString)) && isFinite(+inputString)
}

export const pathEndsWithString = (inputString: string) => {
    const path = window.location.pathname
    return path.endsWith(`/${inputString}`) || path.endsWith(`/${inputString}/`)
}