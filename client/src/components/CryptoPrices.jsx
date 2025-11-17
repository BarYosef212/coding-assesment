import CryptoPrice from "./CryptoPrice";
import FeedbackButtons from "./FeedbackButtons";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const CryptoPrices = ({
  dashboardData,
  handleFeedback,
  feedback,
}) => {
  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Crypto Prices</CardTitle>
        <FeedbackButtons
          handleFeedback={handleFeedback}
          feedback={feedback}
          contentType={'prices'}
        />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {dashboardData.prices.map((price, index) => (
            <CryptoPrice price={price} key={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoPrices