

const  GetHouseStatusBadge = (status) => {
    switch (status) {
            case 'Available': return 'bg-blue-500';
            case 'Book': return 'bg-yellow-500';
            case 'Sold': return 'bg-green-600';
            case 'Building': return 'bg-gray-500';
            default: return 'bg-gray-500';
        }
}
  
export default GetHouseStatusBadge