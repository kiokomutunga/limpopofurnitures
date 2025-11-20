
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone } from 'lucide-react';

interface MpesaFormProps {
  amount: number;
  onPaymentInitiated: () => void;
}

const MpesaForm = ({ amount, onPaymentInitiated }: MpesaFormProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handlePayment = async () => {
    if (!phoneNumber) {
      alert('Please enter your phone number');
      return;
    }

    setIsLoading(true);
    
    // Simulate M-PESA STK push
    setTimeout(() => {
      setIsLoading(false);
      alert(`M-PESA payment request sent to ${phoneNumber}. Please check your phone and enter your M-PESA PIN to complete the payment of ${formatPrice(amount)}.`);
      onPaymentInitiated();
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-green-600" />
          M-PESA Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="mpesa-phone">Phone Number</Label>
          <Input
            id="mpesa-phone"
            type="tel"
            placeholder="254712345678"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter your M-PESA registered phone number
          </p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-800">
            Amount to pay: <span className="font-bold">{formatPrice(amount)}</span>
          </p>
        </div>

        <Button 
          onClick={handlePayment}
          disabled={isLoading || !phoneNumber}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {isLoading ? 'Sending STK Push...' : 'Pay with M-PESA'}
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">
          You will receive an M-PESA prompt on your phone to complete the payment
        </p>
      </CardContent>
    </Card>
  );
};

export default MpesaForm;
