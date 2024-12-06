import Recommendation from '../../Database_Layer/models/recommendation.schema';

class RecommendationService {


    //get the recommendations that made for the user
    async getRecommendations(userId: string) {
        let user_recommendations = await Recommendation.find({ userId: userId })
        if (!user_recommendations)
            throw new Error('no recommendations found for this user !');

        return user_recommendations;
    }

    // create a new recmmendation for the user
    async createRecommendation(data: { text: string, userId: string }) {
        let newRecommendation = await Recommendation.create(data);
        newRecommendation.save();
        return newRecommendation;

}
}
export default RecommendationService;

