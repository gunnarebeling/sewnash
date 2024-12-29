
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { enUS } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { getAllSessions } from '../../../managers/sessionManager';
import { setTimeFromString } from '../../../managers/FormatFunctions';

export const BookingsList = () => {
    const [sessions, setSessions] = useState([])
    const [events, setEvents] = useState([])

    useEffect(() => {
        getAllSessions().then(setSessions)
    }, [])

    useEffect(() => {
       const events = sessions.map(s => {
        let newDate = setTimeFromString(new Date(s.dateTime), s.time?.startTime); 
        const endDate = new Date(newDate); // Clone startDate
        endDate.setHours(endDate.getHours() + s.sewClass.duration);

        const event = {
            title: `${!s.open ? `🔒` : "" } ${s.sewClass?.name}`,
            start: newDate,
            end: endDate,
            

        }
        return event
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
    
    

    return (
        


  
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 1000 }}
      
    />
  );
}

