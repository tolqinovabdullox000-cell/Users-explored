const API_URL = 'https://dummyjson.com'

async function fetchUsers(url, signal) {
  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error('Maʼlumotlarni yuklashda xatolik yuz berdi.')
  }

  const data = await response.json()
  return data.users
}

export function getUsers(signal) {
  return fetchUsers(`${API_URL}/users?limit=30`, signal)
}

export function searchUsers(query, signal) {
  return fetchUsers(`${API_URL}/users/search?q=${encodeURIComponent(query)}&limit=30`, signal)
}

export async function getUser(id, signal) {
  const response = await fetch(`${API_URL}/users/${id}`, { signal })

  if (!response.ok) {
    throw new Error('User maʼlumotlarini yuklashda xatolik yuz berdi.')
  }

  return response.json()
}