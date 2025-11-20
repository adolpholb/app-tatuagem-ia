'use client';

import { useState } from 'react';
import { CreditCard, Lock, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TattooDesign } from '@/lib/types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  design: TattooDesign | null;
  onPaymentSuccess: (designId: string) => void;
}

export function PaymentModal({ isOpen, onClose, design, onPaymentSuccess }: PaymentModalProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.slice(0, 19); // 16 digits + 3 spaces
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handlePayment = async () => {
    if (!design) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      // Update design as paid in localStorage
      const saved = localStorage.getItem('tattooDesigns');
      if (saved) {
        const designs: TattooDesign[] = JSON.parse(saved);
        const updatedDesigns = designs.map((d) =>
          d.id === design.id ? { ...d, isPaid: true } : d
        );
        localStorage.setItem('tattooDesigns', JSON.stringify(updatedDesigns));
      }

      onPaymentSuccess(design.id);

      // Close modal after success
      setTimeout(() => {
        setPaymentSuccess(false);
        onClose();
        resetForm();
      }, 2000);
    }, 2000);
  };

  const resetForm = () => {
    setCardNumber('');
    setCardName('');
    setExpiryDate('');
    setCvv('');
  };

  const isFormValid = cardNumber.replace(/\s/g, '').length === 16 &&
    cardName.trim().length > 0 &&
    expiryDate.length === 5 &&
    cvv.length === 3;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        {paymentSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-10 h-10 text-white" />
            </div>
            <DialogTitle className="text-2xl text-center">Pagamento Aprovado!</DialogTitle>
            <DialogDescription className="text-center">
              Sua arte está pronta para download. Obrigado pela compra!
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-purple-500" />
                Finalizar Pagamento
              </DialogTitle>
              <DialogDescription>
                Complete o pagamento para receber sua arte em alta resolução
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Price */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white">
                <p className="text-sm opacity-90">Valor Total</p>
                <p className="text-4xl font-bold mt-1">R$ 99,90</p>
                <p className="text-sm opacity-90 mt-2">Arte em alta resolução + Ajustes ilimitados</p>
              </div>

              {/* Card Number */}
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Número do Cartão</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                />
              </div>

              {/* Card Name */}
              <div className="space-y-2">
                <Label htmlFor="cardName">Nome no Cartão</Label>
                <Input
                  id="cardName"
                  placeholder="NOME COMPLETO"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                />
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Validade</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/AA"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    type="password"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    maxLength={3}
                  />
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                <Lock className="w-4 h-4 text-green-500" />
                <p>Pagamento 100% seguro e criptografado</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
                <Button
                  onClick={handlePayment}
                  disabled={!isFormValid || isProcessing}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pagar R$ 99,90
                    </>
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
