'use client'
import { getRecipes } from '@/app/actions/recipeActions';
import Card from '@/app/components/card';
import Navbar from '@/app/components/Navbar';
//import { useReciprStore } from '@/app/store/recipeStore';
import { IRecipe } from '@/app/types/recipe';
import React, { useEffect, useState} from 'react'



const Page: React.FC = () => {

    //const recipes = useReciprStore((state)=>state.recipes) 
    const [recipes, setRecipes] = useState<IRecipe[]>([])

    const getrecipes = async () => {
        try {
            const firstRecipes: IRecipe[] = await getRecipes();
            setRecipes(firstRecipes || []);
            console.log("page", recipes);

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getrecipes();
    }, []);

    useEffect(() => {
        console.log("Updated recipes:", recipes);
    }, [recipes]);


    return (
        <>
            <Navbar />

            <div>
                <div className="container mx-auto p-4">
                    <h2 className="text-2xl font-bold mb-4">המתכונים שלנו</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {recipes.map((recipe: IRecipe, index: number) => (
                            <Card key={index} recipe={recipe} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
