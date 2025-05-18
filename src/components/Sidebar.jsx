"use client"

import { useState } from "react"
import { FilterIcon, StarIcon, CloseIcon, ClockIcon, CashIcon } from "../icons/Icons"

const priceRanges = [
    { id: "all", name: "ALL PRICES" },
    { id: "0-100000", name: "< Rp 100,000" },
    { id: "100000-300000", name: "Rp 100K - 300K" },
    { id: "300000-500000", name: "Rp 300K - 500K" },
    { id: "500000-1000000", name: "Rp 500K - 1M" },
    { id: "1000000-", name: "> Rp 1,000,000" },
]

const openingHours = [
    { id: "all", name: "ANY TIME" },
    { id: "morning", name: "MORNING (6AM-12PM)" },
    { id: "afternoon", name: "AFTERNOON (12PM-5PM)" },
    { id: "evening", name: "EVENING (5PM-10PM)" },
    { id: "night", name: "NIGHT (10PM-6AM)" },
    { id: "24hours", name: "OPEN 24 HOURS" },
]

function Sidebar({ isOpen, onFilterChange, filters }) {
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleRatingChange = (rating) => {
        onFilterChange({ rating })
    }

    const handleOpeningHoursChange = (e) => {
        onFilterChange({ openingHours: e.target.value })
    }

    const handlePriceRangeChange = (e) => {
        onFilterChange({ priceRange: e.target.value })
    }

    const resetFilters = () => {
        onFilterChange({
            rating: 0,
            openingHours: "all",
            priceRange: "all",
        })
    }

    const sidebarClasses = isOpen
        ? "w-72 transform translate-x-0"
        : "w-0 transform -translate-x-full md:translate-x-0 md:w-0"

    const mobileSidebarClasses = mobileOpen ? "fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden" : "hidden"

    return (
        <>
            {/* Mobile overlay */}
            <div className={mobileSidebarClasses} onClick={() => setMobileOpen(false)}>
                <div
                    className="absolute top-0 left-0 h-full w-72 bg-[#f4f4f4] border-r-4 border-black"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-4 flex justify-between items-center border-b-4 border-black bg-[#ffde59]">
                        <h2 className="text-lg font-black text-black" style={{ fontFamily: "'Space Mono', monospace" }}>
                            FILTERS
                        </h2>
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="p-1 bg-white border-3 border-black shadow-[2px_2px_0px_#000]"
                        >
                            <CloseIcon className="h-5 w-5 text-black" />
                        </button>
                    </div>
                    <SidebarContent
                        filters={filters}
                        onRatingChange={handleRatingChange}
                        onOpeningHoursChange={handleOpeningHoursChange}
                        onPriceRangeChange={handlePriceRangeChange}
                        onReset={resetFilters}
                    />
                </div>
            </div>

            {/* Mobile filter button */}
            <button
                className={`fixed bottom-6 right-6 z-10 md:hidden bg-[#ffde59] text-black p-4 border-3 border-black shadow-[5px_5px_0px_#000] ${isOpen ? "hidden" : ""}`}
                onClick={() => setMobileOpen(true)}
            >
                <FilterIcon className="h-6 w-6" />
            </button>

            {/* Desktop sidebar */}
            <aside
                className={`bg-[#f4f4f4] border-r-4 border-black transition-all duration-300 ease-in-out overflow-hidden ${sidebarClasses}`}
            >
                <div className="p-4 border-b-4 border-black bg-[#ffde59]">
                    <h2 className="text-lg font-black text-black" style={{ fontFamily: "'Space Mono', monospace" }}>
                        FILTERS
                    </h2>
                </div>
                <SidebarContent
                    filters={filters}
                    onRatingChange={handleRatingChange}
                    onOpeningHoursChange={handleOpeningHoursChange}
                    onPriceRangeChange={handlePriceRangeChange}
                    onReset={resetFilters}
                />
            </aside>
        </>
    )
}

function SidebarContent({ filters, onRatingChange, onOpeningHoursChange, onPriceRangeChange, onReset }) {
    return (
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-10rem)]" style={{ fontFamily: "'Space Mono', monospace" }}>
            <div className="mb-8">
                <div className="flex items-center mb-3">
                    <StarIcon className="h-6 w-6 text-black mr-2" filled={true} />
                    <label className="block text-sm font-bold text-black uppercase">MINIMUM RATING</label>
                </div>
                <div className="flex flex-col items-start space-y-2 bg-white p-3 border-3 border-black shadow-[5px_5px_0px_#000]">
                    <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <button key={rating} onClick={() => onRatingChange(rating)} className="focus:outline-none">
                                <StarIcon
                                    className={`h-8 w-8 ${rating <= filters.rating ? "text-[#ffde59]" : "text-gray-300"}`}
                                    filled={rating <= filters.rating}
                                />
                            </button>
                        ))}
                    </div>
                    {filters.rating > 0 && (
                        <button
                            onClick={() => onRatingChange(0)}
                            className="mt-2 px-2 py-1 bg-[#ff5470] text-white border-2 border-black text-xs font-bold"
                        >
                            CLEAR
                        </button>
                    )}
                </div>
            </div>

            <div className="mb-8">
                <div className="flex items-center mb-3">
                    <ClockIcon className="h-6 w-6 text-black mr-2" />
                    <label className="block text-sm font-bold text-black uppercase">OPENING HOURS</label>
                </div>
                <select
                    value={filters.openingHours || "all"}
                    onChange={onOpeningHoursChange}
                    className="w-full p-3 bg-white border-3 border-black shadow-[5px_5px_0px_#000] font-bold"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                >
                    {openingHours.map((time) => (
                        <option key={time.id} value={time.id}>
                            {time.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-8">
                <div className="flex items-center mb-3">
                    <CashIcon className="h-6 w-6 text-black mr-2" />
                    <label className="block text-sm font-bold text-black uppercase">PRICE PER SESSION</label>
                </div>
                <select
                    value={filters.priceRange || "all"}
                    onChange={onPriceRangeChange}
                    className="w-full p-3 bg-white border-3 border-black shadow-[5px_5px_0px_#000] font-bold"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                >
                    {priceRanges.map((range) => (
                        <option key={range.id} value={range.id}>
                            {range.name}
                        </option>
                    ))}
                </select>
            </div>

            <button
                onClick={onReset}
                className="w-full py-3 px-4 bg-[#00c6b8] text-black border-3 border-black shadow-[5px_5px_0px_#000] font-bold uppercase hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none transition-all"
            >
                RESET FILTERS
            </button>
        </div>
    )
}

export default Sidebar
