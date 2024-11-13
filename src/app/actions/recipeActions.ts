import axios from "axios";
import { IRecipe } from "../types/recipe";


// GET all recipes
export const getRecipes = async (): Promise<IRecipe[] | []> => {    
    try {
        const res = await axios.get('http://localhost:3000/api/get', {
            headers: { 'Cache-control': 'no-cache' }
        });
        console.log("res", res);
        
        return res.data.recipes;
    } catch (error) {
        console.error(error);
        return [];
    }
};

// GET recipe by ID
export const getRecipeByName = async (id: string): Promise<IRecipe | null> => {
    try {
        const res = await axios.get(`http://localhost:3000/api/${id}`, {
            headers: { 'Cache-control': 'no-cache' }
        });
        return res.data.recipe;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// DELETE recipe by ID
export const deleteRecipeById = async (id: string): Promise<IRecipe | null> => {
    try {
        const res = await axios.delete(`http://localhost:3000/api/delete/${id}`, {
            headers: { 'Cache-control': 'no-cache' }
        });
        return res.data.recipe;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// // UPDATE recipe by ID
// export const updateRecipeById = async (id: string, newRecipe: Partial<IRecipe>): Promise<IRecipe | null> => {
//     try {
//         let res = await axios.put<{ recipe: IRecipe }>(`http://localhost:3000/api/recipe/put/${id}`, newRecipe, {
//             headers: { 'Cache-control': 'no-cache' }
//         });
//         return res.data.recipe;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// };

// CREATE a new recipe
export const createRecipe = async (recipe: Partial<IRecipe>): Promise<IRecipe | null> => {
    try {
        const res = await axios.post('http://localhost:3000/api/post',
            recipe,
            {
                headers: { 'Cache-control': 'no-cache' }
            });
        console.log("in create recipe action", recipe);
        console.log("res.data.recipe", res.data.recipe);
        console.log("res", res);
        if (res.data.status === 500) {
            console.error("Server error creating recipe:", res.data.message);
            return null;
        }
        return res.data.recipe;
    } catch (error) {
        console.error(error);
        return null;
    }
};
