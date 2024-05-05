import './Button.css';

export const Button = ({ handleClick }) => {
    return (
        <button className="Button" onClick={handleClick}>Load more</button>
    )
}