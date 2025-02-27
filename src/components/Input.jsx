import { useState } from "react";

function Input({ setList }) {
  const [input, setInput] = useState("");

  const saveToDoList = (event) => {
    event.preventDefault();

    if (!input.trim()) return; 

    const task = {
      id: Date.now(),
      text: input,
      status: "pending",
    };

    setList((prev) => [...prev, task]);
    setInput("");
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <form onSubmit={saveToDoList} className="flex flex-col">
        <input
          type="text"
          placeholder="Enter your to-do item"
          className="border-4 border-indigo-600 rounded-xl p-2 w-96"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-sky-500 border border-indigo-600 rounded-md p-2 w-full mt-2"
        >
          Add To-Do
        </button>
      </form>
    </div>
  );
}

export default Input;
