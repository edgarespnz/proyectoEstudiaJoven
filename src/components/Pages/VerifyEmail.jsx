import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom/dist'

export default function VerifyEmail() {

    const { currentUser } = useAuth()
    const navigate = useNavigate()
    
    const isEmailVerified=()=>{
        if(currentUser.isEmailVerified === true){
            navigate("/dashboard")
        }
    }

    useEffect(()=>{
        console.log(currentUser)
    },[])

    return (
        <>
            <div class="displayTable p-5">
                <div class="displayTableCell">
                    <div class="authBlock">
                        <h3 className='text-center'>Thank You for Registering</h3>
                        <div class="formGroup">
                            <p class="text-center">We have sent a confirmation email to <strong>{currentUser.email}</strong>.</p>
                            <p class="text-center">Please check your email and click on the link to verfiy your email address.</p>
                        </div>

                        <div class="formGroup d-flex align-content-center justify-content-center">
                            <Button><i class="fas fa-redo-alt"></i> Resend Verification Email</Button>
                        </div>
                    </div>
                    <div class="redirectToLogin text-center mt-3">
                        <span>Go back to?<Link class="redirect" to="/login"> Sign in</Link></span>
                    </div>
                </div >
            </div >
        </>
    )
}
