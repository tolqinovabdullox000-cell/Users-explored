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

  const details = [
    ['Email', user.email],
    ['Telefon', user.phone],
    ['Yosh', user.age],
    ['Jins', user.gender],
    ['Tug‘ilgan sana', user.birthDate],
    ['Qon guruhi', user.bloodGroup],
    ['Bo‘yi', `${user.height} cm`],
    ['Vazni', `${user.weight} kg`],
    ['Universitet', user.university],
    ['Kompaniya', user.company?.name],
    ['Lavozim', user.company?.title],
    ['Manzil', `${user.address?.address}, ${user.address?.city}`],
  ]

  return (
    <section className="user-details">
      <a className="back-link" href="/">&larr; Barcha userlar</a>
      <header className="profile-header">
        <img className="profile-image" src={user.image} alt={`${user.firstName} ${user.lastName}`} />
        <div>
          <h1>{user.firstName} {user.lastName}</h1>
          <p>@{user.username}</p>
        </div>
      </header>
      <dl className="profile-info">
        {details.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value || 'Ko‘rsatilmagan'}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default UserDetailsPage