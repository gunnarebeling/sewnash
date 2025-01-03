/* eslint-disable react/prop-types */

import { Button } from 'reactstrap'
import { convertToDollars } from '../../../managers/FormatFunctions'
import './SewClassCard.css'
import { deleteClass } from '../../../managers/sewClassManager'
import { UpdateClassForm } from '../../employee/classes/UpdateClassForm'



export const SewClassCard = ({sewClass, showDelete, setClassChange}) => {
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
        <div className='card d-flex flex-row align-times-start'>
            <div>
                <img src={`https://static.wixstatic.com/media/cc057e_078e2d80a13a44cba226ea4549b9a745~mv2.png/v1/fill/w_250,h_250,al_c,q_95,enc_auto/cc057e_078e2d80a13a44cba226ea4549b9a745~mv2.png`} alt={`album art`} className="img-fluid custom-img fixed-size"/>
            </div> 
            <div className="details d-flex flex-column ">
                <div className="info ">
                    <div className="mx-1 d-flex justify-content-between  mb-1">
                        <span className="m-2 mb-1" >{sewClass?.name}</span>

                    </div>
                    <div className="m-2 mb-1"><span >{convertToDollars(sewClass.pricePerPerson)} per person</span></div>
                    <div className="m-2 mb-1"><span>Max capacity: {sewClass.maxPeople}</span></div>
                    <div className="m-2 mb-1"><span>Duration: {sewClass.duration} hours</span></div>
                    {showDelete && 
                        <div className='m-3'>
                            <Button color='danger' className='m-1' data-id={sewClass.id} onClick={handleDelete}>delete</Button>
                            <UpdateClassForm sewClass={sewClass} setClassChange={setClassChange} />
                        </div>
                    }
                    
                </div>
            
            </div>
        </div>
    )
}