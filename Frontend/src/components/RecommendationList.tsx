import { Recommendation } from '../types/recommendation';

interface RecommendationListProps {
  recommendations: Recommendation[];
}

export default function RecommendationList({ recommendations }: RecommendationListProps) {
  return (
    <ul className="space-y-4">
      {recommendations.map((recommendation) => (
        <li key={recommendation._id} className="bg-white shadow rounded-lg p-4">
          {/* <h3 className="text-lg font-semibold">{recommendation.title}</h3> */}
          <p className="text-gray-600">{recommendation.text}</p>
        </li>
      ))}
    </ul>
  );
}

