import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Button } from 'react-bootstrap'

export default function VerifyEmail() {

    const {currentUser} = useAuth()

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
            <div class="redirectToLogin">
                <span>Go back to?<span class="redirect" routerLink="/sign-in"> Sign in</span></span>
            </div>
        </div >
</div >
    </>
  )
}
