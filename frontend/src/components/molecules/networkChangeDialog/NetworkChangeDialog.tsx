import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Dialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const navigate = useNavigate()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 overflow-y-auto bg-lightblue-200 bg-opacity-95 z-10" // Add grey background
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="flex items-center justify-center min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded shadow-md w-96"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
            >
              {/* Dialog content */}
              <h2 className="text-2xl font-semibold mb-4 text-primary">
                {' '}
                Network Change Detected{' '}
              </h2>
              <p className="mb-4">
                Blockchain context should not be changed during onboarding
                switch back to initial values or go back to the main page
              </p>
              {/* Close button */}
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer"
                onClick={() => {
                  onClose()
                  navigate('/')
                }}
              >
                Back
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
