import axios from "axios";

const generateResume = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:8003/api/v1/resume/generate",
      formData,
      {
        responseType: "blob",
        withCredentials: true,
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "resume.pdf";
    link.click();
  } catch (error) {
    console.error("Resume generation failed:", error);
    alert("Resume generation failed");
  }
};

export default generateResume;
