import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Type, MousePointerClick, Image, Video, Square, AlignLeft, CheckSquare, Minus, Box, Circle, List, ListOrdered, Calendar, Clock, Upload, Mail, Phone, Link2, Hash, SlidersHorizontal, ToggleLeft, Star, TrendingUp, Package, Search } from 'lucide-react';

const DraggableElement = ({ id, icon: Icon, label, description, color }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `library-${id}`
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`group p-3 bg-white border-2 border-gray-200 rounded-xl hover:border-${color}-400 hover:shadow-md transition-all cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-50 scale-95' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-800 text-sm mb-0.5">{label}</h4>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

const ElementLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const elements = [
    // Content Elements
    {
      id: 'heading',
      icon: Type,
      label: 'Heading',
      description: 'Large title text',
      color: 'primary',
      category: 'content'
    },
    {
      id: 'text',
      icon: AlignLeft,
      label: 'Text',
      description: 'Paragraph content',
      color: 'primary',
      category: 'content'
    },
    {
      id: 'button',
      icon: MousePointerClick,
      label: 'Button',
      description: 'Call-to-action',
      color: 'blue',
      category: 'content'
    },
    {
      id: 'image',
      icon: Image,
      label: 'Image',
      description: 'Upload or link',
      color: 'green',
      category: 'media'
    },
    {
      id: 'video',
      icon: Video,
      label: 'Video',
      description: 'YouTube/Vimeo',
      color: 'red',
      category: 'media'
    },
    // Basic Form Elements
    {
      id: 'input',
      icon: Square,
      label: 'Text Input',
      description: 'Single line field',
      color: 'purple',
      category: 'form'
    },
    {
      id: 'textarea',
      icon: Square,
      label: 'Text Area',
      description: 'Multi-line field',
      color: 'purple',
      category: 'form'
    },
    {
      id: 'email',
      icon: Mail,
      label: 'Email Input',
      description: 'Email address',
      color: 'purple',
      category: 'form'
    },
    {
      id: 'phone',
      icon: Phone,
      label: 'Phone Input',
      description: 'Phone number',
      color: 'purple',
      category: 'form'
    },
    {
      id: 'url',
      icon: Link2,
      label: 'URL Input',
      description: 'Website address',
      color: 'purple',
      category: 'form'
    },
    {
      id: 'number',
      icon: Hash,
      label: 'Number Input',
      description: 'Numeric value',
      color: 'purple',
      category: 'form'
    },
    // Selection Elements
    {
      id: 'checkbox',
      icon: CheckSquare,
      label: 'Checkbox',
      description: 'Yes/No option',
      color: 'indigo',
      category: 'form'
    },
    {
      id: 'radio',
      icon: Circle,
      label: 'Radio Buttons',
      description: 'Single choice',
      color: 'indigo',
      category: 'form'
    },
    {
      id: 'select',
      icon: List,
      label: 'Dropdown',
      description: 'Select menu',
      color: 'indigo',
      category: 'form'
    },
    {
      id: 'multiselect',
      icon: ListOrdered,
      label: 'Multi-Select',
      description: 'Multiple choices',
      color: 'indigo',
      category: 'form'
    },
    {
      id: 'toggle',
      icon: ToggleLeft,
      label: 'Toggle Switch',
      description: 'On/Off switch',
      color: 'indigo',
      category: 'form'
    },
    // Date & Time
    {
      id: 'date',
      icon: Calendar,
      label: 'Date Picker',
      description: 'Select date',
      color: 'pink',
      category: 'form'
    },
    {
      id: 'time',
      icon: Clock,
      label: 'Time Picker',
      description: 'Select time',
      color: 'pink',
      category: 'form'
    },
    // Advanced Elements
    {
      id: 'file',
      icon: Upload,
      label: 'File Upload',
      description: 'Upload files',
      color: 'orange',
      category: 'form'
    },
    {
      id: 'range',
      icon: SlidersHorizontal,
      label: 'Range Slider',
      description: 'Slide to select',
      color: 'cyan',
      category: 'form'
    },
    {
      id: 'rating',
      icon: Star,
      label: 'Star Rating',
      description: 'Rate with stars',
      color: 'yellow',
      category: 'form'
    },
    {
      id: 'progress',
      icon: TrendingUp,
      label: 'Progress Bar',
      description: 'Show progress',
      color: 'emerald',
      category: 'layout'
    },
    // Layout Elements
    {
      id: 'container',
      icon: Package,
      label: 'Container',
      description: 'Group elements',
      color: 'slate',
      category: 'layout'
    },
    {
      id: 'divider',
      icon: Minus,
      label: 'Divider',
      description: 'Horizontal line',
      color: 'gray',
      category: 'layout'
    },
    {
      id: 'spacer',
      icon: Box,
      label: 'Spacer',
      description: 'Vertical space',
      color: 'gray',
      category: 'layout'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Elements' },
    { id: 'content', label: 'Content' },
    { id: 'form', label: 'Form' },
    { id: 'media', label: 'Media' },
    { id: 'layout', label: 'Layout' }
  ];

  const filteredElements = elements.filter(element => {
    const matchesSearch = element.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         element.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || element.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <h3 className="font-bold text-gray-800 mb-1">Elements</h3>
        <p className="text-xs text-gray-500">Drag to canvas to add</p>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-200 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search elements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="p-2 border-b border-gray-200 bg-white flex gap-1 overflow-x-auto">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeCategory === category.id
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Elements List */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-2">
          {filteredElements.length > 0 ? (
            filteredElements.map((element) => (
              <DraggableElement key={element.id} {...element} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-400 text-sm">
              No elements found
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="p-3 border-t border-gray-200 bg-white">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-800 font-medium mb-1">💡 Quick Tip</p>
          <p className="text-xs text-blue-700">Click elements on canvas to edit. Press Delete to remove.</p>
        </div>
      </div>
    </div>
  );
};

export default ElementLibrary;