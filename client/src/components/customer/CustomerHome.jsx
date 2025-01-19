import { useEffect, useState } from "react"
import { getAllClasses } from "../../managers/sewClassManager"
import "./CustomerHome.css"
import { Col, Container, Row } from "reactstrap"
import { FiCalendar, FiSearch } from "react-icons/fi"
import DatePicker from "react-datepicker"
import { useNavigate } from "react-router-dom"
import { CustomerClassCard } from "./CustomerClassCard"


export const CustomerHome = () => {
    const [allClasses, setAllClasses] = useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        getAllClasses().then(setAllClasses)
    },[])

    const handleClassClick = (e) => {
      e.preventDefault()
      const classId = e.currentTarget.dataset.id
      navigate(`class/${classId}`)

    }
    const handleDateSelect = (date) => {
      setSelectedDate(date)
      navigate('/bookbydate', {state: {date: date}})
    }
    return (
      <Container className="main">
      {/* Row for Header */}
        <Row className="justify-content-center mb-4 mt-4">
          <Col md="8" className="text-center mt-5">
            <img 
              src="./src/assets/SewNash1.png" 
              alt="SewNash Logo" 
              className="img-fluid m-3" 
              style={{ height: '200px' }} // Adjust height as needed
            />
            <div>

              <div className="flow-header-button  flow-search-button d-flex align-items-center justify-content-center" >
                {/* Datepicker Button */}
                <div className="datepicker-button shadow  text-nowrap">
                  
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateSelect}
                      placeholderText="Search by date"
                      isClearable
                      className="datepicker-input"
                      aria-label="Pick a date using the calendar"
                      customInput={
                        <button type="button" className="btn m-2 search-btn d-flex align-items-center text-nowrap">
                          <FiCalendar className="icon-calendar  me-1" />
                          <span>
                            {selectedDate
                              ? selectedDate.toLocaleDateString()
                              : "Select by date"}
                          </span>
                        </button>
                      }
                    />
                <div className="search-icon rounded-end">
                  <a
                    href="/bookbydate"
                    aria-label="Search by date"
                    className="m-2"
                  >
                    <FiSearch className="icon-search" size={16} />
                  </a>

                </div>
                </div>

                {/* Link with Search Icon */}
            </div>
          </div>
      </Col>
    </Row>

    {/* Row for Cards */}
    <Row className="justify-content-center mx-5">
      {allClasses.map((c) => (
        <Col
          key={c.id}
          xs="12"
          lg="6"
          className="mb-2  p-4 mx-5 justify-content-center"
        >
          <div className="class-selector " onClick={handleClassClick} data-id={c.id}>
            <CustomerClassCard sewClass={c}  showDelete={false}/>
          </div>
        </Col>
      ))}
    </Row>
  </Container>
    )
}