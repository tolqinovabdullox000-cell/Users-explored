import { useEffect, useState } from 'react'
import { getUser } from '../api/usersApi.js'

function UserDetailsPage({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    getUser(userId, controller.signal)
      .then(setUser)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [userId])

  if (loading) return <div className="empty-state">Yuklanmoqda...</div>
  if (error) return <div className="empty-state">{error}</div>

  return (
    <section className="user-details">
      <a className="back-link" href="#">&larr; Barcha userlar</a>

      <header className="profile-header">
        <img className="profile-image" src={user.image} alt={`${user.firstName} ${user.lastName}`} />
        <div>
          <h1>{user.firstName} {user.lastName}</h1>
        </div>
      </header>
    </section>
  )
}

export default UserDetailsPage

