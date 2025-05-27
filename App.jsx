import { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './App.css'

function App() {
  const [input, setInput] = useState("");
  const [toDoList, setToDoList] = useState([]);

  const handletext = () => {
      if(input.trim() !==""){
          const item = {
           id: Date.now(),
           string: input,
           completed: false
      }
  setToDoList(prev=> [...prev,item]);
  setInput("");
    }
    else return;
  };
  

  const dropToDo = (id) => {
    setToDoList(toDoList.filter((toDo) => toDo.id !== id))

  }

   const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handletext();
    }
  };

  const toggleCheckbox = (id)=> {
    setToDoList((currrentToDoListitems) => {
    return currrentToDoListitems.map((item)=> {
      if(item.id===id){
        return{
          ...item, 
          completed: !item.completed
        };
      }else{
        return item;
      }
    });
    });
  };


   return(
  <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
  <h1>To-do-List</h1>
  <div className='addBtnInput' style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '15px 0px' }}>
  <TextField
        label="add toDo" 
        variant="filled" 
        color="success" 
        focused 
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
    />
    <Button variant="contained" onClick={handletext}>Add</Button>
  </div>
  {toDoList.map((t)=> (
    <div style={{display: "flex", alignItems: "center", margin:"5px", padding:"5px"}} key={t.id}>
    <label style={{padding:"7px",marginLeft:"0px",alignItems:"center"}}>
    <input type="checkbox" onChange={()=> toggleCheckbox(t.id)}/>
    <span className={t.completed? "strikethrough":""}>{t.string}</span>
    </label>
    <Button variant='outlined' color='error' onClick={()=>dropToDo(t.id)}>Drop</Button>
    </div>))}
  </div>
  );
};

export default App;
