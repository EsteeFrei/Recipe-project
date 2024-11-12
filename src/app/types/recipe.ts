import { Document } from "mongoose";

enum RecipeCategory {
    Appetizer = "Appetizer",    // מנה ראשונה
    MainCourse = "Main Course", //מנה עיקרית
    Dessert = "Dessert",        //קינוח
    Beverage = "Beverage",      //שתייה
    Snack = "Snack",            //חטיף
    Salad = "Salad",            //סלט
}

export default interface IRecipe extends Document {
    name: string;              
    category: RecipeCategory;     
    image: string;                
    instructions: string;         
    ingredients: string[];

}