export const isEveryKeyUnique = (arr: object[], key: string) => {
  const uniques = new Set(arr.map((item) => item[key as keyof typeof item]))
  return [...uniques].length === arr.length
}
