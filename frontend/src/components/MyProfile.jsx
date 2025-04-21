// import React, { useState } from "react";
// import Header from "./shared/Header";
// import { Avatar, AvatarImage } from "./ui/avatar";
// import { Button } from "./ui/button";
// import { Contact, Mail, Pen } from "lucide-react";
// import { Badge } from "./ui/badge";
// import { Label } from "./ui/label";
// import AppliedJobs from "./AppliedJobs";
// import SavedJobs from "./SavedJobs";
// // import UpdateProfileDialog from "./UpdateProfileDialog";
// // import { useSelector } from "react-redux";
// // import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
// const isResume = true;

// const MyProfile = () => {
//   //   useGetAppliedJobs();
//   //   const [open, setOpen] = useState(false);
//   //   const { user } = useSelector((store) => store.auth);

//   return (

//     <div>
//       <Header />
//       <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#3d005e] to-[#6a0dad] border border-[#6a0dad] rounded-3xl my-6 p-8 shadow-2xl text-white relative overflow-hidden">
//         {/* Profile Header */}
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-5">
//             <div className="relative">
//               <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
//                 <AvatarImage
//                   src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
//                   alt="profile"
//                 />
//               </Avatar>
//             </div>
//             <div>
//               <h1 className="font-bold text-2xl">Mariam Tarek</h1>
//               <p className="opacity-80 italic text-sm">
//                 Passionate Developer | Tech Enthusiast
//               </p>
//             </div>
//           </div>
//           <Button
//             onClick={() => setOpen(true)}
//             className="bg-white text-[#6a0dad] hover:bg-[#6a0dad] hover:text-white transition-all shadow-md px-4 py-2 rounded-lg"
//           >
//             <Pen className="mr-1" />
//             Edit
//           </Button>
//         </div>

//         {/* Contact Info */}
//         <div className="my-6 border-t border-white/30 pt-4">
//           <h2 className="text-lg font-semibold">Contact</h2>
//           <div className="mt-3">
//             <div className="flex items-center gap-3 my-2">
//               <Mail className="text-white/80" />
//               <span className="opacity-80 text-sm">maroirhdr@gmail.com</span>
//             </div>
//             <div className="flex items-center gap-3 my-2">
//               <Contact className="text-white/80" />
//               <span className="opacity-80 text-sm">546346455754</span>
//             </div>
//           </div>
//         </div>

//         {/* Skills */}
//         <div className="my-6 border-t border-white/30 pt-4">
//           <h2 className="text-lg font-semibold">Skills</h2>
//           <div className="flex items-center gap-2 mt-3 flex-wrap">
//             {skills.length !== 0 ? (
//               skills.map((item, index) => (
//                 <Badge
//                   key={index}
//                   className="bg-white text-[#6a0dad] font-medium px-4 py-1.5 rounded-full shadow-md"
//                 >
//                   {item}
//                 </Badge>
//               ))
//             ) : (
//               <span className="opacity-70 text-sm">NA</span>
//             )}
//           </div>
//         </div>

//         {/* Resume */}
//         <div className="my-6 border-t border-white/30 pt-4">
//           <h2 className="text-lg font-semibold">Resume</h2>
//           {isResume ? (
//             <a
//               target="_blank"
//               href="https://www.facebook.com/?_rdc=2&_rdr#"
//               className="text-blue-300 hover:underline cursor-pointer mt-2 block"
//             >
//               View Resume
//             </a>
//           ) : (
//             <span className="opacity-70 text-sm mt-2">NA</span>
//           )}
//         </div>
//       </div>

//       {/* Applied Jobs */}
//       <div className="max-w-4xl mx-auto rounded-2xl text-lg my-5">
//         <h1 className="mb-4">Applied Jobs</h1>
//         <AppliedJobs />
//       </div>
//     </div>
//   );
// };

// export default MyProfile;

// import React, { useState } from "react";
// import Header from "./shared/Header";
// import { Avatar, AvatarImage } from "./ui/avatar";
// import { Button } from "./ui/button";
// import { Contact, Mail, Pen } from "lucide-react";
// import { Badge } from "./ui/badge";
// import { Label } from "./ui/label";
// import AppliedJobs from "./AppliedJobs";
// import UpdateProfile from "./UpdateProfile";
// import { useSelector } from "react-redux";
// import getAppliedJobs from "@/hooks/getAppliedJobs";

