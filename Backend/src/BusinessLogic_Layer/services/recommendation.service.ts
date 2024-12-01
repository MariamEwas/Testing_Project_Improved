import Recommendation from '../../Database_Layer/models/recommendation.schema';

class recommendation{
    constructor(){};

    static async getRecommendations(userId:string)
    {
        let user_recommendations = await Recommendation.find({userId:userId})
        return user_recommendations;
    }

    static async createRecommendation(data:{text:string,userId:string}){
        let newRecommendation = await Recommendation.create(data);
        return newRecommendation;
    }
  
}
export default recommendation ;