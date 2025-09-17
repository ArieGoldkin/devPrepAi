import type { IQuestion } from '../../types/ai'

export const DEFAULT_MAX_LENGTH = 2000

export const isCodingQuestion = (question?: IQuestion): boolean => {
  if (!question) return false
  const content = question.content.toLowerCase()
  return content.includes('implement') ||
         content.includes('write a function') ||
         content.includes('create a component') ||
         content.includes('write code') ||
         question.type === 'coding'
}