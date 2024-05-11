import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import GroceryList from "./GroceryList";
// import { list } from "postcss";
// import { list } from "postcss";
const Grcery = () => {
  const [grocery, setgrocery] = useState("");

  const storedTodoList = localStorage.getItem("grocery");
  const initialTodoList = storedTodoList ? JSON.parse(storedTodoList) : [];

  const [groceryItem, setgroceryItem] = useState(initialTodoList);

  useEffect(() => {
    localStorage.setItem("grocery", JSON.stringify(groceryItem));
  }, [groceryItem]);

  useEffect(() => {
    const storedTodoList = localStorage.getItem("grocery");
    if (storedTodoList) {
      setgroceryItem(JSON.parse(storedTodoList));
    }
  }, []);

  const handleInput = (e) => {
    setgrocery(e.target.value);
  };

  const handleClick = () => {
    if (grocery === "") {
      toast.error("Plz fill the data!!", {
        position: "top-center",
        theme: "dark",
      });
      return;
    }
    const newData = {
      id: uuidv4(),
      item: grocery,
      isCompleted: false,
      timestamp: Date.now(),
    };
    setgroceryItem([...groceryItem, newData]);
    console.log(groceryItem);
    setgrocery("");
    toast.success("Item succesfuly added", {
      position: "top-center",
      theme: "dark",
    });
  };

  const handleDelete = (idx) => {
    const updatedList = [...groceryItem];
    updatedList.splice(idx, 1);
    setgroceryItem(updatedList);
    toast.error("Item is removed", {
      position: "top-center",
      theme: "dark",
    });
  };

  const toggleCompleted = (id) => {
    const updatedList = groceryItem.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setgroceryItem(updatedList);
  };

  return (
    <div>
      <h1>Grocery Bud</h1>
      <div>
        <input
          type="text"
          placeholder="search"
          value={grocery}
          onChange={handleInput}
        />
        <button onClick={handleClick}>Add Item</button>
        <ul>
          {groceryItem.map((list, index) => (
            <GroceryList
              key={list.id}
              id={list.id}
              name={list.item}
              status={list.isCompleted}
              onDelete={() => handleDelete(index)}
              toggleCompleted={toggleCompleted}
            />
          ))}
        </ul>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Grcery;
