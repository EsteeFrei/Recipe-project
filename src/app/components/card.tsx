'use client'
import React, { useState } from 'react'
import { IRecipe } from '../types/recipe';
import Image from 'next/image';
import Modal from './Modal';
import { useReciprStore } from '../store/recipeStore';
import { deleteRecipeById } from '../actions/recipeActions';

type RecipeCardData = Pick<IRecipe,'_id' |'name' | 'category' | 'image' | 'instructions' | 'ingredients'>;

 interface RecipeCardProps {
    recipe: RecipeCardData;
}

const Card: React.FC<RecipeCardProps> = ({ recipe }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const deleteRecipe = useReciprStore((state)=>state.deleteRecipe)

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const deleterecipe =async()=>{
          const result= await deleteRecipeById(String(recipe._id))
          if(result){
            deleteRecipe(String(recipe._id))
            closeModal()
          }
          
    }

    return (
        <div>
            <div className="border rounded-lg overflow-hidden shadow-md cursor-pointer" onClick={openModal}>
                <Image
                    src={recipe.image}
                    alt={recipe.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-xl font-semibold">{recipe.name}</h3>
                    <p className="text-gray-500">{recipe.category}</p>
                </div>
            </div>

            {isModalOpen && <Modal recipe={recipe} onClose={closeModal} onDelete={deleterecipe}/>}
        </div>
    )
}

export default Card
