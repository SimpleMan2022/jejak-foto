"use client"

import { MenuIcon, CameraIcon } from "../icons/Icons"

function Header({ toggleSidebar }) {
    return (
        <header className="bg-[#ff5470] border-b-4 border-black">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 bg-[#ffde59] border-3 border-black shadow-[5px_5px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none transition-all"
                    >
                        <MenuIcon className="h-6 w-6 text-black" />
                    </button>

                    <div className="flex items-center">
                        <div className="bg-[#00c6b8] p-2 border-3 border-black shadow-[3px_3px_0px_#000]">
                            <CameraIcon className="h-8 w-8 text-black" />
                        </div>
                        <h1 className="text-2xl font-black ml-3 text-black" style={{ fontFamily: "'Space Mono', monospace" }}>
                            JEJAK<span className="text-white">FOTO</span>
                        </h1>
                    </div>
                </div>

                <div className="hidden md:flex items-center">
          <span className="text-sm bg-[#00c6b8] px-4 py-2 border-3 border-black shadow-[3px_3px_0px_#000] font-bold text-black">
            TEMUKAN STUDIO FOTO TERBAIK
          </span>
                </div>
            </div>
        </header>
    )
}

export default Header
