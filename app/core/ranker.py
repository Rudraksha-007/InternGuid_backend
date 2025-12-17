import pandas as pd # type: ignore

class Ranker:
    def __init__(self, weights: dict = None): # type: ignore
        if weights is None:
            self.weights = {
                'skills': 0.5, 'domain': 0.3, 'title': 0.4,
                'location': 0.2, 'degree': 0.1, 'r_index': 0.3
            }
        else:
            self.weights = weights

    def rank(self, scores_df: pd.DataFrame, df: pd.DataFrame, top_k: int, user_details: dict):
        """
        Combines scores, ranks results, and formats the response.
        """
        scores_df['final_score'] = (
            self.weights['skills'] * scores_df['skills_score'] +
            self.weights['domain'] * scores_df['domain_score'] +
            self.weights['title'] * scores_df['title_score'] +
            self.weights['location'] * scores_df['location_score'] +
            self.weights['degree'] * scores_df['degree_score'] +
            self.weights['r_index'] * scores_df['r_index_score']
        )

        results_df = df.join(scores_df)
        results = results_df.sort_values(by='final_score', ascending=False).head(top_k)

        recommendations = results[['title', 'location', 'skills', 'domain', 'final_score', 'company_name', 'stipend', 'duration', 'workmode']].to_dict(orient='records') # type: ignore

        response = {
            "user": user_details,
            "recommendations": recommendations
        }

        return response