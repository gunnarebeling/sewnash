/* eslint-disable react/prop-types */
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { enUS } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { getAllSessions } from '../../../managers/sessionManager';
import { Button } from 'reactstrap';

export const AvailabilityCalendar = () => {
  const [events, setEvents] = useState([]);
  
  const locales = {
    'en-US': enUS,
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const MyDateHeader = ({ date }) => {
    
      return <div>{date.getDate()} <Button>+</Button></div>;
    }
  

  const handleClick = (date) => {
    console.log(`Clicked on day: ${date}`);
    // Here, you can open a modal or perform any other action when the "+" button is clicked
  };

  // Fetch sessions (events) if needed
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessions = await getAllSessions();  // Assuming getAllSessions returns an array of session data
        setEvents(sessions);  // Update the events state with the fetched sessions
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };
    fetchSessions();
  }, []);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events} // Here you can pass the sessions or events
        startAccessor="start"
        endAccessor="end"
        style={{ height: 1000 }}
        components={{
            dateHeader: MyDateHeader,
          }}
      />
    </div>
  );
};
