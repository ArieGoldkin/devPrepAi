import type { IQuestion, IQuestionSection } from "@/types/ai";

export interface IQuestionSections {
  contextSection?: IQuestionSection | null;
  examplesSection?: IQuestionSection | null;
  constraintsSection?: IQuestionSection | null;
  edgeCasesSection?: IQuestionSection | null;
}

export function parseQuestionSections(question: IQuestion): IQuestionSections {
  const sections = question.sections || [];
  return {
    contextSection: sections.find((s) => s.type === "context") || null,
    examplesSection: sections.find((s) => s.type === "examples") || null,
    constraintsSection: sections.find((s) => s.type === "constraints") || null,
    edgeCasesSection: sections.find((s) => s.type === "edge-cases") || null,
  };
}

export function hasLegacyData(sections: IQuestionSection[], question: IQuestion): boolean {
  return sections.length === 0 && Boolean(question.examples || question.constraints);
}
