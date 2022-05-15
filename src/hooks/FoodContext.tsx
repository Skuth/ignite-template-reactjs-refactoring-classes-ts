import { createContext, useContext, useState, useEffect } from "react"

import { api } from "../services/api"

import { FoodType } from "../types"

interface FoodsContextData {
  foods: FoodType[]
  editingFood: FoodType
  isModalOpen: boolean
  isEditModalOpen: boolean
  handleAddFood: (food: FoodType) => Promise<void>
  handleUpdateFood: (food: FoodType) => Promise<void>
  handleDeleteFood: (foodId: number) => Promise<void>
  handleEditFood: (food: FoodType) => void
  toggleModal: () => void
  toggleEditModal: () => void
  toggleAvailable: (food: FoodType) => Promise<void>
}

interface FoodsProviderProps {
  children?: JSX.Element | JSX.Element[]
}

const FoodsContext = createContext({} as FoodsContextData)

const FoodsProvider: React.FC<FoodsProviderProps> = ({ children }) => {
  const [foods, setFoods] = useState<FoodType[]>([])
  const [editingFood, setEditingFood] = useState<FoodType>({} as FoodType)

  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false)

  const handleAddFood = async (food: FoodType) => {
    try {
      const { data: foodData } = await api.post("/foods", {
        ...food,
        available: true
      })

      setFoods(state => [...state, foodData])
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdateFood = async (food: FoodType) => {
    try {
      const { data: foodData } = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food
      })

      setFoods(state => state.map(item => item.id !== foodData.id ? item : foodData))
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteFood = async (foodId: number) => {
    await api.delete(`/foods/${foodId}`)

    setFoods(state => state.filter(item => item.id !== foodId))
  }

  const handleEditFood = (food: FoodType) => {
    setEditingFood(food)
    setEditModalOpen(true)
  }

  const toggleModal = () => {
    setModalOpen(!isModalOpen)
  }

  const toggleEditModal = () => {
    setEditModalOpen(!isEditModalOpen)
  }

  const toggleAvailable = async (food: FoodType) => {
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !food.available
    })

    setFoods(state => state.map(item => item.id !== food.id ? item : ({
      ...food,
      available: !food.available
    })))
  }

  useEffect(() => {
    const loadFoods = async () => {
      const { data: foodsData } = await api.get("/foods")
      setFoods(foodsData)
    }

    loadFoods()
  }, [])

  return (
    <FoodsContext.Provider
      value={{
        foods,
        editingFood,
        isModalOpen,
        isEditModalOpen,
        handleAddFood,
        handleUpdateFood,
        handleDeleteFood,
        handleEditFood,
        toggleModal,
        toggleEditModal,
        toggleAvailable
      }}
    >
      {children}
    </FoodsContext.Provider>
  )
}

const useFoods = (): FoodsContextData => {
  const context = useContext(FoodsContext)

  if (!context) {
    throw new Error("useFoods must be used within an FoodsProvider")
  }

  return context
}

export { FoodsProvider, useFoods };