function UserCard({ user }) {
  return (
    <a className="user-card" href={`/users/${user.id}`}>
      <img className="user-avatar" src={user.image} alt={`${user.firstName} ${user.lastName}`} />
      <span className="user-card-content">
        <span>{user.firstName} {user.lastName}</span>
      </span>
    </a>
  )
}

export default UserCard