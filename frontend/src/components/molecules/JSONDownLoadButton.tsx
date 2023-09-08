import { Button } from 'components/atoms'

function JSONDownloadButton({
  onClick = () => {},
  jsonData,
  buttonText = 'Download',
}: {
  onClick?: () => void
  jsonData: Record<string, unknown>
  buttonText?: string
}) {
  // Function to handle the download
  const handleDownload = () => {
    onClick()
    const jsonString = JSON.stringify(jsonData, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div>
      <Button onClick={handleDownload}>{buttonText}</Button>
    </div>
  )
}

export default JSONDownloadButton
