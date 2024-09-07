import { memo } from "react";

/* eslint-disable react/prop-types */
const Todo = memo(function Todo({todos,markHandler,deleteHandler}){
    function handleMarkClick(e){
        markHandler(e._id);
    }
    function handleDeleteClick(e){
        deleteHandler(e._id);
    }
    return(
        <div id="todo-list">
        {todos.map(function(task){
            return(
                <div id="todo-item" key={task._id}>
                <div id="todo-meta">
                    <p style={ 
                    { 
                        textDecoration: task.isCompleted ? 
                            "line-through" : "none"
                    }} id="todo-title">{task.title}</p>
                    <p style={ 
                    { 
                        textDecoration: task.isCompleted  ? 
                            "line-through" : "none"
                    }} id="todo-desc">{task.description}</p>
                </div>
                <div id="todo-actions">
                    {task.isCompleted ? '': <button onClick={() => handleMarkClick(task)}>Mark as done</button>}
                    <button onClick={()=>handleDeleteClick(task)}>Delete</button>
                </div>
                </div>
            )
        })}  
        </div>
    );
});

export default Todo;