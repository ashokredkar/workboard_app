import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Panel from './components/Panel'
import Menu from './components/Menu'
import { useDispatch, useSelector } from 'react-redux'
import { setMenuPosition } from './store/mainSlice'
import AddModal from './components/AddModal'
import ViewModal from './components/ViewModal'

function App() {
  const dispatch = useDispatch();
  const todoArray = useSelector((state) => state.main.todo);
  const inProgressArray = useSelector((state) => state.main.inprogress);
  const completedArray = useSelector((state) => state.main.completed);
  const menuPosition = useSelector((state) => state.main.menuPosition);
  const addModal = useSelector((state) => state.main.showAddModal);
  const viewModal = useSelector((state) => state.main.showViewModal);
  const [disabledMenus, setDisabledMenus] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fltr_todo = todoArray.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const fltr_prog = inProgressArray.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const fltr_comp = completedArray.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    document.addEventListener("click", function(){ dispatch(setMenuPosition({ x: 0, y: 0 })); });     // without useEffect, this line will cause memory leak/infinite loop
    console.log(todoArray, inProgressArray, completedArray);
    return () => {
      document.removeEventListener("click", function(){ dispatch(setMenuPosition({ x: 0, y: 0 })); });
    }
  }, []);

  return (
    <main>
      <Header setSearchQuery={setSearchQuery} />
      <div className='panels'>
        <Panel title="todo" itemsArray={fltr_todo} setDisabledMenus={setDisabledMenus} disabledMenus={disabledMenus} />
        <Panel title="inprogress" itemsArray={fltr_prog} setDisabledMenus={setDisabledMenus} disabledMenus={disabledMenus} />
        <Panel title="completed" itemsArray={fltr_comp} setDisabledMenus={setDisabledMenus} disabledMenus={disabledMenus} />
      </div>
      {menuPosition.x !== 0 && menuPosition.y !== 0 && (
        <Menu menuPosition={menuPosition} disabledMenus={disabledMenus} />
      )}
      { addModal && <AddModal /> }
      { viewModal && <ViewModal /> }
    </main>
  )
}

export default App
