import { useState } from 'react'
import Link from '@mui/material/Link'
import styled from 'styled-components'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { motion, AnimatePresence } from 'framer-motion'
import { Divide as Hamburger } from 'hamburger-react'
import { useMedia } from 'react-use'

const MenuContainer = styled(Container)`
    width: 100%;
    display: none;
    text-align: center;
    padding-top: 50px;
`

const MobileMenuContainer = styled.div`
    padding-top: 30px;
    margin-left: 20px;
    .hamburger-react {
        z-index: 1001;
    }
`

const LinkText = styled(Link)`
    color: #FFDB32 !important;
    font-family: Montserrat;
    font-size: 20px;
    font-weight: 800;
    line-height: 24.38px;
    text-decoration: none !important;
    cursor: pointer;
    margin: 0px 29px !important;
`

const MButton = styled(Button)`
    background-color: #977D00 !important;
    border-radius: 10px !important;
    font-family: Chewy !important;
    font-size: 18px !important;
    line-height: 26px !important;
    text-shadow: 0px 3px rgba(0,0,0,0.4);
    color: white !important;
    width: 185px;
    height: 55px;
    position: absolute !important;
    top: 30px;
    right: 20px;
`

const wrapperVariants = {
    hidden: { x: "100%" },
    visible: { x: "0%" },
};

const BurgerMenu = () => {
    return (
        <AnimatePresence exitBeforeEnter>
            <Wrapper
                variants={wrapperVariants}
                initial="hidden"
                animate={{ x: [-250, 0] }}
                exit="hidden"
                transition={{ duration: 0.125 }}>
                <LinkText>The Story</LinkText>
                <LinkText>Roadmap</LinkText>
                <LinkText>Housing a Crognome</LinkText>
                <LinkText>FAQ</LinkText>
            </Wrapper>
        </AnimatePresence>
    )
}

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const isMobile = useMedia('(max-width: 1075px)')

    return (
        <>
            {!isMobile ? 
                <MenuContainer>
                    <LinkText>The Story</LinkText>
                    <LinkText>Roadmap</LinkText>
                    <LinkText>Housing a Crognome</LinkText>
                    <LinkText>FAQ</LinkText>
                </MenuContainer> :
                <MobileMenuContainer>
                    <Hamburger color="#977D00" rounded toggled={isOpen} toggle={setIsOpen}/>
                    { isOpen && <BurgerMenu /> }
                </MobileMenuContainer>
            }
            <MButton>
                CONNECT YOUR WALLET
            </MButton>
        </>
    )
}

const Wrapper = styled(motion.div)`
  height: 100%;
  width: 100%;
  background: rgba(7, 2, 19, 0.9);
  z-index: 1000;

  position: fixed;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 30px;
  padding-top: 150px;
`;

export default Header