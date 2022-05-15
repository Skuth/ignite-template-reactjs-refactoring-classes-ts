import { Header } from '../../components/Header';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';

import { useFoods } from '../../hooks/FoodContext';

import { FoodsContainer } from './styles';

export const Dashboard: React.FC = () => {
  const {
    foods
  } = useFoods()

  return (
    <>
      <Header />
      <ModalAddFood />
      <ModalEditFood />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
            />
          ))}
      </FoodsContainer>
    </>
  )
}