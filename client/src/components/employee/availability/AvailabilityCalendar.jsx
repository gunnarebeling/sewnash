/* eslint-disable react/prop-types */
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { enUS } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { getAllSessions } from '../../../managers/sessionManager';
import { Button } from 'reactstrap';
import { AvailabilityForm } from './availabilityForm';
import { useParams } from 'react-router-dom';

export const AvailabilityCalendar = () => {
  const {classId} = useParams()
  const [sessions, setSessions] = useState([])
  const [events, setEvents] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [sewClass, setSewClass] = useState({})

    useEffect(() => {
        getAllSessions().then(setSessions)
    }, [])

    useEffect(() => {
       const events = sessions.reduce((events , s) => {
        if (s.sewClassId === parseInt(classId)) {
          setSewClass(s.sewClass)
          let newDate = new Date(s.dateTime); 
          newDate.setHours(newDate.getHours() + s.sewClass.duration);
          const event = {
              title: `${!s.open ? `🔒` : "" } ${s.sewClass?.name}`,
              start: new Date(s.dateTime),
              end: newDate,
              
  
          }
          events.push(event)
        }
        return events
       }, []) 
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

  const MyDateHeader = ({ date }) => {
    
      return <div>{date.getDate()} <Button onClick={(e => handleClick(date, e))}>+</Button></div>;
    }
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

  const handleClick = (date, e) => {
    e.preventDefault()
    console.log(`Clicked on day: ${date.toString()}`)
    setSelectedDate(date.toString())
    toggleModal()

    // Here, you can open a modal or perform any other action when the "+" button is clicked
  };

  

  return (
    <div>
      <AvailabilityForm 
        isOpen = {isModalOpen}
        toggle = {toggleModal}
        selectedDate = {selectedDate}
        sewClass={sewClass}
      />
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
