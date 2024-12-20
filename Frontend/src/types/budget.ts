import { Category } from "./category";

export interface Budget{
    _id?:string
    category?:Category;
    total_spent?:number;
    limit?:number;
    userId?:string;
}