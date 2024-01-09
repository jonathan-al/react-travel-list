import { useState } from "react"
import Item from "./Item"

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

export default PackingList
