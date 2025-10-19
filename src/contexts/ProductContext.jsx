import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  // Load initial data from localStorage or use default
  const getInitialData = () => {
    try {
      const saved = localStorage.getItem("productData");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure uiCustomization exists with defaults
        if (!parsed.uiCustomization) {
          parsed.uiCustomization = {
            button: {
              borderRadius: 8,
              shadow: "medium",
              alignment: "center",
              backgroundColor: "#3B82F6",
              textColor: "#FFFFFF",
            },
            gallery: {
              alignment: "grid-center",
              spacing: 16,
              imageBorderRadius: 8,
            },
            layout: {
              cardCornerRadius: 16,
              containerPadding: 32,
              sectionBackgroundColor: "#F8FAFC",
              currentLayout: "layout1",
            },
            stroke: {
              color: "#E2E8F0",
              weight: 1,
            },
          };
        }
        return parsed;
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
    }
    return {
      name: "Cozy Lounge Chair",
      basePrice: 200,
      rating: 4.8,
      reviewCount: 127,
      images: [
        {
          url: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800",
          alt: "Cozy Lounge Chair - Front View",
        },
        {
          url: "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=800",
          alt: "Cozy Lounge Chair - Side View",
        },
        {
          url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
          alt: "Cozy Lounge Chair - Back View",
        },
        {
          url: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800",
          alt: "Cozy Lounge Chair - Detail View",
        },
        {
          url: "https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=800",
          alt: "Cozy Lounge Chair - Living Room Setup",
        },
        {
          url: "https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=800",
          alt: "Cozy Lounge Chair - Modern Interior",
        },
      ],
      leatherColors: [
        { name: "Burgundy", color: "#5C3A3A", price: 0 },
        { name: "Forest", color: "#3D4F3D", price: 0 },
        { name: "Olive", color: "#4A5643", price: 0 },
        { name: "Sage", color: "#5E6B5A", price: 0 },
        { name: "Navy", color: "#3E3E52", price: 0 },
        { name: "Slate", color: "#4A5A6A", price: 0 },
        { name: "Steel", color: "#4F5F6F", price: 0 },
        { name: "Crimson", color: "#6B2E2E", price: 25 },
        { name: "Ruby", color: "#7A3333", price: 25 },
        { name: "Teal", color: "#2F5F5F", price: 0 },
        { name: "Charcoal", color: "#2C2C2C", price: 15 },
        { name: "Cognac", color: "#8B4513", price: 30 },
        { name: "Ivory", color: "#F5F5DC", price: 20 },
        { name: "Midnight", color: "#191970", price: 25 },
      ],
      woodFinishes: [
        { name: "Dark Walnut", color: "#4A3428", price: 0 },
        { name: "Oak", color: "#5C5043", price: 0 },
        { name: "Cedar", color: "#655548", price: 0 },
        { name: "Pine", color: "#6B5E52", price: 0 },
        { name: "Espresso", color: "#3B302A", price: 15 },
        { name: "Cherry", color: "#8B4513", price: 25 },
        { name: "Mahogany", color: "#8B0000", price: 30 },
        { name: "Ash", color: "#D2B48C", price: 10 },
        { name: "Maple", color: "#DEB887", price: 20 },
        { name: "Teak", color: "#CD853F", price: 35 },
      ],
      cushionOptions: [
        { name: "Standard", description: "Firm support", price: 0 },
        {
          name: "Memory Foam",
          description: "Contours to your body",
          price: 50,
        },
        { name: "Down Blend", description: "Ultra-soft luxury", price: 75 },
        { name: "Gel Memory", description: "Cooling comfort", price: 60 },
        { name: "Latex", description: "Natural resilience", price: 40 },
      ],
      sizeOptions: [
        { name: "Regular", dimensions: '32" W x 34" D x 32" H', price: 0 },
        { name: "Large", dimensions: '36" W x 38" D x 34" H', price: 100 },
        { name: "Petite", dimensions: '28" W x 30" D x 30" H', price: -50 },
        { name: "Oversized", dimensions: '40" W x 42" D x 36" H', price: 150 },
      ],
      armOptions: [
        { name: "1. Arms", description: "Full armrests", price: 0 },
        { name: "2. No Arms", description: "Clean armless design", price: -25 },
        { name: "3. Half Arms", description: "Minimal armrests", price: -15 },
        { name: "4. Wide Arms", description: "Extra-wide armrests", price: 30 },
      ],
      legOptions: [
        { name: "Brushed Aluminum", price: 0 },
        { name: "Polished Chrome", price: 20 },
        { name: "Matte Black", price: 15 },
        { name: "Bronze", price: 25 },
      ],
      typography: {
        fontFamily: "Inter",
        fontWeight: 400,
        fontSize: 16,
      },
      uiCustomization: {
        // Button Customization
        button: {
          borderRadius: 8,
          shadow: "medium", // none, small, medium, large
          alignment: "center", // left, center, right
          backgroundColor: "#3B82F6", // HEX color
          textColor: "#FFFFFF", // HEX color
        },
        // Gallery/Images Customization
        gallery: {
          alignment: "grid-center", // grid-left, grid-center, grid-right
          spacing: 16, // spacing between images in px
          imageBorderRadius: 8, // border radius for images
        },
        // General Layout Customization
        layout: {
          cardCornerRadius: 16, // card corner radius
          containerPadding: 32, // container padding in px
          sectionBackgroundColor: "#F8FAFC", // section background color
          currentLayout: "layout1", // layout1 or layout2
        },
        // Stroke/Border Customization
        stroke: {
          color: "#E2E8F0", // stroke color
          weight: 1, // stroke weight in px
        },
      },
    };
  };

  const [productData, setProductData] = useState(getInitialData);

  // Save to localStorage whenever productData changes
  React.useEffect(() => {
    try {
      localStorage.setItem("productData", JSON.stringify(productData));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [productData]);

  const updateProductData = (newData) => {
    setProductData((prev) => ({ ...prev, ...newData }));
  };

  const addImage = (image) => {
    setProductData((prev) => ({
      ...prev,
      images: [...prev.images, image],
    }));
  };

  const removeImage = (index) => {
    setProductData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const updateImage = (index, newImage) => {
    setProductData((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => (i === index ? newImage : img)),
    }));
  };

  const addLeatherColor = (color) => {
    setProductData((prev) => ({
      ...prev,
      leatherColors: [...prev.leatherColors, color],
    }));
  };

  const removeLeatherColor = (index) => {
    setProductData((prev) => ({
      ...prev,
      leatherColors: prev.leatherColors.filter((_, i) => i !== index),
    }));
  };

  const updateLeatherColor = (index, newColor) => {
    setProductData((prev) => ({
      ...prev,
      leatherColors: prev.leatherColors.map((color, i) =>
        i === index ? newColor : color
      ),
    }));
  };

  const addWoodFinish = (finish) => {
    setProductData((prev) => ({
      ...prev,
      woodFinishes: [...prev.woodFinishes, finish],
    }));
  };

  const removeWoodFinish = (index) => {
    setProductData((prev) => ({
      ...prev,
      woodFinishes: prev.woodFinishes.filter((_, i) => i !== index),
    }));
  };

  const updateWoodFinish = (index, newFinish) => {
    setProductData((prev) => ({
      ...prev,
      woodFinishes: prev.woodFinishes.map((finish, i) =>
        i === index ? newFinish : finish
      ),
    }));
  };

  const addCushionOption = (option) => {
    setProductData((prev) => ({
      ...prev,
      cushionOptions: [...prev.cushionOptions, option],
    }));
  };

  const removeCushionOption = (index) => {
    setProductData((prev) => ({
      ...prev,
      cushionOptions: prev.cushionOptions.filter((_, i) => i !== index),
    }));
  };

  const updateCushionOption = (index, newOption) => {
    setProductData((prev) => ({
      ...prev,
      cushionOptions: prev.cushionOptions.map((option, i) =>
        i === index ? newOption : option
      ),
    }));
  };

  const addSizeOption = (option) => {
    setProductData((prev) => ({
      ...prev,
      sizeOptions: [...prev.sizeOptions, option],
    }));
  };

  const removeSizeOption = (index) => {
    setProductData((prev) => ({
      ...prev,
      sizeOptions: prev.sizeOptions.filter((_, i) => i !== index),
    }));
  };

  const updateSizeOption = (index, newOption) => {
    setProductData((prev) => ({
      ...prev,
      sizeOptions: prev.sizeOptions.map((option, i) =>
        i === index ? newOption : option
      ),
    }));
  };

  const addArmOption = (option) => {
    setProductData((prev) => ({
      ...prev,
      armOptions: [...prev.armOptions, option],
    }));
  };

  const removeArmOption = (index) => {
    setProductData((prev) => ({
      ...prev,
      armOptions: prev.armOptions.filter((_, i) => i !== index),
    }));
  };

  const updateArmOption = (index, newOption) => {
    setProductData((prev) => ({
      ...prev,
      armOptions: prev.armOptions.map((option, i) =>
        i === index ? newOption : option
      ),
    }));
  };

  const addLegOption = (option) => {
    setProductData((prev) => ({
      ...prev,
      legOptions: [...prev.legOptions, option],
    }));
  };

  const removeLegOption = (index) => {
    setProductData((prev) => ({
      ...prev,
      legOptions: prev.legOptions.filter((_, i) => i !== index),
    }));
  };

  const updateLegOption = (index, newOption) => {
    setProductData((prev) => ({
      ...prev,
      legOptions: prev.legOptions.map((option, i) =>
        i === index ? newOption : option
      ),
    }));
  };

  const updateTypography = (newTypography) => {
    setProductData((prev) => ({
      ...prev,
      typography: { ...prev.typography, ...newTypography },
    }));
  };

  const updateUICustomization = (section, newData) => {
    setProductData((prev) => ({
      ...prev,
      uiCustomization: {
        ...prev.uiCustomization,
        [section]: { ...prev.uiCustomization[section], ...newData },
      },
    }));
  };

  const value = {
    productData,
    updateProductData,
    addImage,
    removeImage,
    updateImage,
    addLeatherColor,
    removeLeatherColor,
    updateLeatherColor,
    addWoodFinish,
    removeWoodFinish,
    updateWoodFinish,
    addCushionOption,
    removeCushionOption,
    updateCushionOption,
    addSizeOption,
    removeSizeOption,
    updateSizeOption,
    addArmOption,
    removeArmOption,
    updateArmOption,
    addLegOption,
    removeLegOption,
    updateLegOption,
    updateTypography,
    updateUICustomization,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
