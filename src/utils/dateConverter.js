// ฟังก์ชันเดิม (เก็บไว้เผื่อได้ใช้ในจุดอื่น)
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
    
    // หาวันแรกของเดือนนี้ (เช่น 1 เมษายน 2026 เวลา 00:00:00)
    const firstDayOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // ถ้าน้อยกว่าวันแรกของเดือนนี้ แปลว่าเป็นของเดือนที่แล้วลงไปทั้งหมด
    return date < firstDayOfThisMonth;
}