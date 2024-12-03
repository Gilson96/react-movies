import React from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  useDisclosure
} from '@chakra-ui/react'
import { Bars3Icon, FilmIcon } from '@heroicons/react/24/solid'

const NavigatorMobile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
      <div className='w-full h-full flex justify-between mt-[1%] px-[1%]'>
        <div className='flex w-full h-auto  items-center gap-2 '>
          <p className={`text-white font-bold text-xs `}>React-Movies</p>
          <FilmIcon className={`h-5 w-5 text-white`} />
        </div>

        <div className='w-full flex justify-end'>
          <Bars3Icon className='h-7 w-7 text-white' ref={btnRef} onClick={onOpen} />
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
        </div>

      </div>
    </>
  )
}

export default NavigatorMobile