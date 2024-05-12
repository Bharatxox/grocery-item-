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
    <section className="w-screen h-screen relative flex justify-center items-center">
      <div className="p-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="flex flex-col gap-5 bg-gray-800 back rounded-md p-10">
          <h1 className="font font-sans font-bold text-center">Grocery Bag</h1>
          <div className="flex gap-2">
            <input
              className="pl-4 rounded-md"
              type="text"
              placeholder="search"
              value={grocery}
              onChange={handleInput}
            />
            <button onClick={handleClick}>Add Item</button>
          </div>{" "}
          {/* Corrected closing tag */}
          <ul className="w-full flex flex-col justify-center items-center">
            {groceryItem.map((list, index) => (
              <GroceryList
                key={list.id}
                id={list.id}
                name={list.item}
                status={list.isCompleted}
                onDelete={() => handleDelete(index)}
                toggleCompleted={() => toggleCompleted(list.id)}
              />
            ))}
          </ul>
          <ToastContainer />
        </div>
      </div>
    </section>
  );
};

export default Grcery;
