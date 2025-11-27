import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Zap, Shield, Code, ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const codeLines = [
    "function analyzeConfig() {",
    "  const security = validateSecurity();",
    "  const performance = optimizePerf();",
    "  const compliance = checkCompliance();",
    "  ",
    "  return {",
    "    score: calculateScore(),",
    "    recommendations: getAdvice(),",
    "    status: 'optimized' ✓",
    "  };",
    "}"
  ];

  const features = [
    { 
      icon: <Shield className="w-5 h-5" />, 
      text: "Security Analysis", 
      color: "text-green-400",
      bgColor: "bg-green-500",
      description: "Advanced threat detection",
      gradient: "from-green-500 to-emerald-600"
    },
    { 
      icon: <Zap className="w-5 h-5" />, 
      text: "Performance Boost", 
      color: "text-yellow-400",
      bgColor: "bg-yellow-500", 
      description: "Lightning-fast optimization",
      gradient: "from-yellow-500 to-orange-500"
    },
    { 
      icon: <Code className="w-5 h-5" />, 
      text: "Smart Optimization", 
      color: "text-blue-400",
      bgColor: "bg-blue-500",
      description: "AI-powered code analysis",
      gradient: "from-blue-500 to-purple-600"
    }
  ];

  useEffect(() => {
    if (currentLineIndex < codeLines.length) {
      const currentLine = codeLines[currentLineIndex];
      let charIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (charIndex < currentLine.length) {
          setTypedText(prev => prev + currentLine[charIndex]);
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setTypedText(prev => prev + '\n');
            setCurrentLineIndex(prev => prev + 1);
          }, 300);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    } else {
      setIsTypingComplete(true);
    }
  }, [currentLineIndex]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 2000);
    return () => clearInterval(featureInterval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="hero-section min-h-screen flex items-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23F5A524" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50`}></div>
        
        {/* Floating Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <motion.div 
          className="row align-items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <div className="col-lg-6">
            <motion.div variants={itemVariants}>
              {/* Brand Badge */}
              <motion.div 
                className="d-inline-flex align-items-center gap-2 bg-primary bg-opacity-10 border border-primary border-opacity-30 rounded-pill px-4 py-2 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="text-primary" size={16} />
                <span className="text-primary fw-semibold small">Extended version of CodeAssure</span>
              </motion.div>

              {/* Main Heading */}
              <h1 className="display-3 fw-bold mb-4">
                <span className="text-white">Meet </span>
                <span className="text-primary position-relative">
                  ConfigWhiz
                  <motion.div
                    className="position-absolute bottom-0 start-0 w-100 h-1 bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    style={{ transformOrigin: "left" }}
                  />
                </span>
              </h1>

              <motion.p 
                className="lead text-light mb-4"
                variants={itemVariants}
              >
                Bring intelligence to your configuration testing with advanced AI-powered analysis and real-time optimization.
              </motion.p>

              <motion.p 
                className="text-muted mb-5"
                variants={itemVariants}
              >
                Work fast and flexible by testing effectively with our next-generation platform.
              </motion.p>

              {/* Feature Pills */}
              <motion.div 
                className="d-flex flex-wrap gap-3 mb-5"
                variants={itemVariants}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="position-relative overflow-hidden rounded-pill cursor-pointer"
                    onMouseEnter={() => setHoveredFeature(index)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    animate={{
                      scale: activeFeature === index || hoveredFeature === index ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Background with gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0`}
                      animate={{
                        opacity: activeFeature === index || hoveredFeature === index ? 0.9 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Default background */}
                    <motion.div
                      className="absolute inset-0 bg-dark border border-secondary"
                      animate={{
                        opacity: activeFeature === index || hoveredFeature === index ? 0 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Glow effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} blur-md opacity-0`}
                      animate={{
                        opacity: activeFeature === index || hoveredFeature === index ? 0.6 : 0,
                        scale: activeFeature === index || hoveredFeature === index ? 1.2 : 1
                      }}
                      transition={{ duration: 0.4 }}
                    />
                    
                    {/* Content */}
                    <div className="position-relative d-flex align-items-center gap-2 px-4 py-3 z-10">
                      <motion.div
                        animate={{ 
                          rotate: activeFeature === index || hoveredFeature === index ? 360 : 0,
                          scale: activeFeature === index || hoveredFeature === index ? 1.1 : 1
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className={activeFeature === index || hoveredFeature === index ? 'text-white' : feature.color}
                      >
                        {feature.icon}
                      </motion.div>
                      
                      <div className="d-flex flex-column">
                        <motion.span 
                          className={`small fw-bold ${
                            activeFeature === index || hoveredFeature === index ? 'text-white' : 'text-muted'
                          }`}
                          animate={{
                            color: activeFeature === index || hoveredFeature === index ? '#ffffff' : '#6c757d'
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {feature.text}
                        </motion.span>
                        
                        <AnimatePresence>
                          {(activeFeature === index || hoveredFeature === index) && (
                            <motion.span
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-white text-xs"
                              style={{ fontSize: '0.7rem' }}
                            >
                              {feature.description}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    
                    {/* Pulse effect for active item */}
                    <AnimatePresence>
                      {activeFeature === index && (
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-pill`}
                          initial={{ scale: 1, opacity: 0.8 }}
                          animate={{ 
                            scale: [1, 1.1, 1], 
                            opacity: [0.8, 0.4, 0.8] 
                          }}
                          exit={{ scale: 1, opacity: 0 }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                          }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Progress indicator */}
              <motion.div 
                className="d-flex justify-content-center gap-2 mb-4"
                variants={itemVariants}
              >
                {features.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`rounded-pill ${
                      activeFeature === index ? 'bg-primary' : 'bg-secondary'
                    }`}
                    animate={{
                      width: activeFeature === index ? 24 : 8,
                      backgroundColor: activeFeature === index ? '#F5A524' : '#6c757d'
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ height: '4px' }}
                  >
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="d-flex flex-column flex-sm-row gap-3"
                variants={itemVariants}
              >
                <motion.button 
                  className="btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2 px-4"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(245, 165, 36, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/signup')}
                >
                  <Play size={18} />
                  Start Free Trial
                  <ArrowRight size={18} />
                </motion.button>
                
                <motion.button 
                  className="btn btn-outline-light btn-lg d-flex align-items-center justify-content-center gap-2 px-4"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Code size={18} />
                  View Demo
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Right Content - Interactive Code Editor */}
          <div className="col-lg-6">
            <motion.div 
              className="position-relative"
              variants={itemVariants}
            >
              {/* Code Editor Container */}
              <motion.div 
                className="code-editor-modern position-relative"
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: 5
                }}
                transition={{ duration: 0.3 }}
                style={{ perspective: "1000px" }}
              >
                {/* Glow Effect */}
                <motion.div
                  className="position-absolute inset-0 bg-primary rounded-4 opacity-20 blur-3"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Main Editor */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-4 border border-gray-700 overflow-hidden position-relative">
                  {/* Window Controls */}
                  <div className="d-flex align-items-center justify-content-between p-3 border-bottom border-gray-700 bg-gray-800">
                    <div className="d-flex gap-2">
                      <motion.div 
                        className="window-control bg-danger"
                        whileHover={{ scale: 1.2 }}
                      />
                      <motion.div 
                        className="window-control bg-warning"
                        whileHover={{ scale: 1.2 }}
                      />
                      <motion.div 
                        className="window-control bg-success"
                        whileHover={{ scale: 1.2 }}
                      />
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span className="text-muted small">ConfigWhiz.js</span>
                      <motion.div
                        className="w-2 h-2 bg-success rounded-circle"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </div>

                  {/* Code Content */}
                  <div className="p-4 font-monospace position-relative" style={{ minHeight: "300px" }}>
                    <pre className="text-light m-0 position-relative">
                      <code>
                        <AnimatePresence>
                          {typedText.split('\n').map((line, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3 }}
                              className="code-line"
                            >
                              {line.includes('function') && (
                                <span className="text-info">{line}</span>
                              )}
                              {line.includes('const') && (
                                <>
                                  <span className="text-warning">  const </span>
                                  <span className="text-light">{line.replace('  const ', '')}</span>
                                </>
                              )}
                              {line.includes('return') && (
                                <>
                                  <span className="text-warning">  return </span>
                                  <span className="text-light">{line.replace('  return ', '')}</span>
                                </>
                              )}
                              {line.includes('//') && (
                                <span className="text-success">{line}</span>
                              )}
                              {line.includes('score:') && (
                                <>
                                  <span className="text-light">    score: </span>
                                  <span className="text-primary">calculateScore()</span>
                                  <span className="text-light">,</span>
                                </>
                              )}
                              {line.includes('recommendations:') && (
                                <>
                                  <span className="text-light">    recommendations: </span>
                                  <span className="text-primary">getAdvice()</span>
                                  <span className="text-light">,</span>
                                </>
                              )}
                              {line.includes('status:') && (
                                <>
                                  <span className="text-light">    status: </span>
                                  <span className="text-success">'optimized'</span>
                                  <span className="text-warning"> ✓</span>
                                  <span className="text-light">,</span>
                                </>
                              )}
                              {line.includes('{') && !line.includes('function') && (
                                <span className="text-light">{line}</span>
                              )}
                              {line.includes('}') && (
                                <span className="text-light">{line}</span>
                              )}
                              {line.includes('  };') && (
                                <span className="text-light">{line}</span>
                              )}
                              {line.trim() === '' && <span>&nbsp;</span>}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        
                        {/* Animated Cursor */}
                        <motion.span 
                          className="text-primary fw-bold"
                          animate={{ opacity: showCursor ? 1 : 0 }}
                          transition={{ duration: 0.1 }}
                        >
                          |
                        </motion.span>
                      </code>
                    </pre>

                    {/* Completion Effect */}
                    <AnimatePresence>
                      {isTypingComplete && (
                        <motion.div
                          className="position-absolute top-0 end-0 m-3"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {/* <div className="bg-success bg-opacity-20 border border-success rounded-pill px-3 py-1">
                            <span className="text-success small fw-medium">✓ Analysis Complete</span>
                          </div> */}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Floating Stats */}
                <motion.div
                  className="position-absolute"
                  style={{ top: "-20px", right: "-20px" }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2, duration: 0.5 }}
                >
                  <div className="bg-primary bg-opacity-90 text-dark rounded-3 px-3 py-2 shadow-lg">
                    <div className="d-flex align-items-center gap-2">
                      <Zap size={16} />
                      <span className="small fw-bold">98% Faster</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="position-absolute"
                  style={{ bottom: "-20px", left: "-20px" }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.5, duration: 0.5 }}
                >
                  <div className="bg-primary bg-opacity-90 text-dark rounded-3 px-3 py-2 shadow-lg"> 
                    {/* yaha pe pop lgaya hai */}
                    <div className="d-flex align-items-center gap-2">
                      <Shield size={16} />
                      <span className="small fw-bold">100% Secure</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}