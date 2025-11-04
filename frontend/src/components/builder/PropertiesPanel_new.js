import React, { useState } from 'react';
import { Settings, X, Trash2 } from 'lucide-react';

const PropertiesPanel = ({ selectedElement, elements, onElementsChange }) => {
  const element = elements.find(el => el.id === selectedElement);
  const [colorPickerOpen, setColorPickerOpen] = useState(null);

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

  const updateArrayContent = (key, index, value) => {
    const newArray = [...(element.content[key] || [])];
    newArray[index] = value;
    updateContent(key, newArray);
  };

  const addArrayItem = (key, defaultValue) => {
    const newArray = [...(element.content[key] || []), defaultValue];
    updateContent(key, newArray);
  };

  const removeArrayItem = (key, index) => {
    const newArray = (element.content[key] || []).filter((_, i) => i !== index);
    updateContent(key, newArray);
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
          <Trash2 className="w-4 h-4" />
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

          {/* Heading */}
          {element.type === 'heading' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Heading Text</label>
                <textarea
                  value={element.content.text}
                  onChange={(e) => updateContent('text', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  rows="2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Font Size</label>
                <input
                  type="text"
                  value={element.styles.fontSize}
                  onChange={(e) => updateStyles('fontSize', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="36px"
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Text Align</label>
                <select
                  value={element.styles.textAlign}
                  onChange={(e) => updateStyles('textAlign', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </>
          )}

          {/* Text */}
          {element.type === 'text' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Text</label>
                <textarea
                  value={element.content.text}
                  onChange={(e) => updateContent('text', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  rows="4"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Font Size</label>
                <input
                  type="text"
                  value={element.styles.fontSize}
                  onChange={(e) => updateStyles('fontSize', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="16px"
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

          {/* Button */}
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
            </>
          )}

          {/* Image */}
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

          {/* Video */}
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

          {/* Text Input */}
          {(element.type === 'input' || element.type === 'email' || element.type === 'phone' || 
            element.type === 'url' || element.type === 'number') && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Label</label>
                <input
                  type="text"
                  value={element.content.label}
                  onChange={(e) => updateContent('label', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Placeholder</label>
                <input
                  type="text"
                  value={element.content.placeholder}
                  onChange={(e) => updateContent('placeholder', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={element.content.required || false}
                    onChange={(e) => updateContent('required', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Required field</span>
                </label>
              </div>
              {element.type === 'number' && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Min</label>
                      <input
                        type="number"
                        value={element.content.min || 0}
                        onChange={(e) => updateContent('min', parseInt(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Max</label>
                      <input
                        type="number"
                        value={element.content.max || 100}
                        onChange={(e) => updateContent('max', parseInt(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {/* Textarea */}
          {element.type === 'textarea' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Label</label>
                <input
                  type="text"
                  value={element.content.label}
                  onChange={(e) => updateContent('label', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Placeholder</label>
                <input
                  type="text"
                  value={element.content.placeholder}
                  onChange={(e) => updateContent('placeholder', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={element.content.required || false}
                    onChange={(e) => updateContent('required', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Required field</span>
                </label>
              </div>
            </>
          )}

          {/* Checkbox */}
          {element.type === 'checkbox' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Label</label>
                <input
                  type="text"
                  value={element.content.label}
                  onChange={(e) => updateContent('label', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={element.content.checked || false}
                    onChange={(e) => updateContent('checked', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Default checked</span>
                </label>
              </div>
            </>
          )}

          {/* Radio & Select & MultiSelect */}
          {(element.type === 'radio' || element.type === 'select' || element.type === 'multiselect') && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Label</label>
                <input
                  type="text"
                  value={element.content.label}
                  onChange={(e) => updateContent('label', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Options</label>
                {(element.content.options || []).map((option, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateArrayContent('options', index, e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => removeArrayItem('options', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('options', `Option ${(element.content.options?.length || 0) + 1}`)}
                  className="w-full px-3 py-2 bg-primary-50 text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors"
                >
                  + Add Option
                </button>
              </div>
            </>
          )}

          {/* Toggle */}
          {element.type === 'toggle' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Label</label>
                <input
                  type="text"
                  value={element.content.label}
                  onChange={(e) => updateContent('label', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={element.content.checked || false}
                    onChange={(e) => updateContent('checked', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Default on</span>
                </label>
              </div>
            </>
          )}

          {/* Date & Time */}
          {(element.type === 'date' || element.type === 'time') && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Label</label>
              <input
                type="text"
                value={element.content.label}
                onChange={(e) => updateContent('label', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          )}

          {/* File Upload */}
          {element.type === 'file' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Label</label>
                <input
                  type="text"
                  value={element.content.label}
                  onChange={(e) => updateContent('label', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Accepted Files</label>
                <input
                  type="text"
                  value={element.content.accept || '*'}
                  onChange={(e) => updateContent('accept', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., .jpg,.png,.pdf"
                />
              </div>
            </>
          )}

          {/* Range Slider */}
          {element.type === 'range' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Label</label>
                <input
                  type="text"
                  value={element.content.label}
                  onChange={(e) => updateContent('label', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Min</label>
                  <input
                    type="number"
                    value={element.content.min || 0}
                    onChange={(e) => updateContent('min', parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Max</label>
                  <input
                    type="number"
                    value={element.content.max || 100}
                    onChange={(e) => updateContent('max', parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Value</label>
                  <input
                    type="number"
                    value={element.content.value || 50}
                    onChange={(e) => updateContent('value', parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </>
          )}

          {/* Star Rating */}
          {element.type === 'rating' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Label</label>
                <input
                  type="text"
                  value={element.content.label}
                  onChange={(e) => updateContent('label', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Max Stars</label>
                  <input
                    type="number"
                    value={element.content.maxRating || 5}
                    onChange={(e) => updateContent('maxRating', parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Rating</label>
                  <input
                    type="number"
                    value={element.content.rating || 0}
                    onChange={(e) => updateContent('rating', parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </>
          )}

          {/* Progress Bar */}
          {element.type === 'progress' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Label</label>
                <input
                  type="text"
                  value={element.content.label}
                  onChange={(e) => updateContent('label', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Progress (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={element.content.value || 0}
                  onChange={(e) => updateContent('value', parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </>
          )}

          {/* Container */}
          {element.type === 'container' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={element.content.text}
                  onChange={(e) => updateContent('text', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
            </>
          )}

          {/* Spacer */}
          {element.type === 'spacer' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Height</label>
              <input
                type="text"
                value={element.content.height}
                onChange={(e) => updateContent('height', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="40px"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;
