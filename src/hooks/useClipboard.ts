const useClipboard = (): (s: string) => Promise<void> => {
  const copyToClipboard = async (str: string) => {
    try {
      await navigator.clipboard.writeText(str)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return copyToClipboard
}

export default useClipboard