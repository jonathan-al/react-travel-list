const Item = ({ item, onDeleteItems, onPackItem }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onPackItem(item.id)}
      />
      <span
        style={item.packed ? { textDecoration: "line-through" } : {}}
      >
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  )
}

export default Item
