import React from 'react'
import { Link } from 'react-router-dom'
import { UserCircleIcon} from '@heroicons/react/24/solid'
import { useGetAccountDetailsQuery } from '../../features/Account/accountApi';
import { Spinner } from '@chakra-ui/react'

const Account = ({ ...rest }) => {
  const { data: account = [], isLoading } = useGetAccountDetailsQuery()

  return (
    <>

      {isLoading ?
        <div className='flex h-[3.2rem] gap-2 justify-center items-center border rounded-full bg-black/5 cursor-pointer w-[7rem]'>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='lg'
          />
        </div>
        :
        <div className='flex h-[3.2rem] w-auto gap-2 justify-center items-center cursor-pointer'>
          <Link to='/movies/myMovies' state={account} className='w-full'>
            <button
              {...rest}
              className="group relative px-4 py-2 font-medium text-slate-100 transition-colors duration-[400ms] hover:text-indigo-300"
            >

              <span className='flex items-center gap-2 text-xl'> <UserCircleIcon className='h-10 w-10' />My Account</span>

              {/* TOP */}
              <span className="absolute left-0 top-0 h-[2px] w-0 bg-indigo-300 transition-all duration-100 group-hover:w-full" />

              {/* RIGHT */}
              <span className="absolute right-0 top-0 h-0 w-[2px] bg-indigo-300 transition-all delay-100 duration-100 group-hover:h-full" />

              {/* BOTTOM */}
              <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-indigo-300 transition-all delay-200 duration-100 group-hover:w-full" />

              {/* LEFT */}
              <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-indigo-300 transition-all delay-300 duration-100 group-hover:h-full" />
            </button>
          </Link>

        </div>

      }


    </>
  )
}

export default Account