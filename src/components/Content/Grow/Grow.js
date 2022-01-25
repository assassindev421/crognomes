import { useState } from "react"
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import Box from '@mui/material/Box'
import styled from 'styled-components'
import LoadingButton from '@mui/lab/LoadingButton'
import Menu from '../../Menu/Menu'

import ABIs from '../../../config/abis.json'

const TextTitle = styled.div`
    color: #FDDA33;
    font-size: 60px;
    text-shadow: 4px 0 0 #000, -4px 0 0 #000, 0 4px 0 #000, 0 -4px 0 #000, 2px 2px #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000;
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

    .MuiCircularProgress-colorInherit {
        color: green !important;
    }

    .MuiLoadingButton-loadingIndicator {
        left: 68%;
    }
`

const SubTitle = styled.div`
    color: #F2024C;
    font-size: 30px;
    margin-top: 20px;
    text-shadow: 3px 0 0 #000, -3px 0 0 #000, 0 3px 0 #000, 0 -3px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;
`

const SButton = styled(LoadingButton)`
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

const Grow = ({ account, provider, utilContract, crobyList }) => {
    const [crobyActive, setCrobyActive] = useState(-1)
    const [loading, setLoading] = useState(false)

    const growCroby = async () => {
        if (crobyActive !== -1) {
            setLoading(true);
            const contract = new ethers.Contract(ABIs[4].address, ABIs[4].abi, provider.getSigner())
            const allowance = await contract.allowance(account, ABIs[0].address)
            const balance = await contract.balanceOf(account)
            if (new BigNumber(balance.toString()).lt(new BigNumber(445).times(10 ** 18))) {
                alert("You do not have enough CCL token for breed")
            }
            if (new BigNumber(allowance.toString()).lt(new BigNumber(445).times(10 ** 18))) {
                console.log(ABIs[0].address, "<!--step3--!>")
                await contract.approve(ABIs[0].address, "300000000000000000000000")
            }
            const tx = await utilContract.growUp(crobyList[crobyActive])
            await tx.wait()
            setLoading(false)
            // await getCroNFTList()
        }
    }

    return (
        <MBox>
            <Box>
                <TextTitle>Grow Up Your Croby</TextTitle>
                <SubTitle>Required: 445 CCL</SubTitle>
            </Box>
            <Menu title='SELECT YOUR CROBY'
                name='CROBY'
                items={crobyList}
                active={crobyActive}
                setActive={setCrobyActive} />
            <SButton loading={loading} onClick={growCroby}>GROW UP</SButton>
        </MBox>
    )
}

export default Grow