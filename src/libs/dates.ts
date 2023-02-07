

export const formatDate = (date: string): string => {
    const newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.toLocaleString('default', { month: 'long' });
    let year = newDate.getFullYear();
    return `${month} ${day}, ${year}`;
}