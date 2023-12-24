import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, handleAddModal } from '../store/mainSlice';

const AddModal = () => {
  const dispatch = useDispatch();
  const localStorageKey = useSelector((state) => state.main.localStorageKey);
  
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const currentItem = {id: Math.round(Math.random()*1000000), title: e.target[0].value, desc: e.target[1].value, archived: false};
    dispatch(addTodo(currentItem));
    localStorage.setItem(localStorageKey, JSON.stringify(currentItem));
    dispatch(handleAddModal("hide"));
  }
  
  return (
    <section className='add_modal'>
      <form onSubmit={handleAddSubmit}>
        <input type="text" placeholder='Title' required />
        <textarea type="text" placeholder='Description' required />
        <div>
          <button className='btn' onClick={() => dispatch(handleAddModal("hide"))}>Cancel</button>
          <button type='submit' className='btn'>Add Todo</button>
        </div>
      </form>
    </section>
  )
}

export default AddModal