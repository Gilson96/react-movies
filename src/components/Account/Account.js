import React from 'react'
import {
  Avatar,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import background from '../../assets/background.jpg'
import { Link } from 'react-router-dom'
import { FilmIcon, TvIcon } from '@heroicons/react/24/outline'
import { ArrowRightStartOnRectangleIcon, ChevronDownIcon } from '@heroicons/react/24/solid'

const Account = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <div ref={btnRef} onClick={onOpen} className='flex h-[3.2rem] gap-2  justify-center items-center border rounded-full bg-black/5 cursor-pointer tablet:w-[18%] laptop:w-[12%] '>
      <Avatar src='https://bit.ly/broken-link' size='sm' />
      <p className='text-white'>User</p>
      <ChevronDownIcon className='w-5 h-5 text-white ' />
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent backgroundImage={background}>
          <DrawerCloseButton color={'white'} />
          <DrawerHeader className='flex gap-2 text-white'> <Avatar src='https://bit.ly/broken-link' size='sm' />User</DrawerHeader>
          <DrawerBody className='flex flex-col h-full w-full justify-start items-start gap-5'>
            <Link to='/movies/myMovies' className='w-full'>
              <div className='flex w-[80%] h-[3rem] justify-center items-center bg-white/75 rounded-full p-[2%] cursor-pointer gap-2 hover:bg-white/60'>
                <FilmIcon className='h-[2rem] w-[2rem] text-black' />
                <p className='text-lg'>My Movies</p>
              </div>
            </Link>
            <Link to='/series/mySeries' className='w-full'>
              <div className='flex w-[80%] h-[3rem] justify-center items-center bg-white/75 rounded-full p-[2%] cursor-pointer gap-2 hover:bg-white/60'>
                <TvIcon className='h-[2rem] w-[2rem] text-black' />
                <p className='text-lg'>My Series</p>
              </div>
            </Link>
          </DrawerBody>
          <DrawerFooter>
            <div className='flex gap-'>
              <ArrowRightStartOnRectangleIcon className='w-5 h-5 text-black' />
              <p>Log Out</p>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Account