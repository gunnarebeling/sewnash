import { useEffect, useState } from "react"

import "./ClassList.css"
import { Col, Container, Row } from "reactstrap"
import { useNavigate } from "react-router-dom"
import { getAllClasses } from "../../../managers/sewClassManager"

import { AddClassForm } from "./AddClassForm"
import { EmployeeSewClassCard } from "../EmployeeSewClassCard"



export const ClassList = () => {
    const [allClasses, setAllClasses] = useState([])
    const [classChange, setClassChange] = useState(false)
    const [modal, setModal] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        getAllClasses().then(setAllClasses)
    },[modal, classChange])

    const handleClassClick = (e) => {
      e.preventDefault()
      const classId = e.currentTarget.dataset.id
      navigate(`${classId}`)

    }
    return (
      <Container>
      {/* Row for Header */}
            <Row className="justify-content-center mb-4">
                <header className="m-3 text-center">
                    <h1 className="raleway-dots-regular">classes</h1>
                    <AddClassForm modal={modal} setModal={setModal}/>
                </header>
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
                <div className="class-selector " onClick={handleClassClick} data-id={c.id}>
                    <EmployeeSewClassCard sewClass={c} showDelete={true} setClassChange={setClassChange}/>
                </div>
                </Col>
            ))}
            </Row>
        </Container>
    )
}