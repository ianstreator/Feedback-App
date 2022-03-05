function Header({text, bgColor, textColor}) {

    const headerStyles = {
        backgroundColor: bgColor,
        color: textColor
    }

    return (
        <header style={headerStyles}>
            <div className='container'>
                <h2>{text}</h2>
            </div>
        </header>
    )
}

Header.defaultProps = {
    bgColor: 'rgba(0,0,0,0.4)',
    textColor: '#2db2ff',
    text: 'Feedback UI'
}


export default Header
