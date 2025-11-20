'use client';

import { useState } from 'react';
import { Sparkles, MessageSquare, Image as ImageIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TattooGenerator } from '@/components/custom/tattoo-generator';
import { ChatInterface } from '@/components/custom/chat-interface';
import { DesignPreview } from '@/components/custom/design-preview';
import { PaymentModal } from '@/components/custom/payment-modal';
import { TattooDesign } from '@/lib/types';

export default function Home() {
  const [currentDesign, setCurrentDesign] = useState<TattooDesign | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('create');

  const handleGenerate = (design: TattooDesign) => {
    setCurrentDesign(design);
    setActiveTab('preview');
  };

  const handlePaymentSuccess = (designId: string) => {
    if (currentDesign && currentDesign.id === designId) {
      setCurrentDesign({ ...currentDesign, isPaid: true });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  TattooAI Studio
                </h1>
                <p className="text-xs text-muted-foreground">
                  Design de tatuagens com inteligência artificial
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-[600px] mx-auto">
            <TabsTrigger value="create" className="gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Criar</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2">
              <ImageIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Visualizar</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Chat IA</span>
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Forms and Chat */}
            <div>
              <TabsContent value="create" className="mt-0">
                <TattooGenerator
                  onGenerate={handleGenerate}
                  onOpenChat={() => setActiveTab('chat')}
                />
              </TabsContent>

              <TabsContent value="preview" className="mt-0 lg:hidden">
                <DesignPreview
                  design={currentDesign}
                  onPayment={() => setIsPaymentOpen(true)}
                />
              </TabsContent>

              <TabsContent value="chat" className="mt-0">
                <ChatInterface currentDesign={currentDesign?.id} />
              </TabsContent>
            </div>

            {/* Right Column - Preview (Desktop) */}
            <div className="hidden lg:block">
              <DesignPreview
                design={currentDesign}
                onPayment={() => setIsPaymentOpen(true)}
              />
            </div>
          </div>
        </Tabs>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">IA Avançada</h3>
            <p className="text-sm text-muted-foreground">
              Tecnologia de ponta para criar designs únicos e personalizados
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Chat Interativo</h3>
            <p className="text-sm text-muted-foreground">
              Refine sua arte com ajustes ilimitados através do chat com IA
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mb-4">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Alta Resolução</h3>
            <p className="text-sm text-muted-foreground">
              Receba sua arte em 4K, pronta para impressão profissional
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 TattooAI Studio. Todos os direitos reservados.</p>
            <p className="mt-2">
              Designs criados com inteligência artificial • Qualidade profissional
            </p>
          </div>
        </div>
      </footer>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        design={currentDesign}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