// const skills = ["Html", "Css", "Javascript", "Reactjs"];
// const isResume = true;

// const MyProfile = () => {
//   getAppliedJobs();

//   const [selectedTab, setSelectedTab] = useState("applied"); // Default tab
//   const [open, setOpen] = useState(false);
//   const { user } = useSelector((store) => store.auth);
// const { savedJobs } = useSelector((store) => store.job);
//   return (
//     <div>
//       <Header />
//       <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#3d005e] to-[#6a0dad] border border-[#6a0dad] rounded-3xl my-6 p-8 shadow-2xl text-white relative overflow-hidden">
//         {/* Profile Header */}
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-5">
//             <div className="relative">
//               <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
//                 <AvatarImage src={user?.profile?.profilePhoto}
//                  alt="profile" />
//               </Avatar>
//             </div>
//             <div>
//               <h1 className="font-bold text-2xl">{user?.fullname}</h1>
//               <p className="opacity-80 italic text-sm">{user?.profile?.bio}</p>
//             </div>
//           </div>
//           <Button
//             onClick={() => setOpen(true)}
//             className="bg-white text-[#6a0dad] hover:bg-[#6a0dad] hover:text-white transition-all shadow-md px-4 py-2 rounded-lg"
//           >
//             <Pen className="mr-1" />
//             Edit
//           </Button>
//         </div>

//         {/* Contact Info */}
//         <div className="my-6 border-t border-white/30 pt-4">
//           <h2 className="text-lg font-semibold">Contact</h2>
//           <div className="mt-3">
//             <div className="flex items-center gap-3 my-2">
//               <Mail className="text-white/80" />
//               <span className="opacity-80 text-sm">{user?.email}</span>
//             </div>
//             <div className="flex items-center gap-3 my-2">
//               <Contact className="text-white/80" />
//               <span className="opacity-80 text-sm">{user?.phoneNumber}</span>
//             </div>
//           </div>
//         </div>

//         {/* Skills */}
//         <div className="my-6 border-t border-white/30 pt-4">
//           <h2 className="text-lg font-semibold">Skills</h2>
//           <div className="flex items-center gap-2 mt-3 flex-wrap">
//             {user?.profile?.skills.length !== 0 ? (
//               user?.profile?.skills.map((item, index) => (
//                 <Badge
//                   key={index}
//                   className="bg-white text-[#6a0dad] font-medium px-4 py-1.5 rounded-full shadow-md"
//                 >
//                   {item}
//                 </Badge>
//               ))
//             ) : (
//               <span className="opacity-70 text-sm">NA</span>
//             )}
//           </div>
//         </div>

//         {/* Resume */}
//         <div className="my-6 border-t border-white/30 pt-4">
//           <h2 className="text-lg font-semibold">Resume</h2>
//           {isResume ? (
//             <a
//               target="_blank"
//               href={user?.profile?.resume}
//               className="text-blue-300 hover:underline cursor-pointer mt-2 block"
//             >
//               {user?.profile?.resumeOriginalName}
//             </a>
//           ) : (
//             <span className="opacity-70 text-sm mt-2">NA</span>
//           )}
//         </div>
//       </div>

//       {/* Tabs for Applied and Saved Jobs */}
//       <div className="max-w-4xl mx-auto rounded-2xl text-lg my-5">
//         {/* Tab Buttons */}
//         <div className="flex gap-4 mb-6 bg-[#3d005e] p-2 rounded-lg shadow-md">
//           <Button
//             onClick={() => setSelectedTab("applied")}
//             className={`px-4 py-2 rounded-lg ${
//               selectedTab === "applied"
//                 ? "bg-white text-[#6a0dad]"
//                 : "bg-[#6a0dad] text-white"
//             }`}
//           >
//             Applied Jobs
//           </Button>

//         </div>
//         <AppliedJobs />

//       </div>
//       <UpdateProfile open={open} setOpen={setOpen} />
//     </div>
//   );
// };

// export default MyProfile;

// ResumeForm.jsx

// import React, { useState } from "react";
// import generateResume from "@/hooks/generateResume";

