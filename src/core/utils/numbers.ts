export const formatCurrency = (value: number, decimals: number = 2) => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value)
}

export const formatInputView = (val: string) => {
    let cleanValue = val.replace(/[^0-9.]/g, '')

    const parts = cleanValue.split('.')
    if (parts.length > 2) cleanValue = parts[0] + '.' + parts.slice(1).join('')

    const [integer, fraction] = cleanValue.split('.')
    const formattedInteger = (integer as string).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return fraction !== undefined ? `${formattedInteger}.${fraction}` : formattedInteger
}

export const parseInputToNumber = (val: string) => {
    const rawValue = val.replace(/[^0-9.]/g, '')
    return rawValue === '' ? 0 : Number(rawValue)

}