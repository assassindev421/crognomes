import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'
import Menu from '../../Menu/Menu'
import styled from 'styled-components'

import ABIs from '../../../config/abis.json'
import Web3 from 'web3'

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

const Breed = ({ account, web3, utilContract, setCrobyList }) => {
    const [gnomeActive, setGnomeActive] = useState(-1)
    const [gnomideActive, setGnomideActive] = useState(-1)
    const [crognomeList, setCrognomeList] = useState([])
    const [crognomideList, setCrognomideList] = useState([])
    const [loading, setLoading] = useState(false)

    const breedCroNFTs = async () => {
        setLoading(true)
        const contract = new Web3.eth.Contract(ABIs[4].abi, ABIs[4].address)
        const allowance = await contract.methods.allowance(account, ABIs[0].address).call()
        const balance = await contract.methods.balanceOf(account).call()
        if (new BigNumber(balance.toString()).lt(new BigNumber(300).times(10 ** 18))) {
            alert("You do not have enough CCL token for breed")
        }
        if (new BigNumber(allowance.toString()).lt(new BigNumber(300).times(10 ** 18))) {
            await contract.methods.approve(ABIs[0].address, "300000000000000000000000").send({
                from: account
            })
        }
        await utilContract.methods.breedCroby(crognomeList[gnomeActive], crognomideList[gnomideActive]).send({
            fromt: account
        })
        await getCroNFTList()
        setLoading(false)
    }

    const getCroNFTList = async () => {
        setCrognomeList(await getWalletOfOwner(1))
        setCrognomideList(await getWalletOfOwner(2))
        setCrobyList(await getWalletOfOwner(3))
    }

    const getWalletOfOwner = async (index) => {
        const contract = new web3.eth.Contract(ABIs[index].abi, ABIs[index].address)
        return await contract.methods.walletOfOwner(account).call()
    }

    useEffect(() => {
        if (account !== undefined) {
            getCroNFTList()
        }
    }, [account])

    return (
        <MBox>
            <Box>
                <TextTitle>Breed Your Croby</TextTitle>
                <SubTitle>Required: 300 CCL</SubTitle>
            </Box>
            <Menu title='SELECT YOUR CROGNOME'
                name='CROGNOME'
                items={crognomeList}
                active={gnomeActive}
                setActive={setGnomeActive}
                disabled={loading}
            />
            <Menu title='SELECT YOUR CROGNOMIDE'
                name='CROGNOMIDE'
                items={crognomideList}
                active={gnomideActive}
                setActive={setGnomideActive}
                disabled={loading}
            />
            <SButton loading={loading}
                onClick={breedCroNFTs}>BREED</SButton>
        </MBox>
    )
}

export default Breed