// const MyProfile = () => {
//   const [formData, setFormData] = useState({
//     fullname: "",
//     email: "",
//     phone: "",
//     bio: "",
//     skills: "",
//     experiences: [
//       { title: "", company: "", startDate: "", endDate: "", description: "" },
//     ],
//     education: [{ school: "", major: "", date: "" }],
//   });

//   const handleChange = (field, value) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   const handleExperienceChange = (index, field, value) => {
//     const updated = [...formData.experiences];
//     updated[index][field] = value;
//     setFormData({ ...formData, experiences: updated });
//   };

//   const handleEducationChange = (index, field, value) => {
//     const updated = [...formData.education];
//     updated[index][field] = value;
//     setFormData({ ...formData, education: updated });
//   };

//   const addExperience = () => {
//     setFormData({
//       ...formData,
//       experiences: [
//         ...formData.experiences,
//         { title: "", company: "", startDate: "", endDate: "", description: "" },
//       ],
//     });
//   };

//   const removeExperience = (index) => {
//     const updated = formData.experiences.filter((_, i) => i !== index);
//     setFormData({ ...formData, experiences: updated });
//   };

//   const addEducation = () => {
//     setFormData({
//       ...formData,
//       education: [...formData.education, { school: "", major: "", date: "" }],
//     });
//   };

//   const removeEducation = (index) => {
//     const updated = formData.education.filter((_, i) => i !== index);
//     setFormData({ ...formData, education: updated });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await generateResume(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>My Resume Info</h2>

//       <input
//         placeholder="Full Name"
//         value={formData.fullname}
//         onChange={(e) => handleChange("fullname", e.target.value)}
//       />
//       <input
//         placeholder="Email"
//         value={formData.email}
//         onChange={(e) => handleChange("email", e.target.value)}
//       />
//       <input
//         placeholder="Phone"
//         value={formData.phone}
//         onChange={(e) => handleChange("phone", e.target.value)}
//       />
//       <textarea
//         placeholder="Short Bio"
//         value={formData.bio}
//         onChange={(e) => handleChange("bio", e.target.value)}
//       />
//       <input
//         placeholder="Skills (comma-separated)"
//         value={formData.skills}
//         onChange={(e) => handleChange("skills", e.target.value)}
//       />

//       <h3>Experience</h3>
//       {formData.experiences.map((exp, i) => (
//         <div key={i}>
//           <input
//             placeholder="Title"
//             value={exp.title}
//             onChange={(e) => handleExperienceChange(i, "title", e.target.value)}
//           />
//           <input
//             placeholder="Company"
//             value={exp.company}
//             onChange={(e) =>
//               handleExperienceChange(i, "company", e.target.value)
//             }
//           />
//           <input
//             placeholder="Start Date"
//             value={exp.startDate}
//             onChange={(e) =>
//               handleExperienceChange(i, "startDate", e.target.value)
//             }
//           />
//           <input
//             placeholder="End Date"
//             value={exp.endDate}
//             onChange={(e) =>
//               handleExperienceChange(i, "endDate", e.target.value)
//             }
//           />
//           <textarea
//             placeholder="Description"
//             value={exp.description}
//             onChange={(e) =>
//               handleExperienceChange(i, "description", e.target.value)
//             }
//           />
//           <button type="button" onClick={() => removeExperience(i)}>
//             Remove Experience
//           </button>
//         </div>
//       ))}
//       <button type="button" onClick={addExperience}>
//         Add Experience
//       </button>

//       <h3>Education</h3>
//       {formData.education.map((edu, i) => (
//         <div key={i}>
//           <input
//             placeholder="School"
//             value={edu.school}
//             onChange={(e) => handleEducationChange(i, "school", e.target.value)}
//           />
//           <input
//             placeholder="Major"
//             value={edu.major}
//             onChange={(e) => handleEducationChange(i, "major", e.target.value)}
//           />
//           <input
//             placeholder="Graduation Date"
//             value={edu.date}
//             onChange={(e) => handleEducationChange(i, "date", e.target.value)}
//           />
//           <button type="button" onClick={() => removeEducation(i)}>
//             Remove Education
//           </button>
//         </div>
//       ))}
//       <button type="button" onClick={addEducation}>
//         Add Education
//       </button>

//       <br />
//       <button type="submit">Generate Resume</button>
//     </form>
//   );
// };

