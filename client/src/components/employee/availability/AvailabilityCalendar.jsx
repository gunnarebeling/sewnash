/* eslint-disable react/prop-types */
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { enUS } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { getAllSessions } from '../../../managers/sessionManager';
import { Button } from 'reactstrap';

import { useNavigate, useParams } from 'react-router-dom';
import { setTimeFromString } from '../../../managers/FormatFunctions';
import { AvailabilityForm } from './AvailabilityForm';
import { getClassById } from '../../../managers/sewClassManager';
import './AvailabilityCalendar.css'

export const AvailabilityCalendar = () => {
  const {classId} = useParams()
  const [sessions, setSessions] = useState([])
  const [events, setEvents] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [sewClass, setSewClass] = useState({})
  const [newAvailability, setNewAvailability] = useState(false)
  const navigate = useNavigate()

    useEffect(() => {
        getAllSessions().then(setSessions)
    }, [isModalOpen, newAvailability])

    useEffect(() => {
       getClassById(classId).then(setSewClass) 
       const events = sessions.reduce((events , s) => {
        if (s.sewClassId === parseInt(classId)) {
          let newDate = setTimeFromString(new Date(s.dateTime), s.time?.startTime); 
          const endDate = new Date(newDate); // Clone startDate
          endDate.setHours(endDate.getHours() + s.sewClass.duration);

          const event = {
            id: s.id, 
            title: `${!s.open ? `🔒` : "" } ${s.sewClass?.name}`,
            start: newDate,
            end: endDate,
              
  
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
    
      return <div>{date.getDate()} <Button onClick={(e => handleClick(date, e))} className='btn-xxs'>+</Button></div>;
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

  const handleEventClick = (e) => {
    navigate(`/employee/session/${e.id}`)


  }

  return (
    <div>
      <AvailabilityForm 
        isOpen = {isModalOpen}
        toggle = {toggleModal}
        selectedDate = {selectedDate}
        sewClass={sewClass}
        setNewAvailability = {setNewAvailability}
      />
      <div className='m-3 d-flex justify-content-between align-items-center'>
        <h3 className=''>{sewClass.name}</h3>
        <Button onClick={toggleModal} color='primary'>add availability</Button>
      </div>
      <Calendar
        localizer={localizer}
        events={events} // Here you can pass the sessions or events
        startAccessor="start"
        endAccessor="end"
        style={{ height: 800 }}
        onSelectEvent={handleEventClick}
        components={{
            dateHeader: MyDateHeader,
          }}
      />
    </div>
  );
};
