import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';

const Note = ({ item, handleMenuPosition }) => {
    const archivedVisible = useSelector((state) => state.main.archivedVisible);

    return (
        <div className={`note ${item.archived && !archivedVisible ? "archived" : ""}`} id={item.id} onContextMenu={(e) => handleMenuPosition(e, item)}>  
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
        </div>
    )
}

export default Note