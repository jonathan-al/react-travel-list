import { useState } from "react"

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
]

const Logo = () => {
  return <h1>🏝️ Far Away 🧳</h1>
}

const Form = ({ onAddItems }) => {
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!description) return

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    }
    console.log("newItem=", newItem)

    onAddItems(newItem)

    setDescription("")
    setQuantity(1)
  }

  return (
    <form
      className="add-form"
      onSubmit={(event) => handleSubmit(event)}
    >
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button>Add</button>
    </form>
  )
}

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

const PackingList = ({
  items,
  onDeleteItems: handleDeleteItem,
  onPackItem: handlePackItem,
}) => {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItems={handleDeleteItem}
            onPackItem={handlePackItem}
          />
        ))}
      </ul>
    </div>
  )
}

const Stats = () => {
  return (
    <footer className="stats">
      <em>
        🧳 You have X items on your list, and you alreade packed X
        (X%)
      </em>
    </footer>
  )
}

const App = () => {
  const [items, setItems] = useState(initialItems)

  const handleAddItems = (item) => {
    setItems((currentItems) => [...currentItems, item])
  }

  const handleDeleteItem = (id) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    )
  }

  const handlePackItem = (id) => {
    setItems((currentItems) => {
      return currentItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      )
    })
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItem}
        onPackItem={handlePackItem}
      />
      <Stats />
    </div>
  )
}

export default App
