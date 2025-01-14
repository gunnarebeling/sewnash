/* eslint-disable react/prop-types */

import { Button } from 'reactstrap'
import { convertToDollars } from '../../managers/FormatFunctions'
import './SewClassCard.css'
import { deleteClass } from '../../managers/sewClassManager'
import { UpdateClassForm } from './classes/UpdateClassForm'
import { useEffect, useState } from 'react'



export const EmployeeSewClassCard = ({sewClass, showDelete, setClassChange}) => {
    const [mainPhoto, setMainPhoto] = useState('')
    
        useEffect(() => {
            const mainPhoto = sewClass.photos.find(p => p.mainPhoto)
            setMainPhoto(mainPhoto?.fileKey)
           
        }, [sewClass])
    const handleDelete = (e) => {
        e.stopPropagation()
        const id = e.target.dataset.id
        deleteClass(id).then((response) => {
            if (response.status === 400) {
                alert("can't delete there are future bookings for this class")
            }
            setClassChange(c => !c)

        })
    }

    return (
        <div className='card d-flex border border-3 flex-row align-times-start'>
            <div>
                <img src={mainPhoto ? mainPhoto : 'https://tinyurl.com/sewnashpic'} alt={`class photo`} className=" employee-class-img "/>
            </div> 
            <div className="details d-flex flex-column ">
                <div className="info ">
                    <div className="mx-1 d-flex justify-content-start mb-1">
                       
                        <h5>{sewClass?.name}</h5>
                       
                    </div>
                    <div className="my-2 mb-1"><span ><span style={{backgroundColor:'rgba(169, 235, 26, 0.472)'}}>{convertToDollars(sewClass.pricePerPerson)}</span> each</span></div>
                    <div className="my-2 mb-1"><span>Max capacity: {sewClass.maxPeople}</span></div>
                    <div className="my-2 mb-1"><span>Duration: {sewClass.duration} hours</span></div>
                    {showDelete && 
                        <div className='my-3 d-flex align-items-center'>
                            <Button size='sm' color='danger' className='m-1' data-id={sewClass.id} onClick={handleDelete}>delete</Button>
                            <UpdateClassForm sewClass={sewClass} setClassChange={setClassChange} />
                        </div>
                    }
                    
                </div>
            
            </div>
        </div>
    )
}