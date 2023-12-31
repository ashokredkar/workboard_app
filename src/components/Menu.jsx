import React, { useEffect } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux'
import { addTargetPanel, archiveTodo, deleteTodo, handleAddModal, shiftTodo } from '../store/mainSlice'

const Menu = ({ menuPosition, disabledMenus }) => {
    const dispatch = useDispatch();
    const localStorageKey = useSelector((state) => state.main.localStorageKey);
    const clickedNoteData = useSelector((state) => state.main.clickedNoteData);

    const handleMenuClick = (task) => {
        if(task === "delete"){
            dispatch(deleteTodo());
        }else {
            if(clickedNoteData.item.archived){
                dispatch(archiveTodo("unarchive"));
            }else{
                dispatch(archiveTodo("archive"));
            }
            console.log(clickedNoteData.item.archived);
        }
        // localStorage.setItem(localStorageKey, JSON.stringify(currentItem));
    }
    const handleSubOptionClick = (panelName) => {
        dispatch(addTargetPanel(panelName));
        dispatch(shiftTodo());
    }

    return (
        <div className="menu" style={{left: menuPosition.x, top: menuPosition.y}}>
            <p className={disabledMenus.includes("New Task") ? "disabled" : ""} onClick={() => dispatch(handleAddModal("show"))}>New Task</p>
            <p className={disabledMenus.includes("Send To") ? "disabled" : ""}>Send To <IoIosArrowForward />
                <span className='sub_menu'>
                    <label onClick={() => handleSubOptionClick("todo")} className={disabledMenus.includes("Todo") ? "disabled" : ""}>Todo</label>
                    <label onClick={() => handleSubOptionClick("inprogress")} className={disabledMenus.includes("Inprogress") ? "disabled" : ""}>Inprogress</label>
                    <label onClick={() => handleSubOptionClick("completed")} className={disabledMenus.includes("Completed") ? "disabled" : ""}>Completed</label>
                </span>
            </p>
            <p className={disabledMenus.includes("Delete") ? "disabled" : ""} onClick={() => handleMenuClick("delete")}>Delete</p>
            <p className={disabledMenus.includes("Archive") ? "disabled" : ""} onClick={() => handleMenuClick("archive")}>{clickedNoteData.item.archived ? "Unarchive" : "Archive"}</p>
        </div>
    )
}

export default Menu