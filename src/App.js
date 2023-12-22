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
  onClearList,
}) => {
  const sort = {
    input: (items) => items,
    description: (items) =>
      items
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description)),
    packed: (items) =>
      items.slice().sort((a, b) => a.packed - b.packed),
  }

  const defaultSort = Object.keys(sort)[0]
  const [sortBy, setSortBy] = useState(defaultSort)
  const sortedItems = sort[sortBy](items)

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItems={handleDeleteItem}
            onPackItem={handlePackItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  )
}

const Stats = ({ items }) => {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    )
  }

  const numItems = items.length
  const numPacked = items.filter((item) => item.packed).length
  const percentage = Math.round((numPacked / numItems) * 100)

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : ` 💼 You have ${numItems} items on your list,
          and you already packed ${numPacked} (${percentage}%)`}
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

  const handleClearList = () => {
    setItems([])
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItem}
        onPackItem={handlePackItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  )
}

export default App
