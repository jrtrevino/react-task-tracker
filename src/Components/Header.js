import Button from './Button'
import { useState } from "react";
import { useLocation } from 'react-router-dom';


const Header = ({ onDisplay }) => {
    const location = useLocation()
    const [buttonText, setButtonText] = useState('Add')
    const [backgroundColor, setBackgroundColor] = useState('green')
    const onClick = () => {
        setButtonText(buttonText === 'Add' ? 'Hide' : 'Add')
        setBackgroundColor(backgroundColor === 'green' ? 'red' : 'green')
        onDisplay()
    }
    return (
        <header className='header'>
            <h1>Task Tracker</h1>
            {location.pathname === "/" && (<Button color={backgroundColor} text={buttonText} onClick={onClick}/>) }
        </header>
    )
}

export default Header
