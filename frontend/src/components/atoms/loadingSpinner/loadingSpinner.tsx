export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-golemblue"></div>
        {/* <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-golemblue font-bold text-4xl">
          G
        </div> */}
      </div>
    </div>
  )
}
