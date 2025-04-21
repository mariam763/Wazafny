import PDFDocument from "pdfkit";
import fs from "fs";

// Read job descriptions from JSON file
const rawJobDescriptions = fs.readFileSync("./jobDescriptions.json");
const jobDescriptionMap = JSON.parse(rawJobDescriptions);

const enhanceBio = (bio) => {
  if (!bio) return "Not provided.";
  let formatted = bio.trim();
  if (formatted.length === 0) return "Not provided.";
  formatted = formatted[0].toUpperCase() + formatted.slice(1);
  if (!/[.?!]$/.test(formatted)) {
    formatted += ".";
  }
  return formatted;
};

const generateDescription = (title) => {
  const lower = title.toLowerCase();
  const matchingKey = Object.keys(jobDescriptionMap).find(
    (key) => key.toLowerCase() === lower
  );

  if (matchingKey) {
    return jobDescriptionMap[matchingKey].map((b) => `• ${b}`).join("\n");
  } else {
    return "• Responsible for various professional duties.";
  }
};

export const generateResume = async (req, res) => {
  const { fullname, email, phone, bio, skills, experiences, education } =
    req.body;

  try {
    const doc = new PDFDocument({ margin: 50 });
    let buffers = [];

    doc.on("data", (chunk) => buffers.push(chunk));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      });
      res.send(pdfData);
    });

    const enhancedBio = enhanceBio(bio);

    // ===== Header =====
    doc.fontSize(26).fillColor("#6a0dad").text(fullname, {
      align: "center",
      underline: true,
    });

    doc.moveDown(0.5);
    doc.fontSize(12).fillColor("black").text(`Email: ${email}`, {
      align: "center",
    });
    doc.text(`Phone: ${phone}`, { align: "center" });

    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor("#6a0dad").stroke();
    doc.moveDown();

    // ===== Bio =====
    doc.fontSize(16).fillColor("#6a0dad").text("Bio", { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).fillColor("black").text(enhancedBio);
    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor("#6a0dad").stroke();
    doc.moveDown();

    // ===== Skills (Two Columns) =====
    doc.fontSize(16).fillColor("#6a0dad").text("Skills", { underline: true });
    doc.moveDown(0.5);

    if (skills && typeof skills === "string" && skills.trim().length > 0) {
      const skillList = skills.split(",").map((s) => s.trim());
      const mid = Math.ceil(skillList.length / 2);
      const col1 = skillList.slice(0, mid);
      const col2 = skillList.slice(mid);

      const startX = 70;
      const midX = 300;
      const startY = doc.y;
      const rowHeight = 18;

      for (let i = 0; i < Math.max(col1.length, col2.length); i++) {
        if (col1[i]) {
          doc
            .fontSize(12)
            .fillColor("black")
            .text(`• ${col1[i]}`, startX, startY + i * rowHeight);
        }
        if (col2[i]) {
          doc
            .fontSize(12)
            .fillColor("black")
            .text(`• ${col2[i]}`, midX, startY + i * rowHeight);
        }
      }

      doc.y = startY + Math.max(col1.length, col2.length) * rowHeight + 5;
    } else {
      doc.fontSize(12).fillColor("black").text("No skills listed.");
      doc.moveDown();
    }

    doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor("#6a0dad").stroke();
    doc.moveDown();

    // ===== Experience =====
    doc.fontSize(16).fillColor("#6a0dad").text("Experience", {
      underline: true,
    });
    doc.moveDown(0.5);

    if (Array.isArray(experiences) && experiences.length > 0) {
      for (let exp of experiences) {
        const description = exp.description || generateDescription(exp.title);
        doc
          .fontSize(13)
          .fillColor("black")
          .text(`${exp.title} at ${exp.company}`);
        doc
          .fontSize(11)
          .fillColor("gray")
          .text(`${exp.startDate} - ${exp.endDate || "Present"}`);
        doc.fontSize(12).fillColor("black").text(description, { indent: 10 });
        doc.moveDown(0.5);
      }
    } else {
      doc.fontSize(12).fillColor("black").text("No experience added.");
    }

    doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor("#6a0dad").stroke();
    doc.moveDown();

    // ===== Education =====
    if (education) {
      doc.fontSize(16).fillColor("#6a0dad").text("Education", {
        underline: true,
      });
      doc.moveDown(0.5);

      if (Array.isArray(education)) {
        education.forEach((edu) => {
          if (typeof edu === "object") {
            doc
              .fontSize(13)
              .fillColor("black")
              .text(`${edu.school}`, { continued: false });
            doc
              .fontSize(12)
              .fillColor("gray")
              .text(`${edu.major} (${edu.date})`, { indent: 10 });
          } else {
            doc.fontSize(12).fillColor("black").text(`• ${edu}`);
          }
          doc.moveDown(0.3);
        });
      } else {
        doc.fontSize(12).fillColor("black").text(education);
      }
    }

    doc.end();
  } catch (err) {
    console.error("Resume generation failed:", err);
    res.status(500).json({ message: "Failed to generate resume" });
  }
};
