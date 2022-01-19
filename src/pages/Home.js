import React from 'react'
import styled from 'styled-components'

import Header from '../components/Header/Header'
import Content from '../components/Content/Content'
import Footer from '../components/Footer/Footer'

const Wrapper = styled.div`
    background-image: url('images/forest.png');
    background-size: cover;
    background-repeat: no-repeat;
    font-family: Chewy;
    width: 100%;
`

const Shadow = styled.div`
    background-color: rgba(51,51,51,0.58);
    padding-bottom: 100px;
`

const Home = () => {
    return (
        <div className='top' style={{height:'100%'}}>
            <Wrapper>
                <Shadow>
                    <Header/>
                    <Content/>
                </Shadow>
            </Wrapper>
            <Footer/>
        </div>
    )
}

export default Home