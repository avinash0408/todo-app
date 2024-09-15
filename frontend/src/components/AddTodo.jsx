/* eslint-disable react/prop-types */

import { useState } from 'react';

function AddTodo({ onAddTodo }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    function handleAddTodo() {
        let newTask = { title, description };
        onAddTodo(newTask);
        setTitle('');
        setDescription('');
        toggleDialog();
    }
    function toggleDialog(){
        setDialogOpen(!dialogOpen);
    }

    const AddTodoForm = () => {
        return (
            <div className={`w-full md:w-2/5 p-4 border bg-white border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ${dialogOpen ? 'block' : 'hidden md:block'}`}>
                <form className='space-y-6 w-full' onSubmit={handleAddTodo}>
                    <h5 className="text-xl font-medium text-gray-900">Add a ToDo</h5>
                    <div>
                        <label className='block mb-2 text-sm font-medium text-gray-900'>Title</label>
                        <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5' type='text' placeholder='What do you like to do?' value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label className='block mb-2 text-sm font-medium text-gray-900'>Description</label>
                        <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5' type='text' placeholder='Task description' value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <button type='submit' className='w-full text-white bg-slate-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-slate-800'>Add Todo</button>
                    <button  type='button' onClick={toggleDialog} className={`w-full text-white bg-slate-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-slate-800 ${dialogOpen ? 'block' : 'hidden'}`}>Cancel</button>
                </form>
            </div>
        )
    }

    return (
        <>
                <div className={dialogOpen ? 'hidden':'block md:hidden h-10 text-center my-5'}>
                    <button className='text-white bg-slate-600 font-medium rounded-lg text-sm px-5 py-2.5' onClick={toggleDialog}>Create Todo</button>
                </div>
                
                <AddTodoForm />
        </>
    );
}

export default AddTodo;