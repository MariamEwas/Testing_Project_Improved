import ShowRecommendations from '../components/ShowRecommendation';
import GenerateRecommendation from '../components/GenerateRecommendation';
import ShowBudget from '../components/ShowBudget';
import '../styles/budget.css'
const RecommendationPage = () => {
  
  return (
    <div className="page-container">
  <div className="top-section">
    <ShowBudget />
  </div>
  
  <div className="bottom-section">
    <div className="left-section">
       <GenerateRecommendation /> 
    </div>
    
    <div className="right-section">
          <ShowRecommendations />
    </div>
  </div>
</div>

  )
}

export default RecommendationPage;
