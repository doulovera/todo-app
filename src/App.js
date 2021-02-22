import React, { useState, useEffect } from 'react';
import './styles/App.css';
import NavTitle from "./components/NavTitle";
import NewTask from "./components/NewTask";
import SingleTask from "./components/SingleTask";
import './styles/vov.min.css';

function App() {

  // Show complete property to show the completed tasks
  const [showCompleted, setShowCompleted] = useState(false);

  // Create the state with some default data
  const [taskItems, setTaskItems] = useState([{name: 'Loading...', done: false}]);

  // Initiation with localStorage
  useEffect(() => {
    const data = localStorage.getItem('tasks');

    // Detect if the database exists
    if(data != null){
      // We set taskItems the data from localstorage
      setTaskItems(JSON.parse(data)); // Parse it in JSON
    } else {
      // If doesn't exists, saves default data
      setTaskItems([
        { name: 'Feed the dog', done: false },
        { name: 'Walk outside', done: true },
        { name: 'Take ONE picture', done: false }
      ]);
      // and set to true the tasks done show
      setShowCompleted(true);
    }
  }, []);

  // When a new task is added, saves it in localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems))
  }, [taskItems]);
  
  // Create a new task
  const createNewTask = taskName => {
    // Detects if the new task has the 
    // same name as a task created before
    if(!taskItems.find(t => t.name === taskName)) {
      // Saves the data in State
      setTaskItems([...taskItems, { name: taskName, done: false }]);
    }
  }

  // Delete completed tasks
  const deleteTask = taskName => {
    // Returns the same taskItems, but ignores the deleted task
    // and saves it in localStorage
    return setTaskItems(taskItems.filter(task => task.name !== taskName))
  }
  
  // Toggle task done value
  const toggleTask = task => {
    return setTaskItems(taskItems.map(t => (t.name === task.name ? {...t, done: !t.done} : t )))
  }
  
  // Shows the tasks according their Done value
  const taskRows = doneValue => (
    taskItems
        .filter(task => task.done === doneValue)
        .map(task => (
            <SingleTask 
              deleteTask={deleteTask} 
              task={task} 
              key={task.name} 
              toggleTask={toggleTask} 
            />
        ))
  )

  return (
    <div className="App">
      <NavTitle
        lengthItems={taskItems}
        isChecked={showCompleted}
        callback={checked => setShowCompleted(checked)}
      />

      <NewTask newTask={createNewTask} taskItems={taskItems} />

      <div>
        {taskRows(false)}
      </div>

      { showCompleted && (
        <div className="vov fade-in-up fast">
          <hr style={{width: '50%', margin: '3em auto'}} />
          {taskRows(true)}
        </div>
      )}

    </div>
  );
}

export default App;
