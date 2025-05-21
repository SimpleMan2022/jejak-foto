"use client";

import { useState, useMemo } from "react";

// Icons components (same as before)
const StarIcon = ({ className, filled }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
    >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

const ClockIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
    >
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

const ListIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
    >
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
);

const FilterIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
    >
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
);

const CloseIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
    >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

// Helper: convert "HH:mm" to minutes
function timeStringToMinutes(str) {
    if (!str) return null;
    const [h, m] = str.split(":").map(Number);
    return h * 60 + m;
}

// Helper: check if selectedTime is within open-close (accommodate overnight)
function isOpenAtTime(jam_ops, selectedTime) {
    if (!jam_ops) return true; // treat as always open if undefined
    if (jam_ops === "00:00 - 23:59") return true;

    const [open, close] = jam_ops.split(" - ");
    const openMin = timeStringToMinutes(open);
    const closeMin = timeStringToMinutes(close);
    const selMin = timeStringToMinutes(selectedTime);

    if (openMin === null || closeMin === null || selMin === null) return true;

    if (openMin < closeMin) {
        // Normal case: e.g. 08:00 - 18:00
        return selMin >= openMin && selMin <= closeMin;
    } else {
        // Overnight: e.g. 22:00 - 06:00
        return selMin >= openMin || selMin <= closeMin;
    }
}

// Review count options
const reviewRanges = [
    { id: "all", name: "ALL REVIEWS" },
    { id: "none", name: "NO REVIEWS" },
    { id: "0-5", name: "0-5 REVIEWS" },
    { id: "6-20", name: "6-20 REVIEWS" },
    { id: "21-50", name: "21-50 REVIEWS" },
    { id: "51", name: "50+ REVIEWS" },
];

