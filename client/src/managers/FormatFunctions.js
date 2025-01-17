export const convertToDollars = (price) => {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
      }).format(price);
      
}

export const formatDate = (date) => {
  if (date !== null) {
    if (typeof date === "string") {
      date = new Date(date)
      
    };
      return date.toISOString().split("T")[0]
    
  }else {
    return ""
  }
  }



export const formatAmericanDate = (date) => {
  if (typeof date === "string") {
    date = new Date(date)
  }
  date = new Intl.DateTimeFormat('en-US').format(date)
  return date
};

export const setTimeFromString = (date, timeString) => {
  // Parse the time string into hours, minutes, and meridian (AM/PM)
  const [time, meridian] = timeString.split(" ");
  const [hours, minutes] = time.split(":").map(Number);

  // Convert hours to 24-hour format if needed
  const adjustedHours = meridian === "PM" && hours !== 12 ? hours + 12 : 
                        meridian === "AM" && hours === 12 ? 0 : hours;

  // Set the time on the given date
  date.setHours(adjustedHours, minutes, 0, 0);

  return date;
}
