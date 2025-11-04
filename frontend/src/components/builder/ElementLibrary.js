import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Type, MousePointerClick, Image, Mail, Video, Layers } from 'lucide-react';

const DraggableElement = ({ id, icon: Icon, label, description }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `library-${id}`
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`group p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-400 hover:shadow-md transition-all cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-800 mb-1">{label}</h4>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

const ElementLibrary = () => {
  const elements = [
    {
      id: 'text',
      icon: Type,
      label: 'Text',
      description: 'Headings and paragraphs'
    },
    {
      id: 'button',
      icon: MousePointerClick,
      label: 'Button',
      description: 'Call-to-action button'
    },
    {
      id: 'image',
      icon: Image,
      label: 'Image',
      description: 'Upload or link image'
    },
    {
      id: 'form',
      icon: Mail,
      label: 'Form',
      description: 'Lead capture form'
    },
    {
      id: 'video',
      icon: Video,
      label: 'Video',
      description: 'YouTube or Vimeo embed'
    }
  ];

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="w-5 h-5 text-primary-600" />
          <h3 className="font-bold text-gray-800">Elements</h3>
        </div>
        <p className="text-xs text-gray-500">Drag elements to the canvas</p>
      </div>

      {/* Elements List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {elements.map((element) => (
            <DraggableElement key={element.id} {...element} />
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
          <p className="text-xs text-primary-800 font-medium mb-1">💡 Quick Tip</p>
          <p className="text-xs text-primary-700">Click on elements in the canvas to edit their properties</p>
        </div>
      </div>
    </div>
  );
};

export default ElementLibrary;