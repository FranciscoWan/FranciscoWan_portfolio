export function logError(context: string, operation: string, error: unknown): void {
  console.error(`[${context}] ${operation}`, error);
}
