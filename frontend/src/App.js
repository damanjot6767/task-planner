
import { useStatStyles } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import AssignSprint from './component/assignSprint';
import CreateSprint from './component/createsprint';
import Sprint from './component/sprint';

function App() {
  const[tasks,setTasks]=useState([]);
  const[completed,setCompleted]=useState(0);
  const[pending,setPending]=useState(0);
  const fetchAllTasks=async ()=>{
    try {
      const {data} = await axios.get('http://localhost:8000/task/alltasks');
       setTasks(data.result);
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(()=>{
    const sum1 = tasks.reduce((sum, ele) => {
      if (ele.isCompleted) {
        return sum + 1;
      } else {
        return sum;
      }
    }, 0);
    const sum2 = tasks.reduce((sum, ele) => {
      if (!ele.isCompleted) {
        return sum + 1;
      } else {
        return sum;
      }
    }, 0);
setCompleted(sum1)
setPending(sum2)
  },[tasks])

  useEffect(()=>{
  fetchAllTasks()
  },[])
  return (
    <div className="App">
      <div style={{display:"flex",justifyContent:"space-between",width:"100%",margin:"auto",padding:"20px",marginBottom:"40px",background:"#00FFFF"}}>
        <h2 style={{fontSize:"25px",fontWeight:"bold"}}>Welcome To Our Website</h2>
        <h2  style={{fontSize:"25px",fontWeight:"bold"}}>{`Total Task:${tasks.length} Completed :${completed}  Pending :${pending}`}</h2>
      </div>
      <CreateSprint/>
      <Sprint fetchAllTasks={fetchAllTasks}/>
    </div>
  );
}

export default App;
