
export type PriorityType = 'Retirement Planning' | 'Child Education Planning' | 'Savings' | 'Human Life Value' | 'Tax Planning' | null;

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export enum Page {
  LANDING = 'LANDING',
  CHATBOT = 'CHATBOT'
}
