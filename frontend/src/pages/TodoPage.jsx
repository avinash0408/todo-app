import axios from "axios";
import AddTodo from '../components/AddTodo';
import Todo from '../components/Todo';
import { useState, useEffect } from "react";



/* eslint-disable react/prop-types */
function TodoPage({apiUrl}) {
  const [todos, setTodos] = useState([]);
  function fetchTodos() {
    axios.get(`${apiUrl}/todo/`,{
        withCredentials: true
    }).then((res) => {
      setTodos(res.data.message);
    }).catch(err => alert(err));
  }

  const addTodo = async (newTodo) => {
    try {
      const res = await axios({
        url: `${apiUrl}/todo/add`,
        method: "POST",
        headers: {
          authorization: "your token comes here",
        },
        data: newTodo,
      })
      setTodos([...todos, res.data.todo]);
    } catch (err) {
      alert(err)
    }
  }

  const markTodo = async (id) => {
    try {
      await axios({
        url: `${apiUrl}/todo/mark/` + id,
        method: "PATCH",
        headers: {
          authorization: "your token comes here",
        },
        data: { "isCompleted": true },
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
      await axios({
        url: `${apiUrl}/todo/` + id,
        method: "DELETE",
        headers: {
          authorization: "your token comes here",
        },
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
      <div className="container flex flex-col bg-white min-h-screen min-w-screen min-w-full md:flex-row">
      <AddTodo onAddTodo={addTodo} />
      <Todo todos={todos} markHandler={markTodo} deleteHandler={deleteTodo} />
    </div>
  )

}

export default TodoPage;
