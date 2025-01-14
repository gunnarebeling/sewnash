/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { postClass } from "../../../managers/sewClassManager";
import * as Yup from "yup";
import { uploadClassPhoto } from "../../../managers/photoManager";

export const AddClassForm = ({modal, setModal}) => {
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        name: "",
        description:"",
        maxPeople: 0,
        pricePerPerson: 0,
        duration: 0,
        photo: null
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
    const toggle = () => setModal(!modal);
    const onChange = (e) => {
        const {name, value} = e.target
        let copy = {...formData,
            [name]: value
        }
        setFormData(copy)
    }
    const onPhotoChange = (e) => {
      const file = e.target.files[0]
      let copy = {...formData,
        photo: file
      }
      setFormData(copy)
    }
    const handleSubmit = async () => {
      
      try {
        await validationSchema.validate(formData, {abortEarly: false})
        let copy = {
        name: formData.name,
        description: formData.description,
        maxPeople: formData.maxPeople,
        pricePerPerson: formData.pricePerPerson,
        duration: formData.duration
        }
        postClass(copy).then((res) => res.json()).then( data => {
          uploadClassPhoto(formData.photo, data.id).then(toggle)
          
        })
        
      }
      catch (validationErrors) {
          const formattedErrors = validationErrors.inner.reduce((acc,err) => {
              acc[err.path] = err.message
              return acc
          }, {})
          setErrors(formattedErrors)
        
      }
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
                <FormGroup className="mt-4">
                
                  <Label>upload photo</Label>
                  <div className=" d-flex">
      
                  <Input
                      aria-label="upload photo"
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={onPhotoChange}
                      className="w-50  "
                  />
                  
                  </div>
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