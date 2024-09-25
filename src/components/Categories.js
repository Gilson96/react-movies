import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const Categories = ({
    popular,
    action,
    adventure,
    animation,
    comedy,
    crime,
    drama,
    romance,
    thriller,
    categoryOne,
    categoryTwo,
    categoryThree,
    categoryFour,
    categoryFive,
    categorySix,
    categorySeven,
    categoryEight
}) => {

    return (
        <div className='w-full h-full mt-[2%]'>
            <Tabs variant='unstyled'>
                <TabList className='flex gap-2 tablet:overflow-x-auto'>
                    <Tab className='flex bg-gray-300 rounded-md shadow w-[7rem] h-[4rem] hover:bg-gray-300/50' >
                        <p className='text-lg'>Popular</p>
                    </Tab>
                    <Tab className='flex bg-gray-300 rounded-md shadow w-[7rem] h-[4rem] hover:bg-gray-300/50' >
                        <p className='text-lg'>{categoryOne}</p>
                    </Tab>
                    <Tab className='flex bg-gray-300 rounded-md shadow w-[10rem] h-[4rem] hover:bg-gray-300/50' >
                        <p className='text-lg'>{categoryTwo}</p>
                    </Tab>
                    <Tab className='flex bg-gray-300 rounded-md shadow w-[10rem] h-[4rem] hover:bg-gray-300/50' >
                        <p className='text-lg'>{categoryThree}</p>
                    </Tab>
                    <Tab className='flex bg-gray-300 rounded-md shadow w-[10rem] h-[4rem] hover:bg-gray-300/50' >
                        <p className='text-lg'>{categoryFour}</p>
                    </Tab>
                    <Tab className='flex bg-gray-300 rounded-md shadow w-[10rem] h-[4rem] hover:bg-gray-300/50' >
                        <p className='text-lg'>{categoryFive}</p>
                    </Tab>
                    <Tab className='flex bg-gray-300 rounded-md shadow w-[10rem] h-[4rem] hover:bg-gray-300/50' >
                        <p className='text-lg'>{categorySix}</p>
                    </Tab>
                    <Tab className='flex bg-gray-300 rounded-md shadow w-[10rem] h-[4rem] hover:bg-gray-300/50' >
                        <p className='text-lg'>{categorySeven}</p>
                    </Tab>
                    <Tab className='flex bg-gray-300 rounded-md shadow w-[10rem] h-[4rem] hover:bg-gray-300/50' >
                        <p className='text-lg'>{categoryEight}</p>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <h1 className='py-[2%] text-xl font-bold'>Popular Movies</h1>
                        {popular}
                    </TabPanel>
                    <TabPanel>
                        <h1 className='py-[2%] text-xl font-bold'>{categoryOne}</h1>
                        {action}
                    </TabPanel>
                    <TabPanel>
                        <h1 className='py-[2%] text-xl font-bold'>{categoryTwo}</h1>
                        {adventure}
                    </TabPanel>
                    <TabPanel>
                        <h1 className='py-[2%] text-xl font-bold'>{categoryThree}</h1>
                        {animation}
                    </TabPanel>
                    <TabPanel>
                        <h1 className='py-[2%] text-xl font-bold'>{categoryFour}</h1>
                        {comedy}
                    </TabPanel>
                    <TabPanel>
                        <h1 className='py-[2%] text-xl font-bold'>{categoryFive}</h1>
                        {crime}
                    </TabPanel>
                    <TabPanel>
                        <h1 className='py-[2%] text-xl font-bold'>{categorySix}</h1>
                        {drama}
                    </TabPanel>
                    <TabPanel>
                        <h1 className='py-[2%] text-xl font-bold'>{categorySeven}</h1>
                        {romance}
                    </TabPanel>
                    <TabPanel>
                        <h1 className='py-[2%] text-xl font-bold'>{categoryEight}</h1>
                        {thriller}
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </div>
    )
}

export default Categories