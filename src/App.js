import { useState } from "react"

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
]

const Logo = () => {
  return <h1>🏝️ Far Away 🧳</h1>
}

const Form = () => {
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

const Item = ({ item }) => {
  return (
    <li>
      <span
        style={item.packed ? { textDecoration: "line-through" } : {}}
      >
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  )
}

const PackingList = () => {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item key={item.id} item={item} />
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
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  )
}

export default App
