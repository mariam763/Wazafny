import React from "react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 text-center bg-gradient-to-r from-[#2c013d] via-[#120116] to-[#2c013d] text-white">
      <div className="mx-auto ">
        <p>&copy; {new Date().getFullYear()} Wazafny. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
