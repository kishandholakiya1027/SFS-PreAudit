import React from 'react'
import { BiCaretRight } from 'react-icons/bi'
import { BsArrowRight } from 'react-icons/bs'
import { MdAddCircleOutline } from 'react-icons/md'

const data = [
    {
        startTime: "12:00",
        appoimentList: [
            {
                time: "12:00",
                description: "Meeting with team member",
                status: "complate"
            },
            {
                time: "12:30",
                description: "Meeting with Dealers",
                status: "complate"
            },
            {
                time: "01:20",
                description: "Final Call Client",
                status: "current"
            },
        ]
    },
    {
        startTime: "13:00",
        appoimentList: [
            {
                time: "13:00",
                description: "Meeting with team member",
                status: "pending"

            },
            {
                time: "13:30",
                description: "Meeting with Dealers",
                status: "pending"
            },
            {
                time: "02:20",
                description: "Final Call Client",
                status: "pending"
            },
        ]
    },
    {
        startTime: "14:00",
        appoimentList: [
            {
                time: "14:00",
                description: "Meeting with team member",
                status: "pending"
            },
            {
                time: "14:30",
                description: "Final Call Client",
                status: "pending"
            },
        ]
    },
    {
        startTime: "14:00",
        appoimentList: [
            {
                time: "14:00",
                description: "Meeting with team member",
                status: "pending"
            },
            {
                time: "14:30",
                description: "Final Call Client",
                status: "pending"
            },
        ]
    },
    {
        startTime: "14:00",
        appoimentList: [
            {
                time: "14:00",
                description: "Meeting with team member",
                status: "pending"
            },
            {
                time: "14:30",
                description: "Final Call Client",
                status: "pending"
            },
        ]
    },
    {
        startTime: "14:00",
        appoimentList: [
            {
                time: "14:00",
                description: "Meeting with team member",
                status: "pending"
            },
            {
                time: "14:30",
                description: "Final Call Client",
                status: "pending"
            },
        ]
    },
]

const Appointments = () => {
    return (
        <div className='mb-[24px]'>
            <div className='flex items-center justify-between mb-[10px]'>
                <h3 className='text-[14px] font-[500] text-[#323232]'>Upcoming Appointments</h3>
                <MdAddCircleOutline className='w-[21px] h-[21px] text-[#106FEC]' />
            </div>
            <div className='bg-[#fff] rounded-[10px] border-2 border-[#EFF6FE] p-[30px]'>
                <div className=''>
                    {
                        data?.length > 0 && data?.slice(0, 5).map((item, i) => {
                            return (
                                <div key={i} className='flex items-start gap-[20px] mb-[24px]'>
                                    <div className='flex items-center gap-[10px]'>
                                        <h2 className='text-[#0D0C22] text-[12px] font-[400] -tracking-[0.24px] leading-6'>{item.startTime}</h2>
                                        <span className='w-[9px] h-[9px] bg-[#000] rounded-full block'></span>
                                    </div>
                                    <ul>
                                        {
                                            item?.appoimentList.map((ite, inx) => (
                                                <li key={inx} className={`flex items-center ${ite.status === "current" && "gap-[17px] -ml-[32px]"}`}>
                                                    {
                                                        ite.status === "current" &&
                                                        <BiCaretRight className='text-[#106FEC]' />
                                                    }
                                                    <div className='flex items-center gap-[15px] leading-6' >
                                                        <h4 className={`text-[12px] font-[400] ${ite.status === "complate" ? "text-[#A5A6A9]" : ite.status === "pending" ? "text-[#000]" : "text-[#000] font-[600]"}`}>{ite.time}</h4>
                                                        <p className={`text-[12px] font-[400] ${ite.status === "complate" ? "text-[#A5A6A9]" : ite.status === "pending" ? "text-[#000]" : "text-[#000] font-[600]"}`}>{ite.description}</p>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='text-right mt-[50px]'>
                    <button type='button' className='flex items-center justify-end gap-[6px] text-[12px] font-[400] -tracking-[0.24px] text-[#106FEC] w-full'>
                        Show All <BsArrowRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Appointments