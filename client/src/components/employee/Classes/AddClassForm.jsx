/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { postClass } from "../../../managers/sewClassManager";

export const AddClassForm = ({modal, setModal}) => {
    
    const [formData, setFormData] = useState({
        name: "",
        description:"",
        maxPeople: 0,
        pricePerPerson: 0,
        duration: 0
    })

    const toggle = () => setModal(!modal);
    const onChange = (e) => {
        const {name, value} = e.target
        let copy = {...formData,
            [name]: value
        }
        setFormData(copy)
    }
    const handleSubmit = () => {
        let copy = {...formData}
        copy.maxPeople = parseInt(copy.maxPeople)
        copy.duration = parseInt(copy.duration)
        copy.pricePerPerson = parseFloat(copy.pricePerPerson)
        postClass(copy).then(toggle)
    }
  
    return (
      <div>
        <Button color="primary" onClick={toggle}>
          Add Class
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
                    <Label>Max People</Label>
                    <Input
                        type="number"
                        name="maxPeople"
                        value={formData.maxPeople}
                        onChange={onChange}
                    />

                </FormGroup>
                <FormGroup>
                <Label>Price Per Person</Label>
                    <Input
                        type="number"
                        name="pricePerPerson"
                        value={formData.pricePerPerson}
                        onChange={onChange}
                    />

                </FormGroup>
                <FormGroup>
                <Label>Duration by hour</Label>
                    <Input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={onChange}
                    />

                </FormGroup>
                <FormGroup>
                    <Label>Description</Label>
                    <Input
                        type="textarea"
                        name="description"
                        rows="5"
                        value={formData.description}
                        onChange={onChange}
                    />

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