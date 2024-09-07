/* eslint-disable react/prop-types */

import { useState } from 'react';

function AddTodo({onAddTodo}){
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    function handleAddTodo(){
        let newTask = {title,description};
        onAddTodo(newTask);
        setTitle('');
        setDescription('');
    }

    return(
        <div id="addTaskContainer">
            <input name='title' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)}/>
            <input name='description' placeholder='Description' value={description} onChange={e => setDescription(e.target.value) }/>
            <button onClick={handleAddTodo}>Add Todo</button>
        </div>
    );
}

export default AddTodo;