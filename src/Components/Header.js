import Button from './Button'
import { useState } from "react";


const Header = ({ onDisplay }) => {
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
            <Button color={backgroundColor} text={buttonText} onClick={onClick}/>
        </header>
    )
}

export default Header
