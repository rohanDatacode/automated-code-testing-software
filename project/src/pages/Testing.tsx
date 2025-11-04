import React, { useState } from "react";
import { Upload, Timer, Activity, Download, AlertCircle, Loader } from "lucide-react";
import Editor from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function Testing() {
  const [code, setCode] = useState(`// Write or paste your Java code here
public class Example {
  public int add(int a, int b) {
    return a + b;
  }
}`);
  const [selectedTest, setSelectedTest] = useState("Unit Testing");
  const [showResults, setShowResults] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // 📌 File Upload Handling
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCode(content);
        setIsUploading(false);
      };
      reader.readAsText(file);
    }
  };

  // 📌 JUnit API Call (Backend)
  const handleTestExecution = async () => {
    if (!code) {
      alert("Please enter some code before running tests.");
      return;
    }

    setIsTesting(true); // Show loading state

    try {
      const response = await axios.post(
        "http://localhost:8080/api/junit/test",
        { code, testType: selectedTest }, // 🔹 Send test type too
        { headers: { "Content-Type": "application/json" } }
      );

      setTestResult(response.data);
      setShowResults(true);
    } catch (error) {
      setTestResult({ success: false, message: "Error running JUnit tests." });
      setShowResults(true);
    }

    setIsTesting(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container py-4">
      <div className="row g-4">
        {/* 🔹 Code Editor Section */}
        <div className="col-lg-8">
          <div className="card bg-dark border-secondary">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3 className="card-title mb-0">Code Editor</h3>
              <label className="btn btn-outline-light d-flex align-items-center gap-2">
                <Upload size={16} />
                {isUploading ? "Uploading..." : "Upload File"}
                <input type="file" className="d-none" accept=".java" onChange={handleFileUpload} disabled={isUploading} />
              </label>
            </div>
            <div className="card-body p-0" style={{ height: "600px" }}>
              <Editor
                height="100%"
                defaultLanguage="java"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  padding: { top: 16, bottom: 16 },
                }}
              />
            </div>
          </div>
        </div>

        {/* 🔹 Test Selection & Results Section */}
        <div className="col-lg-4">
          <motion.div className="card bg-dark border-secondary mb-4" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="card-header">
              <h3 className="card-title mb-0">Test Type</h3>
            </div>
            <div className="card-body">
              {["Unit Testing", "Integration", "Performance"].map((type) => (
                <motion.button
                  key={type}
                  onClick={() => setSelectedTest(type)}
                  className={`btn btn-lg w-100 mb-3 ${selectedTest === type ? "btn-primary" : "btn-outline-secondary"}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="d-flex align-items-center gap-2">
                    {type === "Unit Testing" && <Timer size={20} />}
                    {type === "Integration" && <Activity size={20} />}
                    {type === "Performance" && <AlertCircle size={20} />}
                    {type}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* 🔹 Execute Test Button */}
          <motion.button className="btn btn-primary w-100 mb-4" onClick={handleTestExecution} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={isTesting}>
            {isTesting ? <Loader size={20} className="spinner-border" /> : "Run Test"}
          </motion.button>

          {/* 🔹 Test Results Section */}
          <AnimatePresence>
            {showResults && testResult && (
              <motion.div
                className={`card border-secondary ${testResult.success ? "bg-success" : "bg-danger"}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h3 className="card-title mb-0">Results</h3>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center gap-2 text-light mb-3">
                    {testResult.success ? "✅ All tests passed!" : "❌ Some tests failed!"}
                  </div>
                  <p>{testResult.message}</p>
                  <motion.button
                    className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download size={16} />
                    Download Report
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
