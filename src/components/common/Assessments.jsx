import React from 'react'
import { BiCaretRight } from 'react-icons/bi'

const Assessments = () => {
    return (
        <div className='grid grid-cols-2 gap-[28px]'>
            <div className='col-span-1'>
                <div className='mb-[5px]'>
                    <h3 className='text-[14px] font-[500] text-[#323232]'>Assessments</h3>
                </div>
                <div className='bg-[#fff] rounded-[10px] border-2 border-[#EFF6FE] py-[11px] px-[22px]'>
                    <p className='flex items-center gap-[6px] text-[12px] font-[500] -tracking-[0.24px] text-[#565E60] leading-[28px]'><BiCaretRight className='text-[#106FEC]' /> SFS Environmental</p>
                    <p className='flex items-center gap-[6px] text-[12px] font-[500] -tracking-[0.24px] text-[#565E60] leading-[28px]'><BiCaretRight className='text-[#106FEC]' /> SFS Social & Labor</p>
                </div>
            </div>
            <div className='col-span-1'>
                <div className='mb-[5px]'>
                    <h3 className='text-[14px] font-[500] text-[#323232]'>Product Impacts</h3>
                </div>
                <div className='bg-[#fff] rounded-[10px] border-2 border-[#EFF6FE] py-[11px] px-[22px]'>
                    <p className='flex items-center gap-[6px] text-[12px] font-[500] -tracking-[0.24px] text-[#565E60] leading-[28px]'><BiCaretRight className='text-[#106FEC]' /> Materials Sustainability Index</p>
                    <p className='flex items-center gap-[6px] text-[12px] font-[500] -tracking-[0.24px] text-[#565E60] leading-[28px]'><BiCaretRight className='text-[#106FEC]' /> PM Product Module</p>
                </div>
            </div>
        </div>
    )
}

export default Assessments