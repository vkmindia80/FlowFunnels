import React from 'react';
import { Settings, Trash2 } from 'lucide-react';

const PropertiesPanel = ({ selectedElement, sections, onSectionsChange }) => {
  // Find the selected element in sections
  let element = null;
  let elementLocation = null;
  
  if (selectedElement) {
    sections.forEach(section => {
      section.rows.forEach(row => {
        row.columns.forEach(column => {
          if (column.elements) {
            const found = column.elements.find(el => el.id === selectedElement);
            if (found) {
              element = found;
              elementLocation = { sectionId: section.id, rowId: row.id, columnId: column.id };
            }
          }
        });
      });
    });
  }

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
    const newSections = JSON.parse(JSON.stringify(sections));
    const section = newSections.find(s => s.id === elementLocation.sectionId);
    const row = section.rows.find(r => r.id === elementLocation.rowId);
    const column = row.columns.find(c => c.id === elementLocation.columnId);
    const elementIndex = column.elements.findIndex(el => el.id === selectedElement);
    
    column.elements[elementIndex] = { ...column.elements[elementIndex], ...updates };
    onSectionsChange(newSections);
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

  const deleteElement = () => {
    const newSections = JSON.parse(JSON.stringify(sections));
    const section = newSections.find(s => s.id === elementLocation.sectionId);
    const row = section.rows.find(r => r.id === elementLocation.rowId);
    const column = row.columns.find(c => c.id === elementLocation.columnId);
    
    column.elements = column.elements.filter(el => el.id !== selectedElement);
    onSectionsChange(newSections);
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

          {/* Content Properties */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Content</h4>
            <div className="space-y-3">
              {/* Text Content */}
              {(element.type === 'heading' || element.type === 'text' || element.type === 'button') && (
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    {element.type === 'button' ? 'Button Text' : 'Text'}
                  </label>
                  {element.type === 'text' ? (
                    <textarea
                      value={element.content.text || ''}
                      onChange={(e) => updateContent('text', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                    />
                  ) : (
                    <input
                      type="text"
                      value={element.content.text || ''}
                      onChange={(e) => updateContent('text', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  )}
                </div>
              )}

              {/* Button URL */}
              {element.type === 'button' && (
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Link URL
                  </label>
                  <input
                    type="text"
                    value={element.content.url || ''}
                    onChange={(e) => updateContent('url', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://example.com"
                  />
                </div>
              )}

              {/* Image Properties */}
              {element.type === 'image' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={element.content.src || ''}
                      onChange={(e) => updateContent('src', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Alt Text
                    </label>
                    <input
                      type="text"
                      value={element.content.alt || ''}
                      onChange={(e) => updateContent('alt', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Image description"
                    />
                  </div>
                </>
              )}

              {/* Video URL */}
              {element.type === 'video' && (
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Video URL
                  </label>
                  <input
                    type="text"
                    value={element.content.url || ''}
                    onChange={(e) => updateContent('url', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://youtube.com/embed/..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use YouTube or Vimeo embed URL
                  </p>
                </div>
              )}

              {/* Form Field Properties */}
              {['input', 'textarea', 'email', 'phone', 'url', 'number', 'select', 'multiselect', 'checkbox', 'radio', 'toggle', 'date', 'time', 'file', 'range', 'rating', 'progress'].includes(element.type) && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Label
                    </label>
                    <input
                      type="text"
                      value={element.content.label || ''}
                      onChange={(e) => updateContent('label', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  {['input', 'textarea', 'email', 'phone', 'url', 'number'].includes(element.type) && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Placeholder
                        </label>
                        <input
                          type="text"
                          value={element.content.placeholder || ''}
                          onChange={(e) => updateContent('placeholder', e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={element.content.required || false}
                            onChange={(e) => updateContent('required', e.target.checked)}
                            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                          />
                          Required Field
                        </label>
                      </div>
                    </>
                  )}

                  {['radio', 'select', 'multiselect'].includes(element.type) && (
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2">
                        Options
                      </label>
                      <div className="space-y-2">
                        {(element.content.options || []).map((option, index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => updateArrayContent('options', index, e.target.value)}
                              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            <button
                              onClick={() => removeArrayItem('options', index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addArrayItem('options', `Option ${(element.content.options || []).length + 1}`)}
                          className="w-full px-3 py-2 text-sm border border-dashed border-gray-300 hover:border-primary-400 text-gray-600 rounded-lg transition-colors"
                        >
                          + Add Option
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Style Properties */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Styling</h4>
            <div className="space-y-3">
              {/* Text Styling */}
              {['heading', 'text', 'button'].includes(element.type) && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Font Size
                    </label>
                    <input
                      type="text"
                      value={element.styles.fontSize || ''}
                      onChange={(e) => updateStyles('fontSize', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="16px"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Text Color
                    </label>
                    <input
                      type="color"
                      value={element.styles.color || '#000000'}
                      onChange={(e) => updateStyles('color', e.target.value)}
                      className="w-full h-10 px-1 border border-gray-300 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Text Align
                    </label>
                    <select
                      value={element.styles.textAlign || 'left'}
                      onChange={(e) => updateStyles('textAlign', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                      <option value="justify">Justify</option>
                    </select>
                  </div>
                </>
              )}

              {/* Background Color */}
              {['button', 'container'].includes(element.type) && (
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Background Color
                  </label>
                  <input
                    type="color"
                    value={element.styles.backgroundColor || '#ffffff'}
                    onChange={(e) => updateStyles('backgroundColor', e.target.value)}
                    className="w-full h-10 px-1 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>
              )}

              {/* Border Radius */}
              {['button', 'image', 'video', 'container'].includes(element.type) && (
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Border Radius
                  </label>
                  <input
                    type="text"
                    value={element.styles.borderRadius || ''}
                    onChange={(e) => updateStyles('borderRadius', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="8px"
                  />
                </div>
              )}

              {/* Padding */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Padding
                </label>
                <input
                  type="text"
                  value={element.styles.padding || ''}
                  onChange={(e) => updateStyles('padding', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="8px"
                />
              </div>

              {/* Margin */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Margin
                </label>
                <input
                  type="text"
                  value={element.styles.margin || ''}
                  onChange={(e) => updateStyles('margin', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;
