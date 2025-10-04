import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { motion, AnimatePresence } from "framer-motion";

const SplashScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000); // trigger exit animation
    const redirect = setTimeout(() => {
      if (user) {
        navigate("/dashboard");
      } 
    //   else if (localStorage.getItem("hasOnboarded")) {
    //     navigate("/login");
    //   } 
      else {
        navigate("/onboarding");
      }
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(redirect);
    };
  }, [navigate, user]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.5 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="splash"
      >
        <motion.h1 variants={item} className="splash-title">
          🌱 Farm Flow
        </motion.h1>
        <motion.p variants={item} className="splash-sub">
          “Your bridge between the farm and the marketplace.”
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
