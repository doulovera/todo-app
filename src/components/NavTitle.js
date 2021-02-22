import React, { useEffect, useState } from 'react';
import '../styles/NavTitle.css';

function NavTitle(props) {
    // Calculates the length of the tasks that aren't done
    const itemsLength = () => {
        return props.lengthItems.filter(t => !t.done).length
    }

    // Users name
    const [username, setUsername] = useState('');
    
    const updateUsername = e => {
        const newUsername = e.target.value.toLowerCase();
        setUsername(newUsername)
        localStorage.setItem('username', newUsername)
    }

    useEffect(() => {
        const data = localStorage.getItem('username');
        
        if(data != null) {
            setUsername(data)
        } else {
            setUsername('josefina')
        }

    }, [username])



    // styles bla bla
    const usernameStyles = () => {
        return {
            maxWidth: 17.5*username.length+'px'
        }
    }

    return (
        <nav className="NavTitle">
 
            <div className="completed">
                <label htmlFor="showCompletedTasks" style={{'userSelect': 'none'}}>
                    Tasks done
                    <input 
                        type="checkbox" 
                        id="showCompletedTasks"
                        checked={props.isChecked}
                        onChange={event => props.callback(event.target.checked)}
                    />
                </label>     
            </div>               


            <h1>
                <input 
                    style={usernameStyles()}
                    type="text" 
                    value={username} 
                    onChange={updateUsername} 
                    maxLength="16" 
                />'s To-Dos ({itemsLength()})
            </h1>

        </nav>
    )
}

export default NavTitle
