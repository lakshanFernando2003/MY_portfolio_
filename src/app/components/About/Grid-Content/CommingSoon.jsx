import React from 'react'
import { motion } from 'framer-motion'

export default function CommingSoon() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900/30 to-gray-900/10 rounded-lg p-6">
      {/* Background animated elements */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-purple-500/10 blur-xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute right-10 w-24 h-24 rounded-full bg-blue-500/10 blur-xl"
        animate={{
          x: [0, -15, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Coming Soon
        </h2>
        <p className="text-gray-300/80 mb-6">
          Exciting content is being crafted for this space
        </p>

        {/* Progress indicator */}
        <div className="w-48 h-1 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: "70%" }}
            transition={{
              duration: 1.5,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Pulsing dot */}
        <motion.div
          className="w-2 h-2 bg-blue-400 rounded-full mx-auto mt-4"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  )
}
