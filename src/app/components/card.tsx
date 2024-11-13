'use client'
import React from 'react'
import { IRecipe } from '../types/recipe';
import Image from 'next/image';

type RecipeCardData = Pick<IRecipe, 'name' | 'category' | 'image' | 'instructions' | 'ingredients' >;

interface RecipeCardProps {
    recipe: RecipeCardData;
}

const Card: React.FC<RecipeCardProps> = ({ recipe }) => {
    return (
        <div className="border rounded-lg overflow-hidden shadow-md">
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
                <p className="mt-2">{recipe.instructions.slice(0, 100)}...</p>
                <ul className="mt-2">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="text-sm text-gray-700">- {ingredient}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Card
