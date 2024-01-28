// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import { useState } from 'react';
import './App.css';
import NestedComment from './components/NestedComment/NestedComment';

function App() {
  // const [x, setX] = useState({ replies: [] });
  // const [count, setCount] = useState(0);

  // const handleClick = () => {
  //   x.replies.push(Date.now());
  //   setCount((val) => val + 1);
  // };

  // return (
  //   <>
  //     <button onClick={handleClick}>click me</button>
  //     {count}

  //     {x?.replies?.map((val) => (
  //       <div>{val}</div>
  //     ))}
  //   </>
  // );
  return <NestedComment />;
}

export default App;
