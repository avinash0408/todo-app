import axios from "axios";
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';
import './App.css';
import { useState, useEffect } from "react";


function App() {
  const [todos, setTodos] = useState([]);

  function fetchTodos() {
    axios.get("http://localhost:3000/todo/").then((res) => {
      setTodos(res.data.message);
    }).catch(err => alert(err));
  }

  const addTodo = async (newTodo) => {
    try {
      const res = await axios({
        url: "http://localhost:3000/todo/add",
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
        url: "http://localhost:3000/todo/mark/" + id,
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

  const deleteTodo = async(id) =>{
    try{
      await axios({
        url: "http://localhost:3000/todo/" + id,
        method: "DELETE",
        headers: {
          authorization: "your token comes here",
        },
      })
    }catch (err) {
      alert(err)
    }
    setTodos(todos.filter(task =>{ return task._id != id}));
  }

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <>
      <AddTodo onAddTodo={addTodo} />
      <Todo todos={todos} markHandler={markTodo} deleteHandler={deleteTodo} />
    </>
  )
}

export default App
