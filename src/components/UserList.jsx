import UserCard from './UserCard.jsx'

function UserList({ users }) {
  return (
    <div className="user-grid">
      {users.map((user) => <UserCard key={user.id} user={user} />)}
    </div>
  )
}

export default UserList