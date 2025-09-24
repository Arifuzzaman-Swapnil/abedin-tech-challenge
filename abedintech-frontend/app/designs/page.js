"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DesignPage() {
  const [text, setText] = useState("Hello");
  const [imageUrl, setImageUrl] = useState("https://img.drz.lazcdn.com/static/lk/p/017ff92dd5a50017f15ac03d61ad5998.jpg_960x960q80.jpg_.webp");
  const [saving, setSaving] = useState(false);
  const [designs, setDesigns] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchDesigns = async () => {
    const res = await fetch("http://localhost:8000/designs/");
    const data = await res.json();
    setDesigns(data);
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    if (editingId) {
      await fetch(`http://localhost:8000/designs/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: "t-shirt",
          text,
          image_url: imageUrl,
        }),
      });
      setEditingId(null);
    } else {
      await fetch("http://localhost:8000/designs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: "t-shirt",
          text,
          image_url: imageUrl,
        }),
      });
    }
    setSaving(false);
    setText("Hello");
    fetchDesigns();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/designs/${id}`, { method: "DELETE" });
    fetchDesigns();
  };

  const handleEdit = (design) => {
    setText(design.text || "");
    setImageUrl(design.image_url);
    setEditingId(design.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              Abedin Tech
            </Link>
            <div className="flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">
                Home
              </Link>
              <Link href="/designs" className="text-blue-600 font-medium">
                Design
              </Link>
              <Link href="/posts" className="text-gray-600 hover:text-blue-600 font-medium">
                Posts
              </Link>
              <Link href="/analytics" className="text-gray-600 hover:text-blue-600 font-medium">
                Analytics
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            T-Shirt Customizer
          </h1>
          <p className="text-lg text-gray-600">Design your perfect custom t-shirt</p>
        </div>

        {/* Design Editor Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Preview */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Live Preview</h3>
              <div className="relative w-80 h-80 mx-auto bg-gray-50 rounded-xl border-2 border-gray-200 overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt="T-shirt" 
                  className="w-full h-full object-contain" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-red-600 px-4 py-2 bg-white/80 rounded-lg shadow">
                    {text}
                  </span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Custom Text
                </label>
                <input
                  type="text"
                  placeholder="Enter your text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  T-Shirt Image URL
                </label>
                <input
                  type="url"
                  placeholder="Enter image URL..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-colors ${
                  saving
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : editingId
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {saving ? "Saving..." : editingId ? "Update Design" : "Save Design"}
              </button>

              {editingId && (
                <button
                  onClick={() => {
                    setEditingId(null);
                    setText("Hello");
                  }}
                  className="w-full py-3 px-6 rounded-xl font-semibold text-white-600 border-2 border-gray-200 hover:bg-gray-50"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>
        </div>

        {/* My Designs Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <span className="mr-3"></span>
            My Designs
          </h2>
          
          {designs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4"></div>
              <p className="text-xl text-gray-500">No designs created yet</p>
              <p className="text-gray-400 mt-2">Create your first custom design above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {designs.map((design) => (
                <div
                  key={design.id}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  {/* Design Preview */}
                  <div className="relative w-full h-48 bg-white rounded-lg mb-4 border overflow-hidden">
                    <img 
                      src={design.image_url} 
                      alt="Saved T-shirt" 
                      className="w-full h-full object-contain" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-red-600 px-2 py-1 bg-white/80 rounded shadow max-w-full overflow-hidden">
                        {design.text}
                      </span>
                    </div>
                  </div>
                  
                  {/* Design Info */}
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-500">Design #{design.id}</p>
                    <p className="font-medium text-gray-700 capitalize">{design.product}</p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(design)}
                      className="flex-1 py-2 px-3 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(design.id)}
                      className="flex-1 py-2 px-3 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}