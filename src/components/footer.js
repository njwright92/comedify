const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 mt-10">
      <div className="container mx-auto text-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:underline self-end mb-4 glow"
        >
          Back to Top ↑
        </button>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Comedify. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
