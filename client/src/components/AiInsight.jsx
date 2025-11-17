import FeedbackButtons from "./FeedbackButtons";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Spinner } from "./ui/spinner";

const AiInsight = ({aiLoading,aiInsight,handleFeedback,feedback}) => {
  return (
    <Card className='mb-8'>
      <CardContent className='p-6'>
        {!aiLoading ? (
          <>
            <CardHeader className='flex flex-row items-center justify-between p-0 mb-4'>
              <CardTitle>AI Insight of the Day</CardTitle>
              <FeedbackButtons
                handleFeedback={handleFeedback}
                feedback={feedback}
                contentType={'insight'}
              />
            </CardHeader>
            <p className='mb-2'>{aiInsight.content}</p>
            <small className='text-muted-foreground'>
              Source: {aiInsight.source}
            </small>
          </>
        ) : (
           <Spinner className="size-4 animate-spin" label="Loading AI Insights..."/>
        )}
      </CardContent>
    </Card>
  );
}

export default AiInsight