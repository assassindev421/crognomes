import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Grid from '@mui/material/Grid'
import styled from 'styled-components'

import ABIs from '../../config/abis.json'
import Gnomes from '../../assets/gnomes.png'

import Claim from './Claim/Claim'
import Breed from './Breed/Breed'
import Grow from './Grow/Grow'

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

const Content = ({ account, provider }) => {
    const [utilContract, setUtilContract] = useState()
    const [crobyList, setCrobyList] = useState([])

    useEffect(() => {
        if (account !== undefined) {
            setUtilContract(new ethers.Contract(ABIs[0].address, ABIs[0].abi, provider.getSigner()))
        }
    }, [account])

    return (
        <>
            <Grid container style={{ justifyContent: 'center', marginTop: 120, height: '100%' }}>
                <Claim account={account}
                    provider={provider}
                    utilContract={utilContract} />
                <Breed account={account}
                    provider={provider}
                    utilContract={utilContract}
                    setCrobyList={setCrobyList} />
                <Grow account={account}
                    provider={provider}
                    utilContract={utilContract}
                    crobyList={crobyList}
                />
            </Grid>
            <GnomeDiv>
                <img src={Gnomes} style={{ width: 271, height: 144, marginTop: -20 }} />
            </GnomeDiv>
        </>
    )
}

export default Content