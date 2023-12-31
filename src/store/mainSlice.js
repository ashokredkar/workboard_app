import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    showAddModal: false,
    showViewModal: false,
    viewedModalData: {},
    archivedVisible: false,
    clickedNoteData: {},
    menuPosition: {x: 0, y: 0},
    localStorageKey: 'workboard_app',
    todo: [{id: 34, title: "ashok 423", desc: "Lorem Ipsgvrrum", archived: false}, {id: 45, title: "ashok 75", desc: "Lorerevem Ipsum 2", archived: false}, {id: 3453, title: "ashok 42wd3", desc: "Lorem Ipsvwegvrrum", archived: false}],
    inprogress: [{id: 1, title: "ashok", desc: "Lorem Ipsum", archived: false}, {id: 2, title: "ashok 2", desc: "Lorem Ipsum 2", archived: false}],
    completed: [{id: 11, title: "asqadhok", desc: "Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum ", archived: false}, {id: 2222, title: "ashok 4w422", desc: "Lore2452m Ipsum 2", archived: false}],
}

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        handleAddModal: (state, action) => {
            action.payload === "show" ? state.showAddModal = true : state.showAddModal = false;
        },
        handleViewModal: (state, action) => {
            if(action.payload.toggle === "show"){
                state.showViewModal = true;
                state.viewedModalData = action.payload.item;
            }else{
                state.showViewModal = false;
                state.viewedModalData = action.payload.item;
                // if(action.payload.panel === "todo"){          // not passing panel name now, so checking on all three panels
                    state.todo.map((item, idx) => {
                        if(action.payload.item && item.id === action.payload.item.id){
                            // state.todo.splice(idx, 1);
                            state.todo[idx] = action.payload.item;
                        }
                    });
                // }else if(action.payload.panel === "inprogress"){
                    state.inprogress.map((item, idx) => {
                        if(action.payload.item && item.id === action.payload.item.id){
                            state.inprogress[idx] = action.payload.item;
                        }
                    });
                // }else{
                    state.completed.map((item, idx) => {
                        if(action.payload.item && item.id === action.payload.item.id){
                            state.completed[idx] = action.payload.item;
                        }
                    });
                // }
            }
        },
        setMenuPosition: (state, action) => {
            state.menuPosition.x = action.payload.x;
            state.menuPosition.y = action.payload.y;
        },
        setClickedNoteData: (state, action) => {
            if(action.payload.item){
                state.clickedNoteData = action.payload;
            }
        }, 
        addTargetPanel: (state, action) => {
            state.clickedNoteData.target = action.payload;
        }, 
        addTodo: (state, action) => {
            state.todo.push(action.payload);
        },
        deleteTodo: (state) => {
            const currentItem = state.clickedNoteData.item;
            if(state.clickedNoteData.title === "todo"){
                state.todo = state.todo.filter(item => item.id !== currentItem.id);
            }else if(state.clickedNoteData.title === "inprogress"){
                state.inprogress = state.inprogress.filter(item => item.id !== currentItem.id);
            }else{
                state.completed = state.completed.filter(item => item.id !== currentItem.id);
            }
        },
        archiveTodo: (state, action) => {
            if(action.payload == "archive"){
                state.clickedNoteData.item.archived = true;
            }else{
                state.clickedNoteData.item.archived = false;
            }
            const newItem = state.clickedNoteData.item;
            console.log(current(newItem));
            if(state.clickedNoteData.title === "todo"){
                const newArray = state.todo.map(obj => obj.id === newItem.id ? newItem : obj);
                state.todo = newArray;
            }else if(state.clickedNoteData.title === "inprogress"){
                const newArray = state.inprogress.map(obj => obj.id === newItem.id ? newItem : obj);
                state.inprogress = newArray;
            }else{
                const newArray = state.completed.map(obj => obj.id === newItem.id ? newItem : obj);
                state.completed = newArray;
            }
        },
        shiftTodo: (state) => {
            let currentItem;
            if(state.clickedNoteData.title === "todo"){
                currentItem = state.todo.find(item => item.id === state.clickedNoteData.item.id);
                state.todo = state.todo.filter(item => item.id !== currentItem.id);           // need to remove the shifted item from original panel
            }else if(state.clickedNoteData.title === "inprogress"){
                currentItem = state.inprogress.find(item => item.id === state.clickedNoteData.item.id);
                state.inprogress = state.inprogress.filter(item => item.id !== currentItem.id);
            }else{
                currentItem = state.completed.find(item => item.id === state.clickedNoteData.item.id);
                state.completed = state.completed.filter(item => item.id !== currentItem.id);
            }

            if(state.clickedNoteData.target === "todo"){
                state.todo.push(currentItem);
            }else if(state.clickedNoteData.target === "inprogress"){
                state.inprogress.push(currentItem);
            }else{
                state.completed.push(currentItem);
            }
        },
        toggleArchived: (state) => {
            state.archivedVisible = !state.archivedVisible;
        }, 
        searchTodos: (state, action) => {
            const query = action.payload[0].toLowerCase();
            const todoArray = action.payload[1];
            const progressArray = action.payload[2];
            const completedArray = action.payload[3];
            console.log(todoArray, progressArray, completedArray);
            if(action.payload === ""){
                state.todo = todoArray;
                state.inprogress = progressArray;
                state.completed = completedArray;
            }else{
                state.todo = todoArray.filter(item => item.title.toLowerCase().includes(query));
                state.inprogress = progressArray.filter(item => item.title.toLowerCase().includes(query));
                state.completed = completedArray.filter(item => item.title.toLowerCase().includes(query));
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { handleAddModal, handleViewModal, setMenuPosition, setClickedNoteData, addTargetPanel, addTodo, deleteTodo, archiveTodo, shiftTodo, toggleArchived, searchTodos } = mainSlice.actions

export default mainSlice.reducer