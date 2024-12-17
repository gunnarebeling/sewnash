import { useEffect, useState } from "react"
import { getAllClasses } from "../../managers/sewClassManager"
import { SewClassCard } from "./sewClasses/SewClassCard"
import "./CustomerHome.css"
import { Col, Container, Row } from "reactstrap"


export const CustomerHome = () => {
    const [allClasses, setAllClasses] = useState([])

    useEffect(() => {
        getAllClasses().then(setAllClasses)
    },[])
    return (
        <Container>
      <Row>
        {/* Left column for the cards */}
        <Col md="8"> {/* Takes up 8/12 of the row */}
          {allClasses.map((c) => (
            <div key={c.id} className="m-3">
              <SewClassCard sewClass={c} />
            </div>
          ))}
        </Col>

        {/* Right column for "hello" */}
        <Col md="4"> {/* Takes up 4/12 of the row */}
          <div className="d-flex align-items-center justify-content-center h-100">
            <h3>Hello</h3>
          </div>
        </Col>
      </Row>
    </Container>
    )
}