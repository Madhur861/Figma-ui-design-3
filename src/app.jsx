import { useState, useEffect } from "react";
import { useProduct } from "./contexts/ProductContext";
import {
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  Maximize2,
  ZoomIn,
  Eye,
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Edit3,
} from "lucide-react";

function App() {
  const { productData, updateUICustomization } = useProduct();
  const [selectedArms, setSelectedArms] = useState("1. Arms");
  const [selectedArmFinish, setSelectedArmFinish] = useState("Dark Walnut");
  const [selectedLegs, setSelectedLegs] = useState("Brushed Aluminum");
  const [selectedLeather, setSelectedLeather] = useState("Burgundy");
  const [selectedCushion, setSelectedCushion] = useState("Standard");
  const [selectedSize, setSelectedSize] = useState("Regular");
  const [expandedSection, setExpandedSection] = useState("leather");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const productImages = productData.images || [];
  const leatherColors = productData.leatherColors || [];
  const woodFinishes = productData.woodFinishes || [];
  const cushionOptions = productData.cushionOptions || [];
  const sizeOptions = productData.sizeOptions || [];
  const armOptions = productData.armOptions || [];
  const typography = productData.typography || {};

  // Ensure selectedLeather is valid
  useEffect(() => {
    if (
      leatherColors.length > 0 &&
      !leatherColors.find((c) => c.name === selectedLeather)
    ) {
      setSelectedLeather(leatherColors[0].name);
    }
  }, [leatherColors, selectedLeather]);

  const basePrice = productData.basePrice;

  const calculateTotalPrice = () => {
    const selectedLeatherPrice =
      leatherColors.find((c) => c.name === selectedLeather)?.price || 0;
    const selectedWoodPrice =
      woodFinishes.find((f) => f.name === selectedArmFinish)?.price || 0;
    const selectedCushionPrice =
      cushionOptions.find((c) => c.name === selectedCushion)?.price || 0;
    const selectedSizePrice =
      sizeOptions.find((s) => s.name === selectedSize)?.price || 0;
    const selectedArmPrice =
      armOptions.find((a) => a.name === selectedArms)?.price || 0;

    return (
      (basePrice +
        selectedLeatherPrice +
        selectedWoodPrice +
        selectedCushionPrice +
        selectedSizePrice +
        selectedArmPrice) *
      quantity
    );
  };

  const totalPrice = calculateTotalPrice();

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleZoomIn = () => {
    // Simple zoom functionality - could be enhanced with a modal or image viewer
    const currentImage = document.querySelector(".main-product-image");
    if (currentImage) {
      currentImage.style.transform = "scale(1.2)";
      setTimeout(() => {
        currentImage.style.transform = "scale(1)";
      }, 200);
    }
  };

  const handleMaximize = () => {
    // Open image in new tab
    window.open(productImages[currentImageIndex].url, "_blank");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Cozy Lounge Chair",
        text: "Check out this amazing customizable lounge chair!",
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleViewInRoom = () => {
    // Placeholder for AR/room visualization feature
    alert(
      "AR Room View feature coming soon! This would show how the chair looks in your space."
    );
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    // Add a subtle animation feedback
    const heartButton = document.querySelector(".heart-button");
    if (heartButton) {
      heartButton.style.transform = "scale(1.2)";
      setTimeout(() => {
        heartButton.style.transform = "scale(1)";
      }, 200);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const cartItem = {
      product: "Cozy Lounge Chair",
      arms: selectedArms,
      armFinish: selectedArmFinish,
      legs: selectedLegs,
      leather: selectedLeather,
      cushion: selectedCushion,
      size: selectedSize,
      quantity: quantity,
      price: totalPrice,
      image: productImages[currentImageIndex].url,
    };

    // In a real app, this would add to cart state or send to backend
    console.log("Added to cart:", cartItem);
    alert(
      `Added ${quantity} Cozy Lounge Chair(s) to cart!\nTotal: $${totalPrice}`
    );

    setIsAddingToCart(false);
  };

  const uiCustomization = productData.uiCustomization;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100"
      style={{
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeight,
        fontSize: `${typography.fontSize}px`,
        backgroundColor: uiCustomization.layout.sectionBackgroundColor,
      }}
    >
      <div
        className="container mx-auto py-8"
        style={{ padding: `${uiCustomization.layout.containerPadding}px` }}
      >
        {uiCustomization.layout.currentLayout === "layout1" ? (
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Main Image Section */}
            <div
              className="bg-white shadow-xl overflow-hidden"
              style={{
                borderRadius: `${uiCustomization.layout.cardCornerRadius}px`,
                border: `${uiCustomization.stroke.weight}px solid ${uiCustomization.stroke.color}`,
              }}
            >
              <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div className="absolute inset-0 flex items-center justify-center p-20">
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      borderRadius: `${uiCustomization.gallery.imageBorderRadius}px`,
                    }}
                  >
                    <img
                      src={productImages[currentImageIndex].url}
                      alt={productImages[currentImageIndex].alt}
                      className="w-full h-full object-contain main-product-image transition-transform duration-200"
                      style={{
                        borderRadius: `${uiCustomization.gallery.imageBorderRadius}px`,
                      }}
                    />
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                  <button
                    onClick={handleFavorite}
                    className={`w-10 h-10 rounded-lg shadow-lg flex items-center justify-center transition-colors border heart-button ${
                      isFavorited
                        ? "bg-red-50 border-red-200 text-red-600"
                        : "bg-white border-slate-200 hover:bg-blue-50 text-slate-700"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors border border-slate-200"
                    title="Share product"
                  >
                    <Share2 className="w-5 h-5 text-slate-700" />
                  </button>
                  <button
                    onClick={handleMaximize}
                    className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors border border-slate-200"
                    title="View full size"
                  >
                    <Maximize2 className="w-5 h-5 text-slate-700" />
                  </button>
                  <button
                    onClick={handleZoomIn}
                    className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors border border-slate-200"
                    title="Zoom in"
                  >
                    <ZoomIn className="w-5 h-5 text-slate-700" />
                  </button>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                  <button
                    onClick={handleViewInRoom}
                    className="px-4 py-2 bg-white rounded-full shadow-lg flex items-center gap-2 hover:bg-blue-50 transition-colors border border-slate-200"
                    title="View in your room with AR"
                  >
                    <Eye className="w-4 h-4 text-slate-700" />
                    <span className="text-sm font-medium text-slate-700">
                      View in your room
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnail Images Section */}
            <div
              className="bg-white shadow-xl overflow-hidden"
              style={{
                borderRadius: `${uiCustomization.layout.cardCornerRadius}px`,
                border: `${uiCustomization.stroke.weight}px solid ${uiCustomization.stroke.color}`,
              }}
            >
              <div className="p-6 bg-gradient-to-r from-slate-50 to-blue-50">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Product Gallery
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {productImages.map((image, i) => (
                    <div
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`aspect-square bg-white shadow-md border-2 transition-all cursor-pointer overflow-hidden hover:shadow-lg ${
                        currentImageIndex === i
                          ? "border-blue-500 ring-2 ring-blue-300"
                          : "border-slate-200 hover:border-blue-500"
                      }`}
                      style={{
                        borderRadius: `${uiCustomization.gallery.imageBorderRadius}px`,
                      }}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        style={{
                          borderRadius: `${uiCustomization.gallery.imageBorderRadius}px`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="bg-white shadow-xl overflow-hidden flex flex-col"
              style={{
                borderRadius: `${uiCustomization.layout.cardCornerRadius}px`,
                border: `${uiCustomization.stroke.weight}px solid ${uiCustomization.stroke.color}`,
              }}
            >
              <div className="p-8 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-slate-50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1
                      className="text-3xl font-bold text-slate-800 mb-2"
                      style={{
                        fontFamily: typography.fontFamily,
                        fontWeight: Math.min(typography.fontWeight + 200, 900),
                        fontSize: `${Math.max(typography.fontSize * 2, 24)}px`,
                      }}
                    >
                      {productData.name}
                    </h1>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span
                        className="text-sm text-slate-600"
                        style={{
                          fontFamily: typography.fontFamily,
                          fontWeight: typography.fontWeight,
                          fontSize: `${Math.max(
                            typography.fontSize * 0.8,
                            12
                          )}px`,
                        }}
                      >
                        {productData.rating} ({productData.reviewCount} reviews)
                      </span>
                    </div>
                    <p
                      className="text-slate-600"
                      style={{
                        fontFamily: typography.fontFamily,
                        fontWeight: typography.fontWeight,
                        fontSize: `${Math.max(
                          typography.fontSize * 0.9,
                          12
                        )}px`,
                      }}
                    >
                      Customize your Chair
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => (window.location.href = "/editor")}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                      title="Edit Product"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={handleFavorite}
                      className={`p-2 rounded-lg transition-colors heart-button ${
                        isFavorited
                          ? "bg-red-50 text-red-600"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isFavorited ? "fill-current" : ""
                        }`}
                      />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2 bg-slate-100 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors"
                      title="Share product"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    In Stock
                  </span>
                  <span>Free Shipping</span>
                  <span>30-Day Returns</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("arms")}
                    className="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-300 rounded"></div>
                      <div className="text-left">
                        <p className="font-medium text-slate-800">
                          {selectedArms}
                        </p>
                        <p className="text-sm text-slate-500">Select Arms</p>
                      </div>
                    </div>
                    {expandedSection === "arms" ? (
                      <ChevronUp className="w-5 h-5 text-slate-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-600" />
                    )}
                  </button>
                  {expandedSection === "arms" && (
                    <div className="p-6 bg-white">
                      <div className="space-y-2">
                        {armOptions.map((option) => (
                          <button
                            key={option.name}
                            onClick={() => setSelectedArms(option.name)}
                            className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                              selectedArms === option.name
                                ? "bg-blue-100 border-2 border-blue-500"
                                : "bg-slate-50 border-2 border-transparent hover:bg-slate-100"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="font-medium text-slate-800">
                                  {option.name}
                                </span>
                                <p className="text-sm text-slate-500">
                                  {option.description}
                                </p>
                              </div>
                              {option.price !== 0 && (
                                <span
                                  className={`text-sm font-medium ${
                                    option.price > 0
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {option.price > 0
                                    ? `+$${option.price}`
                                    : `$${option.price}`}
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("armFinish")}
                    className="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded"
                        style={{
                          backgroundColor:
                            woodFinishes.find(
                              (f) => f.name === selectedArmFinish
                            )?.color || "#4A3428",
                        }}
                      ></div>
                      <div className="text-left">
                        <p className="font-medium text-slate-800">
                          {selectedArmFinish}
                        </p>
                        <p className="text-sm text-slate-500">
                          Choose wood finish
                        </p>
                      </div>
                    </div>
                    {expandedSection === "armFinish" ? (
                      <ChevronUp className="w-5 h-5 text-slate-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-600" />
                    )}
                  </button>
                  {expandedSection === "armFinish" && (
                    <div className="p-6 bg-white">
                      <div className="space-y-2">
                        {woodFinishes.map((finish) => (
                          <button
                            key={finish.name}
                            onClick={() => setSelectedArmFinish(finish.name)}
                            className={`w-full px-4 py-3 rounded-lg text-left transition-all flex items-center gap-3 ${
                              selectedArmFinish === finish.name
                                ? "bg-blue-100 border-2 border-blue-500"
                                : "bg-slate-50 border-2 border-transparent hover:bg-slate-100"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                                style={{ backgroundColor: finish.color }}
                              ></div>
                              <span className="font-medium text-slate-800">
                                {finish.name}
                              </span>
                            </div>
                            {finish.price !== 0 && (
                              <span
                                className={`text-sm font-medium ${
                                  finish.price > 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {finish.price > 0
                                  ? `+$${finish.price}`
                                  : `$${finish.price}`}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("leather")}
                    className="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded"
                        style={{
                          backgroundColor:
                            leatherColors.find(
                              (c) => c.name === selectedLeather
                            )?.color || "#5C3A3A",
                        }}
                      ></div>
                      <div className="text-left">
                        <p className="font-medium text-slate-800">
                          {selectedLeather}
                        </p>
                        <p className="text-sm text-slate-500">Leather Body</p>
                      </div>
                    </div>
                    {expandedSection === "leather" ? (
                      <ChevronUp className="w-5 h-5 text-slate-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-600" />
                    )}
                  </button>
                  {expandedSection === "leather" && (
                    <div className="p-6 bg-white">
                      <div className="grid grid-cols-4 gap-4">
                        {leatherColors.length > 0 ? (
                          leatherColors.map((color) => (
                            <div key={color.name} className="relative group">
                              <button
                                onClick={() => setSelectedLeather(color.name)}
                                className={`w-full h-16 rounded-lg border-2 transition-all hover:scale-105 flex flex-col items-center justify-center ${
                                  selectedLeather === color.name
                                    ? "border-blue-500 ring-2 ring-blue-300"
                                    : "border-slate-200 hover:border-blue-500"
                                }`}
                                style={{ backgroundColor: color.color }}
                                title={color.name}
                              >
                                <div className="text-white text-xs font-medium drop-shadow-lg">
                                  {color.name}
                                </div>
                                {color.price !== 0 && (
                                  <div className="text-white text-xs drop-shadow-lg">
                                    {color.price > 0
                                      ? `+$${color.price}`
                                      : `$${color.price}`}
                                  </div>
                                )}
                              </button>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-4 text-center text-gray-500 py-4">
                            No leather colors available. Please check the data
                            loading.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("legs")}
                    className="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-400 rounded">
                        <div
                          className="w-full h-full rounded"
                          style={{
                            background:
                              selectedLegs === "Polished Chrome"
                                ? "linear-gradient(135deg, #e8e8e8, #c0c0c0)"
                                : selectedLegs === "Matte Black"
                                ? "#1a1a1a"
                                : selectedLegs === "Bronze"
                                ? "#CD7F32"
                                : "linear-gradient(135deg, #b8b8b8, #8a8a8a)",
                          }}
                        ></div>
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-slate-800">
                          {selectedLegs}
                        </p>
                        <p className="text-sm text-slate-500">
                          Aluminum finish
                        </p>
                      </div>
                    </div>
                    {expandedSection === "legs" ? (
                      <ChevronUp className="w-5 h-5 text-slate-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-600" />
                    )}
                  </button>
                  {expandedSection === "legs" && (
                    <div className="p-6 bg-white">
                      <div className="space-y-2">
                        {[
                          "Brushed Aluminum",
                          "Polished Chrome",
                          "Matte Black",
                          "Bronze",
                        ].map((option) => (
                          <button
                            key={option}
                            onClick={() => setSelectedLegs(option)}
                            className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                              selectedLegs === option
                                ? "bg-blue-100 border-2 border-blue-500"
                                : "bg-slate-50 border-2 border-transparent hover:bg-slate-100"
                            }`}
                          >
                            <span className="font-medium text-slate-800">
                              {option}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("cushion")}
                    className="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded"></div>
                      <div className="text-left">
                        <p className="font-medium text-slate-800">
                          {selectedCushion}
                        </p>
                        <p className="text-sm text-slate-500">Cushion Type</p>
                      </div>
                    </div>
                    {expandedSection === "cushion" ? (
                      <ChevronUp className="w-5 h-5 text-slate-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-600" />
                    )}
                  </button>
                  {expandedSection === "cushion" && (
                    <div className="p-6 bg-white">
                      <div className="space-y-2">
                        {cushionOptions.map((option) => (
                          <button
                            key={option.name}
                            onClick={() => setSelectedCushion(option.name)}
                            className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                              selectedCushion === option.name
                                ? "bg-blue-100 border-2 border-blue-500"
                                : "bg-slate-50 border-2 border-transparent hover:bg-slate-100"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="font-medium text-slate-800">
                                  {option.name}
                                </span>
                                <p className="text-sm text-slate-500">
                                  {option.description}
                                </p>
                              </div>
                              {option.price !== 0 && (
                                <span className="text-sm font-medium text-green-600">
                                  +${option.price}
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("size")}
                    className="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded"></div>
                      <div className="text-left">
                        <p className="font-medium text-slate-800">
                          {selectedSize}
                        </p>
                        <p className="text-sm text-slate-500">Chair Size</p>
                      </div>
                    </div>
                    {expandedSection === "size" ? (
                      <ChevronUp className="w-5 h-5 text-slate-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-600" />
                    )}
                  </button>
                  {expandedSection === "size" && (
                    <div className="p-6 bg-white">
                      <div className="space-y-2">
                        {sizeOptions.map((option) => (
                          <button
                            key={option.name}
                            onClick={() => setSelectedSize(option.name)}
                            className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                              selectedSize === option.name
                                ? "bg-blue-100 border-2 border-blue-500"
                                : "bg-slate-50 border-2 border-transparent hover:bg-slate-100"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="font-medium text-slate-800">
                                  {option.name}
                                </span>
                                <p className="text-sm text-slate-500">
                                  {option.dimensions}
                                </p>
                              </div>
                              {option.price !== 0 && (
                                <span
                                  className={`text-sm font-medium ${
                                    option.price > 0
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {option.price > 0
                                    ? `+$${option.price}`
                                    : `$${option.price}`}
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-8 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Product Price</p>
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-3xl font-bold text-slate-800"
                        style={{
                          fontFamily: typography.fontFamily,
                          fontWeight: Math.min(
                            typography.fontWeight + 300,
                            900
                          ),
                          fontSize: `${Math.max(
                            typography.fontSize * 2.5,
                            28
                          )}px`,
                        }}
                      >
                        ${totalPrice}
                      </span>
                      <span className="text-lg text-slate-400 line-through">
                        $345
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-300 transition-colors"
                    >
                      <Minus className="w-4 h-4 text-slate-700" />
                    </button>
                    <span className="text-xl font-semibold text-slate-800 w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-300 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-slate-700" />
                    </button>
                  </div>
                </div>
                <div
                  className={`flex ${
                    uiCustomization.button.alignment === "left"
                      ? "justify-start"
                      : uiCustomization.button.alignment === "right"
                      ? "justify-end"
                      : "justify-center"
                  }`}
                >
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className={`py-4 font-semibold transition-all flex items-center justify-center gap-2 ${
                      isAddingToCart ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                    style={{
                      borderRadius: `${uiCustomization.button.borderRadius}px`,
                      backgroundColor: uiCustomization.button.backgroundColor,
                      color: uiCustomization.button.textColor,
                      boxShadow:
                        uiCustomization.button.shadow === "none"
                          ? "none"
                          : uiCustomization.button.shadow === "small"
                          ? "0 1px 3px rgba(0, 0, 0, 0.1)"
                          : uiCustomization.button.shadow === "medium"
                          ? "0 4px 6px rgba(0, 0, 0, 0.1)"
                          : "0 10px 15px rgba(0, 0, 0, 0.1)",
                      width: "100%",
                    }}
                  >
                    {isAddingToCart ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Add to cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Layout 2: Single column with different arrangement
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Product Image Section */}
            <div
              className="bg-white shadow-xl overflow-hidden"
              style={{
                borderRadius: `${uiCustomization.layout.cardCornerRadius}px`,
                border: `${uiCustomization.stroke.weight}px solid ${uiCustomization.stroke.color}`,
              }}
            >
              <div className="relative aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200">
                <div
                  className="absolute top-4 left-4 flex gap-3 z-10"
                  style={{ gap: `${uiCustomization.gallery.spacing}px` }}
                >
                  {productImages.map((image, i) => (
                    <div
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-16 h-16 bg-white shadow-md border-2 transition-all cursor-pointer overflow-hidden ${
                        currentImageIndex === i
                          ? "border-blue-500"
                          : "border-transparent hover:border-blue-500"
                      }`}
                      style={{
                        borderRadius: `${uiCustomization.gallery.imageBorderRadius}px`,
                      }}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        style={{
                          borderRadius: `${uiCustomization.gallery.imageBorderRadius}px`,
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="absolute inset-0 flex items-center justify-center p-20">
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      borderRadius: `${uiCustomization.gallery.imageBorderRadius}px`,
                    }}
                  >
                    <img
                      src={productImages[currentImageIndex].url}
                      alt={productImages[currentImageIndex].alt}
                      className="w-full h-full object-contain main-product-image transition-transform duration-200"
                      style={{
                        borderRadius: `${uiCustomization.gallery.imageBorderRadius}px`,
                      }}
                    />
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                  <button
                    onClick={handleFavorite}
                    className={`w-10 h-10 rounded-lg shadow-lg flex items-center justify-center transition-colors border heart-button ${
                      isFavorited
                        ? "bg-red-50 border-red-200 text-red-600"
                        : "bg-white border-slate-200 hover:bg-blue-50 text-slate-700"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors border border-slate-200"
                    title="Share product"
                  >
                    <Share2 className="w-5 h-5 text-slate-700" />
                  </button>
                  <button
                    onClick={handleMaximize}
                    className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors border border-slate-200"
                    title="View full size"
                  >
                    <Maximize2 className="w-5 h-5 text-slate-700" />
                  </button>
                  <button
                    onClick={handleZoomIn}
                    className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors border border-slate-200"
                    title="Zoom in"
                  >
                    <ZoomIn className="w-5 h-5 text-slate-700" />
                  </button>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                  <button
                    onClick={handleViewInRoom}
                    className="px-4 py-2 bg-white rounded-full shadow-lg flex items-center gap-2 hover:bg-blue-50 transition-colors border border-slate-200"
                    title="View in your room with AR"
                  >
                    <Eye className="w-4 h-4 text-slate-700" />
                    <span className="text-sm font-medium text-slate-700">
                      View in your room
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div
              className="bg-white shadow-xl overflow-hidden"
              style={{
                borderRadius: `${uiCustomization.layout.cardCornerRadius}px`,
                border: `${uiCustomization.stroke.weight}px solid ${uiCustomization.stroke.color}`,
              }}
            >
              <div className="p-8 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-slate-50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1
                      className="text-3xl font-bold text-slate-800 mb-2"
                      style={{
                        fontFamily: typography.fontFamily,
                        fontWeight: Math.min(typography.fontWeight + 200, 900),
                        fontSize: `${Math.max(typography.fontSize * 2, 24)}px`,
                      }}
                    >
                      {productData.name}
                    </h1>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span
                        className="text-sm text-slate-600"
                        style={{
                          fontFamily: typography.fontFamily,
                          fontWeight: typography.fontWeight,
                          fontSize: `${Math.max(
                            typography.fontSize * 0.8,
                            12
                          )}px`,
                        }}
                      >
                        {productData.rating} ({productData.reviewCount} reviews)
                      </span>
                    </div>
                    <p
                      className="text-slate-600"
                      style={{
                        fontFamily: typography.fontFamily,
                        fontWeight: typography.fontWeight,
                        fontSize: `${Math.max(
                          typography.fontSize * 0.9,
                          12
                        )}px`,
                      }}
                    >
                      Customize your Chair
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => (window.location.href = "/editor")}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                      title="Edit Product"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={handleFavorite}
                      className={`p-2 rounded-lg transition-colors heart-button ${
                        isFavorited
                          ? "bg-red-50 text-red-600"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isFavorited ? "fill-current" : ""
                        }`}
                      />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2 bg-slate-100 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors"
                      title="Share product"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    In Stock
                  </span>
                  <span>Free Shipping</span>
                  <span>30-Day Returns</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {/* Arms Section */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("arms")}
                    className="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-300 rounded"></div>
                      <div className="text-left">
                        <p className="font-medium text-slate-800">
                          {selectedArms}
                        </p>
                        <p className="text-sm text-slate-500">Select Arms</p>
                      </div>
                    </div>
                    {expandedSection === "arms" ? (
                      <ChevronUp className="w-5 h-5 text-slate-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-600" />
                    )}
                  </button>
                  {expandedSection === "arms" && (
                    <div className="p-6 bg-white">
                      <div className="space-y-2">
                        {armOptions.map((option) => (
                          <button
                            key={option.name}
                            onClick={() => setSelectedArms(option.name)}
                            className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                              selectedArms === option.name
                                ? "bg-blue-100 border-2 border-blue-500"
                                : "bg-slate-50 border-2 border-transparent hover:bg-slate-100"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="font-medium text-slate-800">
                                  {option.name}
                                </span>
                                <p className="text-sm text-slate-500">
                                  {option.description}
                                </p>
                              </div>
                              {option.price !== 0 && (
                                <span
                                  className={`text-sm font-medium ${
                                    option.price > 0
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {option.price > 0
                                    ? `+$${option.price}`
                                    : `$${option.price}`}
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Arm Finish Section */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("armFinish")}
                    className="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded"
                        style={{
                          backgroundColor:
                            woodFinishes.find(
                              (f) => f.name === selectedArmFinish
                            )?.color || "#4A3428",
                        }}
                      ></div>
                      <div className="text-left">
                        <p className="font-medium text-slate-800">
                          {selectedArmFinish}
                        </p>
                        <p className="text-sm text-slate-500">
                          Choose wood finish
                        </p>
                      </div>
                    </div>
                    {expandedSection === "armFinish" ? (
                      <ChevronUp className="w-5 h-5 text-slate-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-600" />
                    )}
                  </button>
                  {expandedSection === "armFinish" && (
                    <div className="p-6 bg-white">
                      <div className="space-y-2">
                        {woodFinishes.map((finish) => (
                          <button
                            key={finish.name}
                            onClick={() => setSelectedArmFinish(finish.name)}
                            className={`w-full px-4 py-3 rounded-lg text-left transition-all flex items-center gap-3 ${
                              selectedArmFinish === finish.name
                                ? "bg-blue-100 border-2 border-blue-500"
                                : "bg-slate-50 border-2 border-transparent hover:bg-slate-100"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                                style={{ backgroundColor: finish.color }}
                              ></div>
                              <span className="font-medium text-slate-800">
                                {finish.name}
                              </span>
                            </div>
                            {finish.price !== 0 && (
                              <span
                                className={`text-sm font-medium ${
                                  finish.price > 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {finish.price > 0
                                  ? `+$${finish.price}`
                                  : `$${finish.price}`}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Leather Section */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("leather")}
                    className="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded"
                        style={{
                          backgroundColor:
                            leatherColors.find(
                              (c) => c.name === selectedLeather
                            )?.color || "#5C3A3A",
                        }}
                      ></div>
                      <div className="text-left">
                        <p className="font-medium text-slate-800">
                          {selectedLeather}
                        </p>
                        <p className="text-sm text-slate-500">Leather Body</p>
                      </div>
                    </div>
                    {expandedSection === "leather" ? (
                      <ChevronUp className="w-5 h-5 text-slate-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-600" />
                    )}
                  </button>
                  {expandedSection === "leather" && (
                    <div className="p-6 bg-white">
                      <div className="grid grid-cols-4 gap-4">
                        {leatherColors.length > 0 ? (
                          leatherColors.map((color) => (
                            <div key={color.name} className="relative group">
                              <button
                                onClick={() => setSelectedLeather(color.name)}
                                className={`w-full h-16 rounded-lg border-2 transition-all hover:scale-105 flex flex-col items-center justify-center ${
                                  selectedLeather === color.name
                                    ? "border-blue-500 ring-2 ring-blue-300"
                                    : "border-slate-200 hover:border-blue-500"
                                }`}
                                style={{ backgroundColor: color.color }}
                                title={color.name}
                              >
                                <div className="text-white text-xs font-medium drop-shadow-lg">
                                  {color.name}
                                </div>
                                {color.price !== 0 && (
                                  <div className="text-white text-xs drop-shadow-lg">
                                    {color.price > 0
                                      ? `+$${color.price}`
                                      : `$${color.price}`}
                                  </div>
                                )}
                              </button>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-4 text-center text-gray-500 py-4">
                            No leather colors available. Please check the data
                            loading.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Legs Section */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("legs")}
                    className="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-400 rounded">
                        <div
                          className="w-full h-full rounded"
                          style={{
                            background:
                              selectedLegs === "Polished Chrome"
                                ? "linear-gradient(135deg, #e8e8e8, #c0c0c0)"
                                : selectedLegs === "Matte Black"
                                ? "#1a1a1a"
                                : selectedLegs === "Bronze"
                                ? "#CD7F32"
                                : "linear-gradient(135deg, #b8b8b8, #8a8a8a)",
                          }}
                        ></div>
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-slate-800">
                          {selectedLegs}
                        </p>
                        <p className="text-sm text-slate-500">
                          Aluminum finish
                        </p>
                      </div>
                    </div>
                    {expandedSection === "legs" ? (
                      <ChevronUp className="w-5 h-5 text-slate-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-600" />
                    )}
                  </button>
                  {expandedSection === "legs" && (
                    <div className="p-6 bg-white">
                      <div className="space-y-2">
                        {[
                          "Brushed Aluminum",
                          "Polished Chrome",
                          "Matte Black",
                          "Bronze",
                        ].map((option) => (
                          <button
                            key={option}
                            onClick={() => setSelectedLegs(option)}
                            className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                              selectedLegs === option
                                ? "bg-blue-100 border-2 border-blue-500"
                                : "bg-slate-50 border-2 border-transparent hover:bg-slate-100"
                            }`}
                          >
                            <span className="font-medium text-slate-800">
                              {option}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Cushion Section */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("cushion")}
                    className="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded"></div>
                      <div className="text-left">
                        <p className="font-medium text-slate-800">
                          {selectedCushion}
                        </p>
                        <p className="text-sm text-slate-500">Cushion Type</p>
                      </div>
                    </div>
                    {expandedSection === "cushion" ? (
                      <ChevronUp className="w-5 h-5 text-slate-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-600" />
                    )}
                  </button>
                  {expandedSection === "cushion" && (
                    <div className="p-6 bg-white">
                      <div className="space-y-2">
                        {cushionOptions.map((option) => (
                          <button
                            key={option.name}
                            onClick={() => setSelectedCushion(option.name)}
                            className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                              selectedCushion === option.name
                                ? "bg-blue-100 border-2 border-blue-500"
                                : "bg-slate-50 border-2 border-transparent hover:bg-slate-100"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="font-medium text-slate-800">
                                  {option.name}
                                </span>
                                <p className="text-sm text-slate-500">
                                  {option.description}
                                </p>
                              </div>
                              {option.price !== 0 && (
                                <span className="text-sm font-medium text-green-600">
                                  +${option.price}
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Size Section */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("size")}
                    className="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded"></div>
                      <div className="text-left">
                        <p className="font-medium text-slate-800">
                          {selectedSize}
                        </p>
                        <p className="text-sm text-slate-500">Chair Size</p>
                      </div>
                    </div>
                    {expandedSection === "size" ? (
                      <ChevronUp className="w-5 h-5 text-slate-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-600" />
                    )}
                  </button>
                  {expandedSection === "size" && (
                    <div className="p-6 bg-white">
                      <div className="space-y-2">
                        {sizeOptions.map((option) => (
                          <button
                            key={option.name}
                            onClick={() => setSelectedSize(option.name)}
                            className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                              selectedSize === option.name
                                ? "bg-blue-100 border-2 border-blue-500"
                                : "bg-slate-50 border-2 border-transparent hover:bg-slate-100"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="font-medium text-slate-800">
                                  {option.name}
                                </span>
                                <p className="text-sm text-slate-500">
                                  {option.dimensions}
                                </p>
                              </div>
                              {option.price !== 0 && (
                                <span
                                  className={`text-sm font-medium ${
                                    option.price > 0
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {option.price > 0
                                    ? `+$${option.price}`
                                    : `$${option.price}`}
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-8 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Product Price</p>
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-3xl font-bold text-slate-800"
                        style={{
                          fontFamily: typography.fontFamily,
                          fontWeight: Math.min(
                            typography.fontWeight + 300,
                            900
                          ),
                          fontSize: `${Math.max(
                            typography.fontSize * 2.5,
                            28
                          )}px`,
                        }}
                      >
                        ${totalPrice}
                      </span>
                      <span className="text-lg text-slate-400 line-through">
                        $345
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-300 transition-colors"
                    >
                      <Minus className="w-4 h-4 text-slate-700" />
                    </button>
                    <span className="text-xl font-semibold text-slate-800 w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-300 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-slate-700" />
                    </button>
                  </div>
                </div>
                <div
                  className={`flex ${
                    uiCustomization.button.alignment === "left"
                      ? "justify-start"
                      : uiCustomization.button.alignment === "right"
                      ? "justify-end"
                      : "justify-center"
                  }`}
                >
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className={`py-4 font-semibold transition-all flex items-center justify-center gap-2 ${
                      isAddingToCart ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                    style={{
                      borderRadius: `${uiCustomization.button.borderRadius}px`,
                      backgroundColor: uiCustomization.button.backgroundColor,
                      color: uiCustomization.button.textColor,
                      boxShadow:
                        uiCustomization.button.shadow === "none"
                          ? "none"
                          : uiCustomization.button.shadow === "small"
                          ? "0 1px 3px rgba(0, 0, 0, 0.1)"
                          : uiCustomization.button.shadow === "medium"
                          ? "0 4px 6px rgba(0, 0, 0, 0.1)"
                          : "0 10px 15px rgba(0, 0, 0, 0.1)",
                      width: "100%",
                    }}
                  >
                    {isAddingToCart ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Add to cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
