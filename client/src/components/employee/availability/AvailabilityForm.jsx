/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import { getAllTimes } from "../../../managers/timeManager";
import { getAllEmployees } from "../../../managers/employeeManager";
import { postAvailability } from "../../../managers/availabilityManager";

export const AvailabilityForm = ({ isOpen, toggle, selectedDate, sewClass }) => {
    const [dropdownStates, setDropdownStates] = useState({});
    const [employees, setEmployees] = useState([]);
    const [employeeDropDown, setEmployeeDropDown] = useState(false)
    const [allTimes, setAllTimes] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedDateRange, setSelectedDateRange] = useState([selectedDate, null]); // [startDate, endDate]
    const [formData, setFormData] = useState({
        sewClass: sewClass.id,
        dateRange: [],
        days: [],
        employees: [],
    });
    const employeeDropdownToggle = () => setEmployeeDropDown(!employeeDropDown);

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const getWeekdayName = (date) => {
        return weekdays[date.getDay()];
    };

    // Handle changes to the selected date range
    useEffect(() => {
        if (!selectedDate) return; // Exit if no date is provided
        setSelectedDateRange([selectedDate, selectedDate]);
        getAllTimes().then(setAllTimes);
        getAllEmployees().then(setEmployees)
    }, [selectedDate, sewClass]);

    // Handle updates to selectedDays and formData when date range changes
    useEffect(() => {
      setSelectedDays([])
        if (!selectedDateRange[0] || !selectedDateRange[1]) return;

        // Update form data with the date range
        setFormData({
            ...formData,
            dateRange: selectedDateRange,
        });

        // Prepare days in the range
        let daysList = [];
        for (let date = new Date(selectedDateRange[0]); date <= selectedDateRange[1]; date.setDate(date.getDate() + 1)) {
            if (selectedDays.length >= 7) return; // Stop once we have all 7 days
            if (!selectedDays.some((d) => d.id === date.getDay())) {
                const newDay = {
                    id: date.getDay(),
                    name: getWeekdayName(date),
                    times: [],
                    checked: true,
                };
                daysList.push(newDay);
            }
            if (daysList.length === 7) break;
        }
        setSelectedDays(daysList);
    }, [selectedDateRange, selectedDate]);

    // Handle date range change from the DatePicker component
    const handleDateChange = (update) => {
        if (update && update.length === 2) {
            setSelectedDateRange(update); // Update start and end date
        }
    };

    const onConfirm = (e) => {
        e.preventDefault();
        let finalDays = selectedDays.reduce((list, d) => {
            if (d.checked) {
                list.push( {
                    id: d.id,
                    dayOfWeek: d.name,
                    times: [...d.times]
                })
            }
            return list
        }, [])
        let copy = {...formData,
            days: finalDays,
            sewClass: sewClass.id
        }
        postAvailability(copy)
        toggle(); // Close the modal
    };

    const oneDayClick = () => {
        // Set range to one time
        setSelectedDateRange([selectedDateRange[0], selectedDateRange[0]]);
    };

    const yearClick = () => {
        const yearStartDate = new Date(selectedDateRange[0]);
        yearStartDate.setFullYear(yearStartDate.getFullYear() + 1);
        setSelectedDateRange([selectedDateRange[0], yearStartDate]);
    };

    const checkedDay = (e) => {
        const time = e.target.name;
        let copy = [...selectedDays];
        copy.forEach((d) => {
            if (d.id === parseInt(time)) {
                d.checked = !d.checked;
            }
        });
        setSelectedDays(copy);
    };
    const toggleDropdown = (id) => {
        setDropdownStates((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const timeChange = (e) => {
        const { time, day } = e.target.dataset;
    
        // Create a deep copy of selectedDays to avoid direct mutation
        let updatedDays = [...selectedDays];
        let timeChangeDay = updatedDays.find(d => d.id === parseInt(day));
    
        if (timeChangeDay) {
            if (timeChangeDay.times.includes(parseInt(time))) {
                // Remove the time if it already exists
                timeChangeDay.times = timeChangeDay.times.filter(t => t !== parseInt(time));
            } else {
                // Add the time if it doesn't exist
                timeChangeDay.times.push(parseInt(time));
            }
        }

    
        setSelectedDays(updatedDays);
    };
    const employeeChange = (e) => {
        const id = parseInt(e.target.id)

        let copy = {...formData}
        if(!copy.employees.some(e => e === id))
        {
            copy.employees.push(id)
        }else{
            copy.employees = copy.employees.filter(e => e !== id)
        }
        setFormData(copy)
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                <div>{sewClass.name}</div>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <Row>
                        <Col>
                            <FormGroup>
                                <DatePicker
                                    selected={selectedDateRange[0]} // Set start date
                                    onChange={handleDateChange} // Update both start and end dates
                                    startDate={selectedDateRange[0]}
                                    endDate={selectedDateRange[1]}
                                    selectsRange
                                    inline
                                    placeholderText="Select a date range"
                                />
                                <div>
                                    <Button className="m-2" onClick={oneDayClick}>One Day</Button>
                                    <Button className="m-2" onClick={yearClick}>One Year</Button>
                                </div>
                            </FormGroup>
                            <div className="m-3">
                                <Label>Employees</Label>
                            <Dropdown isOpen={employeeDropDown} toggle={employeeDropdownToggle} className="m-3">
                                              <DropdownToggle caret >Choose employees</DropdownToggle>
                                              <DropdownMenu >
                                                {employees.map((e) => (
                                                  <DropdownItem key={e.id} toggle={false}>
                                                    <input
                                                      type="checkbox"
                                                      id={e.id}
                                                      name={e.fullName}
                                                      onChange={employeeChange}
                                                      checked={formData.employees.some(employee => parseInt(employee) === e.id)}
                                                      
                                                      
                                                    />
                                                    <label>{e.fullName}</label>
                                                  </DropdownItem>
                                                ))}
                                              </DropdownMenu>
                                            </Dropdown>
                            </div>
                        </Col>
                        <Col>
                            {selectedDays.map((d) => {
                                return (
                                    <div key={d.id}>
                                        <Input
                                            type="checkbox"
                                            name={d.id}
                                            checked={d.checked}
                                            onChange={checkedDay}
                                        />
                                            <Label>{d.name}</Label>
                                            <Dropdown isOpen={dropdownStates[d.id]} toggle={() => toggleDropdown(d.id)} className={!d.checked && 'd-none'}>
                                              <DropdownToggle caret >Choose time</DropdownToggle>
                                              <DropdownMenu >
                                                {allTimes.map((time) => (
                                                  <DropdownItem key={`${time.id}-${d.id}`} toggle={false}>
                                                    <input
                                                      type="checkbox"
                                                      id={`${time.id}-${d.id}`}
                                                      data-day={d.id}
                                                      data-time={time.id}
                                                      name={time.startTime}
                                                      onChange={timeChange}
                                                      checked={d.times.some(t => parseInt(t) === time.id)}
                                                      
                                                      
                                                    />
                                                    <label>{time.startTime}</label>
                                                  </DropdownItem>
                                                ))}
                                              </DropdownMenu>
                                            </Dropdown>
                                        
                                    </div>
                                );
                            })}
                            
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={onConfirm}>Confirm</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};
