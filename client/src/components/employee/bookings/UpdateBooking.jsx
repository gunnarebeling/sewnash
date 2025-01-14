/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactInputMask from "react-input-mask";
import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { updateBooking } from "../../../managers/bookingManager";
import * as Yup from "yup";
import '../sessions/SessionDetail.css'
import { getClassById } from "../../../managers/sewClassManager";

export const UpdateBooking = ({booking, modal, setModal}) => {
    const [errors, setErrors] = useState({})
    const [sewClass, setsewClass] = useState({})
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        occupancy: ""
    })

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        phoneNumber: Yup.string()
            .matches(/^\d{3}-\d{3}-\d{4}$/, "Phone number must be in the format 123-456-7890")
            .required("Phone number is required"),
        occupancy: Yup
        .number()
        .required("Age is required")
        .integer("Age must be an integer")
        .min(1, "must be at least one person")
        .max(sewClass?.maxPeople, "group cannot exceed the spots left")
        });

    useEffect(() => {
        let copy = {...formData,
            name: booking.name,
            phoneNumber: booking.phoneNumber,
            occupancy: booking.occupancy
        }
        setFormData(copy)
        getClassById(booking.session?.sewClassId).then(setsewClass)
    }, [booking])

    const onChange = (e) => {
        const {name, value} = e.target
        let copy = {...formData,
            [name] : value
        }
        setFormData(copy)
    }

    const onSubmit = async () => {
        try {
            await validationSchema.validate(formData, {abortEarly: false})
            let copy = {...formData,
                occupancy: parseInt(formData.occupancy)
            }
            updateBooking(booking.id, copy).then(toggle)
            
        } catch (validationErrors) {
            const formattedErrors = validationErrors.inner.reduce((acc,err) => {
                acc[err.path] = err.message
                return acc
            }, {})
            setErrors(formattedErrors)
        }
    }

    const toggle = () => {
    
        setModal(!modal)

    };
    return (
        <div className="d-flex">
        <Button color="primary" className="update-btn" size="sm" onClick={toggle}>
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
                        invalid= {!!errors?.name}
                    />
                    <FormFeedback type='invalid'>{errors.name}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label>Phone Number</Label>
                        <ReactInputMask
                            mask="999-999-9999"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={onChange}
                            maskChar={null}
                            invalid= {!!errors?.phoneNumber}    
                        >
                            {(inputProps) => (
                                <Input {...inputProps} /> 
                            )}
                        </ReactInputMask>
                        <FormFeedback type='invalid'>{errors.phoneNumber}</FormFeedback>
                </FormGroup>
                <FormGroup>
                <Label>Occupancy</Label>
                    <Input
                        type="number"
                        name="occupancy"
                        value={formData.occupancy}
                        onChange={onChange}
                        invalid= {!!errors?.occupancy}
                    />
                    <FormFeedback type='invalid'>{errors.occupancy}</FormFeedback>
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