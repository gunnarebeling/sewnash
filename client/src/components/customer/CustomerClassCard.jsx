/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { Button, Card, Container } from 'reactstrap'
import './CustomerClassCard.css'






export const CustomerClassCard = ({sewClass }) => {
    const [mainPhoto, setMainPhoto] = useState('')

    useEffect(() => {
        const mainPhoto = sewClass.photos.find(p => p.mainPhoto)
        setMainPhoto(mainPhoto.fileKey)
       
    }, [sewClass])
    

    return (
        <Card  className="customer-class-card" style={{ backgroundImage: `url(${mainPhoto})` }}>
            <Container className="card-content d-flex flex-column justify-content-between ">
                
                <div className="mt-auto d-flex  justify-content-between py-3">
                    <h2>{sewClass.name}</h2>
                    <Button color='primary' size='lg' >Book</Button>
                </div>
            </Container>
        </Card>
    )
}