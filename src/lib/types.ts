// Types for Tattoo Design App

export type TattooStyle = 
  | 'traditional'
  | 'realistic'
  | 'watercolor'
  | 'minimalist'
  | 'tribal'
  | 'japanese'
  | 'geometric'
  | 'blackwork';

export type BodyLocation = 
  | 'arm'
  | 'leg'
  | 'back'
  | 'chest'
  | 'shoulder'
  | 'wrist'
  | 'ankle'
  | 'neck';

export type FontStyle = 
  | 'script'
  | 'gothic'
  | 'modern'
  | 'traditional'
  | 'handwritten';

export interface TattooDesign {
  id: string;
  description: string;
  style: TattooStyle;
  bodyLocation?: BodyLocation;
  imageUrl?: string;
  bodyPhotoUrl?: string;
  fontSize?: 'small' | 'medium' | 'large';
  fontStyle?: FontStyle;
  createdAt: Date;
  isPaid: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface UserPreferences {
  favoriteStyles: TattooStyle[];
  savedDesigns: TattooDesign[];
  chatHistory: ChatMessage[];
}
