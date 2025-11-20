'use client';

import { useState, useEffect } from 'react';
import { Wand2, Upload, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TattooStyle, BodyLocation, FontStyle, TattooDesign } from '@/lib/types';

interface TattooGeneratorProps {
  onGenerate: (design: TattooDesign) => void;
  onOpenChat: () => void;
}

export function TattooGenerator({ onGenerate, onOpenChat }: TattooGeneratorProps) {
  const [description, setDescription] = useState('');
  const [style, setStyle] = useState<TattooStyle>('traditional');
  const [bodyLocation, setBodyLocation] = useState<BodyLocation>('arm');
  const [bodyPhoto, setBodyPhoto] = useState<string | null>(null);
  const [fontStyle, setFontStyle] = useState<FontStyle>('script');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleBodyPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBodyPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!description.trim()) return;

    setIsGenerating(true);

    // Simulate AI generation (in production, this would call OpenAI API)
    setTimeout(() => {
      const newDesign: TattooDesign = {
        id: Date.now().toString(),
        description,
        style,
        bodyLocation,
        bodyPhotoUrl: bodyPhoto || undefined,
        fontSize,
        fontStyle,
        createdAt: new Date(),
        isPaid: false,
        imageUrl: `https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=600&h=600&fit=crop`, // Placeholder
      };

      // Save to localStorage
      const saved = localStorage.getItem('tattooDesigns');
      const designs = saved ? JSON.parse(saved) : [];
      designs.push(newDesign);
      localStorage.setItem('tattooDesigns', JSON.stringify(designs));

      onGenerate(newDesign);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="w-6 h-6 text-purple-500" />
          Crie Sua Tatuagem
        </CardTitle>
        <CardDescription>
          Descreva sua ideia e deixe a IA criar a arte perfeita para você
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Descreva sua ideia de tatuagem</Label>
          <Textarea
            id="description"
            placeholder="Ex: Um dragão oriental voando entre nuvens com detalhes em azul e dourado..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>

        {/* Style Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="style">Estilo</Label>
            <Select value={style} onValueChange={(v) => setStyle(v as TattooStyle)}>
              <SelectTrigger id="style">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="traditional">Tradicional</SelectItem>
                <SelectItem value="realistic">Realista</SelectItem>
                <SelectItem value="watercolor">Aquarela</SelectItem>
                <SelectItem value="minimalist">Minimalista</SelectItem>
                <SelectItem value="tribal">Tribal</SelectItem>
                <SelectItem value="japanese">Japonês</SelectItem>
                <SelectItem value="geometric">Geométrico</SelectItem>
                <SelectItem value="blackwork">Blackwork</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Local do Corpo</Label>
            <Select value={bodyLocation} onValueChange={(v) => setBodyLocation(v as BodyLocation)}>
              <SelectTrigger id="location">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arm">Braço</SelectItem>
                <SelectItem value="leg">Perna</SelectItem>
                <SelectItem value="back">Costas</SelectItem>
                <SelectItem value="chest">Peito</SelectItem>
                <SelectItem value="shoulder">Ombro</SelectItem>
                <SelectItem value="wrist">Pulso</SelectItem>
                <SelectItem value="ankle">Tornozelo</SelectItem>
                <SelectItem value="neck">Pescoço</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Font Options (for text tattoos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fontStyle">Estilo de Fonte (para textos)</Label>
            <Select value={fontStyle} onValueChange={(v) => setFontStyle(v as FontStyle)}>
              <SelectTrigger id="fontStyle">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="script">Script</SelectItem>
                <SelectItem value="gothic">Gótico</SelectItem>
                <SelectItem value="modern">Moderno</SelectItem>
                <SelectItem value="traditional">Tradicional</SelectItem>
                <SelectItem value="handwritten">Manuscrito</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fontSize">Tamanho da Fonte</Label>
            <Select value={fontSize} onValueChange={(v) => setFontSize(v as 'small' | 'medium' | 'large')}>
              <SelectTrigger id="fontSize">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Pequeno</SelectItem>
                <SelectItem value="medium">Médio</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Body Photo Upload */}
        <div className="space-y-2">
          <Label htmlFor="bodyPhoto">Foto do Local (opcional)</Label>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              id="bodyPhoto"
              type="file"
              accept="image/*"
              onChange={handleBodyPhotoUpload}
              className="flex-1"
            />
            {bodyPhoto && (
              <div className="relative w-full sm:w-24 h-24 rounded-lg overflow-hidden border-2 border-purple-500">
                <img src={bodyPhoto} alt="Body location" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Envie uma foto do local onde deseja a tatuagem para visualização realista
          </p>
        </div>

        {/* Generate Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleGenerate}
            disabled={!description.trim() || isGenerating}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                Gerando Arte...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 mr-2" />
                Gerar Tatuagem
              </>
            )}
          </Button>
          <Button
            onClick={onOpenChat}
            variant="outline"
            size="lg"
            className="sm:w-auto"
          >
            <ImageIcon className="w-5 h-5 mr-2" />
            Chat com IA
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
