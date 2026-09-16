import UsersPage from './pages/UsersPage.jsx'
import UserDetailsPage from './pages/UserDetailsPage.jsx'
import './App.css'

function App() {
	const userId = window.location.pathname.match(/^\/users\/(\d+)\/?$/)?.[1]

	return (
		<main className="page-content">
			{userId ? <UserDetailsPage userId={userId} /> : <UsersPage />}
		</main>
	)
}

export default App
