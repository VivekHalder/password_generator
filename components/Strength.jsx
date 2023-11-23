import react from 'react';

function Strength({ color, strength }){

    const divStyle = {
        backgroundColor: color,
        width: 120,
        padding: 4,
        color: "white"
    };
    return (
        <>
            <div style = {divStyle} className='font-bold text-center px-0 h-3/5 my-auto rounded-lg'>
                {strength}
            </div>
        </>
    );
}

export default Strength;