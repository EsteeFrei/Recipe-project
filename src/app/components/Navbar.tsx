'use client'
import React, { useState } from 'react'
import { RecipeCategory } from '@/app/types/recipe';
import { useRecipeStore } from '../store/recipeStore';
import { filterByLikes } from '../clientFunctions/filters';

const Navbar: React.FC = () => {

    const [category, setCategory] = useState<RecipeCategory>(RecipeCategory.All);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<string>('');

    const recipes = useRecipeStore((state) => state.recipes)
    const setFilteredRecipe = useRecipeStore((state) => state.setFilteredRecipe)


    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value as RecipeCategory);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleAddRecipe = () => {
        console.log('Adding recipe...');
        window.location.href = 'addRecipie'
    };

    const handleTabClick = (tab: string) => {
        if (tab === activeTab) {
            console.log("the same");

            return;
        }
        else {
            setActiveTab(tab);
            if (tab === "likes") {
                console.log("recipies in like",recipes);
                const temp=filterByLikes(recipes)
                console.log("temp",temp);
                
                setFilteredRecipe(temp)
            }
            else {
                console.log("all");
                setFilteredRecipe(recipes)
            }
        }
    };

    return (
        <>
            <h1>Recipes</h1>
            <div className="flex items-center justify-between space-x-4">
                <div className="flex-1">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">בחר קטגוריה</label>
                    <select
                        id="category"
                        value={category}
                        onChange={handleCategoryChange}
                        className="p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        {Object.values(RecipeCategory).map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="flex-1">
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700">חיפוש</label>
                    <input
                        id="search"
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="חפש מתכון"
                        className="p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <button
                        onClick={handleAddRecipe}
                        className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-auto"
                    >
                        הוסף מתכון
                    </button>
                </div>
            </div>

            <div className="flex space-x-4 mt-4">
                <button
                    onClick={() => handleTabClick('categories')}
                    className={`py-2 px-4 text-lg font-medium ${activeTab === 'categories' ? 'border-b-2 border-blue-600' : ''}`}
                >
                    כל הקטגוריות
                </button>
                <button
                    onClick={() => handleTabClick('likes')}
                    className={`py-2 px-4 text-lg font-medium ${activeTab === 'favorites' ? 'border-b-2 border-blue-600' : ''}`}
                >
                    מועדפים
                </button>
            </div>
        </>


    )
}

export default Navbar
