import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleViewModal } from '../store/mainSlice';

const Note = ({ item, handleMenuPosition }) => {
    const archivedVisible = useSelector((state) => state.main.archivedVisible);
    const dispatch = useDispatch();

    return (
        <div style={{background: `url("${item.img}")`}} className={`note ${item.archived && !archivedVisible ? "archived" : ""}`} id={item.id} onContextMenu={(e) => handleMenuPosition(e, item)} onClick={() => dispatch(handleViewModal({toggle: "show", item}))}>  
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
        </div>
    )
}

export default Note