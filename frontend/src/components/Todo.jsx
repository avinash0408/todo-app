import { memo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
/* eslint-disable react/prop-types */
const Todo = memo(function Todo({ todos, markHandler, deleteHandler }) {
    library.add(faTrash, faCircleCheck)
    function handleMarkClick(e) {
        markHandler(e._id);
    }
    function handleDeleteClick(e) {
        deleteHandler(e._id);
    }
    return (
        <div className="md:w-3/5 w-full">
            <ul role="list" className="divide-y divide-gray-200 w-full p-4 border border-gray-200 rounded-lg shadow sm:p-8 ">
                <h4 className="text-xl font-medium text-gray-900">ToDo List</h4>
                {todos.map(function (task) {
                    return (
                        <li className="py-3 sm:py-4 flex items-center justify-between" key={task._id}>
                            <div className="w-3/4">
                                <p className={task.isCompleted ? "line-through" : '' + "text-md font-medium text-gray-900 truncate"}>{task.title}</p>
                                <p className={task.isCompleted ? "line-through" : '' + "text-sm text-gray-500 truncate"}>{task.description}</p>
                            </div>
                            <div className="w-1/4 flex items-center justify-around">
                                {task.isCompleted ? '' :
                                    <a className="cursor-pointer w-10 h-10 bg-white flex justify-center items-center rounded-full hover:bg-gray-200"
                                        onClick={() => handleMarkClick(task)} >
                                        <FontAwesomeIcon icon="fa fa-circle-check" className="text-green-500" />
                                    </a>}
                                <a className="cursor-pointer w-10 h-10 bg-white flex justify-center items-center rounded-full hover:bg-gray-200"
                                    onClick={() => handleDeleteClick(task)} >
                                    <FontAwesomeIcon icon="fa fa-trash" spin className="text-red-500" />
                                </a>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
});

export default Todo;