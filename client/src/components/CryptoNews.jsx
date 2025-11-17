import FeedbackButtons from "./FeedbackButtons";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const CryptoNews = ({
  dashboardData,
  handleFeedback,
  feedback,
}) => {
  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Crypto News</CardTitle>
        <FeedbackButtons
          handleFeedback={handleFeedback}
          feedback={feedback}
          contentType={'news'}
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dashboardData.news.map((item) => (
            <Card key={item.id} className="bg-secondary/50">
              <CardContent className="p-4">
                <a
                  href={item.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className="text-primary hover:underline font-semibold block mb-2"
                >
                  {item.title}
                </a>
                <div className="text-sm text-muted-foreground">
                  {item.source} • {new Date(item.publishedAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoNews