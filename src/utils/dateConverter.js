export function isThisMonth(dateString) {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    
    return date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
}

export function isLastMonth(dateString) {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    
    let lastMonth = today.getMonth() - 1;
    let yearOfLastMonth = today.getFullYear();
    
    if (lastMonth < 0) {
        lastMonth = 11; 
        yearOfLastMonth -= 1; 
    }
    
    return date.getMonth() === lastMonth && 
           date.getFullYear() === yearOfLastMonth;
}


export function isBeforeThisMonth(dateString) {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    
    const firstDayOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    return date < firstDayOfThisMonth;
}