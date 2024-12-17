export const convertToDollars = (price) => {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
      }).format(price);
      
}

export const normalizeDate = (date) => {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0); // Remove time part
    return normalizedDate;
  };