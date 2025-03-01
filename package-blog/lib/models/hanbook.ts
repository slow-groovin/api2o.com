export type HandbookOutLine={
  name: string,
  chapters: (HandbookChapterGroup|HandbookChapter)[],
}
export type HandbookChapterGroup={
  name:string,
  chapters: HandbookChapter[]
}
export type HandbookChapter={
  name:string,
  path: string,
}

export function isHandbookChapterGroup(chapters: HandbookChapter | HandbookChapterGroup): chapters is HandbookChapterGroup {
  return (chapters as HandbookChapterGroup).chapters !== undefined;
}