import axios from 'axios';
import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faPrint } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const [error, setError] = useState<string | null>(null);
    const [calculating, setCalculating] = useState<boolean>(false);
    const [bill, setBill] = useState<number>(0);
    const [totalSystemCost, setTotalSystemCost] = useState<number | null>(null);
    const [schedules, setSchedules] = useState<any |null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [validationError, setValidationError] = useState<string[]>([]);
    const form = useRef<HTMLFormElement | null>(null);

    const printContent = () => {
        var content = document.getElementById('printArea')?.innerHTML ?? "";
        var originalContent = document.body.innerHTML ?? "";
        document.body.innerHTML = content;
        window.print();
        document.body.innerHTML = originalContent;
    }

    const calculateSolarCost = async (e : any) => {
        e.preventDefault();
        try {
            setIsVisible(false);
            setTotalSystemCost(null);
            setSchedules(null);
            setCalculating(true);
            const response = await axios.post(`/calculate`, {
                data: bill
            });
            if(!response.data.status) {
                throw new Error(response.data.error)
            }
            setTotalSystemCost(response.data.total_system_cost);
            setSchedules(response.data.schedules);
            setCalculating(false);
            setIsVisible(true);
        } catch (err : any) {
            setCalculating(false);
            const error = err.response ? err.response.data.error : err.message;
            setError(error);
        }
    }

    const moveCursorToEnd = (e : any) => {
        const target = e.currentTarget;
        setTimeout(() => {
            target.selectionStart = target.value.length;
            target.selectionEnd = target.value.length;
        }, 10);
    }

    const contactUs = async (e : any) => {
        e.preventDefault();

        try {
            setSubmitting(true);
            if(!form.current) {
                setSubmitting(false);
                return 
            }
            const formdata = new FormData(form.current)
            const formObject : any = {};
            formdata.forEach((value, key) => {
                formObject[key] = value;
            });

            const jsonString = JSON.stringify(formObject);
            const response = await axios.post(`/contactUs`, jsonString);
            if(response.data.validationError) {
                setValidationError(response.data.validationError);
            }
            if(!response.data.status) {
                throw new Error(response.data.error);
            }
            setSubmitting(false);
            global.config.methods.successResponse('Thank you! We will be in touch with you soon.')
            .then(() => {
                window.location.reload()
            });
        } catch (err : any) {
            setSubmitting(false);
            const error = err.response ? err.response.data.error : err.message;
            global.config.methods.errorResponse(error);
        }
    }

    return (
        <div className='container pt-5 pb-5'>
            {
                error && (
                    <div className='alert alert-danger'>
                        {error}
                    </div>
                )
            }
            <div className='card' style={{ 
                background: 'linear-gradient(to bottom right, white, rgba(255,255,255,.5))',
                borderRadius: '2vh',
                border: 'none',
                boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
            }}>
                <div className='card-body p-4'>
                    <h1 className="heading">Embrace Solar Energy – Save Money and Protect the Planet</h1>
                    <p className="pitch">
                        Integrating solar energy into your home is an investment in both your future and the environment. By harnessing the power of the sun, you can significantly reduce your electricity bills while contributing to a greener, more sustainable world.
                    </p>

                    <div className="statistics">
                        <h2>Did you know?</h2>
                        <ul>
                            <li>Up to 30% savings on energy bills for households that switch to solar.</li>
                            <li>The average Malaysian household can save over RM 1,500 annually on electricity costs.</li>
                            <li>With solar panel installation, the average payback period is around 5 to 7 years, after which you start saving even more.</li>
                        </ul>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="cost">Your monthly electricity bill (RM)</label>
                        <input type="text" 
                        className='form-control text-end' 
                        id='cost' 
                        onChange={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');
                            e.target.value = (Number(e.target.value.replace('.', ''))/100).toFixed(2);
                            setBill(Number((Number(e.target.value.replace('.', ''))/100).toFixed(2)));
                        }}
                        onClick={moveCursorToEnd}
                        onFocus={moveCursorToEnd}
                        value={global.config.methods.toCurrencyWithDecimals(bill)}/>
                    </div>
                    <div className='d-flex justify-content-end mt-3'>
                        <button className='btn btn-lg action-btn' onClick={calculateSolarCost}>CALCULATE YOUR COST
                            {
                                calculating && (
                                    <div className='spinner spinner-border spinner-border-sm' style={{ 
                                        marginLeft: 5
                                     }}></div>
                                )
                            }
                        </button>
                    </div>
                    <div 
                    id='printArea'
                    className={`card mt-3 table-container ${isVisible ? 'show' : ''}`}
                    style={{ 
                        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                        border: 'none'
                     }}>
                        <div className='card-body'>
                            <div className='d-flex justify-content-end'>
                                <button className='btn btn-sm action-btn' onClick={printContent}>
                                    <FontAwesomeIcon icon={faPrint} />
                                </button>
                            </div>
                            <h5>Total system cost: RM{global.config.methods.toCurrencyWithDecimals(totalSystemCost)}</h5>
                            <p>Checkout the monthly repayment with your total system cost</p>
                            <div className='table-responsive'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            {
                                                schedules && Object.keys(schedules).map(index => {
                                                    return (
                                                        <th key={index}>{ index } months</th>
                                                    )
                                                })
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {
                                                schedules && Object.keys(schedules).map(index => {
                                                    return (
                                                        <td key={index}>RM {global.config.methods.toCurrencyWithDecimals(schedules[index])}</td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className='mt-3'>Would you like to discuss further with one of our agents?</p>
                            <div className='d-flex justify-content-end'>
                                <button className='btn btn-sm action-btn' onClick={() => {
                                    setShowModal(true)
                                }}>
                                    CONTACT US
                                </button>
                            </div>
                        </div>
                        {
                            showModal && (
                                <div className={`modal-backdrop fade ${showModal ? 'show' : ''}`}></div>
                            )
                        }
                        <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header d-flex justify-content-between">
                                        <h5 className="modal-title">We're excited to assist you with your journey!</h5>
                                    </div>
                                    <div className="modal-body">
                                        <form id='contactForm' ref={form}>
                                            <div className='form-group'>
                                                <label htmlFor="fullname">Full name as per NRIC
                                                <FontAwesomeIcon icon={faAsterisk} className='fa-xs text-danger'/>
                                                </label>
                                                <input 
                                                type="text" 
                                                className='form-control text-end' 
                                                id='fullname' 
                                                name='fullname'
                                                style={{ 
                                                    border: validationError.includes('fullname') ? '1px solid red' : ''
                                                 }}
                                                 onChange={(e) => {
                                                    const index = validationError.findIndex(x => x === 'fullname')
                                                    if(!e.target.value) {
                                                        if(index === -1) {
                                                            validationError.push('fullname');
                                                        }
                                                    } else {
                                                        if(index !== -1) {
                                                            validationError.splice(index, 1);
                                                        }
                                                    }
                                                    setValidationError([...validationError]);
                                                 }}/>
                                                 {
                                                    validationError.includes('fullname') && (
                                                        <small className='text-danger'>Name is required.</small>
                                                    )
                                                 }
                                            </div>
                                            <div className='form-group mt-3'>
                                                <label htmlFor="email">Email
                                                    <FontAwesomeIcon icon={faAsterisk} className='fa-xs text-danger'/>
                                                </label>
                                                <input type="text" 
                                                className='form-control text-end' 
                                                id='email' 
                                                name='email'
                                                onChange={(e) => {
                                                    const index = validationError.findIndex(x => x === 'email');
                                                    if(!e.target.value) {
                                                        if(index === -1) {
                                                            validationError.push('email');
                                                        } 
                                                    } else {
                                                        if(index !== -1) {
                                                            validationError.splice(index, 1);
                                                        }
                                                    }

                                                    const formatIndex = validationError.findIndex(x => x === 'email-format');
                                                    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                                                    if(!emailRegex.test(e.target.value)) {
                                                        if(formatIndex === -1) {
                                                            validationError.push('email-format');
                                                        } 
                                                    } else {
                                                        if(formatIndex !== -1) {
                                                            validationError.splice(formatIndex, 1);
                                                        }
                                                    }
                                                    setValidationError([...validationError]);
                                                }}
                                                style={{
                                                    border:(validationError.includes('email-format') || validationError.includes('email')) ? '1px solid red': ''
                                                }}/>
                                                {
                                                    validationError.includes('email') && (
                                                        <small className='text-danger'>Email is required.</small>
                                                    )
                                                }
                                                {
                                                    validationError.includes('email-format') && (
                                                        <small className='text-danger'>Invalid email format.</small>
                                                    )
                                                }
                                            </div>
                                            <div className='form-group mt-3'>
                                                <label htmlFor="contact">Contact
                                                    <FontAwesomeIcon icon={faAsterisk} className='fa-xs text-danger'/>
                                                </label>
                                                <input type="text" 
                                                className='form-control text-end' 
                                                id='contact' 
                                                name='contact'
                                                style={{ 
                                                    border: (validationError.includes('contact') || 
                                                    validationError.includes('contact-format')) ? '1px solid red' : ''
                                                 }}
                                                onChange={(e) => {

                                                }}/>
                                                {
                                                    validationError.includes('contact') ? (
                                                        <small className='text-danger'>Contact is required.</small>
                                                    ) :
                                                    validationError.includes('contact-format') && (
                                                        <small className='text-danger'>Invalid contact format.</small>
                                                    )
                                                }
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" 
                                        className="btn text-white" 
                                        style={{ 
                                            borderRadius: '2vh',
                                            backgroundColor: 'lightgrey'
                                         }}
                                        onClick={() => {
                                            setShowModal(false)
                                        }}>Cancel</button>
                                        <button type="button" 
                                        className="btn action-btn"
                                        onClick={contactUs}>Submit
                                        {
                                            submitting && (
                                                <div className='spinner spinner-border spinner-border-sm' style={{ 
                                                    marginLeft: 5,
                                                    fontSize: 12
                                                }}></div>
                                            )
                                        }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home