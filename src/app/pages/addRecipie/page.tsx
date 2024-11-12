'use client'

import {
    // IRecipe, 
    RecipeCategory
} from "@/app/types/recipe"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2'

const recipeSchema = z.object({
    name: z.string().min(2, { message: "השם צריך להיות לפחות 2 תווים" }),
    category: z.enum([
        RecipeCategory.Appetizer,
        RecipeCategory.MainCourse,
        RecipeCategory.Dessert,
        RecipeCategory.Beverage,
        RecipeCategory.Snack,
        RecipeCategory.Salad,
    ]),
    image: z.string().url({ message: "קישור אינו תקין" }),
    instructions: z.string().min(1, { message: "הוראות הכנה לא יכולות להיות ריקות" })
        .refine((val) => val.split(/\s+/).length >= 10, {
            message: "הוראות הכנה צריכות להכיל לפחות 10 מילים"
        }),
    ingredients: z.array(z.string())
        .min(2, { message: "יש להוסיף לפחות 2 מרכיבים" })
})

type RecipeData = z.infer<typeof recipeSchema>;

const Page: React.FC = () => {

    const [ingredients, setIngredients] = useState(["מטבח נקי", "סבלנות"]);

    const { register, handleSubmit, formState: { errors } ,setValue } = useForm<RecipeData>({
        resolver: zodResolver(recipeSchema),
        defaultValues: {
            name: "my dish",
            category: RecipeCategory.Appetizer,
            image: "../../images/supe.png",
            instructions: "להתחיל בחיוך...",
            ingredients: ["מטבח נקי", "סבלנות"]
        },
    });

    const onSubmit = (data: RecipeData) => {
        console.log("נתונים תקינים:", data);
        Swal.fire({
            title: "אלופים!",
            text: "הנתונים שלכם מצוינים",
            icon: "success"
        });
    };

    const addIngredient = () => {
        setIngredients([...ingredients, ""]);  // הוסף רכיב ריק
    };

    // פונקציה לעדכון רכיב מסוים
    const handleIngredientChange = (index: number, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
        setValue("ingredients", newIngredients);  // עדכון גם ב־react-hook-form
    };

    return (

        <div className="max-w-2xl mx-auto p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* שם המתכון */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">שם המתכון</label>
                    <input
                        id="name"
                        type="text"
                        {...register('name')}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                {/* קטגוריה */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">קטגוריה</label>
                    <select
                        {...register('category')}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value={RecipeCategory.Appetizer}>מנת פתיחה</option>
                        <option value={RecipeCategory.MainCourse}>מנה עיקרית</option>
                        <option value={RecipeCategory.Dessert}>קינוח</option>
                        <option value={RecipeCategory.Beverage}>שתייה</option>
                        <option value={RecipeCategory.Snack}>נשנוש</option>
                        <option value={RecipeCategory.Salad}>סלט</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                </div>

                {/* תמונה */}
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">תמונה</label>
                    <input
                        id="image"
                        type="text"
                        {...register('image')}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                </div>

                {/* הוראות */}
                <div>
                    <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">הוראות הכנה</label>
                    <textarea
                        id="instructions"
                        {...register('instructions')}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.instructions && <p className="text-red-500 text-sm">{errors.instructions.message}</p>}
                </div>

                {/* מרכיבים */}
                <div>
                    <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">מרכיבים</label>
                    <div className="space-y-2">
                        {ingredients.map((ingredient, index) => (
                            <input
                                key={index}
                                type="text"
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                                className="p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={addIngredient}
                        className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        הוסף רכיב
                    </button>
                    {errors.ingredients && <p className="text-red-500 text-sm">{errors.ingredients.message}</p>}
                </div>

                {/* כפתור שליחה */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    שלח
                </button>
            </form>
        </div>
    )
}

export default Page

