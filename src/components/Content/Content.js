import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Menu from '../Menu/Menu'
import styled from 'styled-components'

import Gnomes from '../../assets/gnomes.png'

const GnomeDiv = styled.div`
    max-width: 730px;
    width: 90%;
    height: 125px;
    background-color: white;
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: center;
`

const TextTitle = styled.div`
    color: #FDDA33;
    font-size: 60px;
    text-shadow: 4px 0 0 #000, -4px 0 0 #000, 0 4px 0 #000, 0 -4px 0 #000, 2px 2px #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000;
`

const SubTitle = styled.div`
    color: #F2024C;
    font-size: 30px;
    margin-top: 20px;
    text-shadow: 3px 0 0 #000, -3px 0 0 #000, 0 3px 0 #000, 0 -3px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;
`

const MBox = styled(Box)`
    text-align: center;
    width: 525px;
    height: 500px;
    font-family: Chewy !important;
    text-transform: none !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 100px;
`

const MButton = styled(Button)`
    background-color: rgba(196,196,196,0.7) !important;
    border-radius: 17px !important;
    font-family: Chewy !important;
    font-size: 20px !important;
    line-height: 26px !important;
    text-shadow: 0px 3px rgba(0,0,0,0.4);
    color: white !important;
    margin-left: auto !important;
    margin-right: auto !important;
    max-width: 400px;
    width: 90%;
    height: 87px;
`

const SButton = styled(Button)`
    background-color: #FDDA33 !important;
    border-radius: 10px !important;
    font-family: Chewy !important;
    font-size: 20px !important;
    line-height: 26px !important;
    text-shadow: 0px 3px rgba(0,0,0,0.4);
    color: white !important;
    margin-left: auto !important;
    margin-right: auto !important;
    max-width: 300px;
    width: 90%;
    height: 57px;
`

const Content = () => {
    const [gnomeActive, setGnomeActive] = useState(-1)
    const [gnomideActive, setGnomideActive] = useState(-1)
    const [crobyActive, setCrobyActive] = useState(-1)

    return (
        <>
            <Grid container style={{justifyContent:'center',marginTop:120, height:'100%'}}>
                <MBox>
                    <TextTitle>Claim Your CCL Tokens</TextTitle>
                    <MButton>XXX CLAIMABLE TOKENS</MButton>
                    <SButton>CLAIM</SButton>
                </MBox>
                <MBox>
                    <Box>
                        <TextTitle>Breed Your Croby</TextTitle>
                        <SubTitle>Required: 300 CCL</SubTitle>
                    </Box>
                    <Menu title='SELECT YOUR CROGNOME' items={['CROGNOME1', 'CROGNOME2']} active={gnomeActive} setActive={setGnomeActive} />
                    <Menu title='SELECT YOUR CROGNOMIDE' items={['CROGNOMIDE1', 'CROGNOMIDE2']} active={gnomideActive} setActive={setGnomideActive} />
                    <SButton>BREED</SButton>
                </MBox>
                <MBox>
                    <Box>
                        <TextTitle>Grow Up Your Croby</TextTitle>
                        <SubTitle>Required: 445 CCL</SubTitle>
                    </Box>
                    <Menu title='SELECT YOUR CROBY' items={['CROBY1', 'CROBY2']} active={crobyActive} setActive={setCrobyActive} />
                    <SButton>GROW UP</SButton>
                </MBox>
            </Grid>
            <GnomeDiv>
                <img src={Gnomes} style={{width:271,height:144,marginTop:-20}} />
            </GnomeDiv>
        </>
    )
}

export default Content