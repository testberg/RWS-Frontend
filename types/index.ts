export type Translator = {
  id: string
  name: string
  hourlyRate: number
  status: "Applicant" | "Certified" | "Deleted"
  creditCardNumber: string
}

export type CreateTranslator = {
  name: string
  hourlyRate: number
  creditCardNumber: string
}

export interface TranslationJob {
  id: string
  customerName: string
  status: "New" | "InProgress" | "Completed"
  originalContent: string
  translatedContent: string
  translatorId?: string
  price: number
}

export interface PostTranslationJob {
  customerName?: string
  originalContent?: string
  file?: File
}