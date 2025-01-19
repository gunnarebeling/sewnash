
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { enUS } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { getAllSessions } from '../../../managers/sessionManager';
import { setTimeFromString } from '../../../managers/FormatFunctions';
import { useNavigate } from 'react-router-dom';
import { getAllEmployees } from '../../../managers/employeeManager';
import { Input } from 'reactstrap';
import './BookingList.css';

export const BookingsList = () => {
    const [sessions, setSessions] = useState([])
    const [events, setEvents] = useState([])
    const [employees, setAllEmployees] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [selectedEmployeeSessions, setSelectedEmployeeSessions] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAllSessions().then(setSessions)
        getAllEmployees().then(setAllEmployees)
    }, [])
    useEffect(() => {
        setSelectedEmployeeSessions(sessions)
    }, [sessions])

    useEffect(() => {
        if (selectedEmployee) {
            const employeeSessions = sessions.filter(s => s.employees.some(s => s.id === parseInt(selectedEmployee)))
            setSelectedEmployeeSessions(employeeSessions)
        } else {
            setSelectedEmployeeSessions(sessions)
        }
    }, [selectedEmployee])

    useEffect(() => {
       const events = selectedEmployeeSessions.map(s => {
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
    }, [sessions, selectedEmployeeSessions])

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
      <div className='container'>
        <div className='d-flex justify-content-between'>
          <h4 className='m-3'>Bookings</h4>
          <Input
            type='select'
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className='responsive-input m-3 w-25'
            >
            <option value={""}>All Employees</option>
            {employees.map(e => (
              <option key={e.id} value={e.id}>{e.fullName}</option>
            ))}
            </Input>

        </div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 800 }}
          onSelectEvent={handleEventClick}
          
        />
      </div>
  );
}

