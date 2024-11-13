import { create } from "zustand";
import { IRecipe } from "../types/recipe";
import { getRecipes } from "../actions/recipeActions";

interface IRecipeStore {
    recipes: IRecipe[];
    filteredRecipe: IRecipe[];
    currentRecipe: IRecipe | null;
    loadRecipes: () => void;
    setFilteredRecipe: (recipes: IRecipe[]) => void;
    addRecipe: (newRecipe: IRecipe) => void;
    deleteRecipe: (id: string) => void;

}

export const useRecipeStore = create<IRecipeStore>((set) => ({
    recipes: [],//get
    currentRecipe: null,
    filteredRecipe: [],
    loadRecipes: async () => {
        const fetchRecipes: IRecipe[] | [] = await getRecipes();
        console.log("store", fetchRecipes);

        set({
            recipes: fetchRecipes,
            filteredRecipe: fetchRecipes
        });
        console.log("Updated state:", {
            recipes: fetchRecipes,
            filteredRecipe: fetchRecipes
        });

    },
    setFilteredRecipe: (myrecipes: IRecipe[]) => {
        set({ filteredRecipe: myrecipes })
    },
    addRecipe: (newRecipe: IRecipe) =>
        set((state) => ({
            recipes: [...state.recipes, newRecipe] // מחזירים את המערך המעודכן
        })),
    deleteRecipe: (id: string) =>
        set((state) => ({
            recipes: state.recipes.filter(item => item._id !== id) // מחזירים את המערך לאחר הסינון
        }))


}))