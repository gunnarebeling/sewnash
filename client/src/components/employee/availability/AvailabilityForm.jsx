/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import { getAllTimes } from "../../../managers/timeManager";

export const AvailabilityForm = ({ isOpen, toggle, selectedDate, sewClass }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [newSession, setNewSession] = useState([]);
    const [allTimes, setAllTimes] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedDateRange, setSelectedDateRange] = useState([null, null]); // [startDate, endDate]
    const [formData, setFormData] = useState({
        dateRange: [],
        days: [],
        employees: [],
    });
    const dropdownToggle = () => setDropdownOpen(!dropdownOpen);

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const getWeekdayName = (date) => {
        return weekdays[date.getDay()];
    };

    // Handle changes to the selected date range
    useEffect(() => {
      
        if (!selectedDate) return; // Exit if no date is provided
        setSelectedDateRange([selectedDate, selectedDate]);
        getAllTimes().then(setAllTimes);
    }, [selectedDate]);

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
        toggle(); // Close the modal
    };

    const oneDayClick = () => {
        // Set range to one day
        setSelectedDateRange([selectedDateRange[0], selectedDateRange[0]]);
    };

    const yearClick = () => {
        const yearStartDate = new Date(selectedDateRange[0]);
        yearStartDate.setFullYear(yearStartDate.getFullYear() + 1);
        setSelectedDateRange([selectedDateRange[0], yearStartDate]);
    };

    const checkedDay = (e) => {
        const day = e.target.name;
        let copy = [...selectedDays];
        copy.forEach((d) => {
            if (d.id === parseInt(day)) {
                d.checked = !d.checked;
            }
        });
        setSelectedDays(copy);
    };

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
                                            <Dropdown isOpen={dropdownOpen} toggle={dropdownToggle}>
                                              <DropdownToggle caret>Choose Days</DropdownToggle>
                                              <DropdownMenu>
                                                {weekdays.map((day, index) => (
                                                  <DropdownItem key={index}>
                                                    <input
                                                      type="checkbox"
                                                      id={day}
                                                      name={day}
                                                      checked={selectedDays.includes(day)}
                                                      
                                                    />
                                                    <label htmlFor={day}>{day}</label>
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
