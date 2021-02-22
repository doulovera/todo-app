import React, { useState } from 'react';
import '../styles/NewTask.css';

export default function NewTask(props) {

    // Create a state for the new tasks,
    // with an empty string for
    const [newTaskName, setNewTaskName] = useState('');

    // Saves the data in the state
    const updateNewTaskValue = e => setNewTaskName(e.target.value);

    // When the task exists, it sends an error
    const error = props.taskItems.find(t => t.name === newTaskName.trim()) ? 'That task already exists' : null;

    // Some styles when the task exists
    const inputTaskExisting = () => {
        return {
            borderColor: Boolean(error) ? '#fd4242' : ''
        }
    }

    // The sender function
    const createNewTask = e => {
        // Prevents default
        e.preventDefault();

        // Validate empty strings
        const emptyData = newTaskName.trim()
        if(emptyData === '') return setNewTaskName('');
        
        // Sends the data to the main function in App.js
        props.newTask(newTaskName.trim());
        
        // Clears the input
        setNewTaskName('');
    }

    return (
        <>
            <form className="NewTask" onSubmit={createNewTask}>
                <input 
                    type="text" 
                    style={inputTaskExisting()}
                    onChange={updateNewTaskValue} 
                    value={newTaskName}
                    placeholder="Write your task here" 
                />
                <input type="submit" value="Save" disabled={Boolean(error)} />
            </form>

            <span style={{color: '#fd4242'}}>{error}</span>
        </>
    )
}
