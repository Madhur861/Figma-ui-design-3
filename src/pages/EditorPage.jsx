import { useState, useEffect } from "react";
import { useProduct } from "../contexts/ProductContext";
import {
  Save,
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  Palette,
  Settings,
  ArrowLeft,
  Upload,
  X,
  Type,
  Layout,
  Square,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

const EditorPage = () => {
  const {
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
  } = useProduct();

  const [activeTab, setActiveTab] = useState("general");
  const [editingItem, setEditingItem] = useState(null);
  const [editingType, setEditingType] = useState(null);
  const [editData, setEditData] = useState({});

  // Initialize editData when editingType or editingItem changes
  useEffect(() => {
    if (editingType) {
      if (editingItem !== null) {
        // Editing existing item
        switch (editingType) {
          case "image":
            setEditData(productData.images[editingItem]);
            break;
          case "leather":
            setEditData(productData.leatherColors[editingItem]);
            break;
          case "wood":
            setEditData(productData.woodFinishes[editingItem]);
            break;
          case "cushion":
            setEditData(productData.cushionOptions[editingItem]);
            break;
          case "size":
            setEditData(productData.sizeOptions[editingItem]);
            break;
          case "arm":
            setEditData(productData.armOptions[editingItem]);
            break;
          case "leg":
            setEditData(productData.legOptions[editingItem]);
            break;
          default:
            setEditData({});
        }
      } else {
        // Adding new item
        switch (editingType) {
          case "image":
            setEditData({ url: "", alt: "" });
            break;
          case "leather":
            setEditData({ name: "", color: "#000000", price: 0 });
            break;
          case "wood":
            setEditData({ name: "", color: "#000000", price: 0 });
            break;
          case "cushion":
            setEditData({ name: "", description: "", price: 0 });
            break;
          case "size":
            setEditData({ name: "", dimensions: "", price: 0 });
            break;
          case "arm":
            setEditData({ name: "", description: "", price: 0 });
            break;
          case "leg":
            setEditData({ name: "", price: 0 });
            break;
          default:
            setEditData({});
        }
      }
    }
  }, [editingType, editingItem, productData]);

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "images", label: "Images", icon: ImageIcon },
    { id: "colors", label: "Colors", icon: Palette },
    { id: "typography", label: "Typography", icon: Type },
    { id: "options", label: "Options", icon: Edit3 },
    { id: "ui-customization", label: "UI Customization", icon: Layout },
  ];

  const handleSave = () => {
    // In a real app, this would save to a backend
    console.log("Saving product data:", productData);
    alert("Product data saved successfully!");
  };

  const handleBackToProduct = () => {
    window.location.href = "/";
  };

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Product Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={productData.name}
              onChange={(e) => updateProductData({ name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Base Price ($)
            </label>
            <input
              type="number"
              value={productData.basePrice}
              onChange={(e) =>
                updateProductData({ basePrice: parseInt(e.target.value) })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={productData.rating}
              onChange={(e) =>
                updateProductData({ rating: parseFloat(e.target.value) })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Review Count
            </label>
            <input
              type="number"
              value={productData.reviewCount}
              onChange={(e) =>
                updateProductData({ reviewCount: parseInt(e.target.value) })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderImagesTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Product Images</h3>
          <button
            onClick={() => {
              setEditingItem(null);
              setEditingType("image");
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Image
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productData.images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-32 object-cover rounded-lg border"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    setEditingItem(index);
                    setEditingType("image");
                  }}
                  className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeImage(index)}
                  className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderColorsTab = () => (
    <div className="space-y-6">
      {/* Leather Colors */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Leather Colors</h3>
          <button
            onClick={() => {
              setEditingItem(null);
              setEditingType("leather");
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Color
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {productData.leatherColors.map((color, index) => (
            <div key={index} className="relative group">
              <div
                className="w-full h-20 rounded-lg border-2 border-gray-200"
                style={{ backgroundColor: color.color }}
              ></div>
              <div className="mt-2 text-sm font-medium">{color.name}</div>
              <div className="text-xs text-gray-500">${color.price}</div>
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    setEditingItem(index);
                    setEditingType("leather");
                  }}
                  className="p-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => removeLeatherColor(index)}
                  className="p-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wood Finishes */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Wood Finishes</h3>
          <button
            onClick={() => {
              setEditingItem(null);
              setEditingType("wood");
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Finish
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {productData.woodFinishes.map((finish, index) => (
            <div key={index} className="relative group">
              <div
                className="w-full h-20 rounded-lg border-2 border-gray-200"
                style={{ backgroundColor: finish.color }}
              ></div>
              <div className="mt-2 text-sm font-medium">{finish.name}</div>
              <div className="text-xs text-gray-500">${finish.price}</div>
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    setEditingItem(index);
                    setEditingType("wood");
                  }}
                  className="p-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => removeWoodFinish(index)}
                  className="p-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTypographyTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Typography Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Family
            </label>
            <select
              value={productData.typography.fontFamily}
              onChange={(e) => updateTypography({ fontFamily: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Poppins">Poppins</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Lato">Lato</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Source Sans Pro">Source Sans Pro</option>
              <option value="Nunito">Nunito</option>
              <option value="Playfair Display">Playfair Display</option>
              <option value="Merriweather">Merriweather</option>
            </select>
            <div className="mt-2 p-3 bg-gray-50 rounded-md">
              <p
                className="text-sm"
                style={{
                  fontFamily: productData.typography.fontFamily,
                  fontWeight: productData.typography.fontWeight,
                  fontSize: `${productData.typography.fontSize}px`,
                }}
              >
                Preview: The quick brown fox jumps over the lazy dog
              </p>
            </div>
          </div>

          {/* Font Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Weight
            </label>
            <select
              value={productData.typography.fontWeight}
              onChange={(e) =>
                updateTypography({ fontWeight: parseInt(e.target.value) })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={300}>300 - Light</option>
              <option value={400}>400 - Regular</option>
              <option value={500}>500 - Medium</option>
              <option value={600}>600 - Semi Bold</option>
              <option value={700}>700 - Bold</option>
              <option value={800}>800 - Extra Bold</option>
              <option value={900}>900 - Black</option>
            </select>
            <div className="mt-2 p-3 bg-gray-50 rounded-md">
              <p
                className="text-sm"
                style={{
                  fontFamily: productData.typography.fontFamily,
                  fontWeight: productData.typography.fontWeight,
                  fontSize: `${productData.typography.fontSize}px`,
                }}
              >
                Preview: The quick brown fox jumps over the lazy dog
              </p>
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Size ({productData.typography.fontSize}px)
            </label>
            <input
              type="range"
              min="10"
              max="60"
              value={productData.typography.fontSize}
              onChange={(e) =>
                updateTypography({ fontSize: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10px</span>
              <span>60px</span>
            </div>
            <div className="mt-2 p-3 bg-gray-50 rounded-md">
              <p
                className="text-sm"
                style={{
                  fontFamily: productData.typography.fontFamily,
                  fontWeight: productData.typography.fontWeight,
                  fontSize: `${productData.typography.fontSize}px`,
                }}
              >
                Preview: The quick brown fox jumps over the lazy dog
              </p>
            </div>
          </div>
        </div>

        {/* Live Preview Section */}
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">Live Preview</h4>
          <div className="space-y-4">
            <div>
              <h5
                className="text-2xl font-bold mb-2"
                style={{
                  fontFamily: productData.typography.fontFamily,
                  fontWeight: productData.typography.fontWeight,
                  fontSize: `${Math.max(
                    productData.typography.fontSize * 1.5,
                    20
                  )}px`,
                }}
              >
                Product Title Preview
              </h5>
              <p
                className="text-gray-600"
                style={{
                  fontFamily: productData.typography.fontFamily,
                  fontWeight: productData.typography.fontWeight,
                  fontSize: `${productData.typography.fontSize}px`,
                }}
              >
                This is how your product title will look with the selected
                typography settings.
              </p>
            </div>
            <div>
              <h6
                className="text-lg font-semibold mb-2"
                style={{
                  fontFamily: productData.typography.fontFamily,
                  fontWeight: Math.min(
                    productData.typography.fontWeight + 100,
                    700
                  ),
                  fontSize: `${Math.max(
                    productData.typography.fontSize * 1.2,
                    16
                  )}px`,
                }}
              >
                Section Headers
              </h6>
              <p
                className="text-gray-500"
                style={{
                  fontFamily: productData.typography.fontFamily,
                  fontWeight: productData.typography.fontWeight,
                  fontSize: `${Math.max(
                    productData.typography.fontSize * 0.9,
                    12
                  )}px`,
                }}
              >
                This is how section headers and descriptions will appear.
              </p>
            </div>
            <div>
              <p
                className="text-sm"
                style={{
                  fontFamily: productData.typography.fontFamily,
                  fontWeight: productData.typography.fontWeight,
                  fontSize: `${Math.max(
                    productData.typography.fontSize * 0.8,
                    10
                  )}px`,
                }}
              >
                Small text and captions will use this styling.
              </p>
            </div>
          </div>
        </div>

        {/* Typography Presets */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-4">Quick Presets</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() =>
                updateTypography({
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: 16,
                })
              }
              className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
            >
              <div className="font-medium text-sm">Modern</div>
              <div className="text-xs text-gray-500">Inter, 400, 16px</div>
            </button>
            <button
              onClick={() =>
                updateTypography({
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  fontSize: 18,
                })
              }
              className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
            >
              <div className="font-medium text-sm">Bold</div>
              <div className="text-xs text-gray-500">Roboto, 500, 18px</div>
            </button>
            <button
              onClick={() =>
                updateTypography({
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: 20,
                })
              }
              className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
            >
              <div className="font-medium text-sm">Elegant</div>
              <div className="text-xs text-gray-500">Poppins, 600, 20px</div>
            </button>
            <button
              onClick={() =>
                updateTypography({
                  fontFamily: "Open Sans",
                  fontWeight: 400,
                  fontSize: 14,
                })
              }
              className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
            >
              <div className="font-medium text-sm">Minimal</div>
              <div className="text-xs text-gray-500">Open Sans, 400, 14px</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOptionsTab = () => (
    <div className="space-y-6">
      {/* Cushion Options */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Cushion Options</h3>
          <button
            onClick={() => {
              setEditingItem(null);
              setEditingType("cushion");
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Option
          </button>
        </div>
        <div className="space-y-2">
          {productData.cushionOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
            >
              <div>
                <div className="font-medium">{option.name}</div>
                <div className="text-sm text-gray-500">
                  {option.description}
                </div>
                <div className="text-sm text-green-600">${option.price}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingItem(index);
                    setEditingType("cushion");
                  }}
                  className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeCushionOption(index)}
                  className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Size Options */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Size Options</h3>
          <button
            onClick={() => {
              setEditingItem(null);
              setEditingType("size");
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Size
          </button>
        </div>
        <div className="space-y-2">
          {productData.sizeOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
            >
              <div>
                <div className="font-medium">{option.name}</div>
                <div className="text-sm text-gray-500">{option.dimensions}</div>
                <div
                  className={`text-sm ${
                    option.price >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {option.price >= 0 ? `+$${option.price}` : `$${option.price}`}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingItem(index);
                    setEditingType("size");
                  }}
                  className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeSizeOption(index)}
                  className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arm Options */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Arm Options</h3>
          <button
            onClick={() => {
              setEditingItem(null);
              setEditingType("arm");
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Option
          </button>
        </div>
        <div className="space-y-2">
          {productData.armOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
            >
              <div>
                <div className="font-medium">{option.name}</div>
                <div className="text-sm text-gray-500">
                  {option.description}
                </div>
                <div
                  className={`text-sm ${
                    option.price >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {option.price >= 0 ? `+$${option.price}` : `$${option.price}`}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingItem(index);
                    setEditingType("arm");
                  }}
                  className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeArmOption(index)}
                  className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leg Options */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Leg Options</h3>
          <button
            onClick={() => {
              setEditingItem(null);
              setEditingType("leg");
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Option
          </button>
        </div>
        <div className="space-y-2">
          {productData.legOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
            >
              <div>
                <div className="font-medium">{option.name}</div>
                <div
                  className={`text-sm ${
                    option.price >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {option.price >= 0 ? `+$${option.price}` : `$${option.price}`}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingItem(index);
                    setEditingType("leg");
                  }}
                  className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeLegOption(index)}
                  className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUICustomizationTab = () => (
    <div className="space-y-6">
      {/* Button Customization */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Button Customization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Border Radius */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Border Radius ({productData.uiCustomization.button.borderRadius}
              px)
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={productData.uiCustomization.button.borderRadius}
              onChange={(e) =>
                updateUICustomization("button", {
                  borderRadius: parseInt(e.target.value),
                })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0px</span>
              <span>50px</span>
            </div>
          </div>

          {/* Shadow */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shadow
            </label>
            <select
              value={productData.uiCustomization.button.shadow}
              onChange={(e) =>
                updateUICustomization("button", { shadow: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="none">None</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          {/* Alignment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alignment
            </label>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  updateUICustomization("button", { alignment: "left" })
                }
                className={`p-2 rounded-md border ${
                  productData.uiCustomization.button.alignment === "left"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                title="Left"
              >
                <AlignLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  updateUICustomization("button", { alignment: "center" })
                }
                className={`p-2 rounded-md border ${
                  productData.uiCustomization.button.alignment === "center"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                title="Center"
              >
                <AlignCenter className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  updateUICustomization("button", { alignment: "right" })
                }
                className={`p-2 rounded-md border ${
                  productData.uiCustomization.button.alignment === "right"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                title="Right"
              >
                <AlignRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Background Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={productData.uiCustomization.button.backgroundColor}
                onChange={(e) =>
                  updateUICustomization("button", {
                    backgroundColor: e.target.value,
                  })
                }
                className="w-12 h-10 border border-gray-300 rounded-md cursor-pointer"
              />
              <input
                type="text"
                value={productData.uiCustomization.button.backgroundColor}
                onChange={(e) =>
                  updateUICustomization("button", {
                    backgroundColor: e.target.value,
                  })
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="#3B82F6"
              />
            </div>
          </div>

          {/* Text Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={productData.uiCustomization.button.textColor}
                onChange={(e) =>
                  updateUICustomization("button", { textColor: e.target.value })
                }
                className="w-12 h-10 border border-gray-300 rounded-md cursor-pointer"
              />
              <input
                type="text"
                value={productData.uiCustomization.button.textColor}
                onChange={(e) =>
                  updateUICustomization("button", { textColor: e.target.value })
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        </div>

        {/* Button Preview */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Button Preview
          </h4>
          <div
            className={`flex ${
              productData.uiCustomization.button.alignment === "left"
                ? "justify-start"
                : productData.uiCustomization.button.alignment === "right"
                ? "justify-end"
                : "justify-center"
            }`}
          >
            <button
              className="px-6 py-3 font-medium transition-all"
              style={{
                borderRadius: `${productData.uiCustomization.button.borderRadius}px`,
                backgroundColor:
                  productData.uiCustomization.button.backgroundColor,
                color: productData.uiCustomization.button.textColor,
                boxShadow:
                  productData.uiCustomization.button.shadow === "none"
                    ? "none"
                    : productData.uiCustomization.button.shadow === "small"
                    ? "0 1px 3px rgba(0, 0, 0, 0.1)"
                    : productData.uiCustomization.button.shadow === "medium"
                    ? "0 4px 6px rgba(0, 0, 0, 0.1)"
                    : "0 10px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              Sample Button
            </button>
          </div>
        </div>
      </div>

      {/* Gallery/Images Customization */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">
          Gallery/Images Customization
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gallery Alignment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gallery Alignment
            </label>
            <select
              value={productData.uiCustomization.gallery.alignment}
              onChange={(e) =>
                updateUICustomization("gallery", { alignment: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="grid-left">Grid Left</option>
              <option value="grid-center">Grid Center</option>
              <option value="grid-right">Grid Right</option>
            </select>
          </div>

          {/* Spacing between images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Spacing ({productData.uiCustomization.gallery.spacing}px)
            </label>
            <input
              type="range"
              min="0"
              max="40"
              value={productData.uiCustomization.gallery.spacing}
              onChange={(e) =>
                updateUICustomization("gallery", {
                  spacing: parseInt(e.target.value),
                })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0px</span>
              <span>40px</span>
            </div>
          </div>

          {/* Image border radius */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Border Radius (
              {productData.uiCustomization.gallery.imageBorderRadius}px)
            </label>
            <input
              type="range"
              min="0"
              max="30"
              value={productData.uiCustomization.gallery.imageBorderRadius}
              onChange={(e) =>
                updateUICustomization("gallery", {
                  imageBorderRadius: parseInt(e.target.value),
                })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0px</span>
              <span>30px</span>
            </div>
          </div>
        </div>

        {/* Gallery Preview */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Gallery Preview
          </h4>
          <div
            className={`grid grid-cols-3 gap-${Math.floor(
              productData.uiCustomization.gallery.spacing / 4
            )} ${
              productData.uiCustomization.gallery.alignment === "grid-left"
                ? "justify-start"
                : productData.uiCustomization.gallery.alignment === "grid-right"
                ? "justify-end"
                : "justify-center"
            }`}
            style={{ gap: `${productData.uiCustomization.gallery.spacing}px` }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-20 h-20 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg"
                style={{
                  borderRadius: `${productData.uiCustomization.gallery.imageBorderRadius}px`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* General Layout Customization */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">
          General Layout Customization
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Corner Radius */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Corner Radius (
              {productData.uiCustomization.layout.cardCornerRadius}px)
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={productData.uiCustomization.layout.cardCornerRadius}
              onChange={(e) =>
                updateUICustomization("layout", {
                  cardCornerRadius: parseInt(e.target.value),
                })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0px</span>
              <span>50px</span>
            </div>
          </div>

          {/* Container Padding */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Container Padding (
              {productData.uiCustomization.layout.containerPadding}px)
            </label>
            <input
              type="range"
              min="8"
              max="80"
              value={productData.uiCustomization.layout.containerPadding}
              onChange={(e) =>
                updateUICustomization("layout", {
                  containerPadding: parseInt(e.target.value),
                })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>8px</span>
              <span>80px</span>
            </div>
          </div>

          {/* Section Background Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Background Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={
                  productData.uiCustomization.layout.sectionBackgroundColor
                }
                onChange={(e) =>
                  updateUICustomization("layout", {
                    sectionBackgroundColor: e.target.value,
                  })
                }
                className="w-12 h-10 border border-gray-300 rounded-md cursor-pointer"
              />
              <input
                type="text"
                value={
                  productData.uiCustomization.layout.sectionBackgroundColor
                }
                onChange={(e) =>
                  updateUICustomization("layout", {
                    sectionBackgroundColor: e.target.value,
                  })
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="#F8FAFC"
              />
            </div>
          </div>

          {/* Layout Switching */}
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Layout Switching
            </label>
            <div className="flex gap-4">
              <button
                onClick={() =>
                  updateUICustomization("layout", { currentLayout: "layout1" })
                }
                className={`flex-1 p-4 border-2 rounded-lg transition-all ${
                  productData.uiCustomization.layout.currentLayout === "layout1"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <div className="text-center">
                  <Layout className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-medium">Layout 1</div>
                  <div className="text-sm text-gray-500">Default Layout</div>
                </div>
              </button>
              <button
                onClick={() =>
                  updateUICustomization("layout", { currentLayout: "layout2" })
                }
                className={`flex-1 p-4 border-2 rounded-lg transition-all ${
                  productData.uiCustomization.layout.currentLayout === "layout2"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <div className="text-center">
                  <Square className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-medium">Layout 2</div>
                  <div className="text-sm text-gray-500">
                    Alternative Layout
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stroke/Border Customization */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">
          Stroke/Border Customization
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stroke Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stroke Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={productData.uiCustomization.stroke.color}
                onChange={(e) =>
                  updateUICustomization("stroke", { color: e.target.value })
                }
                className="w-12 h-10 border border-gray-300 rounded-md cursor-pointer"
              />
              <input
                type="text"
                value={productData.uiCustomization.stroke.color}
                onChange={(e) =>
                  updateUICustomization("stroke", { color: e.target.value })
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="#E2E8F0"
              />
            </div>
          </div>

          {/* Stroke Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stroke Weight ({productData.uiCustomization.stroke.weight}px)
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={productData.uiCustomization.stroke.weight}
              onChange={(e) =>
                updateUICustomization("stroke", {
                  weight: parseInt(e.target.value),
                })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0px</span>
              <span>10px</span>
            </div>
          </div>
        </div>

        {/* Stroke Preview */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Stroke Preview
          </h4>
          <div className="space-y-4">
            <div
              className="p-4 bg-white rounded-lg"
              style={{
                border: `${productData.uiCustomization.stroke.weight}px solid ${productData.uiCustomization.stroke.color}`,
              }}
            >
              <div className="text-sm text-gray-600">
                This is how borders will appear with your stroke settings.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEditModal = () => {
    if (!editingType) return null;

    const handleSaveEdit = () => {
      if (editingItem !== null) {
        // Update existing item
        switch (editingType) {
          case "image":
            updateImage(editingItem, editData);
            break;
          case "leather":
            updateLeatherColor(editingItem, editData);
            break;
          case "wood":
            updateWoodFinish(editingItem, editData);
            break;
          case "cushion":
            updateCushionOption(editingItem, editData);
            break;
          case "size":
            updateSizeOption(editingItem, editData);
            break;
          case "arm":
            updateArmOption(editingItem, editData);
            break;
          case "leg":
            updateLegOption(editingItem, editData);
            break;
        }
      } else {
        // Add new item
        switch (editingType) {
          case "image":
            addImage(editData);
            break;
          case "leather":
            addLeatherColor(editData);
            break;
          case "wood":
            addWoodFinish(editData);
            break;
          case "cushion":
            addCushionOption(editData);
            break;
          case "size":
            addSizeOption(editData);
            break;
          case "arm":
            addArmOption(editData);
            break;
          case "leg":
            addLegOption(editData);
            break;
        }
      }
      setEditingItem(null);
      setEditingType(null);
    };

    const renderFormFields = () => {
      switch (editingType) {
        case "image":
          return (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={editData.url}
                  onChange={(e) =>
                    setEditData({ ...editData, url: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={editData.alt}
                  onChange={(e) =>
                    setEditData({ ...editData, alt: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Description of the image"
                />
              </div>
            </>
          );
        case "leather":
        case "wood":
          return (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Color name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={editData.color}
                    onChange={(e) =>
                      setEditData({ ...editData, color: e.target.value })
                    }
                    className="w-12 h-10 border border-gray-300 rounded-md cursor-pointer"
                  />
                  <input
                    type="text"
                    value={editData.color}
                    onChange={(e) =>
                      setEditData({ ...editData, color: e.target.value })
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="#000000"
                  />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded border border-gray-300"
                    style={{ backgroundColor: editData.color }}
                  ></div>
                  <span className="text-sm text-gray-600">Preview</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={editData.price}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      price: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </>
          );
        case "cushion":
          return (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Cushion name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Cushion description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={editData.price}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      price: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </>
          );
        case "size":
          return (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Size name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dimensions
                </label>
                <input
                  type="text"
                  value={editData.dimensions}
                  onChange={(e) =>
                    setEditData({ ...editData, dimensions: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder='32" W x 34" D x 32" H'
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={editData.price}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      price: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </>
          );
        case "arm":
          return (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Arm option name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Arm option description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={editData.price}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      price: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </>
          );
        case "leg":
          return (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Leg option name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={editData.price}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      price: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </>
          );
        default:
          return <p className="text-gray-600">Unknown editing type</p>;
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {editingItem !== null ? "Edit" : "Add"} {editingType}
            </h3>
            <button
              onClick={() => {
                setEditingItem(null);
                setEditingType(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">{renderFormFields()}</div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => {
                setEditingItem(null);
                setEditingType(null);
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingItem !== null ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackToProduct}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Product
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                Product Editor
              </h1>
            </div>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "general" && renderGeneralTab()}
        {activeTab === "images" && renderImagesTab()}
        {activeTab === "colors" && renderColorsTab()}
        {activeTab === "typography" && renderTypographyTab()}
        {activeTab === "options" && renderOptionsTab()}
        {activeTab === "ui-customization" && renderUICustomizationTab()}
      </div>

      {/* Edit Modal */}
      {renderEditModal()}
    </div>
  );
};

export default EditorPage;
