/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { updateClass } from "../../../managers/sewClassManager";
import * as Yup from "yup";

export const UpdateClassForm = ({ sewClass, setClassChange}) => {
    const [modal, setModal] = useState(false);
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        name: "",
        description:"",
        maxPeople: 0,
        pricePerPerson: 0,
        duration: 0
    })

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("description is required"),
        maxPeople: Yup
        .number()
        .required("Age is required")
        .integer("Age must be an integer")
        .min(1, "must be at least one person"),
        pricePerPerson: Yup.number()
        .required("must set a price")
        .min(0, "must be a positive amount"),
        duration: Yup.number()
        .required("must enter a duration in hours")
        .min(0.5, "must be at least half an hour")
        });

    useEffect(() => {
        let copy = {formData,
            name: sewClass.name,
            description: sewClass.description,
            maxPeople: sewClass.maxPeople,
            pricePerPerson: sewClass.pricePerPerson,
            duration: sewClass.duration
        }
        setFormData(copy)
    }, [sewClass])
    const toggle = (e) => {
        e.stopPropagation()
        setModal(!modal)

    };
    const onChange = (e) => {
        const {name, value} = e.target
        let copy = {...formData,
            [name]: value
        }
        setFormData(copy)
    }
    const handleSubmit = async () => {
        try {
            await validationSchema.validate(formData, {abortEarly: false})
            let copy = {...formData}
            copy.maxPeople = parseInt(copy.maxPeople)
            copy.duration = parseInt(copy.duration)
            copy.pricePerPerson = parseFloat(copy.pricePerPerson)
            updateClass(sewClass.id, copy).then(()=>{
                setClassChange(c => !c)
                setModal(!modal)
            })
            
        } catch (validationErrors) {
            const formattedErrors = validationErrors.inner.reduce((acc,err) => {
                acc[err.path] = err.message
                return acc
            }, {})
            setErrors(formattedErrors)
        }
        
    }
  
    return (
      <div>
        <Button size="sm" color="primary" onClick={toggle}>
          UpdateClass 
        </Button>
  
       
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}> update class</ModalHeader>
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
                    <Label>Max People</Label>
                    <Input
                        type="number"
                        name="maxPeople"
                        value={formData.maxPeople}
                        onChange={onChange}
                        invalid= {!!errors?.maxPeople}
                    />
                    <FormFeedback type='invalid'>{errors.maxPeople}</FormFeedback>
                </FormGroup>
                <FormGroup>
                <Label>Price Per Person</Label>
                    <Input
                        type="number"
                        name="pricePerPerson"
                        value={formData.pricePerPerson}
                        onChange={onChange}
                        invalid= {!!errors?.pricePerPerson}
                    />
                    <FormFeedback type='invalid'>{errors.pricePerPerson}</FormFeedback>
                </FormGroup>
                <FormGroup>
                <Label>Duration by hour</Label>
                    <Input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={onChange}
                        invalid= {!!errors?.duration}
                    />
                    <FormFeedback type='invalid'>{errors.duration}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label>Description</Label>
                    <Input
                        type="textarea"
                        name="description"
                        rows="5"
                        value={formData.description}
                        onChange={onChange}
                        invalid= {!!errors?.description}
                    />
                    <FormFeedback type='invalid'>{errors.description}</FormFeedback>
                </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
}