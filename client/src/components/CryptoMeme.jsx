import FeedbackButtons from "./FeedbackButtons";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const CryptoMeme = ({ handleFeedback, dashboardData,feedback }) => {
  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Crypto Meme</CardTitle>
        <FeedbackButtons
          handleFeedback={handleFeedback}
          feedback={feedback}
          contentType={'meme'}
        />
      </CardHeader>
      <CardContent>
        <a href={dashboardData.meme.imageUrl} target='_blank' rel="noopener noreferrer" className="block mb-4">
          <img
            src={dashboardData.meme.image}
            alt={dashboardData.meme.title}
            className="max-w-xs rounded-md mb-2"
          />
        </a>
        <div className="font-bold mb-1">{dashboardData.meme.title}</div>
        <small className="text-muted-foreground">
          Source: {dashboardData.meme.source}
        </small>
      </CardContent>
    </Card>
  );
}

export default CryptoMeme