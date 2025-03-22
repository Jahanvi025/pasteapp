import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../features/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Paste = () => {

  const pastes = useSelector((state) =>
    state.paste.pastes
  );
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div>
      <input className='p-2 rounded-2xl min-w-[600px] mt-5' type="search" placeholder='Search here' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <div className='flex flex-col gap-5'>
        {filteredData.length > 0 && filteredData.map((paste) => {
          return (
            <div className='border' key={paste._id}>
              <div>
                {paste.title}
              </div>
              <div>
                {paste.content}
              </div>
              <div className="flex flex-row gap-4 place-content-evenly">
                <button><Link className='text-white! ' to={`/?pasteId=${paste?._id}`}>Edit</Link> </button>
                <button><Link className='text-white! ' to={`/pastes/${paste?._id}`}>View</Link></button>
                <button onClick={() => handleDelete(paste?._id)}>Delete</button>
                <button onClick={() => { navigator.clipboard.writeText(paste?.content); toast.success("Copied to clipboard ☑️") }} >Copy</button>

                <button
                  onClick={() => {
                    const link = `${window.location.origin}/pastes/${paste?._id}`;
                    navigator.clipboard.writeText(link);
                    toast.success("Shareable link copied to clipboard! 📋✅");
                  }}
                >
                  Share
                </button>

              </div>
              <div>{paste.createdAT}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Paste
