import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, handleAddModal } from '../store/mainSlice';

const AddModal = () => {
  const dispatch = useDispatch();
  const localStorageKey = useSelector((state) => state.main.localStorageKey);
  
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const currentItem = {id: Math.round(Math.random()*1000000), img: e.target[0].value, title: e.target[1].value, desc: e.target[2].value, archived: false};
    dispatch(addTodo(currentItem));
    // localStorage.setItem(localStorageKey, JSON.stringify(currentItem));
    dispatch(handleAddModal("hide"));
  }
  const handleAddCancel = (e) => {
    e.preventDefault();
    dispatch(handleAddModal("hide"));
  }
  
  return (
    <section className='add_modal'>
      <form onSubmit={handleAddSubmit}>
        <input type="text" placeholder='Image Link' />
        <input type="text" placeholder='Title' required />
        <textarea type="text" placeholder='Description' required />
        <div>
          <button className='btn' onClick={(e) => handleAddCancel(e)}>Cancel</button>
          <button type='submit' className='btn'>Add Todo</button>
        </div>
      </form>
    </section>
  )
}

export default AddModal