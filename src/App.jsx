import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
  }, []);

  const savetols = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    settodo(t[0].todo);
    let newtodos = todos.filter(item => {
      return item.id !== id;
    });
    settodos(newtodos);
    savetols();
  };

  const handleDelete = (e, id) => {
    let newtodos = todos.filter(item => item.id !== id);
    settodos(newtodos);
    savetols();
  };

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    savetols();
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos);
    savetols();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-cyan-200 min-h-[70vh]">
        <div className="addtodo my-5">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input 
            onChange={handleChange} 
            value={todo} 
            type="text" 
            className='w-50 sm:w-80 p-2 border border-gray-300 rounded-md' 
          />
          <button 
            onClick={handleAdd} 
            className='bg-zinc-900 hover:bg-cyan-600 p-3 py-1 text-sm font-bold text-white rounded-md mx-6 mt-2 sm:mt-0'
          >
            Save
          </button>
          <h2 className='text-lg font-bold mt-4'>Your Todos</h2>
        </div>
        <div className="todos ">
          {todos.length === 0 && <div>No Todo to Display</div>}
          {todos.map(item => (
            <div key={item.id} className="todo flex flex-col sm:flex-row sm:w-1/2 my-3 justify-between items-start sm:items-center">
              <div className='flex gap-5 items-center'>
                <input 
                  name={item.id} 
                  onChange={handleCheckbox} 
                  type="checkbox" 
                  checked={item.isCompleted} 
                  id="" 
                />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
              </div>
              <div className="buttons ml-6 flex mt-2 sm:mt-0">
                <button 
                  onClick={(e) => handleEdit(e, item.id)} 
                  className='bg-zinc-900 hover:bg-cyan-600 p-3 py-1 text-sm font-bold text-white rounded-md mx-2'
                >
                  Edit
                </button>
                <button 
                  onClick={(e) => { handleDelete(e, item.id) }} 
                  className='bg-zinc-900 hover:bg-cyan-600 p-3 py-1 text-sm font-bold text-white rounded-md mx-2'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
