import React, { useState, useEffect } from 'react'
import { searchTodos, toggleArchived } from '../store/mainSlice'
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const archivedVisible = useSelector((state) => state.main.archivedVisible);
  const todoArr = useSelector((state) => state.main.todo);
  const progArr = useSelector((state) => state.main.inprogress);
  const compArr = useSelector((state) => state.main.completed);
  const [todosAll, setTodosAll] = useState([]);
  useEffect(() => {
    setTodosAll([todoArr, progArr, compArr]);
  }, []);                                    

  return (
    <header>
      <input type="search" placeholder='Search WorkSpace' onKeyUp={(e) => e.key == "Enter" && dispatch(searchTodos([e.target.value, ...todosAll]))} />
      <button className="btn" onClick={() => dispatch(toggleArchived())}>{archivedVisible ? "Hide" : "Show"} Archived</button>
    </header>
  )
}

export default Header