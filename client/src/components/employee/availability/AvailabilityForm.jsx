/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";


export const AvailabilityForm = ({ isOpen, toggle,selectedDate, sewClass }) => {
    const [newSession, setNewSession] = useState([])
    const [selectedDays, setSelectedDays] = useState([])
    const [selectTimes, setSelectedTimes] = useState([])
    const onConfirm = (e) => {
        e.preventDefault()
        toggle()
    }
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                <div>{sewClass.name}</div>
                
            </ModalHeader>
          <ModalBody>
            <div>{selectedDate}</div>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={onConfirm}>Confirm</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      );
}