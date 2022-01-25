import { useEffect, useState } from "react"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import styled from 'styled-components'
import LoadingButton from '@mui/lab/LoadingButton'

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
    .Mui-disabled {
        background-color: rgba(253,218,51,0.8) !important;
    }

    .MuiCircularProgress-colorInherit {
        color: green !important;
    }

    .MuiLoadingButton-loadingIndicator {
        left: 68%;
    }
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

const Claim = ({ account, web3, utilContract }) => {
    const [ctokAmount, setCtokAmount] = useState(0)
    const [loading, setLoading] = useState(false)

    const getTotalClaimable = async () => {
        const contract = new web3.eth.Contract(ABIs[0].abi, ABIs[0].address)
        const method = await contract.methods.getTotalClaimable(account).call()
        setCtokAmount((parseInt(method.toString(10)) / (10 ** 18)).toFixed(2))
        setLoading(false)
    }

    const getReward = async () => {
        setLoading(true)
        await utilContract.methods.getReward(account).send({
            from: account
        })
        getTotalClaimable()
    }

    const migrate = async () => {
        setLoading(true)
        const contract = new web3.eth.Contract(ABIs[1].abi, ABIs[1].address)
        await contract.methods.migrateFromOldCrognome().send({
            from: account
        })
        setLoading(false)
    }

    useEffect(() => {
        if (account !== undefined) {
            getTotalClaimable()
        }
    }, [account])

    return (
        <MBox>
            <TextTitle>Claim Your CCL Tokens</TextTitle>
            <MButton onClick={getTotalClaimable}>
                {ctokAmount} CLAIMABLE TOKENS
            </MButton>
            <Box>
                <SButton loading={loading}
                    onClick={getReward}
                    variant="contained"
                >CLAIM</SButton>
                <SButton loading={loading}
                    onClick={migrate}
                    variant="contained"
                    style={{ marginTop: 20 }}
                >
                    MIGRATE
                </SButton>
            </Box>
        </MBox>
    )
}

export default Claim