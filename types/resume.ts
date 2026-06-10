export interface Resume {
  id: string;
  userId: string;
  title: string;
  data: ResumeData;
  style: ResumeStyle;
  createdAt: string;
  updatedAt: string;
}

export interface ResumeData {
  sections: ResumeSection[];
}

export interface ResumeSection {
  id: string;
  title: string;
}

export interface ResumeStyle {
  primaryColor?: string;
}
