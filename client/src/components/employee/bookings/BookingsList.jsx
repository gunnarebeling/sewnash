
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { enUS } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { getAllSessions } from '../../../managers/sessionManager';
import { setTimeFromString } from '../../../managers/FormatFunctions';
import { useNavigate } from 'react-router-dom';

export const BookingsList = () => {
    const [sessions, setSessions] = useState([])
    const [events, setEvents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAllSessions().then(setSessions)
    }, [])

    useEffect(() => {
       const events = sessions.map(s => {
        if (s.bookings.length > 0) {
          
          let newDate = setTimeFromString(new Date(s.dateTime), s.time?.startTime); 
          const endDate = new Date(newDate); // Clone startDate
          endDate.setHours(endDate.getHours() + s.sewClass.duration);
  
          const event = {
            id: s.id,
            title: `${!s.open ? `🔒` : "" } ${s.sewClass?.name}`,
            start: newDate,
            end: endDate,
              
  
          }
          return event
        }
       }) 
       setEvents(events)
    }, [sessions])

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
    
    const handleEventClick = (e) => {
      navigate(`session/${e.id}`)


    }

    return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 1000 }}
      onSelectEvent={handleEventClick}
      
    />
  );
}

