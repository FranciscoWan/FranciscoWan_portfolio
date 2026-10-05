export interface ProjectFlowStep {
  id: string;
  title: string;
  description: string;
}

export interface ProjectLiveStep {
  id: string;
  label: string;
  value: string;
}

export interface ProjectDecision {
  id: string;
  title: string;
  description: string;
}

export interface FeaturedProject {
  title: string;
  summary: string;
  stack: readonly string[];
  liveFlow: readonly ProjectLiveStep[];
  flow: readonly ProjectFlowStep[];
  decisions: readonly ProjectDecision[];
}
