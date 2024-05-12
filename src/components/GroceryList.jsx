import PropTypes from "prop-types";
const GroceryList = ({ id, name, onDelete, status, toggleCompleted }) => {
  // const [isChecked, setIsChecked] = useState(status);

  const toggleCheckBox = () => {
    toggleCompleted(id); // Call the function passed down
  };

  const DeleteItem = () => {
    onDelete();
  };

  return (
    <li className="flex gap-5 items-center justify-between w-full py-2">
      <input type="checkbox" onChange={toggleCheckBox} className="w-1/12" />
      <span
        style={{ textDecoration: status ? "line-through" : "none" }}
        className="w-10/12 capitalize"
      >
        {name}
      </span>
      <button onClick={DeleteItem}>Delete</button>
    </li>
  );
};
GroceryList.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  status: PropTypes.bool,
  onDelete: PropTypes.func,
  toggleCompleted: PropTypes.func,
};

export default GroceryList;
