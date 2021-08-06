import Button from './Button'
import { useState } from "react";


const Header = ({ onDisplay }) => {
    const [buttonText, setButtonText] = useState('Add')
    const onClick = (e) => {
        setButtonText(buttonText === 'Add' ? 'Hide' : 'Add')
        onDisplay()
    }
    return (
        <header className='header'>
            <h1>Task Tracker</h1>
            <Button color='green' text={buttonText} onClick={onClick}/>
        </header>
    )
}

export default Header
