import { useEffect } from 'react';

function App() {
  const handleClick = () => {
    fetch('http://localhost:5000/')
      .then(res => res.text())
      .then(console.log)
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>FinSight</h1>
      <button onClick={handleClick}>Test Backend</button>
    </div>
  );
}

export default App;
