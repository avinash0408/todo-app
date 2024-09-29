import axios from "axios";
import AddTodo from '../components/AddTodo';
import Todo from '../components/Todo';
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";



/* eslint-disable react/prop-types */
function TodoPage({ apiUrl }) {
    const [todos, setTodos] = useState([]);
    function fetchTodos() {
        axios.get(`${apiUrl}/todo/`, {
            withCredentials: true
        }).then((res) => {
            setTodos(res.data.message);
        }).catch(err => alert(err));
    }

    const addTodo = async (newTodo) => {
        try {
            const res = await axios.post(`${apiUrl}/todo/add`, newTodo, {
                withCredentials: true
            })
            setTodos([...todos, res.data.todo]);
        } catch (err) {
            alert(err)
        }
    }

    const markTodo = async (id) => {
        try {
            await axios.patch(`${apiUrl}/todo/mark/` + id, { "isCompleted": true }, {
                withCredentials: true
            })
        } catch (err) {
            alert(err)
        }
        setTodos(todos.map(task => {
            if (task._id == id) {
                task.isCompleted = true;
            }
            return task;
        }));
    }

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${apiUrl}/todo/` + id, {
                withCredentials: true
            })
        } catch (err) {
            alert(err)
        }
        setTodos(todos.filter(task => { return task._id != id }));
    }

    useEffect(() => {
        fetchTodos();
    }, []);
    return (
        <div className="h-screen" >
            <NavBar apiUrl={apiUrl}/>
            <div className="container flex flex-col bg-white h-19/20 min-w-screen min-w-full md:flex-row">
                <AddTodo onAddTodo={addTodo} />
                <Todo todos={todos} markHandler={markTodo} deleteHandler={deleteTodo} />
            </div>
        </div>
    )

}

export default TodoPage;
