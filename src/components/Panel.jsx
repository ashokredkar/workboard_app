import React, { useEffect, useState } from 'react'
import Note from './Note';
import { useSelector, useDispatch } from 'react-redux'
import { setClickedNoteData, setMenuPosition } from '../store/mainSlice';

const Panel = ({ title, itemsArray, setDisabledMenus }) => {
    const dispatch = useDispatch();
    
    const handlePanelMenu = (e) => {
        if(title == "todo"){
            e.preventDefault();
            setDisabledMenus(["Send To", "Delete", "Archive"]);
            dispatch(setMenuPosition({x: e.clientX, y: e.clientY}));
        }
    }
    const handleMenuPosition = (e, item) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(setMenuPosition({x: e.clientX, y: e.clientY}));
        dispatch(setClickedNoteData({item, title}));
        title == "todo" ? setDisabledMenus(["Todo"]) : title == "inprogress" ? setDisabledMenus(["New Task", "Inprogress"]) : setDisabledMenus(["New Task", "Completed"]);
    }
    

    return (
        <section className={`panel ${title}`} onContextMenu={(e) => handlePanelMenu(e)}>
            <h2>{title}</h2>
            <div className="content_list">
                <div className="archived_items_note">
                    Some notes might be archived!
                </div>
                {itemsArray.length > 0 ? 
                    itemsArray.map((item) => (
                        <Note key={item.id} item={item} title={title} handleMenuPosition={handleMenuPosition} />
                    ))
                : <div className='note'>No Items to display!</div>}
            </div>
        </section>
    )
}

export default Panel