// export default MyProfile;

import React, { useState } from "react";
import Header from "./shared/Header";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, FileText } from "lucide-react";
import { Badge } from "./ui/badge";
import AppliedJobs from "./AppliedJobs";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import getAppliedJobs from "@/hooks/getAppliedJobs";
import generateResume from "@/hooks/generateResume";

const MyProfile = () => {
  getAppliedJobs();

  const [selectedTab, setSelectedTab] = useState("applied");
  const [open, setOpen] = useState(false);
  const [showResumeForm, setShowResumeForm] = useState(false);

  const { user } = useSelector((store) => store.auth);
  const { savedJobs } = useSelector((store) => store.job);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    bio: "",
    skills: "",
    experiences: [
      { title: "", company: "", startDate: "", endDate: "", description: "" },
    ],
    education: [{ school: "", major: "", date: "" }],
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...formData.experiences];
    updated[index][field] = value;
    setFormData({ ...formData, experiences: updated });
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...formData.education];
    updated[index][field] = value;
    setFormData({ ...formData, education: updated });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [
        ...formData.experiences,
        { title: "", company: "", startDate: "", endDate: "", description: "" },
      ],
    });
  };

  const removeExperience = (index) => {
    const updated = formData.experiences.filter((_, i) => i !== index);
    setFormData({ ...formData, experiences: updated });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { school: "", major: "", date: "" }],
    });
  };

  const removeEducation = (index) => {
    const updated = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await generateResume(formData);
  };

  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#3d005e] to-[#6a0dad] border border-[#6a0dad] rounded-3xl my-6 p-8 shadow-2xl text-white relative overflow-hidden">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
                <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
              </Avatar>
            </div>
            <div>
              <h1 className="font-bold text-2xl">{user?.fullname}</h1>
              <p className="opacity-80 italic text-sm">{user?.profile?.bio}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setOpen(true)}
              className="bg-white text-[#6a0dad] hover:bg-[#6a0dad] hover:text-white transition-all shadow-md px-4 py-2 rounded-lg"
            >
              <Pen className="mr-1" /> Edit
            </Button>
          </div>
        </div>

        <div className="my-6 border-t border-white/30 pt-4">
          <h2 className="text-lg font-semibold">Contact</h2>
          <div className="mt-3">
            <div className="flex items-center gap-3 my-2">
              <Mail className="text-white/80" />
              <span className="opacity-80 text-sm">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 my-2">
              <Contact className="text-white/80" />
              <span className="opacity-80 text-sm">{user?.phoneNumber}</span>
            </div>
          </div>
        </div>

        <div className="my-6 border-t border-white/30 pt-4">
          <h2 className="text-lg font-semibold">Skills</h2>
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="bg-white text-[#6a0dad] font-medium px-4 py-1.5 rounded-full shadow-md"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="opacity-70 text-sm">NA</span>
            )}
          </div>
        </div>

        <div className="my-6 border-t border-white/30 pt-4">
          <h2 className="text-lg font-semibold">Resume</h2>
          {user?.profile?.resume ? (
            <a
              target="_blank"
              href={user?.profile?.resume}
              className="text-blue-300 hover:underline cursor-pointer mt-2 block"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="opacity-70 text-sm mt-2">NA</span>
          )}

          {/* resume build */}
        </div>
        <Button
          onClick={() => setShowResumeForm(!showResumeForm)}
          className="bg-white text-[#6a0dad] hover:bg-[#6a0dad] hover:text-white transition-all shadow-md px-4 py-2 rounded-lg"
        >
          <FileText className="mr-1" /> Build a Resume
        </Button>
        {/* Resume Form */}
        {showResumeForm && (
          <div
            className="bg-[#2b0044]




 text-white p-6 rounded-2xl shadow-2xl mt-4"
          >
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-6">Resume Info</h2>

              <input
                placeholder="Full Name"
                value={formData.fullname}
                onChange={(e) => handleChange("fullname", e.target.value)}
                className="block mb-4 w-full p-3 rounded-lg bg-white/90 text-black placeholder-gray-600 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                required
              />
              <input
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="block mb-4 w-full p-3 rounded-lg bg-white/90 text-black placeholder-gray-600 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                required
              />
              <input
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="block mb-4 w-full p-3 rounded-lg bg-white/90 text-black placeholder-gray-600 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                required
              />
              <textarea
                placeholder="Profile"
                value={formData.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                className="block mb-4 w-full p-3 rounded-lg bg-white/90 text-black placeholder-gray-600 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                required
              />
              <input
                placeholder="Skills (comma-separated)"
                value={formData.skills}
                onChange={(e) => handleChange("skills", e.target.value)}
                className="block mb-6 w-full p-3 rounded-lg bg-white/90 text-black placeholder-gray-600 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                required
                pattern="^(\s*[A-Za-z]+\s*)(,\s*[A-Za-z]+\s*)*$"
                title="Please enter skills separated by commas (e.g. HTML, CSS, JavaScript)"
              />

              <h3 className="text-xl font-semibold mb-2">Experience</h3>
              {formData.experiences.map((exp, i) => (
                <div
                  key={i}
                  className="bg-white/90 text-black rounded-lg p-4 mb-4 shadow-inner"
                >
                  <input
                    placeholder="Title"
                    value={exp.title}
                    onChange={(e) =>
                      handleExperienceChange(i, "title", e.target.value)
                    }
                    className="block mb-2 w-full p-2 rounded bg-white border focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                    required
                  />
                  <input
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) =>
                      handleExperienceChange(i, "company", e.target.value)
                    }
                    className="block mb-2 w-full p-2 rounded bg-white border focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                  />
                  <input
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChange={(e) =>
                      handleExperienceChange(i, "startDate", e.target.value)
                    }
                    className="block mb-2 w-full p-2 rounded bg-white border focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                  />
                  <input
                    placeholder="End Date"
                    value={exp.endDate}
                    onChange={(e) =>
                      handleExperienceChange(i, "endDate", e.target.value)
                    }
                    className="block mb-2 w-full p-2 rounded bg-white border focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                  />
                  <textarea
                    placeholder="Description or leave it, it can be auto generated"
                    value={exp.description}
                    onChange={(e) =>
                      handleExperienceChange(i, "description", e.target.value)
                    }
                    className="block mb-2 w-full p-2 rounded bg-white border focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                  />
                  <button
                    type="button"
                    onClick={() => removeExperience(i)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addExperience}
                className="text-white underline mb-6 hover:text-gray-200"
              >
                + Add Experience
              </button>

              <h3 className="text-xl font-semibold mb-2 mt-6">Education</h3>
              {formData.education.map((edu, i) => (
                <div
                  key={i}
                  className="bg-white/90 text-black rounded-lg p-4 mb-4 shadow-inner"
                >
                  <input
                    placeholder="School"
                    value={edu.school}
                    onChange={(e) =>
                      handleEducationChange(i, "school", e.target.value)
                    }
                    className="block mb-2 w-full p-2 rounded bg-white border focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                  />
                  <input
                    placeholder="Major"
                    value={edu.major}
                    onChange={(e) =>
                      handleEducationChange(i, "major", e.target.value)
                    }
                    className="block mb-2 w-full p-2 rounded bg-white border focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                  />
                  <input
                    placeholder="Graduation Date"
                    value={edu.date}
                    onChange={(e) =>
                      handleEducationChange(i, "date", e.target.value)
                    }
                    className="block mb-2 w-full p-2 rounded bg-white border focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                  />
                  <button
                    type="button"
                    onClick={() => removeEducation(i)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addEducation}
                className="text-white underline mb-6 hover:text-gray-200"
              >
                + Add Education
              </button>
              <br></br>
              <button
                type="submit"
                className="mt-6 bg-white text-[#6a0dad] hover:bg-[#6a0dad] hover:text-white transition-all px-6 py-3 rounded-xl shadow-md font-semibold"
              >
                Generate Resume
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto rounded-2xl text-lg my-5">
        <div className="flex gap-4 mb-6 bg-[#3d005e] p-2 rounded-lg shadow-md">
          <Button
            onClick={() => setSelectedTab("applied")}
            className={`px-4 py-2 rounded-lg ${
              selectedTab === "applied"
                ? "bg-white text-[#6a0dad]"
                : "bg-[#6a0dad] text-white"
            }`}
          >
            Applied Jobs
          </Button>
        </div>
        <AppliedJobs />
      </div>
      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default MyProfile;
