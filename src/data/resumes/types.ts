export interface ResumeContact {
  name: string;
  legalName?: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  github: string;
  linkedin: string;
}

export interface ResumeEducation {
  institution: string;
  location: string;
  degree: string;
  gpa?: string;
  dates: string;
  coursework?: string[];
}

export interface ResumeExperience {
  role: string;
  company: string;
  location: string;
  dates: string;
  highlights: string[];
  skills?: string[];
}

export interface ResumeProject {
  name: string;
  tech: string;
  dates: string;
  highlights: string[];
  link?: string;
}

export interface ResumeCertification {
  name: string;
  issuer: string;
  date?: string;
}

export interface ResumeSkills {
  languages: string[];
  frameworks: string[];
  cloud: string[];
  databasesAndTools: string[];
}

export interface ResumeData {
  contact: ResumeContact;
  summary?: string;
  education: ResumeEducation[];
  skills: ResumeSkills;
  experience: ResumeExperience[];
  projects: ResumeProject[];
  certifications?: ResumeCertification[];
}

export type ResumeRoleId = 'frontend' | 'fullstack' | 'forward-deployed' | 'devops' | 'default';

export interface ResumeRoleProfile {
  id: ResumeRoleId;
  roleTitle: string;
  filename: string;
  summary?: string;
  skills: ResumeSkills;
  experience: ResumeExperience[];
  projects: ResumeProject[];
  certifications?: ResumeCertification[];
}
