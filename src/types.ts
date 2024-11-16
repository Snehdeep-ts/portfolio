export interface Project {
  title: string;
  description: string;
  link: string;
  tech: string[];
  isOngoing?: boolean;
  year?: number;
  metadata?:any;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
}

export interface Skills {
  programming: string[];
  frontend: string[];
  backend: string[];
  tools: string[];
}