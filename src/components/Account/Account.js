import React from 'react'
import { Link } from 'react-router-dom'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useGetAccountDetailsQuery } from '../../features/Account/accountApi';
import BarLoader from '../UI/BarLoader'
import useScreenSize from '../../features/useScreenSize';

const Account = ({ type, ...rest }) => {
  const { data: account = [], isLoading } = useGetAccountDetailsQuery()
  const screenSize = useScreenSize()
  
  return (
    <>

      {isLoading ?
        <div className='flex h-[3.2rem] gap-2 justify-center items-center w-[7rem]'>
          <UserCircleIcon className='h-10 w-10 text-white' />
          <BarLoader height={'h-5'} />
        </div>
        :
        <div className='flex h-[3.2rem] w-auto gap-2 justify-center items-center cursor-pointer'>
          <Link to='/movies/myMovies' state={type} className='w-full'>
            <button
              {...rest}
              className="group relative px-2 py-2 font-medium text-slate-100 transition-colors duration-[400ms] hover:text-neutral-300"
            >
              {screenSize.width < 700 ?
                <UserCircleIcon className='h-10 w-10' />
                :
                <span className='flex items-center gap-2 text-xl'> <UserCircleIcon className='h-10 w-10' />My Account</span>
              }


              {/* TOP */}
              <span className="absolute left-0 top-0 h-[2px] w-0 bg-neutral-300 transition-all duration-100 group-hover:w-full" />

              {/* RIGHT */}
              <span className="absolute right-0 top-0 h-0 w-[2px] bg-neutral-300 transition-all delay-100 duration-100 group-hover:h-full" />

              {/* BOTTOM */}
              <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-neutral-300 transition-all delay-200 duration-100 group-hover:w-full" />

              {/* LEFT */}
              <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-neutral-300 transition-all delay-300 duration-100 group-hover:h-full" />
            </button>
          </Link>

        </div>

      }


    </>
  )
}

export default Account