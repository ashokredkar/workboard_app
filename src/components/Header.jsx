import React, { useState, useEffect } from 'react'
import { searchTodos, toggleArchived } from '../store/mainSlice'
import { useDispatch, useSelector } from 'react-redux';

const Header = ({ setSearchQuery }) => {
  const dispatch = useDispatch();
  const archivedVisible = useSelector((state) => state.main.archivedVisible);

  return (
    <header>
      <input type="search" placeholder='Search Title' onKeyUp={(e) => e.key == "Enter" && setSearchQuery(e.target.value)} />
      <button className="btn" onClick={() => dispatch(toggleArchived())}>{archivedVisible ? "Hide" : "Show"} Archived</button>
    </header>
  )
}

export default Header