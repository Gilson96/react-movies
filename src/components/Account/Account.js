import React from 'react'
import {
  Avatar,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FilmIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { useGetAccountDetailsQuery } from '../../features/Account/accountApi';
import useScreenSize from '../../features/useScreenSize'
import { Spinner } from '@chakra-ui/react'

const Account = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const { data: account = [], isLoading } = useGetAccountDetailsQuery()
  const screenSize = useScreenSize()

  return (
    <>
      {screenSize.width > 750 ?
        isLoading ?
          <div ref={btnRef} onClick={onOpen} className='flex h-[3.2rem] gap-2 justify-center items-center border rounded-full bg-black/5 cursor-pointer w-[7rem]'>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='lg'
            />
          </div>
          :
          <div ref={btnRef} onClick={onOpen} className='flex h-[3.2rem] w-[10%] gap-2 justify-center items-center border rounded-full bg-black/5 cursor-pointer'>
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
              <DrawerContent background='#090E17'>
                <DrawerCloseButton color={'white'} />
                <DrawerHeader className='flex gap-2 text-white'> <Avatar src='https://bit.ly/broken-link' size='sm' />User</DrawerHeader>
                <DrawerBody className='flex flex-col h-full w-full justify-start items-start gap-5'>

                  <Link to='/movies/myMovies' state={account} className='w-full'>
                    <div className='flex w-[10rem] h-[3rem] justify-center items-center rounded-full p-[2%] cursor-pointer gap-2 border border-[#F6F7EB] text-white hover:text-slate-300'>
                      <FilmIcon className='h-[2rem] w-[2rem] ' />
                      <p className='text-lg '>My Movies</p>
                    </div>
                  </Link>

                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </div>
        :
        isLoading ?

          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='lg'
          />

          :
          <div ref={btnRef} onClick={onOpen} >
            <Avatar src='https://bit.ly/broken-link' size='sm' />
            <Drawer
              isOpen={isOpen}
              placement='right'
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent background='#090E17'>
                <DrawerCloseButton color={'white'} />
                <DrawerHeader className='flex gap-2 text-white'> <Avatar src='https://bit.ly/broken-link' size='sm' />User</DrawerHeader>
                <DrawerBody className='flex flex-col h-full w-full justify-start items-start gap-5'>

                  <Link to='/movies/myMovies' state={account} className='w-full'>
                    <div className='flex w-[10rem] h-[3rem] justify-center items-center rounded-full p-[2%] cursor-pointer gap-2 border border-[#F6F7EB] text-white hover:text-slate-300'>
                      <FilmIcon className='h-[2rem] w-[2rem] ' />
                      <p className='text-lg '>My Movies</p>
                    </div>
                  </Link>

                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </div>
      }


    </>
  )
}

export default Account