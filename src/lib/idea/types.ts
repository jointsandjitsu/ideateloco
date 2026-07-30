export type FieldType = "text" | "email" | "textarea" | "month" | "checkboxes";

export type InputField = {
  type: FieldType;
  name: string;
  label: string;
  choices?: { label: string; value: string }[];
  required?: boolean;
};

export type Choice = {
  label: string;
  target?: string;
  modelUpdate?: { key: string; value: string };
  copyEmail?: string;
  /** Client navigation path or absolute URL */
  href?: string;
};

export type Step = {
  id: string;
  progress: number;
  messages: string[];
  messageByKey?: string;
  messageGroups?: Record<string, string[]>;
  next?: string;
  inputs?: InputField[];
  choices?: Choice[];
  autoAdvanceMs?: number;
  isProcessing?: boolean;
};

export type FlowModel = Record<string, string | string[] | undefined>;
