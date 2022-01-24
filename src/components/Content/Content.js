import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Menu from '../Menu/Menu'
import styled from 'styled-components'

import ABIs from '../../config/abis.json'
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

const Content = ({ account, provider }) => {
    const [ctokAmount, setCtokAmount] = useState(0)
    const [utilContract, setUtilContract] = useState()
    const [gnomeActive, setGnomeActive] = useState(-1)
    const [gnomideActive, setGnomideActive] = useState(-1)
    const [crobyActive, setCrobyActive] = useState(-1)
    const [crognomeList, setCrognomeList] = useState([])
    const [crognomideList, setCrognomideList] = useState([])
    const [crobyList, setCrobyList] = useState([])

    const getTotalClaimable = async () => {
        const contract = new ethers.Contract(ABIs[0].address, ABIs[0].abi, provider.getSigner())
        const method = await contract.getTotalClaimable(account)
        setCtokAmount((parseInt(method.toString(10)) / (10 ** 18)).toFixed(2))
    }

    const getReward = async () => {
        await utilContract.getReward(account)
        getTotalClaimable()
    }

    const getCroNFTList = async () => {
        setCrognomeList(await getWalletOfOwner(1))
        setCrognomideList(await getWalletOfOwner(2))
        setCrobyList(await getWalletOfOwner(3))
    }

    const getWalletOfOwner = async (index) => {
        const contract = new ethers.Contract(ABIs[index].address, ABIs[index].abi, provider)
        console.log("owner:", await contract.walletOfOwner(account))
        return await contract.walletOfOwner(account)
    }

    const breedCroNFTs = async () => {
        const contract = new ethers.Contract(ABIs[4].address, ABIs[4].abi, provider.getSigner())
        const allowance = await contract.allowance(account, ABIs[0].address)
        if (new BigNumber(allowance.toString()).lt(new BigNumber(300).times(10 ** 18))) {
            const tx = await contract.approve(ABIs[0].address, "300000000000000000000000")
            await tx.wait()
        }
        await utilContract.breedCroby(crognomeList[gnomeActive], crognomideList[gnomideActive])
        await getCroNFTList()
    }

    const growCroby = async () => {
        await utilContract.growUp(crobyList[crobyActive])
        await getCroNFTList()
    }

    const checkBalance = async (limit) => {
        const contract = new ethers.Contract(ABIs[4].address, ABIs[4].abi, provider)
        if (contract.balanceOf(account) < limit) return false;
        return true;
    }

    useEffect(() => {
        if (account != undefined) {
            setUtilContract(new ethers.Contract(ABIs[0].address, ABIs[0].abi, provider.getSigner()))
            getTotalClaimable()
            getCroNFTList()
        }
    }, [account])

    return (
        <>
            <Grid container style={{ justifyContent: 'center', marginTop: 120, height: '100%' }}>
                <MBox>
                    <TextTitle>Claim Your CCL Tokens</TextTitle>
                    <MButton>{ctokAmount} CLAIMABLE TOKENS</MButton>
                    <SButton onClick={getReward}>CLAIM</SButton>
                </MBox>
                <MBox>
                    <Box>
                        <TextTitle>Breed Your Croby</TextTitle>
                        <SubTitle>Required: 300 CCL</SubTitle>
                    </Box>
                    <Menu title='SELECT YOUR CROGNOME'
                        name='CROGNOME'
                        items={crognomeList}
                        active={gnomeActive}
                        setActive={setGnomeActive} />
                    <Menu title='SELECT YOUR CROGNOMIDE'
                        name='CROGNOMIDE'
                        items={crognomideList}
                        active={gnomideActive}
                        setActive={setGnomideActive} />
                    <SButton onClick={breedCroNFTs}>BREED</SButton>
                </MBox>
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
                    <SButton onClick={growCroby}>GROW UP</SButton>
                </MBox>
            </Grid>
            <GnomeDiv>
                <img src={Gnomes} style={{ width: 271, height: 144, marginTop: -20 }} />
            </GnomeDiv>
        </>
    )
}

export default Content