import React from 'react'

const Header = () => {
  return (
    <header className="bg-[]var(--foregroound) text-white py-2 md:py-8 text-center w-full">
      <h1 className="text-lg md:text-3xl font-bold">
         UK-Kenya Medical Volunteer Platform
      </h1>
      <p className="hidden mt-2 text-lg opacity-90 md:block">
        Connecting UK healthcare professionals with Kenyan hospitals for
        volunteer medical service
      </p>
    </header>
  );

}

export default Header
