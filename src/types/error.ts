type ErrorWithCode = {
  code: number
}

export function isErrorWithCode(error: unknown): error is ErrorWithCode {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as Record<string, unknown>).code === 'number'
  )
}

export function getErrorCode(maybeError: unknown): number | undefined {
  if (isErrorWithCode(maybeError)) {
    return maybeError.code
  }
  return undefined
}
