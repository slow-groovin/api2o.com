export function getHandbookPath(path: string) {
  if (path.startsWith('/handbook')) {
    return path
  }
  if (path.startsWith('/en/handbook')) {
    return path.replace('/en/handbook', '/handbook')
  }
  if (path.startsWith('/zh/handbook')) {
    return path.replace('/zh/handbook', '/handbook') 
  }
  return '/handbook' + path
}
