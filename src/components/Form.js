import { useState } from "react"

export const Form = ({ onAddItems }) => {
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

export default Form
