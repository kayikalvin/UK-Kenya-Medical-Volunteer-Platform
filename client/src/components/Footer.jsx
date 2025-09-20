import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[var(--foreground)] text-[var(--text)] py-12 px-6 shadow-inner">
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Message */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Make a Difference?
        </h2>
        <p className="text-lg md:text-xl mb-8">
          Join thousands of Kenyan healthcare professionals making an impact from around the world.
        </p>

        {/* Call to Action */}
        <button className="bg-[var(--primary)] text-[var(--background)] px-6 py-3 rounded-md font-semibold hover:bg-[var(--primary-hover)] transition transform hover:scale-105">
          Get Involved
        </button>

        {/* Divider */}
        <div className="border-t border-[var(--border)] mt-8 pt-6 text-sm md:text-base">
          © 2025 Anchored Health. Empowering healthcare through diaspora connection.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
