import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

import { useFoods } from '../../hooks/FoodContext';

import { FoodType } from '../../types';

export const ModalEditFood: React.FC = () => {
  const { isEditModalOpen, editingFood, toggleEditModal, handleUpdateFood } = useFoods()

  const formRef = useRef<FormHandles>(null)

  const handleSubmit = async (data: FoodType) => {
    handleUpdateFood(data)
    toggleEditModal()
  }

  return (
    <Modal isOpen={isEditModalOpen} setIsOpen={toggleEditModal}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}