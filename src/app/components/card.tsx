'use client'
import React, { useEffect, useState } from 'react'
import { IRecipe } from '../types/recipe';
import Image from 'next/image';
import { updateRecipeLike } from '../actions/recipeActions';

type RecipeCardData = Pick<IRecipe, '_id' | 'name' | 'category' | 'image' | 'instructions' | 'ingredients' | 'like'>;

interface RecipeCardProps {
    recipe: RecipeCardData;
    onLikeToggle?: (liked: boolean) => void;
}

const Card: React.FC<RecipeCardProps> = ({ recipe }) => {
    const [isLiked, setIsLiked] = useState(recipe.like);

    useEffect(() => {
        setIsLiked(recipe.like);
    }, [recipe.like]);

    const handleLikeToggle = () => {
        const newLikeStatus = !isLiked;
        setIsLiked(newLikeStatus);
        updateRecipeLike(String(recipe._id), newLikeStatus);
    };

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
                <ul className="mt-2">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="text-sm text-gray-700">- {ingredient}</li>
                    ))}
                </ul>
                <div className="flex items-center justify-end p-4">
                    <button
                        onClick={handleLikeToggle}
                        className={`cursor-pointer ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
                        style={{ fontSize: '24px' }}
                    >
                        {isLiked ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Card
