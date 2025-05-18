"use client"

import { useState, useEffect } from "react"
import { MapContainer, TileLayer, LayersControl, Marker, Popup } from "react-leaflet"
import { Icon } from "leaflet"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import "leaflet/dist/leaflet.css"
import "./App.css"
import L from "leaflet"

const { BaseLayer } = LayersControl

// Create a custom neo-brutalism style marker
const customIcon = new Icon({
    iconUrl: "/marker-icon.png",
    iconSize: [30, 30],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
})

function App() {
    const [studioData, setStudioData] = useState(null)
    const [filteredData, setFilteredData] = useState(null)
    const [filters, setFilters] = useState({
        rating: 0,
        openingHours: "all",
        priceRange: "all",
    })
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [mapKey, setMapKey] = useState(0) // Add a key to force re-render of MapContainer

    useEffect(() => {
        // Load GeoJSON data
        fetch("/studios.geojson")
            .then((response) => response.json())
            .then((data) => {
                setStudioData(data)
                setFilteredData(data)
            })
            .catch((error) => console.error("Error loading GeoJSON:", error))
    }, [])

    useEffect(() => {
        if (!studioData) return

        // Create a deep clone of the data - don't modify the original
        const studioDataClone = JSON.parse(JSON.stringify(studioData))

        // Apply filters to the cloned data
        const filtered = {
            type: "FeatureCollection",
            features: studioDataClone.features.filter((feature) => {
                const properties = feature.properties

                // Filter by rating
                if (filters.rating > 0 && properties.rating < filters.rating) {
                    return false
                }

                // Filter by opening hours
                if (filters.openingHours !== "all") {
                    if (filters.openingHours === "morning" && !properties.openDuring?.includes("morning")) {
                        return false
                    }
                    if (filters.openingHours === "afternoon" && !properties.openDuring?.includes("afternoon")) {
                        return false
                    }
                    if (filters.openingHours === "evening" && !properties.openDuring?.includes("evening")) {
                        return false
                    }
                    if (filters.openingHours === "night" && !properties.openDuring?.includes("night")) {
                        return false
                    }
                    if (filters.openingHours === "24hours" && properties.hours !== "24 hours") {
                        return false
                    }
                }

                // Filter by price range
                if (filters.priceRange !== "all") {
                    const [min, max] = filters.priceRange.split("-").map(Number)
                    if (properties.price < min || (max && properties.price > max)) {
                        return false
                    }
                }

                return true
            }),
        }

        setFilteredData(filtered)
        // Update map key to force re-render when filtered data changes
        setMapKey(prevKey => prevKey + 1)
    }, [filters, studioData])

    const handleFilterChange = (newFilters) => {
        setFilters({ ...filters, ...newFilters })
    }

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return (
        <div className="flex flex-col h-screen bg-[#f4f4f4]">
            <Header toggleSidebar={toggleSidebar} />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar isOpen={sidebarOpen} onFilterChange={handleFilterChange} filters={filters} />

                <main className="flex-1 overflow-hidden border-4 border-black m-4">
                    {studioData ? (
                        <MapContainer
                            key={mapKey} // Add key to force re-render
                            center={[0, 0]}
                            zoom={13}
                            className="h-full w-full"
                            whenReady={(map) => {
                                if (filteredData && filteredData.features.length > 0) {
                                    try {
                                        // Create a temporary L.geoJSON to calculate bounds
                                        const tempGeoJSON = L.geoJSON(filteredData)
                                        if (tempGeoJSON.getBounds().isValid()) {
                                            map.target.fitBounds(tempGeoJSON.getBounds())
                                        }
                                    } catch (error) {
                                        console.error("Error fitting bounds:", error)
                                    }
                                }
                            }}
                        >
                            <LayersControl position="bottomleft">
                                <BaseLayer checked name="OpenStreetMap">
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                </BaseLayer>
                                <BaseLayer name="Google Maps">
                                    <TileLayer
                                        url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                                        attribution="&copy; Google Maps"
                                        subdomains={["mt0", "mt1", "mt2", "mt3"]}
                                        maxZoom={20}
                                    />
                                </BaseLayer>
                                <BaseLayer name="Google Satellite">
                                    <TileLayer
                                        url="https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                                        attribution="&copy; Google Maps"
                                        subdomains={["mt0", "mt1", "mt2", "mt3"]}
                                        maxZoom={20}
                                    />
                                </BaseLayer>
                                <BaseLayer name="Esri World Imagery">
                                    <TileLayer
                                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                        attribution="&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                                    />
                                </BaseLayer>
                            </LayersControl>

                            {filteredData && filteredData.features.length > 0 && (
                                <>
                                    {filteredData.features.map((feature, index) => (
                                        <Marker
                                            key={`marker-${index}`}
                                            position={[
                                                feature.geometry.coordinates[1],
                                                feature.geometry.coordinates[0]
                                            ]}
                                            icon={customIcon}
                                        >
                                            <Popup className="neo-popup">
                                                <div className="popup-content">
                                                    <h3
                                                        className="text-lg font-black text-black mb-2 uppercase"
                                                        style={{ fontFamily: "'Space Mono', monospace" }}
                                                    >
                                                        {feature.properties.name}
                                                    </h3>
                                                    <p className="text-sm font-bold mb-2 bg-[#ffde59] px-2 py-1 border-2 border-black inline-block">
                                                        {feature.properties.address}
                                                    </p>

                                                    <div className="flex items-center mt-3 mb-2">
                                                        <span className="text-[#ff5470] font-bold mr-2">RATING:</span>
                                                        <span className="text-[#ffde59]">{"★".repeat(feature.properties.rating)}</span>
                                                        <span className="text-gray-300">{"★".repeat(5 - feature.properties.rating)}</span>
                                                    </div>

                                                    <div className="flex flex-col space-y-2 mt-3">
                                                        <div className="flex items-center">
                                                            <span className="text-[#ff5470] font-bold mr-2">PRICE:</span>
                                                            <span className="font-bold">Rp {feature.properties.price.toLocaleString()}</span>
                                                        </div>

                                                        <div className="flex items-center">
                                                            <span className="text-[#ff5470] font-bold mr-2">HOURS:</span>
                                                            <span className="font-bold">{feature.properties.hours || "9AM - 6PM"}</span>
                                                        </div>
                                                    </div>

                                                    <button className="mt-3 w-full py-2 bg-[#00c6b8] border-2 border-black text-black font-bold uppercase">
                                                        BOOK NOW
                                                    </button>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    ))}
                                </>
                            )}
                        </MapContainer>
                    ) : (
                        <div className="h-full w-full flex items-center justify-center">
                            <div className="animate-bounce p-5 bg-[#ff5470] border-4 border-black shadow-[8px_8px_0px_#000] text-white font-bold">
                                LOADING...
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default App