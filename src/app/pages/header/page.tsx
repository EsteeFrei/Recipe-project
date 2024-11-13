'use client'
import { RecipeCategory } from '@/app/types/recipe';
import React, { useState } from 'react'

const page: React.FC = () => {

    const [category, setCategory] = useState<RecipeCategory>(RecipeCategory.Appetizer);
    const [searchQuery, setSearchQuery] = useState('');


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

    return (
        // <>
        //     <h1>Recipes</h1>
        //     <div className="flex items-center justify-between space-x-4">
        //         {/* Input for Category */}
        //         <div className="flex-1">
        //             <label htmlFor="category" className="block text-sm font-medium text-gray-700">בחר קטגוריה</label>
        //             <select
        //                 id="category"
        //                 value={category}
        //                 onChange={handleCategoryChange}
        //                 className="p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        //             >
        //                 {Object.values(RecipeCategory).map((cat) => (
        //                     <option key={cat} value={cat}>{cat}</option>
        //                 ))}
        //             </select>
        //         </div>

        //         {/* Input for Search */}
        //         <div className="flex-1">
        //             <label htmlFor="search" className="block text-sm font-medium text-gray-700">חיפוש</label>
        //             <input
        //                 id="search"
        //                 type="text"
        //                 value={searchQuery}
        //                 onChange={handleSearchChange}
        //                 placeholder="חפש מתכון"
        //                 className="p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        //             />
        //         </div>

        //         {/* Button for Add Recipe */}
        //         <div>
        //             <button
        //                 onClick={handleAddRecipe}
        //                 className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-auto"
        //             >
        //                 הוסף מתכון
        //             </button>
        //         </div>
        //     </div>
        // </>
    )
}

export default page
