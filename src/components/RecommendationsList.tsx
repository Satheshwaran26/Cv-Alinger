
import { RecommendationCard } from "./RecommendationCard";
import { RecommendationType } from "@/hooks/useCVGeneration";

interface RecommendationsListProps {
  recommendations: RecommendationType[];
  selectedRecommendations: RecommendationType[];
  onSelect: (recommendation: RecommendationType, isSelected: boolean) => void;
}

export const RecommendationsList = ({
  recommendations,
  selectedRecommendations,
  onSelect
}: RecommendationsListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendations.map((recommendation: RecommendationType, index: number) => (
        <RecommendationCard 
          key={index} 
          recommendation={recommendation} 
          onSelect={onSelect}
          isSelected={selectedRecommendations.some(
            (rec) => rec.title === recommendation.title
          )}
        />
      ))}
    </div>
  );
};
