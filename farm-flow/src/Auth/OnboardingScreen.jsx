import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import onboarding1 from "../Images/onboarding-1.jpeg";
import onboarding2 from "../Images/onboarding-2.jpeg";
import onboarding3 from "../Images/onboarding-3.jpeg";

const slides = [
  {
    id: 1,
    image: onboarding1,
    title: "Connect Easily",
    desc: `"Link farmers directly with trusted buyers — no middlemen, no stress."`,
  },
  {
    id: 2,
    image: onboarding2,
    title: "Sell Your Produce",
    desc: `"Farmers list products easily and reach more buyers."`,
  },
  {
    id: 3,
    image: onboarding3,
    title: "Support Local Agriculture",
    desc: `"Empower communities through direct trade."`,
  },
];

function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();

  const next = () => {
    if (step < slides.length - 1) setStep(step + 1);
    else {
      localStorage.setItem("hasOnboarded", "true");
      navigate("/login");
    }
  };

    const goToStep = (i) => {
    if (i !== step) {
      setDirection(i > step ? 1 : -1);
      setStep(i);
    }
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="onboarding">
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={step}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="onboard-slide"
        >
          <img
            src={slides[step].image}
            alt={slides[step].title}
            width="342"
            height="512"
          />
          <div className="onboard-content">
            <div className="progress-dots">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === step ? "active" : ""}`}
                  onClick={() => setStep(i)}
                ></span>
              ))}
            </div>
            <h2>{slides[step].title}</h2>
            <p>{slides[step].desc}</p>
          </div>
      <button onClick={next} className="onboarding-btn">
        {step < slides.length - 1 ? "Next" : "Get Started"}
      </button>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}

export default OnboardingScreen;
