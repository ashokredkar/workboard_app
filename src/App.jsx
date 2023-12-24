import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Panel from './components/Panel'
import Menu from './components/Menu'
import { useDispatch, useSelector } from 'react-redux'
import { setMenuPosition } from './store/mainSlice'

function App() { // last element of state is getting stored only
  const dispatch = useDispatch();
  const todoArray = useSelector((state) => state.main.todo);
  const inProgressArray = useSelector((state) => state.main.inprogress);
  const completedArray = useSelector((state) => state.main.completed);
  const menuPosition = useSelector((state) => state.main.menuPosition);
  const [disabledMenus, setDisabledMenus] = useState([]);

  useEffect(() => {
    document.addEventListener("click", function(){ dispatch(setMenuPosition({ x: 0, y: 0 })); });     // without useEffect, this line will cause memory leak/infinite loop
    // document.addEventListener("contextMenu", function(){ dispatch(setMenuPosition({ x: 0, y: 0 })); });     // without useEffect, this line will cause memory leak/infinite loop

    return () => {
      document.removeEventListener("click", function(){ dispatch(setMenuPosition({ x: 0, y: 0 })); });
      // document.removeEventListener("contextMenu", function(){ dispatch(setMenuPosition({ x: 0, y: 0 })); });
    }
  }, []);

  return (
    <main>
      <Header />
      <div className='panels'>
        <Panel title="todo" itemsArray={todoArray} setDisabledMenus={setDisabledMenus} disabledMenus={disabledMenus} />
        <Panel title="inprogress" itemsArray={inProgressArray} setDisabledMenus={setDisabledMenus} disabledMenus={disabledMenus} />
        <Panel title="completed" itemsArray={completedArray} setDisabledMenus={setDisabledMenus} disabledMenus={disabledMenus} />
      </div>
      {menuPosition.x !== 0 && menuPosition.y !== 0 && (
        <Menu menuPosition={menuPosition} disabledMenus={disabledMenus} />
      )}
    </main>
  )
}

export default App
