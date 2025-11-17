import { Card, CardContent } from './ui/card';

const CryptoPrice = ({price}) => {
  return (
    <Card key={price.symbol}>
      <CardContent className="p-4">
        <div className="font-bold text-lg mb-1">{price.symbol}</div>
        <div className="text-xl mb-2">${price.price.toLocaleString()}</div>
        <div className={`text-sm font-medium ${price.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {price.change24h >= 0 ? '+' : ''}
          {price.change24h.toFixed(2)}%
        </div>
      </CardContent>
    </Card>
  );
}

export default CryptoPrice