import React from 'react'

import { Link } from 'react-router-dom'

import * as ROUTES from '../constants/routes'

import styled from 'styled-components'

const FooterWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 5vh;

    padding: 30px;

    background-color: #0061FF;

    a { 
        font-size: 18px;
        color: white;

        text-decoration: none;

        &:hover {
            text-decoration: none;
        }
    }
`

const SignUpFooter = () => {
    return (
        <FooterWrapper>
                <Link to={ROUTES.LANDING} className="footer_btns">Back</Link>
                <Link to={ROUTES.HOME} className="footer_btns">Sign Up</Link>
        </FooterWrapper>
    )
}

export default SignUpFooter