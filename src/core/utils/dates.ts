export const formatDate = (dateString: Date | string): string => {
    if (!dateString) return '---'
    
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-MX', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }).format(date)
}