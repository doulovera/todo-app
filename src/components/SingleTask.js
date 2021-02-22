import React from 'react';
import { FaTrashAlt } from "react-icons/fa";
import '../styles/SingleTask.css';

export default function SingleTask(props) {

    const completedLineThrough = () => {
        return {
            textDecoration: props.task.done ? 'line-through' : 'none',
            color: props.task.done ? 'gray' : 'black'
        }
    }

    const btnShow = () => {
        return {
            display: props.task.done ? 'inline' : 'none'
        }
    }
    
    return (
        <div className="task" key={props.task.name}> 
       
            <label htmlFor={props.task.name} style={completedLineThrough()}>{props.task.name}</label>

            <input 
                type="checkbox" 
                id={props.task.name} 
                checked={props.task.done} 
                style={{display:'none'}} 
                onChange={() => props.toggleTask(props.task)}
            />

            <button onClick={() => props.deleteTask(props.task.name)} style={btnShow()}><FaTrashAlt /></button>
        </div>
    )
}
