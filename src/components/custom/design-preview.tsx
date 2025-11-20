'use client';

import { Download, Sparkles, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TattooDesign } from '@/lib/types';

interface DesignPreviewProps {
  design: TattooDesign | null;
  onPayment: () => void;
}

const styleLabels: Record<string, string> = {
  traditional: 'Tradicional',
  realistic: 'Realista',
  watercolor: 'Aquarela',
  minimalist: 'Minimalista',
  tribal: 'Tribal',
  japanese: 'Japonês',
  geometric: 'Geométrico',
  blackwork: 'Blackwork',
};

const locationLabels: Record<string, string> = {
  arm: 'Braço',
  leg: 'Perna',
  back: 'Costas',
  chest: 'Peito',
  shoulder: 'Ombro',
  wrist: 'Pulso',
  ankle: 'Tornozelo',
  neck: 'Pescoço',
};

export function DesignPreview({ design, onPayment }: DesignPreviewProps) {
  if (!design) {
    return (
      <Card className="w-full h-[600px] flex items-center justify-center">
        <CardContent className="text-center space-y-4">
          <Sparkles className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Nenhuma arte gerada ainda
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Preencha o formulário e clique em "Gerar Tatuagem" para começar
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleDownload = () => {
    if (!design.isPaid) {
      onPayment();
      return;
    }

    // Simulate download (in production, this would download the actual high-res image)
    const link = document.createElement('a');
    link.href = design.imageUrl || '';
    link.download = `tattoo-${design.id}.png`;
    link.click();
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-6">
        {/* Design Info */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Sua Arte Personalizada
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {design.description}
              </p>
            </div>
            {design.isPaid ? (
              <Badge className="bg-green-500 text-white">Pago</Badge>
            ) : (
              <Badge variant="outline" className="border-purple-500 text-purple-500">
                <Lock className="w-3 h-3 mr-1" />
                Bloqueado
              </Badge>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{styleLabels[design.style]}</Badge>
            {design.bodyLocation && (
              <Badge variant="secondary">{locationLabels[design.bodyLocation]}</Badge>
            )}
            {design.fontStyle && (
              <Badge variant="secondary">Fonte: {design.fontStyle}</Badge>
            )}
            {design.fontSize && (
              <Badge variant="secondary">Tamanho: {design.fontSize}</Badge>
            )}
          </div>
        </div>

        {/* Image Preview */}
        <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-800">
          {design.bodyPhotoUrl ? (
            <div className="relative">
              <img
                src={design.bodyPhotoUrl}
                alt="Body location"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <img
                  src={design.imageUrl}
                  alt="Tattoo design"
                  className={`max-w-[60%] max-h-[60%] object-contain ${
                    !design.isPaid ? 'blur-md' : ''
                  }`}
                />
              </div>
            </div>
          ) : (
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
              <img
                src={design.imageUrl}
                alt="Tattoo design"
                className={`w-full h-[400px] object-contain ${
                  !design.isPaid ? 'blur-md' : ''
                }`}
              />
            </div>
          )}

          {!design.isPaid && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="text-center space-y-3">
                <Lock className="w-12 h-12 mx-auto text-white" />
                <p className="text-white font-semibold text-lg">
                  Desbloqueie a arte em alta resolução
                </p>
                <Button
                  onClick={onPayment}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                  size="lg"
                >
                  Desbloquear por R$ 99,90
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {design.isPaid ? (
            <Button
              onClick={handleDownload}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              size="lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Baixar em Alta Resolução
            </Button>
          ) : (
            <Button
              onClick={onPayment}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              size="lg"
            >
              <Lock className="w-5 h-5 mr-2" />
              Desbloquear Arte - R$ 99,90
            </Button>
          )}
        </div>

        {/* Info */}
        <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-4 space-y-2">
          <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
            ✨ O que você recebe:
          </p>
          <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
            <li>• Arte em alta resolução (4K)</li>
            <li>• Ajustes ilimitados via chat com IA</li>
            <li>• Múltiplos formatos (PNG, JPG, SVG)</li>
            <li>• Suporte profissional</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
