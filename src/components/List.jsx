import { useState, useEffect } from "react";

function List({ list, setList }) {
  const [completedTasks, setCompletedTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("completedTasks"))||[];
  });

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  const toggleComplete = (taskId) => {
 
    console.log({taskId})
    
    setList((task) => {
 
    return task.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status: task.status === "completed" ? "pending" : "completed",
          }
        : task  )}
   
      )
  };

  const deleteTask = (taskId) => {
    const updatedList = list.filter((task) => task.id !== taskId);
    setList(updatedList);
    setCompletedTasks((prev) => {
      const updatedTasks = prev.filter((id) => id !== taskId);
      localStorage.setItem("completedTasks", JSON.stringify(updatedTasks)); // Store in localStorage
      return updatedTasks;
    });
  };

  const editTask = (taskId) => {
    const updatedList = [...list];
    const taskIndex = updatedList.findIndex((task) => task.id === taskId);
    const currentTask = updatedList[taskIndex].text;
    const newTaskText = prompt("Edit task:", currentTask);

    if (newTaskText !== null && newTaskText.trim() !== "") {
      updatedList[taskIndex].text = newTaskText;
      setList(updatedList);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <h3 className="text-white text-xl font-semibold">To-Do Items:</h3>
      <div className="text-white">
        <p>Total Tasks: {list.length}</p>
        <p>Completed Tasks: {completedTasks.length}</p>
      </div>

      <ul className="w-96 bg-white p-4 rounded-lg shadow-md">
        {list.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks added yet.</p>
        ) : (
          list.map((task) => (
            <li
              key={task.id}
              className="border-b last:border-none py-2 text-lg flex justify-between items-center"
            >
              <input
                type="checkbox"
                checked={task.status === "completed"}
                onChange={() => toggleComplete(task.id)}
                className="w-5 h-5 accent-blue-500 cursor-pointer"
              />

              <span
                className={`ml-2 flex-1 ${
                  completedTasks.includes(task.id) ? "line-through text-gray-500" : ""
                }`}
              >
                {task.text}
              </span>

              <button
                onClick={() => editTask(task.id)}
                className="bg-blue-500 text-white px-2 py-1 rounded-md ml-2"
              >
                Edit
              </button>

              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white px-2 py-1 rounded-md ml-2"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default List;
