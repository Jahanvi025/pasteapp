import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../features/pasteSlice';

const ViewPaste = () => {

  const {id} = useParams();
  const allpastes = useSelector((state)=> state.paste.pastes);

  const paste = allpastes.filter((p)=> p._id === id)[0];


  return (
    <div>
      
            <div className='flex flex-row gap-5 place-content-between'>
                <input className='p-2 rounded-2xl mt-2 w-[62%] bg-neutral-950' type='text' placeholder='Enter title here' value={paste.title} onChange={(e) => setTitle(e.target.value)} disabled />
                {/* <button onClick={createPaste} className='p-2 rounded-2xl mt-2 bg-neutral-950  border-2 border-[#cbcdf4]'>
                    {
                        pasteId ? "Update My Paste" : "Create My Paste"
                    }
                </button> */}
            </div>
            <div className='mt-8'>
                <textarea className='rounded-2xl mt-4 min-w-[500px] p-4 bg-neutral-950' value={paste.content} placeholder='Enter content here' onChange={(e) => setValue(e.target.value)} rows={18} disabled></textarea>
            </div>
     
    </div>
  )
}

export default ViewPaste
