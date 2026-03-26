export const isThisMonth = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    
    return date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
};



export const isLastMonth = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    
    // check year bug
    let lastMonth = today.getMonth() - 1;
    let yearOfLastMonth = today.getFullYear();
    
    //11 = December
    if (lastMonth < 0) {
        lastMonth = 11; 
        yearOfLastMonth -= 1; 
    }
    
    return date.getMonth() === lastMonth && 
           date.getFullYear() === yearOfLastMonth;
};