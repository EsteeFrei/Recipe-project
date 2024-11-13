import { IRecipe } from "../types/recipe";

//מייצרת פונקצית מיון ע"פ פונקציה שהיא מקבלת בפרמטרים
const filterByFn = (items: IRecipe[], filter: (item: IRecipe) => boolean): IRecipe[] => {
    return items.filter(filter);
}

export const filterByLikes = (items: IRecipe[]): IRecipe[] => 
    filterByFn(items, (item) => item.like);
  
  export const filterByCategory = (items: IRecipe[], category: string): IRecipe[] =>
    filterByFn(items, (item) => item.category === category);
  
  export const filterByQuery = (items: IRecipe[], query: string): IRecipe[] =>
    filterByFn(items, (item) =>
      new RegExp(query, 'i').test(item.name) ||
      new RegExp(query, 'i').test(item.category) ||
      new RegExp(query, 'i').test(item.instructions)
    );