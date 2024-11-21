import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Input,
    useDisclosure
  } from '@chakra-ui/react'
import { Bars3Icon } from '@heroicons/react/24/solid'

const NavigatorMobile = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
  
    return (
      <>
        <Bars3Icon className='h-7 w-7 text-white' ref={btnRef}  onClick={onOpen}/>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader className='bg-[#090E17] '>Create your account</DrawerHeader>
  
            <DrawerBody className='bg-[#090E17] '>
              <Input placeholder='Type here...' />
            </DrawerBody>
  
          </DrawerContent>
        </Drawer>
      </>
    )
}

export default NavigatorMobile