const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 mt-10">
      <div className="container mx-auto text-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:underline text-magenta-500 glow mb-4"
          style={{
            backgroundColor: `rgba(var(--accent-color), 0.2)`,
            padding: "0.5em 1em",
            borderRadius: "0.625em",
            boxShadow: "var(--neumorphism-shadow)",
          }}
        >
          Back to Top ↑
        </button>
        <p className="text-sm" style={{ fontWeight: "bold" }}>
          &copy; {new Date().getFullYear()} Comedify. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
