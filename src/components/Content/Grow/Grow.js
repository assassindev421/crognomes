import { useState } from "react"
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

const Grow = ({ account, web3, rightChain, utilContract, crobyList, setCrobyList, setAlert, setNotice }) => {
    const [crobyActive, setCrobyActive] = useState(-1)
    const [loading, setLoading] = useState(false)

    const getWalletOfOwner = async (index) => {
        const contract = new web3.eth.Contract(ABIs[index].abi, ABIs[index].address)
        return await contract.methods.walletOfOwner(account).call()
    }

    const getCrobyList = async () => {
        const list = await getWalletOfOwner(3)
        setCrobyActive(-1)
        setCrobyList(list)
    }

    const growCroby = async () => {
        if (crobyActive !== -1) {
            setLoading(true);
            try {
                const contract = new web3.eth.Contract(ABIs[4].abi, ABIs[4].address)
                const allowance = await contract.methods.allowance(account, ABIs[0].address).call()
                const balance = await contract.methods.balanceOf(account).call()
                if (new BigNumber(balance.toString()).lt(new BigNumber(445).times(10 ** 18))) {
                    setNotice(["error", "Sorry, you do not have enough CCL token for breed"])
                    setAlert(true)
                }
                if (new BigNumber(allowance.toString()).lt(new BigNumber(445).times(10 ** 18))) {
                    await contract.methods.approve(ABIs[0].address, "300000000000000000000000").send({
                        from: account
                    })
                }
                await utilContract.methods.growUp(crobyList[crobyActive]).send({
                    from: account
                })
                await getCrobyList()
                setNotice(["success", "Your croby has grown"])
                setAlert(true)
                setLoading(false)
                // await getCroNFTList()
            } catch (e) {
                setNotice(["error", "Sorry, error occured during the transaction"])
                setAlert(true)
                setLoading(false)
            }
        } else {
            setNotice(["error", "Please select croby to grow"])
            setAlert(true)
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
            <SButton loading={loading}
                onClick={growCroby}
                disabled={!rightChain}>GROW UP</SButton>
        </MBox>
    )
}

export default Grow