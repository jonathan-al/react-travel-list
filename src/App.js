import { useState } from "react"
import Form from "./components/Form"
import Logo from "./components/Logo"
import PackingList from "./components/PackingList"
import Stats from "./components/Stats"

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
]

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
