"use client"

import { useState } from "react"
import {
  CameraIcon,
  MapIcon,
  FilterIcon,
  StarIcon,
  ClockIcon,
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
} from "../icons/Icons"
import {Link} from "react-router-dom";

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: <MapIcon className="h-12 w-12" />,
      title: "INTERACTIVE MAP",
      description: "Temukan studio foto terdekat dengan peta interaktif yang mudah digunakan",
    },
    {
      icon: <FilterIcon className="h-12 w-12" />,
      title: "SMART FILTERS",
      description: "Filter berdasarkan rating, jam operasional, dan jumlah review",
    },
    {
      icon: <StarIcon className="h-12 w-12" filled />,
      title: "RATING & REVIEWS",
      description: "Lihat rating dan review dari pengguna lain untuk pilihan terbaik",
    },
    {
      icon: <ClockIcon className="h-12 w-12" />,
      title: "REAL-TIME INFO",
      description: "Informasi jam operasional dan kontak yang selalu update",
    },
  ]

  const stats = [
    { number: "13", label: "STUDIO FOTO" },
    { number: "1", label: "KOTA BINJAI" },
    { number: "100+", label: "PENGGUNA AKTIF" },
    { number: "4.9", label: "RATING APP" },
  ]

  return (
      <div className="min-h-screen bg-[#f4f4f4]" style={{ fontFamily: "'Space Mono', monospace" }}>
        {/* Header */}
        <header className="bg-[#ff5470] border-b-4 border-black sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-[#00c6b8] p-2 border-3 border-black shadow-[3px_3px_0px_#000]">
                <CameraIcon className="h-8 w-8 text-black" />
              </div>
              <h1 className="text-2xl font-black ml-3 text-black">
                JEJAK<span className="text-white">FOTO</span>
              </h1>
            </div>
            <Link to={"/map"} className="bg-[#ffde59] px-6 py-2 border-3 border-black shadow-[5px_5px_0px_#000] font-bold text-black uppercase hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_#000] transition-all">
              MULAI SEKARANG
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="bg-[#ffde59] inline-block px-6 py-2 border-3 border-black shadow-[5px_5px_0px_#000] mb-8 transform -rotate-2">
              <span className="font-bold text-black uppercase">Platform Terdepan</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-black mb-6 leading-tight">
              TEMUKAN
              <br />
              <span className="text-[#ff5470]">STUDIO FOTO</span>
              <br />
              TERBAIK!
            </h1>

            <p className="text-xl md:text-2xl font-bold text-black mb-12 max-w-3xl mx-auto">
              Platform terdepan untuk menemukan 13 studio foto terbaik di Kota Binjai dengan fitur peta interaktif dan
              filter cerdas
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Link to={"/map"} className="bg-[#ff5470] text-white px-8 py-4 border-3 border-black shadow-[8px_8px_0px_#000] font-bold text-xl uppercase hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[5px_5px_0px_#000] transition-all">
                JELAJAHI SEKARANG
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-[#00c6b8] border-y-4 border-black">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white border-3 border-black shadow-[5px_5px_0px_#000] p-6 mb-4">
                      <div className="text-4xl md:text-5xl font-black text-[#ff5470] mb-2">{stat.number}</div>
                      <div className="text-sm font-bold text-black uppercase">{stat.label}</div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Binjai Map & Landmarks Section */}
        <section className="py-20 px-4 bg-white border-y-4 border-black">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <div className="bg-[#00c6b8] inline-block px-6 py-2 border-3 border-black shadow-[5px_5px_0px_#000] mb-8 transform -rotate-1">
                <span className="font-bold text-white uppercase">Peta Kota Binjai</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
                JELAJAHI
                <br />
                <span className="text-[#ff5470]">KOTA BINJAI</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Stylized Binjai Map */}
              <div className="relative">
                <div className="bg-[#f4f4f4] border-4 border-black shadow-[12px_12px_0px_#ff5470] p-8 transform -rotate-2">
                  <div className="absolute -top-4 -right-4 bg-[#ffde59] px-3 py-1 border-3 border-black">
                    <span className="text-sm font-black">BINJAI MAP</span>
                  </div>

                  {/* Simplified Binjai Map SVG */}
                  <div className="relative h-80 bg-[#00c6b8] border-3 border-black overflow-hidden">
                    <svg viewBox="0 0 400 320" className="w-full h-full">
                      {/* Background */}
                      <rect width="400" height="320" fill="#00c6b8" />

                      {/* Main roads */}
                      <path d="M50 160 L350 160" stroke="#333" strokeWidth="8" />
                      <path d="M200 50 L200 270" stroke="#333" strokeWidth="6" />
                      <path d="M100 100 L300 220" stroke="#333" strokeWidth="4" />

                      {/* Studio locations (13 points) */}
                      {[
                        { x: 120, y: 140, name: "Studio A" },
                        { x: 180, y: 120, name: "Studio B" },
                        { x: 240, y: 160, name: "Studio C" },
                        { x: 160, y: 180, name: "Studio D" },
                        { x: 280, y: 140, name: "Studio E" },
                        { x: 140, y: 200, name: "Studio F" },
                        { x: 220, y: 200, name: "Studio G" },
                        { x: 300, y: 180, name: "Studio H" },
                        { x: 100, y: 120, name: "Studio I" },
                        { x: 260, y: 120, name: "Studio J" },
                        { x: 180, y: 240, name: "Studio K" },
                        { x: 320, y: 160, name: "Studio L" },
                        { x: 80, y: 180, name: "Studio M" },
                      ].map((studio, index) => (
                          <g key={index}>
                            <circle
                                cx={studio.x}
                                cy={studio.y}
                                r="8"
                                fill="#ff5470"
                                stroke="#000"
                                strokeWidth="2"
                                className="animate-pulse"
                            />
                            <circle cx={studio.x} cy={studio.y} r="4" fill="#fff" />
                          </g>
                      ))}

                      {/* Landmarks */}
                      <rect x="190" y="80" width="20" height="20" fill="#ffde59" stroke="#000" strokeWidth="2" />
                      <text x="200" y="75" textAnchor="middle" fontSize="8" fontWeight="bold">
                        ALUN-ALUN
                      </text>

                      <rect x="280" y="200" width="15" height="15" fill="#ffde59" stroke="#000" strokeWidth="2" />
                      <text x="287" y="195" textAnchor="middle" fontSize="8" fontWeight="bold">
                        PASAR
                      </text>

                      <rect x="100" y="80" width="15" height="15" fill="#ffde59" stroke="#000" strokeWidth="2" />
                      <text x="107" y="75" textAnchor="middle" fontSize="8" fontWeight="bold">
                        STASIUN
                      </text>
                    </svg>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-[#ff5470] border-2 border-black rounded-full"></div>
                      <span className="text-sm font-bold">13 Studio Foto</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-[#ffde59] border-2 border-black"></div>
                      <span className="text-sm font-bold">Landmark</span>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-[#ff5470] border-4 border-black p-3 transform rotate-12">
                  <MapIcon className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Binjai Landmarks & Info */}
              <div className="space-y-6">
                <div className="bg-[#ffde59] border-3 border-black shadow-[8px_8px_0px_#000] p-6">
                  <h3 className="text-2xl font-black text-black mb-4 uppercase">Landmark Binjai</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-[#ff5470] p-2 border-2 border-black">
                        <span className="text-white font-black">01</span>
                      </div>
                      <div>
                        <h4 className="font-black text-black">Alun-alun Binjai</h4>
                        <p className="text-black font-bold text-sm">Pusat kota dan area berkumpul warga</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="bg-[#00c6b8] p-2 border-2 border-black">
                        <span className="text-white font-black">02</span>
                      </div>
                      <div>
                        <h4 className="font-black text-black">Pasar Binjai</h4>
                        <p className="text-black font-bold text-sm">Pusat perdagangan tradisional</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="bg-[#ff5470] p-2 border-2 border-black">
                        <span className="text-white font-black">03</span>
                      </div>
                      <div>
                        <h4 className="font-black text-black">Stasiun Binjai</h4>
                        <p className="text-black font-bold text-sm">Transportasi utama ke Medan</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-3 border-black shadow-[8px_8px_0px_#00c6b8] p-6">
                  <h3 className="text-xl font-black text-black mb-4 uppercase">Fakta Menarik Binjai</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#ff5470] mt-2"></div>
                      <p className="text-black font-bold text-sm">
                        Kota terkecil di Sumatera Utara dengan luas 90.24 km²
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#00c6b8] mt-2"></div>
                      <p className="text-black font-bold text-sm">Terkenal karena "Salam dari Binjai"</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#ffde59] mt-2"></div>
                      <p className="text-black font-bold text-sm">Jarak hanya 22 km dari Kota Medan</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Binjai Focus Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <div className="bg-[#ff5470] inline-block px-6 py-2 border-3 border-black shadow-[5px_5px_0px_#000] mb-8 transform rotate-1">
              <span className="font-bold text-white uppercase">Fokus Kota Binjai</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-black mb-8">
              MENGAPA FOKUS
              <br />
              <span className="text-[#00c6b8]">KOTA BINJAI?</span>
            </h2>

            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
              <div className="bg-white border-3 border-black shadow-[8px_8px_0px_#ff5470] p-6">
                <div className="text-4xl font-black text-[#ff5470] mb-4">LOKAL</div>
                <h3 className="text-xl font-black text-black mb-3 uppercase">FOKUS LOKAL</h3>
                <p className="text-black font-bold">
                  Memberikan informasi yang akurat dan detail khusus untuk studio foto di Kota Binjai
                </p>
              </div>

              <div className="bg-white border-3 border-black shadow-[8px_8px_0px_#00c6b8] p-6">
                <div className="text-4xl font-black text-[#00c6b8] mb-4">KUALITAS</div>
                <h3 className="text-xl font-black text-black mb-3 uppercase">STUDIO PILIHAN</h3>
                <p className="text-black font-bold">
                  13 studio foto terpilih dengan kualitas terbaik dan review positif dari masyarakat Binjai
                </p>
              </div>

              <div className="bg-white border-3 border-black shadow-[8px_8px_0px_#ffde59] p-6">
                <div className="text-4xl font-black text-[#ffde59] mb-4">MUDAH</div>
                <h3 className="text-xl font-black text-black mb-3 uppercase">AKSES MUDAH</h3>
                <p className="text-black font-bold">
                  Semua studio foto dalam jangkauan yang mudah diakses oleh warga Kota Binjai
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <div className="bg-[#ff5470] inline-block px-6 py-2 border-3 border-black shadow-[5px_5px_0px_#000] mb-8 transform rotate-1">
                <span className="font-bold text-white uppercase">Fitur Unggulan</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-black mb-6">
                KENAPA PILIH
                <br />
                <span className="text-[#00c6b8]">JEJAK FOTO?</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                  <div
                      key={index}
                      className={`bg-white border-3 border-black shadow-[8px_8px_0px_#000] p-6 cursor-pointer transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[5px_5px_0px_#000] ${
                          activeFeature === index ? "bg-[#ffde59]" : ""
                      }`}
                      onClick={() => setActiveFeature(index)}
                  >
                    <div className="text-[#ff5470] mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-black text-black mb-3 uppercase">{feature.title}</h3>
                    <p className="text-black font-bold">{feature.description}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Binjai Culture & Photography Section */}
        <section className="py-20 bg-[#ff5470] border-y-4 border-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="bg-[#ffde59] inline-block px-6 py-2 border-3 border-black shadow-[5px_5px_0px_#000] mb-8 transform rotate-2">
                <span className="font-bold text-black uppercase">Budaya Binjai</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                FOTOGRAFI DI
                <br />
                <span className="text-[#ffde59]">KOTA BINJAI</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white border-3 border-black shadow-[8px_8px_0px_#000] p-6 text-center">
                <div className="bg-[#00c6b8] w-16 h-16 mx-auto mb-4 border-3 border-black flex items-center justify-center">
                  <span className="text-2xl">🏛️</span>
                </div>
                <h3 className="text-xl font-black text-black mb-3 uppercase">ARSITEKTUR KLASIK</h3>
                <p className="text-black font-bold text-sm">
                  Bangunan bersejarah dan arsitektur kolonial yang menjadi latar foto menarik
                </p>
              </div>

              <div className="bg-white border-3 border-black shadow-[8px_8px_0px_#000] p-6 text-center">
                <div className="bg-[#ffde59] w-16 h-16 mx-auto mb-4 border-3 border-black flex items-center justify-center">
                  <span className="text-2xl">🌿</span>
                </div>
                <h3 className="text-xl font-black text-black mb-3 uppercase">TAMAN KOTA</h3>
                <p className="text-black font-bold text-sm">
                  Area hijau dan taman yang indah untuk sesi foto outdoor dan pre-wedding
                </p>
              </div>

              <div className="bg-white border-3 border-black shadow-[8px_8px_0px_#000] p-6 text-center">
                <div className="bg-[#ff5470] w-16 h-16 mx-auto mb-4 border-3 border-black flex items-center justify-center">
                  <span className="text-2xl text-white">🎭</span>
                </div>
                <h3 className="text-xl font-black text-black mb-3 uppercase">BUDAYA LOKAL</h3>
                <p className="text-black font-bold text-sm">
                  Tradisi dan budaya Melayu yang kaya untuk konsep foto yang unik
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Project Section */}
        <section className="py-20 bg-[#ffde59] border-y-4 border-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-5xl md:text-6xl font-black text-black mb-6">
                  TENTANG
                  <br />
                  <span className="text-[#ff5470]">PROJECT</span>
                </h2>
              </div>

              <div className="bg-white border-3 border-black shadow-[8px_8px_0px_#000] p-8 mb-8">
                <h3 className="text-2xl font-black text-black mb-4 uppercase">Latar Belakang</h3>
                <p className="text-black font-bold mb-4 leading-relaxed">
                  JEJAK FOTO hadir khusus untuk masyarakat Kota Binjai yang ingin menemukan studio foto berkualitas dengan
                  mudah dan cepat. Dengan fokus pada 13 studio foto pilihan di Binjai, platform ini memberikan informasi
                  lengkap dan akurat untuk kebutuhan fotografi Anda.
                </p>
                <p className="text-black font-bold mb-4 leading-relaxed">
                  Platform ini menggunakan teknologi peta interaktif yang memungkinkan pengguna untuk melihat lokasi
                  studio foto secara real-time, lengkap dengan informasi rating, review, jam operasional, dan kontak.
                </p>
                <p className="text-black font-bold leading-relaxed">
                  Dengan desain neo-brutalism yang bold dan eye-catching, JEJAK FOTO memberikan pengalaman user yang unik
                  dan memorable dalam mencari studio foto terbaik.
                </p>
              </div>

              <div className="bg-white border-3 border-black shadow-[8px_8px_0px_#000] p-8">
                <h3 className="text-2xl font-black text-black mb-4 uppercase">Teknologi yang Digunakan</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#f4f4f4] border-2 border-black p-4">
                    <h4 className="font-black text-black mb-2">Frontend</h4>
                    <ul className="text-black font-bold space-y-1">
                      <li>• React.js & Next.js</li>
                      <li>• Leaflet Maps</li>
                      <li>• Tailwind CSS</li>
                      <li>• Neo-brutalism Design</li>
                    </ul>
                  </div>
                  <div className="bg-[#f4f4f4] border-2 border-black p-4">
                    <h4 className="font-black text-black mb-2">Data & Features</h4>
                    <ul className="text-black font-bold space-y-1">
                      <li>• GeoJSON Data</li>
                      <li>• Interactive Filtering</li>
                      <li>• Real-time Search</li>
                      <li>• Responsive Design</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Developer Bio Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-[#00c6b8] inline-block px-6 py-2 border-3 border-black shadow-[5px_5px_0px_#000] mb-8 transform -rotate-1">
                <span className="font-bold text-white uppercase">Meet The Developer</span>
              </div>

              <h2 className="text-5xl md:text-6xl font-black text-black mb-12">
                TENTANG
                <br />
                <span className="text-[#ff5470]">DEVELOPER</span>
              </h2>

              <div className="bg-white border-3 border-black shadow-[8px_8px_0px_#000] p-8 mb-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="bg-[#ffde59] border-3 border-black shadow-[5px_5px_0px_#000] p-8 flex-shrink-0">
                    <img
                      src={"/adit.webp"}
                      alt="Developer Photo"
                      className="w-36 h-36"
                    />
                  </div>

                  <div className="text-left">
                    <h3 className="text-3xl font-black text-black mb-4 uppercase">Mahasiswa TRPL</h3>
                    <div className="space-y-3">
                      <div className="bg-[#f4f4f4] border-2 border-black p-3">
                        <span className="font-black text-[#ff5470]">NAMA:</span>
                        <span className="font-bold text-black ml-2">ROSYAD ADITYA NUGROHO</span>
                      </div>
                      <div className="bg-[#f4f4f4] border-2 border-black p-3">
                        <span className="font-black text-[#ff5470]">PROGRAM STUDI:</span>
                        <span className="font-bold text-black ml-2">Teknologi Rekayasa Perangkat Lunak</span>
                      </div>
                      <div className="bg-[#f4f4f4] border-2 border-black p-3">
                        <span className="font-black text-[#ff5470]">INSTITUSI:</span>
                        <span className="font-bold text-black ml-2">Politeknik Negeri Medan</span>
                      </div>
                      <div className="bg-[#f4f4f4] border-2 border-black p-3">
                        <span className="font-black text-[#ff5470]">SEMESTER:</span>
                        <span className="font-bold text-black ml-2">6 (Enam)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-3 border-black shadow-[8px_8px_0px_#000] p-8">
                <h3 className="text-2xl font-black text-black mb-6 uppercase">Passion & Vision</h3>
                <p className="text-black font-bold mb-4 leading-relaxed">
                  Sebagai mahasiswa TRPL semester 6 di Politeknik Negeri Medan, saya memiliki passion yang besar dalam
                  pengembangan aplikasi web yang user-friendly dan inovatif. JEJAK FOTO adalah manifestasi dari
                  pembelajaran dan skill yang telah saya kembangkan selama perkuliahan.
                </p>
                <p className="text-black font-bold mb-6 leading-relaxed">
                  Project ini menggabungkan teknologi modern dengan desain yang unik untuk menciptakan solusi nyata bagi
                  masyarakat dalam menemukan studio foto berkualitas. Saya percaya bahwa teknologi harus dapat memudahkan
                  kehidupan sehari-hari.
                </p>

                <div className="flex justify-center gap-4">
                  <a href={"https://github.com/SimpleMan2022"} className="bg-[#ff5470] text-white px-6 py-3 border-3 border-black shadow-[5px_5px_0px_#000] font-bold uppercase hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_#000] transition-all">
                    <GithubIcon className="h-5 w-5 inline mr-2" />
                    GITHUB
                  </a>
                  <a href={"https://www.linkedin.com/in/rosyadadityanugroho/"} className="bg-[#00c6b8] text-white px-6 py-3 border-3 border-black shadow-[5px_5px_0px_#000] font-bold uppercase hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_#000] transition-all">
                    <LinkedinIcon className="h-5 w-5 inline mr-2" />
                    LINKEDIN
                  </a>
                  <a href={"https://instagram.com/aditnugroh0"} className="bg-[#ffde59] text-black px-6 py-3 border-3 border-black shadow-[5px_5px_0px_#000] font-bold uppercase hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_#000] transition-all">
                    <InstagramIcon className="h-5 w-5 inline mr-2" />
                    INSTAGRAM
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#ff5470] border-t-4 border-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              SIAP UNTUK
              <br />
              <span className="text-[#ffde59]">MEMULAI?</span>
            </h2>
            <p className="text-xl font-bold text-white mb-12 max-w-2xl mx-auto">
              Jangan tunggu lagi! Temukan studio foto impian Anda sekarang juga dengan JEJAK FOTO
            </p>
            <Link to={"/map"} className="bg-[#ffde59] text-black px-12 py-6 border-3 border-black shadow-[8px_8px_0px_#000] font-bold text-2xl uppercase hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[5px_5px_0px_#000] transition-all">
              MULAI PENCARIAN
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-12 px-4">
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-[#00c6b8] p-2 border-3 border-white shadow-[3px_3px_0px_#fff]">
                <CameraIcon className="h-8 w-8 text-black" />
              </div>
              <h1 className="text-2xl font-black ml-3 text-white">
                JEJAK<span className="text-[#ffde59]">FOTO</span>
              </h1>
            </div>
            <p className="font-bold mb-4">Platform terdepan untuk menemukan studio foto terbaik di Indonesia</p>
            <p className="text-sm font-bold text-gray-300">
              © 2024 JEJAK FOTO. Dikembangkan dengan ❤️ oleh Mahasiswa TRPL Politeknik Negeri Medan
            </p>
          </div>
        </footer>
      </div>
  )
}
