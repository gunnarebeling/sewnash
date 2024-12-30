/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactInputMask from "react-input-mask";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { updateBooking } from "../../../managers/bookingManager";

export const UpdateBooking = ({booking, modal, setModal}) => {
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        occupancy: ""
    })

    useEffect(() => {
        let copy = {...formData,
            name: booking.name,
            phoneNumber: booking.phoneNumber,
            occupancy: booking.occupancy
        }
        setFormData(copy)
    }, [])

    const onChange = (e) => {
        const {name, value} = e.target
        let copy = {...formData,
            [name] : value
        }
        setFormData(copy)
    }

    const onSubmit = () => {
        let copy = {...formData,
            occupancy: parseInt(formData.occupancy)
        }
        updateBooking(booking.id, copy).then(toggle)
    }

    const toggle = () => {
    
        setModal(!modal)

    };
    return (
        <div>
        <Button color="primary" onClick={toggle}>
          update
        </Button>
  
       
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Class Form</ModalHeader>
          <ModalBody>
            <Form>
                <FormGroup>
                    <Label>Name</Label>
                    <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={onChange}
                    />

                </FormGroup>
                <FormGroup>
                    <Label>Phone Number</Label>
                        <ReactInputMask
                            mask="999-999-9999"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={onChange}
                            maskChar={null}
                            // invalid= {!!errors?.phoneNumber}    
                        >
                            {(inputProps) => (
                                <Input {...inputProps} /> 
                            )}
                        </ReactInputMask>

                </FormGroup>
                <FormGroup>
                <Label>Occupancy</Label>
                    <Input
                        type="number"
                        name="occupancy"
                        value={formData.occupancy}
                        onChange={onChange}
                    />

                </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
            <Button color="primary" onClick={onSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
}