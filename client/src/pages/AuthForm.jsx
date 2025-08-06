import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./Login";
import Register from "./Register";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin((prev) => !prev);

  const animationVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        
        {/* Website Name */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          DevConnect
        </h1>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              variants={animationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Login />
              <p className="mt-4 text-center text-sm text-gray-600">
                Don’t have an account?{" "}
                <button onClick={toggleForm} className="text-blue-600 hover:underline">
                  Register here
                </button>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              variants={animationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Register />
              <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button onClick={toggleForm} className="text-blue-600 hover:underline">
                  Login here
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthForm;
