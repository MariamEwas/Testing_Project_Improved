import Recommendation from '../../Database_Layer/models/recommendation.schema';

class recommendationService {

    constructor(){};

    static async getRecommendations(userId:string)
    {
        let user_recommendations = await Recommendation.find({userId:userId})
        if (!user_recommendations)
            throw new Error('no recommendations found for this user !');

        return user_recommendations;
    }

    static async createRecommendation(data:{text:string,userId:string}){
        let newRecommendation = await Recommendation.create(data);
        newRecommendation.save();
        return newRecommendation;
    }
  

}
export default recommendationService;