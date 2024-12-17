/* eslint-disable react/prop-types */

import './SewClassCard.css'



export const SewClassCard = ({sewClass}) => {

    
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
                    <div className="m-2 mb-1"><span >something</span></div>
                    <div className="m-2 mb-1"><span>lefdsklfdsajfldsanfvdavdsavdafa</span></div>
                    
                </div>
            
            </div>
        </div>
    )
}