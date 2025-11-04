import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Type, MousePointerClick, Image, Video, Square, AlignLeft, CheckSquare, Minus, Box } from 'lucide-react';

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
  const elements = [
    {
      id: 'heading',
      icon: Type,
      label: 'Heading',
      description: 'Large title text',
      color: 'primary'
    },
    {
      id: 'text',
      icon: AlignLeft,
      label: 'Text',
      description: 'Paragraph content',
      color: 'primary'
    },
    {
      id: 'button',
      icon: MousePointerClick,
      label: 'Button',
      description: 'Call-to-action',
      color: 'blue'
    },
    {
      id: 'image',
      icon: Image,
      label: 'Image',
      description: 'Upload or link',
      color: 'green'
    },
    {
      id: 'video',
      icon: Video,
      label: 'Video',
      description: 'YouTube/Vimeo',
      color: 'red'
    },
    {
      id: 'input',
      icon: Square,
      label: 'Text Input',
      description: 'Single line field',
      color: 'purple'
    },
    {
      id: 'textarea',
      icon: Square,
      label: 'Text Area',
      description: 'Multi-line field',
      color: 'purple'
    },
    {
      id: 'checkbox',
      icon: CheckSquare,
      label: 'Checkbox',
      description: 'Yes/No option',
      color: 'indigo'
    },
    {
      id: 'divider',
      icon: Minus,
      label: 'Divider',
      description: 'Horizontal line',
      color: 'gray'
    },
    {
      id: 'spacer',
      icon: Box,
      label: 'Spacer',
      description: 'Vertical space',
      color: 'gray'
    }
  ];

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <h3 className="font-bold text-gray-800 mb-1">Elements</h3>
        <p className="text-xs text-gray-500">Drag to canvas to add</p>
      </div>

      {/* Elements List */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-2">
          {elements.map((element) => (
            <DraggableElement key={element.id} {...element} />
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="p-3 border-t border-gray-200 bg-white">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-800 font-medium mb-1">💡 Quick Tip</p>
          <p className="text-xs text-blue-700">Click elements on canvas to edit their properties</p>
        </div>
      </div>
    </div>
  );
};

export default ElementLibrary;