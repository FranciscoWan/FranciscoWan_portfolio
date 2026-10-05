export interface CareerStage {
  id: string;
  role: string;
  period?: string;
  description: string;
}

export interface Experience {
  company: string;
  period: string;
  position: string;
  stages: readonly CareerStage[];
  responsibilities?: readonly string[];
}
