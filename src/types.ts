export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  kpis: string[];
  metrics: string;
  details: string[];
}

export interface SkillDetail {
  name: string;
  comment: string;
}

export interface TerminalLine {
  type: "input" | "output";
  text: string;
}
