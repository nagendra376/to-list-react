/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Input from './components/Input';
import List from './components/List';

function App() {
  const [list, setList] = useState(
    ()=>{
    const listArray = localStorage.getItem('list');
    return listArray ? JSON.parse(listArray) : [];
  });

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]); 


  return (
    <>
      <div className="bg-indigo-500 min-h-screen">
        <h2 className="text-white text-center text-4xl font-bold pt-10">My To Do List</h2>
        <Input list={list} setList={setList} />
        <List list={list} setList={setList} />
      </div>
    </>
  );
}

export default App;
