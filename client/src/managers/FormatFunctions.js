export const convertToDollars = (price) => {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
      }).format(price);
      
}

export const formatDate = (date) => {
  if (typeof date === "string") {
    date = new Date(date)
  }
  return date.toISOString().split("T")[0]
};

export const formatAmericanDate = (date) => {
  if (typeof date === "string") {
    date = new Date(date)
  }
  date = new Intl.DateTimeFormat('en-US').format(date)
  return date
};