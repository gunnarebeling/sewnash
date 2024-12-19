
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { enUS } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { getAllSessions } from '../../../managers/sessionManager';

export const BookingsList = () => {
    const [sessions, setSessions] = useState([])
    const [events, setEvents] = useState([])

    useEffect(() => {
        getAllSessions().then(setSessions)
    }, [])

    useEffect(() => {
       const events = sessions.map(s => {
        let newDate = new Date(s.dateTime); 
        newDate.setHours(newDate.getHours() + s.sewClass.duration);
        const event = {
            title: s.sewClass?.name,
            desc: `total people ${s.totalPeople}`,
            start: new Date(s.dateTime),
            end: newDate

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
      style={{ height: 600 }}
    />
  );
}

