import { create } from 'zustand'

type store = {
    user: null | userType
    setUser : (user: userType) => void
}

type userType = {
    email: string
    id: string
    name: string
    role: string
}

const useAuthStore = create<store>()((set) => ({
    user: null,
    setUser: (user: userType) => set({ user }),
}))

export default useAuthStore