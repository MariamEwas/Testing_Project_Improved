import Category from '../../Database_Layer/models/category.schema';

class CategoryService {


  // get all categories of
  async getAllCategories() {
    try{
        //get all budgets related to the user from the database 
        const categories = await Category.find();

        if (!categories.length) {
        throw new Error("No categories found.");
        }
        return categories;
    }
    catch(err:any){
        throw new Error('an error has occured '+err.message);
    }
  }


  async getOneCategory(categoryId:string) {
    try{
    //get Category related to the user from the database 
    const category = await Category.findById(categoryId);

    return category;
    }
    catch(err){
        throw new Error('An error has occured');
    }
  }


}


export default  CategoryService;
