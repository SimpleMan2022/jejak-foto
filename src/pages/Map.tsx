"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, LayersControl, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "leaflet/dist/leaflet.css";
import "../App.css";
import * as L from "leaflet";

const { BaseLayer } = LayersControl;

// Create a custom neo-brutalism style marker
const customIcon = new Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [30, 30],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

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

export default function Map() {
  const [studioData, setStudioData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [filters, setFilters] = useState({
    rating: 0,
    selectedTime: "all",
    reviewCount: "all",
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Load GeoJSON data
    fetch("/foto-studio.geojson")
        .then((response) => response.json())
        .then((data) => {
          setStudioData(data);
          setFilteredData(data);
        })
        .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  useEffect(() => {
    if (!studioData) return;

    // Create a deep clone of the data
    const studioDataClone = JSON.parse(JSON.stringify(studioData));

    // Apply filters
    const filtered = {
      type: "FeatureCollection",
      features: studioDataClone.features.filter((feature) => {
        const { rating, jlh_ulasan, jam_ops } = feature.properties;

        // Filter by rating
        const ratingMatch =
            filters.rating === 0
                ? true
                : String(filters.rating) === "none"
                    ? rating === null
                    : rating >= filters.rating;

        // Filter by review count
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

        // Filter by open at selected time
        const hoursMatch =
            !filters.selectedTime || filters.selectedTime === "all"
                ? true
                : isOpenAtTime(jam_ops, filters.selectedTime);

        return ratingMatch && reviewMatch && hoursMatch;
      }),
    };

    setFilteredData(filtered);
  }, [filters, studioData]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Helper function to render rating stars
  const renderRatingStars = (rating) => {
    if (!rating) return "No Rating";
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
          <span key={`star-full-${i}`} className="text-[#ffde59] inline-block w-5 h-5 align-middle">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
              </svg>
          </span>
      );
    }
    if (hasHalfStar) {
      stars.push(
          <span key="star-half" className="text-[#ffde59] inline-block w-5 h-5 align-middle">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.0006 15.968L16.2473 18.3451L15.2988 13.5717L18.8719 10.2674L14.039 9.69434L12.0006 5.27502V15.968ZM12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
              </svg>
          </span>
      );
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(
          <span key={`star-empty-${i}`} className="text-gray-300 inline-block w-5 h-5 align-middle">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
              </svg>
          </span>
      );
    }
    return <span className="flex">{stars}</span>;
  };

  return (
      <div className="flex flex-col h-screen bg-[#f4f4f4]">
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
              isOpen={sidebarOpen}
              onFilterChange={handleFilterChange}
              filters={filters}
              geoJsonData={studioData}
          />
          <main className="flex-1 overflow-hidden border-4 border-black m-4">
            {studioData ? (
                <MapContainer
                    center={[3.608, 98.514]}
                    zoom={13}
                    className="h-full w-full"
                    whenReady={(map) => {
                      if (filteredData && filteredData.features.length > 0) {
                        try {
                          const tempGeoJSON = L.geoJSON(filteredData);
                          if (tempGeoJSON.getBounds().isValid()) {
                            map.target.fitBounds(tempGeoJSON.getBounds());
                          }
                        } catch (error) {
                          console.error("Error fitting bounds:", error);
                        }
                      }
                    }}
                >
                  <LayersControl position="bottomleft">
                    <BaseLayer checked name="OpenStreetMap">
                      <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                    </BaseLayer>
                    <BaseLayer name="Google Maps">
                      <TileLayer
                          url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                          attribution="© Google Maps"
                          subdomains={["mt0", "mt1", "mt2", "mt3"]}
                          maxZoom={20}
                      />
                    </BaseLayer>
                    <BaseLayer name="Google Satellite">
                      <TileLayer
                          url="https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                          attribution="© Google Maps"
                          subdomains={["mt0", "mt1", "mt2", "mt3"]}
                          maxZoom={20}
                      />
                    </BaseLayer>
                    <BaseLayer name="Esri World Imagery">
                      <TileLayer
                          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                          attribution="© Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                      />
                    </BaseLayer>
                  </LayersControl>
                  {filteredData && filteredData.features.length > 0 ? (
                      filteredData.features.map((feature, index) => (
                          <Marker
                              key={`marker-${feature.properties.id}-${index}`}
                              position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
                              icon={customIcon}
                          >
                            <Popup className="neo-popup">
                              <div className="popup-content">
                                <h3
                                    className="text-lg font-black text-black mb-2 uppercase"
                                    style={{ fontFamily: "'Space Mono', monospace" }}
                                >
                                  {feature.properties.nama}
                                </h3>
                                <p className="text-sm font-bold mb-2 bg-[#ffde59] px-2 py-1 border-2 border-black inline-block">
                                  {feature.properties.alamat}
                                </p>
                                <div className="flex items-center mt-3 mb-2">
                                  <span className="text-[#ff5470] font-bold mr-2">RATING:</span>
                                  {renderRatingStars(feature.properties.rating)}
                                </div>
                                <div className="flex flex-col space-y-2 mt-3">
                                  <div className="flex items-center">
                                    <span className="text-[#ff5470] font-bold mr-2">REVIEWS:</span>
                                    <span className="font-bold">{feature.properties.jlh_ulasan || "No reviews yet"}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="text-[#ff5470] font-bold mr-2">HOURS:</span>
                                    <span className="font-bold">
                                      {feature.properties.jam_ops === "00:00 - 23:59"
                                          ? "24 Jam"
                                          : feature.properties.jam_ops || "Not specified"}
                                    </span>
                                  </div>
                                  {feature.properties.no_telp && (
                                      <div className="flex items-center">
                                        <span className="text-[#ff5470] font-bold mr-2">PHONE:</span>
                                        <span className="font-bold">{feature.properties.no_telp}</span>
                                      </div>
                                  )}
                                </div>
                                <button className="mt-3 w-full py-2 bg-[#00c6b8] border-2 border-black text-black font-bold uppercase">
                                  BOOK NOW
                                </button>
                              </div>
                            </Popup>
                          </Marker>
                      ))
                  ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="animate-bounce p-5 bg-[#ff5470] border-4 border-black shadow-[8px_8px_0px_#000] text-white font-bold">
                          NO RESULTS FOUND
                        </div>
                      </div>
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
  );
}