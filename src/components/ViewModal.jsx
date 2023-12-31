import React from 'react'
import { handleViewModal } from '../store/mainSlice';
import { useDispatch, useSelector } from 'react-redux';

const ViewModal = () => {  
  const viewedModalData = useSelector((state) => state.main.viewedModalData);
  const dispatch = useDispatch();

  const handleViewSubmit = (e) => {
    e.preventDefault();
    const updatedData = { ...viewedModalData, title: e.target[0].value, desc: e.target[1].value }
    dispatch(handleViewModal({toggle: "hide", item: updatedData}));
  }

  const handleViewCancel = (e) => {
    e.preventDefault();
    dispatch(handleViewModal({toggle: "hide"}));
  }

  return (
    <section className='add_modal'>
      <form onSubmit={handleViewSubmit}>
        {viewedModalData.img && <img src={viewedModalData.img} alt="Note Image" />}
        <input type="text" placeholder='Title' defaultValue={viewedModalData.title} required style={{marginTop: `${viewedModalData.img && "8%"}`}} />
        <textarea type="text" placeholder='Description' defaultValue={viewedModalData.desc} required />
        {viewedModalData.archived && <span>Archived</span>}
        <div>
          <button className='btn' onClick={(e) => handleViewCancel(e)}>Cancel</button>
          <button type='submit' className='btn'>Edit Todo</button>
        </div>
      </form>
    </section>
  )
}

export default ViewModal