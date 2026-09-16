function UserCard({ user }) {
  return (
    <div className="user-card">
      <span className="user-card-content">
        <strong className="user-name">{user.firstName} {user.lastName}</strong>
      </span>
    </div>
  )
}

export default UserCard