// --- Sidebar Component ---
function Sidebar({ isOpen, onFilterChange, filters, geoJsonData }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    // Count studios matching filter
    const filteredCount = useMemo(() => {
        if (!geoJsonData || !geoJsonData.features) return 0;
        return geoJsonData.features.filter((feature) => {
            const { rating, jlh_ulasan, jam_ops } = feature.properties;

            // Rating filter
            const ratingMatch = filters.rating === 0 ? true : filters.rating === "none" ? rating === null : rating >= filters.rating;

            // Review count filter
            const reviewMatch =
                filters.reviewCount === "all"
                    ? true
                    : filters.reviewCount === "none"
                        ? jlh_ulasan === null
                        : filters.reviewCount === "0-5"
                            ? jlh_ulasan >= 0 && jlh_ulasan <= 5
                            : filters.reviewCount === "6-20"
                                ? jlh_ulasan >= 6 && jlh_ulasan <= 20
                                : filters.reviewCount === "21-50"
                                    ? jlh_ulasan >= 21 && jlh_ulasan <= 50
                                    : jlh_ulasan >= 51;

            // Open at selected time filter
            const hoursMatch =
                !filters.selectedTime || filters.selectedTime === "all"
                    ? true
                    : isOpenAtTime(jam_ops, filters.selectedTime);

            return ratingMatch && reviewMatch && hoursMatch;
        }).length;
    }, [filters, geoJsonData]);

    const handleRatingChange = (rating) => {
        onFilterChange({ rating });
    };

    const handleSelectedTimeChange = (e) => {
        onFilterChange({ selectedTime: e.target.value });
    };

    const handleReviewCountChange = (e) => {
        onFilterChange({ reviewCount: e.target.value });
    };

    const resetFilters = () => {
        onFilterChange({
            rating: 0,
            selectedTime: "all",
            reviewCount: "all",
        });
        setMobileOpen(false);
    };

    // --- Responsive styling ---
    return (
        <>
            {/* Mobile filter button */}
            <button
                className={`fixed bottom-6 right-6 z-50 md:hidden bg-[#ffde59] text-black p-4 border-3 border-black shadow-[5px_5px_0px_#000] rounded-full transition-all duration-200 ${mobileOpen ? "hidden" : ""}`}
                onClick={() => setMobileOpen(true)}
                aria-label="Open filter sidebar"
            >
                <FilterIcon className="h-6 w-6" />
            </button>

            {/* Mobile sidebar overlay */}
            <div
                className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                aria-modal="true"
                role="dialog"
            >
                <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setMobileOpen(false)} />
                <aside
                    className={`absolute top-0 left-0 h-full w-72 bg-[#f4f4f4] border-r-4 border-black shadow-lg transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="p-4 flex justify-between items-center border-b-4 border-black bg-[#ffde59]">
                        <h2
                            className="text-lg font-black text-black"
                            style={{ fontFamily: "'Space Mono', monospace" }}
                            id="sidebar-title-mobile"
                        >
                            FILTERS ({filteredCount} results)
                        </h2>
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="p-1 bg-white border-3 border-black shadow-[2px_2px_0px_#000]"
                            aria-label="Close sidebar"
                        >
                            <CloseIcon className="h-5 w-5 text-black" />
                        </button>
                    </div>
                    <SidebarContent
                        filters={filters}
                        onRatingChange={handleRatingChange}
                        onSelectedTimeChange={handleSelectedTimeChange}
                        onReviewCountChange={handleReviewCountChange}
                        onReset={resetFilters}
                    />
                </aside>
            </div>

            {/* Desktop sidebar */}
            <aside
                className={`hidden md:block bg-[#f4f4f4] border-r-4 border-black transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "w-72" : "w-0"}`}
                aria-hidden={!isOpen}
            >
                <div className="p-4 border-b-4 border-black bg-[#ffde59]">
                    <h2
                        className="text-lg font-black text-black"
                        style={{ fontFamily: "'Space Mono', monospace" }}
                        id="sidebar-title"
                    >
                        FILTERS ({filteredCount} results)
                    </h2>
                </div>
                <SidebarContent
                    filters={filters}
                    onRatingChange={handleRatingChange}
                    onSelectedTimeChange={handleSelectedTimeChange}
                    onReviewCountChange={handleReviewCountChange}
                    onReset={resetFilters}
                />
            </aside>
        </>
    );
}

// --- SidebarContent ---
function SidebarContent({ filters, onRatingChange, onSelectedTimeChange, onReviewCountChange, onReset }) {
    // Jam: buat 24 jam kelipatan 30 menit
    const _ = [
        { id: "all", label: "ANY TIME" },
        ...Array.from({ length: 48 }).map((_, i) => {
            const h = String(Math.floor(i / 2)).padStart(2, "0");
            const m = i % 2 === 0 ? "00" : "30";
            return { id: `${h}:${m}`, label: `${h}:${m}` };
        }),
    ];

    return (
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-10rem)]" style={{fontFamily: "'Space Mono', monospace"}}>
            <div className="mb-8">
                <div className="flex items-center mb-3">
                    <StarIcon className="h-6 w-6 text-black mr-2" filled={true}/>
                    <label className="block text-sm font-bold text-black uppercase" htmlFor="rating-filter">
                        MINIMUM RATING
                    </label>
                </div>
                <div
                    className="flex flex-col items-start space-y-2 bg-white p-3 border-3 border-black shadow-[5px_5px_0px_#000]">
                    <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                                key={rating}
                                onClick={() => onRatingChange(rating)}
                                className="focus:outline-none"
                                aria-label={`Select ${rating} star rating`}
                            >
                                <StarIcon
                                    className={`h-8 w-8 ${
                                        rating <= filters.rating && filters.rating !== "none" ? "text-[#ffde59]" : "text-gray-300"
                                    }`}
                                    filled={rating <= filters.rating && filters.rating !== "none"}
                                />
                            </button>
                        ))}
                    </div>
                    {filters.rating !== 0 && (
                        <button
                            onClick={() => onRatingChange(0)}
                            className="mt-2 px-2 py-1 bg-[#ff5470] text-white border-3 border-black shadow-[2px_2px_0px_#000] text-xs font-bold uppercase hover:bg-[#ff2e50] transition-all"
                            aria-label="Clear rating filter"
                        >
                            CLEAR
                        </button>
                    )}
                </div>
            </div>

            <div className="mb-8">
                <div className="flex items-center mb-3">
                    <ClockIcon className="h-6 w-6 text-black mr-2"/>
                    <label className="block text-sm font-bold text-black uppercase" htmlFor="opening-time-filter">
                        OPEN AT TIME
                    </label>
                </div>
                <input
                    id="opening-time-filter"
                    type="time"
                    value={filters.selectedTime === "all" ? "" : filters.selectedTime}
                    onChange={e => onSelectedTimeChange({
                        target: {value: e.target.value || "all"}
                    })}
                    className="w-full p-3 bg-white border-3 border-black shadow-[5px_5px_0px_#000] font-bold focus:outline-none focus:ring-2 focus:ring-[#ffde59]"
                    style={{fontFamily: "'Space Mono', monospace"}}
                    aria-label="Select time to filter open studios"
                />
                {filters.selectedTime !== "all" && (
                    <button
                        onClick={() => onSelectedTimeChange({target: {value: "all"}})}
                        className="mt-2 px-2 py-1 bg-[#ff5470] text-white border-3 border-black shadow-[2px_2px_0px_#000] text-xs font-bold uppercase hover:bg-[#ff2e50] transition-all"
                        aria-label="Clear time filter"
                    >
                        CLEAR
                    </button>
                )}
            </div>

            <div className="mb-8">
                <div className="flex items-center mb-3">
                    <ListIcon className="h-6 w-6 text-black mr-2"/>
                    <label className="block text-sm font-bold text-black uppercase" htmlFor="review-count-filter">
                        REVIEW COUNT
                    </label>
                </div>
                <select
                    id="review-count-filter"
                    value={filters.reviewCount || "all"}
                    onChange={onReviewCountChange}
                    className="w-full p-3 bg-white border-3 border-black shadow-[5px_5px_0px_#000] font-bold focus:outline-none focus:ring-2 focus:ring-[#ffde59]"
                    style={{fontFamily: "'Space Mono', monospace"}}
                    aria-label="Select review count filter"
                >
                    {reviewRanges.map((range) => (
                        <option key={range.id} value={range.id}>
                            {range.name}
                        </option>
                    ))}
                </select>
            </div>

            <button
                onClick={onReset}
                className="w-full py-3 px-4 bg-[#00c6b8] text-black border-3 border-black shadow-[5px_5px_0px_#000] font-bold uppercase hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none transition-all"
                aria-label="Reset all filters"
            >
                RESET FILTERS
            </button>
        </div>
    );
}

export default Sidebar;