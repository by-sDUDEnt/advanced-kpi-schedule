import './App.css';
import { useEffect, useState } from 'react';
import reportWebVitals from './reportWebVitals';
function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState();

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    
    fetch("https://schedule.kpi.ua/api/schedule/lessons?groupId=2b2e2ca5-74d2-4685-9213-56e1efc55be5")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result["data"]["scheduleFirstWeek"]  );
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])




  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {/* {reportWebVitals(console.log(items.map(day=> day.pairs)))} */}
        {items.map(day => (
              <div>
                
                <div>{day["day"]}</div>
                <ul>{day["pairs"].map(pair =>  <li>{pair.time} {pair.name}</li>)}</ul>
                
              </div>
            ))}
      </div>
    );
  }
}

export default App;
