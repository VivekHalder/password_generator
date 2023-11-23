import { useCallback, useEffect, useState, useRef } from 'react'
import Strength from '../components/Strength.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';

function App() {

  const [length, setLength] = useState(8);
  const [bigAlpha, setBigAlpha] = useState(true);
  const [smallAlpha, setSmallAlpha] = useState(true);
  const [num, setNum] = useState(true);
  const [specialChar, setSpecialChar] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordQual, setPasswordQual] = useState({col: "", strength: ""});
  const [refresh, setRefresh] = useState(false);

  const passwordRef = useRef(null);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordStrength = useCallback(() => {
    
    let col = "";
    let strength = "";

    if(length <= 4){
      col = "#ff1c1c";
      strength = "Very Weak";
    }
    else if(length <= 7){
      col = "#ff1c1c";
      strength = "Weak";
    }
    else if(length <= 9){
      col = "#f1c80b";
      strength = "Good";
    }
    else if(length <= 11){
      col = "#43ed9c";
      strength = "Strong";
    }
    else{
      col = "#67f";
      strength = "Very Strong";
    }

    return { col, strength };
  }, [length]);

  const passwordGenerator = useCallback(()=> {
    let ans = "";
    let pass = "";

    if ((!smallAlpha && !bigAlpha && !num && specialChar)){
      pass += "abcdefghijklmnopqrstuvwxyz";
    }

    else{
      if(smallAlpha){
        pass += "abcdefghijklmnopqrstuvwxyz";
      }
      if(bigAlpha){
        pass += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      }
      if(num){
        pass += "0123456789";
      }
      if(specialChar){
        pass += ",./<>?;':[]{}+_-=/*!@#$%^&()";
      }
    }


    for(let i = 0; i<length; i++){
      let ind = Math.floor( Math.random()*pass.length );
      ans += pass.charAt(ind);
    }

    setPassword(ans);

  }, [length, bigAlpha, smallAlpha, num, specialChar, refresh, password]);

  useEffect( () => {
    passwordGenerator();
    const {col, strength} = passwordStrength();
    setPasswordQual({ col, strength });
  }, [ length, bigAlpha, smallAlpha, num, specialChar, refresh, setPassword ] );

  return (
    <>
      <h1 className='text-5xl text-center'>
      Generate Random Passwords for Stronger Security
      </h1>
      <h3 className='p-3 text-2xl text-center'>
      Say goodbye to weak and easily hacked passwords with our password generator tool.
      </h3>
      <div className='w-1/2 p-10 mx-auto bg-white rounded-lg h-1/2 ring flex flex-col'>
        <h1 className='text-center text-4xl p-6'>Password Generator</h1>
        <div className='flex flex-row h-14 w-100 '>
          <div className='ring flex justify-center shadow mb-4 overflow-hidden rounded-lg flex-row h-14 w-4/5'>
            <input 
              ref={passwordRef}
              className='my-auto mx-3 ring text-center w-3/5 h-3/5 rounded-lg'
              value={password}
              readOnly
            />
            <Strength color={passwordQual.col} strength={passwordQual.strength}/>
            <button 
            onClick={() => {
              setRefresh((prev) => !prev)
            }}
            className='mx-auto my-3 h-3/5'>
              <FontAwesomeIcon icon={faArrowRotateRight} />
            </button>
          </div>
          <button 
          onClick={copyToClipboard}
          className='bg-blue-600 h-14 flex justify-center align-center p-4 text-center rounded-lg text-white font-bold mx-auto transition-transform hover:scale-110 '>
            Copy
          </button>
        </div>
        <div className='my-4 flex flex-row'>
          <label className='text-xl mr-4'>
            Password length:    
          </label>
          <input 
          type="text"
          min={3}
          max={26}
          value={length}
          className='w-9 h-7 text-lg'
          />
        </div>
        <div className='h-14 bg-orange-200 rounded-lg flex flex-row items-center justify-center'>
          <span className='text-lg w-1/10 font-bold flex align-center justify-center'>3</span>
          <span>
            <input 
            type="range"
            min={3} 
            max={26}
            value={length}
            className='w-9/10 cursor-pointer'
            onChange={ (e) => { setLength(e.target.value) } }
            />
          </span>
          <span className='text-lg w-1/10 font-bold flex align-center justify-center'>26</span>
        </div>
        <span className='my-4 flex justify-between ring rounded-lg'>
          <label className='my-auto ml-4 text-2xl'>
            ABC
          </label>
          <input 
          type="checkbox"
          defaultChecked={bigAlpha}
          onChange={() => {
            setBigAlpha((prev) => (!prev))
          }}
          className='h-14 mr-4' 
          />
        </span>
        <span className='my-4 flex justify-between ring rounded-lg'>
          <label className='my-auto ml-4 text-2xl'>
            abc
          </label>
          <input 
          type="checkbox"
          defaultChecked={smallAlpha}
          onChange={() => {
            setSmallAlpha((prev) => !prev)
          }}
          className='h-14 mr-4' 
          />
        </span>
        <span className='my-4 flex justify-between ring rounded-lg'>
          <label className='my-auto ml-4 text-2xl'>
            0 1 2 3 4 5 6 7 8 9
          </label>
          <input 
          type="checkbox"
          defaultChecked={num}
          onChange={() => {
            setNum((prev) => !prev)
          }}
          className='h-14 mr-4' 
          />
        </span>
        <span className='my-4 flex justify-between ring rounded-lg'>
          <label className='my-auto ml-4 text-2xl'>
            ! @ # $ % ^ &
          </label>
          <input 
          type="checkbox"
          defaultChecked={specialChar}
          onChange={() => {
            setSpecialChar((prev) => !prev)
          }}
          className='h-14 mr-4' 
          />
        </span>
      </div>
    </>
  )
}

export default App;