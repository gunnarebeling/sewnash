import { useEffect, useState } from "react"
import { getAllClasses } from "../../managers/sewClassManager"
import { SewClassCard } from "./sewClasses/SewClassCard"
import "./CustomerHome.css"
import { Col, Container, Row } from "reactstrap"
import { FiCalendar, FiSearch } from "react-icons/fi"
import DatePicker from "react-datepicker"
import { useNavigate } from "react-router-dom"


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
    return (
      <Container>
      {/* Row for Header */}
        <Row className="justify-content-center mb-4">
          <Col md="8" className="text-center">
            <h2>Sew Nash</h2>
            <div>

              <div className="flow-header-button  flow-search-button d-flex align-items-center justify-content-center" >
                {/* Datepicker Button */}
                <div className="datepicker-button shadow ">
                  
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      placeholderText="Search by date"
                      isClearable
                      className="datepicker-input"
                      aria-label="Pick a date using the calendar"
                      customInput={
                        <button type="button" className="btn m-2 search-btn d-flex align-items-center ">
                          <FiCalendar className="icon-calendar  me-1" />
                          <span>
                            {selectedDate
                              ? selectedDate.toLocaleDateString()
                              : "Select a date"}
                          </span>
                        </button>
                      }
                    />
                <div className="search-icon rounded-end">
                  <a
                    href="#"
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
    <Row className="justify-content-center">
      {allClasses.map((c) => (
        <Col
          key={c.id}
          xs="12"
          lg="6"
          className="mb-4  justify-content-center"
        >
          <div className="class-selector" onClick={handleClassClick} data-id={c.id}>
            <SewClassCard sewClass={c} showDelete={false}/>
          </div>
        </Col>
      ))}
    </Row>
  </Container>
    )
}