import { useEffect, useRef, useState } from 'react'
import { getUsers, searchUsers } from '../api/usersApi.js'
import SearchBar from '../components/SearchBar.jsx'
import UserList from '../components/UserList.jsx'

function UsersPage() {
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const requestRef = useRef(null)

  useEffect(() => {
    requestRef.current?.abort()
    const controller = new AbortController()
    requestRef.current = controller
    setLoading(true)
    setError(null)

    const request = query ? searchUsers(query, controller.signal) : getUsers(controller.signal)
    request
      .then(setUsers)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [query])

  return (
    <section className="users-page">
      <SearchBar onSearch={setQuery} />
      {loading && <div className="empty-state">Yuklanmoqda...</div>}
      {!loading && error && <div className="empty-state">{error}</div>}
      {!loading && !error && users.length === 0 && <div className="empty-state">Hech narsa topilmadi</div>}
      {!loading && !error && users.length > 0 && <UserList users={users} />}
    </section>
  )
}

export default UsersPage