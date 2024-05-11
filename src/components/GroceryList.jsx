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
    <li>
      <input type="checkbox" onChange={toggleCheckBox} />
      <span style={{ textDecoration: status ? "line-through" : "none" }}>
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
