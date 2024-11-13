'use client'
import { getRecipes } from '@/app/actions/recipeActions';
import Card from '@/app/components/card';
import Navbar from '@/app/components/Navbar';
import { useRecipeStore } from '@/app/store/recipeStore';
import { IRecipe } from '@/app/types/recipe';
import React, {
    useEffect,
    // useState 
} from 'react'


const Page: React.FC = () => {

    //const [recipes, setRecipes] = useState<IRecipe[] | []>([])
    const recipes = useRecipeStore((state) => state.recipes)
    const setFilteredRecipe = useRecipeStore((state) => state.setFilteredRecipe)
    const filteredRecipe = useRecipeStore((state) => state.filteredRecipe)
    // const loadRecipes = useRecipeStore((state) => state.loadRecipes)

    const getrecipes = async () => {
        try {
            const firstRecipes: IRecipe[] = await getRecipes();
            setFilteredRecipe(firstRecipes || []);
            console.log("page", recipes);

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getrecipes();
    }, []);

    // useEffect(() => {
    //     console.log("Updated filteredRecipe:", filteredRecipe);

    // }, [filteredRecipe]);

    // useEffect(() => {
    //     console.log("Updated recipes:", recipes);
    // }, [recipes]);


    return (
        <>
            <Navbar />
            {/* Recipes Grid */}
            <div>
                <div className="container mx-auto p-4">
                    <h2 className="text-2xl font-bold mb-4">המתכונים שלנו</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredRecipe.map((recipe: IRecipe, index: number) => (
                            <Card key={index} recipe={recipe} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
