import { create } from "zustand";
import { IRecipe } from "../types/recipe";

interface IRecipeStore {
    recipes: IRecipe[];
    currentRecipe: IRecipe | null;
    addRecipe: (newRecipe: IRecipe) => void;
    deleteRecipe: (id:string) => void;
}

export const useRecipeStore = create<IRecipeStore>((set) => ({
    recipes: [],//get
    currentRecipe: null,
    addRecipe: (newRecipe: IRecipe) => 
        set((state) => ({
            recipes: [...state.recipes, newRecipe] // מחזירים את המערך המעודכן
        })),
    deleteRecipe: (id: string) => 
        set((state) => ({
            recipes: state.recipes.filter(item => item._id !== id) // מחזירים את המערך לאחר הסינון
        }))


}))