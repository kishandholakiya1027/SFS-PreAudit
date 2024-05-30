import React from 'react'
import { MdAddCircleOutline } from 'react-icons/md'

const data = [
    {
        id: 14586,
        companyName: "Demo Company",
        companyPerson: "Ronald Person",
        email: "ronald.test@gmail.com"
    },
    {
        id: 14586,
        companyName: "Demo Company",
        companyPerson: "Ronald Person",
        email: "ronald.test@gmail.com"
    },
    {
        id: 14586,
        companyName: "Demo Company",
        companyPerson: "Ronald Person",
        email: "ronald.test@gmail.com"
    },
    {
        id: 14586,
        companyName: "Demo Company",
        companyPerson: "Ronald Person",
        email: "ronald.test@gmail.com"
    }
]

const DashCompany = () => {
    return (
        <div className='mb-[24px]'>
            <div className='flex items-center justify-between mb-[10px]'>
                <h3 className='text-[14px] font-[500] text-[#323232]'>Companies List</h3>
                <MdAddCircleOutline className='w-[21px] h-[21px] text-[#106FEC]' />
            </div>
            <div className='bg-[#fff] rounded-[10px] border-2 border-[#EFF6FE] p-[22px]'>
                <table className='w-full !bg-white'>
                    <thead>
                        <tr className=''>
                            <th className='text-[#A5A6A9] text-[12px] font-[300] -tracking-[0.24px] text-left pb-[15px]'>Company ID</th>
                            <th className='text-[#A5A6A9] text-[12px] font-[300] -tracking-[0.24px] text-left pb-[15px]'>Company Name</th>
                            <th className='text-[#A5A6A9] text-[12px] font-[300] -tracking-[0.24px] text-left pb-[15px]'>Company Person</th>
                            <th className='text-[#A5A6A9] text-[12px] font-[300] -tracking-[0.24px] text-left pb-[15px]'>Email Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((item, i) => (
                                <tr key={i}>
                                    <td className='text-[#565E60] text-[12px] font-[500] -tracking-[0.24px] text-left leading-[38px]'>{item.id}</td>
                                    <td className='text-[#565E60] text-[12px] font-[500] -tracking-[0.24px] text-left leading-[38px]'>{item.companyName}</td>
                                    <td className='text-[#565E60] text-[12px] font-[500] -tracking-[0.24px] text-left leading-[38px]'>{item.companyPerson}</td>
                                    <td className='text-[#565E60] text-[12px] font-[500] -tracking-[0.24px] text-left leading-[38px]'>{item.email}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DashCompany