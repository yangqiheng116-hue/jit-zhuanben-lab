export function studyPath(lessonId: string): string {
  return lessonId.startsWith('vocab-') ? `/vocab/${lessonId}` : `/lesson/${lessonId}`
}
