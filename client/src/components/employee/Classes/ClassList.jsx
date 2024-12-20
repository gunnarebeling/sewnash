import { useEffect, useState } from "react"

import "./ClassList.css"
import { Button, Col, Container, Row } from "reactstrap"
import { useNavigate } from "react-router-dom"
import { getAllClasses } from "../../../managers/sewClassManager"
import { SewClassCard } from "../../customer/sewClasses/SewClassCard"


export const ClassList = () => {
    const [allClasses, setAllClasses] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAllClasses().then(setAllClasses)
    },[])

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
                    <h2>classes</h2>
                    <Button>add class</Button>
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
                <div className="class-selector" onClick={handleClassClick} data-id={c.id}>
                    <SewClassCard sewClass={c} />
                </div>
                </Col>
            ))}
            </Row>
        </Container>
    )
}