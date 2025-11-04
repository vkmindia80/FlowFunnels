import React from 'react';
import { Settings, X } from 'lucide-react';
import { ChromePicker } from 'react-color';

const PropertiesPanel = ({ selectedElement, elements, onElementsChange }) => {
  const element = elements.find(el => el.id === selectedElement);

  if (!element) {
    return (
      <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-400" />
            <h3 className="font-bold text-gray-800">Properties</h3>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <p className="text-gray-400 text-center">Select an element to edit its properties</p>
        </div>
      </div>
    );
  }

  const updateElement = (updates) => {
    const updatedElements = elements.map(el =>
      el.id === selectedElement ? { ...el, ...updates } : el
    );
    onElementsChange(updatedElements);
  };

  const updateContent = (key, value) => {
    updateElement({
      content: { ...element.content, [key]: value }
    });
  };

  const updateStyles = (key, value) => {
    updateElement({
      styles: { ...element.styles, [key]: value }
    });
  };

  const updateSize = (key, value) => {
    updateElement({
      size: { ...element.size, [key]: parseInt(value) || 0 }
    });
  };

  const updatePosition = (key, value) => {
    updateElement({
      position: { ...element.position, [key]: parseInt(value) || 0 }
    });
  };

  const deleteElement = () => {
    onElementsChange(elements.filter(el => el.id !== selectedElement));
  };

  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary-600" />
          <h3 className="font-bold text-gray-800">Properties</h3>
        </div>
        <button
          onClick={deleteElement}
          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete Element"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Properties Form */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* Element Type */}
          <div>
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
              {element.type.toUpperCase()}
            </span>
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Position</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">X</label>
                <input
                  type="number"
                  value={element.position.x}
                  onChange={(e) => updatePosition('x', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Y</label>
                <input
                  type="number"
                  value={element.position.y}
                  onChange={(e) => updatePosition('y', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Size */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Size</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Width</label>
                <input
                  type="number"
                  value={element.size.width}
                  onChange={(e) => updateSize('width', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Height</label>
                <input
                  type="number"
                  value={element.size.height}
                  onChange={(e) => updateSize('height', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Content - Text */}
          {element.type === 'text' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Text</label>
                <textarea
                  value={element.content.text}
                  onChange={(e) => updateContent('text', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tag</label>
                <select
                  value={element.content.tag}
                  onChange={(e) => updateContent('tag', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="h1">Heading 1</option>
                  <option value="h2">Heading 2</option>
                  <option value="h3">Heading 3</option>
                  <option value="p">Paragraph</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Font Size</label>
                <input
                  type="text"
                  value={element.styles.fontSize}
                  onChange={(e) => updateStyles('fontSize', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="24px"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Text Color</label>
                <input
                  type="color"
                  value={element.styles.color}
                  onChange={(e) => updateStyles('color', e.target.value)}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>
            </>
          )}

          {/* Content - Button */}
          {element.type === 'button' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Button Text</label>
                <input
                  type="text"
                  value={element.content.text}
                  onChange={(e) => updateContent('text', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Link URL</label>
                <input
                  type="text"
                  value={element.content.url}
                  onChange={(e) => updateContent('url', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Background Color</label>
                <input
                  type="color"
                  value={element.styles.backgroundColor}
                  onChange={(e) => updateStyles('backgroundColor', e.target.value)}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Text Color</label>
                <input
                  type="color"
                  value={element.styles.color}
                  onChange={(e) => updateStyles('color', e.target.value)}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Border Radius</label>
                <input
                  type="text"
                  value={element.styles.borderRadius}
                  onChange={(e) => updateStyles('borderRadius', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="8px"
                />
              </div>
            </>
          )}

          {/* Content - Image */}
          {element.type === 'image' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                <input
                  type="text"
                  value={element.content.src}
                  onChange={(e) => updateContent('src', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Alt Text</label>
                <input
                  type="text"
                  value={element.content.alt}
                  onChange={(e) => updateContent('alt', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </>
          )}

          {/* Content - Video */}
          {element.type === 'video' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Video Embed URL</label>
              <input
                type="text"
                value={element.content.url}
                onChange={(e) => updateContent('url', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://youtube.com/embed/..."
              />
              <p className="text-xs text-gray-500 mt-1">Use YouTube or Vimeo embed URL</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;