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
        <div className="mt-2">
          <a href="/terms" className="text-white hover:underline mx-2">
            Terms & Conditions
          </a>
          <span>|</span>
          <a href="/privacy" className="text-white hover:underline mx-2">
            Privacy Policy
          </a>
          <span>|</span>
          <a
            href="mailto:njwright92@gmail.com?subject=Questions about Comedify"
            className="text-white hover:underline mx-2"
          >
            Email Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
