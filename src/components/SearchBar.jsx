import { useEffect, useRef, useState } from 'react'

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    onSearch(inputValue.trim())
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-controls">
        <input
          ref={inputRef}
          id="user-search"
          type="search"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Search by name..."
        />
        <button type="submit" className="search-button">Search</button>
      </div>
    </form>
  )
}

export default SearchBar