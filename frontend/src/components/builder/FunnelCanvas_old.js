import React, { useState } from 'react';
import { DndContext, useSensor, useSensors, PointerSensor, useDroppable } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import ElementRenderer from './ElementRenderer';
import { ZoomIn, ZoomOut, Maximize2, Monitor, Tablet, Smartphone, Copy, Trash2, Grid3x3 } from 'lucide-react';

const FunnelCanvas = ({ elements, onElementsChange, selectedElement, setSelectedElement }) => {
  const [zoom, setZoom] = useState(100);
  const [viewMode, setViewMode] = useState('desktop');
  const [draggedElement, setDraggedElement] = useState(null);
  const [showGrid, setShowGrid] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-droppable',
  });

  const getCanvasWidth = () => {
    switch (viewMode) {
      case 'mobile': return 375;
      case 'tablet': return 768;
      case 'desktop': return 1280;
      default: return 1280;
    }
  };

  const getDefaultSize = (type) => {
    switch (type) {
      case 'heading': return { width: 600, height: 80 };
      case 'text': return { width: 500, height: 60 };
      case 'button': return { width: 200, height: 50 };
      case 'image': return { width: 400, height: 300 };
      case 'video': return { width: 560, height: 315 };
      case 'input': return { width: 400, height: 50 };
      case 'textarea': return { width: 400, height: 120 };
      case 'email': return { width: 400, height: 50 };
      case 'phone': return { width: 400, height: 50 };
      case 'url': return { width: 400, height: 50 };
      case 'number': return { width: 400, height: 50 };
      case 'checkbox': return { width: 300, height: 40 };
      case 'radio': return { width: 300, height: 120 };
      case 'select': return { width: 400, height: 50 };
      case 'multiselect': return { width: 400, height: 120 };
      case 'toggle': return { width: 300, height: 40 };
      case 'date': return { width: 400, height: 50 };
      case 'time': return { width: 400, height: 50 };
      case 'file': return { width: 400, height: 50 };
      case 'range': return { width: 400, height: 60 };
      case 'rating': return { width: 300, height: 60 };
      case 'progress': return { width: 500, height: 60 };
      case 'container': return { width: 600, height: 300 };
      case 'divider': return { width: 600, height: 2 };
      case 'spacer': return { width: 600, height: 40 };
      default: return { width: 200, height: 100 };
    }
  };

  const getDefaultStyles = (type) => {
    const common = { display: 'flex', alignItems: 'center', justifyContent: 'center' };
    
    switch (type) {
      case 'heading':
        return {
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#1f2937',
          textAlign: 'center',
          lineHeight: '1.2',
          ...common
        };
      case 'text':
        return {
          fontSize: '16px',
          fontWeight: 'normal',
          color: '#4b5563',
          textAlign: 'left',
          lineHeight: '1.6',
          padding: '8px'
        };
      case 'button':
        return {
          backgroundColor: '#0ea5e9',
          color: '#ffffff',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          border: 'none',
          cursor: 'pointer',
          ...common
        };
      case 'image':
        return {
          borderRadius: '8px',
          objectFit: 'cover'
        };
      case 'video':
        return {
          borderRadius: '8px'
        };
      case 'input':
      case 'textarea':
      case 'email':
      case 'phone':
      case 'url':
      case 'number':
      case 'select':
      case 'multiselect':
      case 'date':
      case 'time':
      case 'file':
        return {
          padding: '12px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '14px',
          backgroundColor: '#ffffff'
        };
      case 'checkbox':
      case 'radio':
      case 'toggle':
        return {
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px'
        };
      case 'range':
        return {
          padding: '8px'
        };
      case 'rating':
        return {
          padding: '8px'
        };
      case 'progress':
        return {
          padding: '8px'
        };
      case 'container':
        return {
          backgroundColor: '#f9fafb',
          padding: '20px',
          borderRadius: '8px'
        };
      case 'divider':
        return {
          backgroundColor: '#e5e7eb',
          height: '2px',
          width: '100%'
        };
      case 'spacer':
        return {
          backgroundColor: 'transparent'
        };
      default:
        return {};
    }
  };

  const getDefaultContent = (type) => {
    switch (type) {
      case 'heading':
        return { text: 'Your Headline Here' };
      case 'text':
        return { text: 'Add your text content here. You can edit this in the properties panel.' };
      case 'button':
        return { text: 'Click Me', url: '#' };
      case 'image':
        return { src: 'https://via.placeholder.com/400x300', alt: 'Image' };
      case 'video':
        return { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' };
      case 'input':
        return { type: 'text', placeholder: 'Enter text', label: 'Text Input', required: false };
      case 'textarea':
        return { placeholder: 'Enter your message', label: 'Message', required: false };
      case 'email':
        return { placeholder: 'your@email.com', label: 'Email Address', required: false };
      case 'phone':
        return { placeholder: '+1 (555) 000-0000', label: 'Phone Number', required: false };
      case 'url':
        return { placeholder: 'https://example.com', label: 'Website URL', required: false };
      case 'number':
        return { placeholder: '0', label: 'Number', min: 0, max: 100, step: 1, required: false };
      case 'checkbox':
        return { label: 'I agree to the terms and conditions', checked: false };
      case 'radio':
        return { label: 'Choose one option', options: ['Option 1', 'Option 2', 'Option 3'] };
      case 'select':
        return { label: 'Select an option', options: ['Option 1', 'Option 2', 'Option 3'] };
      case 'multiselect':
        return { label: 'Select multiple', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'] };
      case 'toggle':
        return { label: 'Enable feature', checked: false };
      case 'date':
        return { label: 'Select date' };
      case 'time':
        return { label: 'Select time' };
      case 'file':
        return { label: 'Upload file', accept: '*' };
      case 'range':
        return { label: 'Select value', min: 0, max: 100, value: 50 };
      case 'rating':
        return { label: 'Rate this', maxRating: 5, rating: 0 };
      case 'progress':
        return { label: 'Progress', value: 50 };
      case 'container':
        return { text: 'Container Section' };
      case 'divider':
        return {};
      case 'spacer':
        return { height: '40px' };
      default:
        return {};
    }
  };

  const handleDragStart = (event) => {
    const { active } = event;
    if (active.id.startsWith('library-')) {
      const elementType = active.id.replace('library-', '');
      setDraggedElement(elementType);
    }
  };

  const handleDragEnd = (event) => {
    const { over } = event;
    
    if (over && over.id === 'canvas-droppable' && draggedElement) {
      const canvasElement = document.getElementById('canvas-drop-zone');
      const rect = canvasElement.getBoundingClientRect();
      const x = event.activatorEvent.clientX - rect.left;
      const y = event.activatorEvent.clientY - rect.top;

      const newElement = {
        id: uuidv4(),
        type: draggedElement,
        position: { x: Math.max(20, x - 100), y: Math.max(20, y - 25) },
        size: getDefaultSize(draggedElement),
        styles: getDefaultStyles(draggedElement),
        content: getDefaultContent(draggedElement)
      };

      onElementsChange([...elements, newElement]);
      setSelectedElement(newElement.id);
    }
    
    setDraggedElement(null);
  };

  const handleCanvasClick = (e) => {
    if (e.target.id === 'canvas-drop-zone' || e.target.classList.contains('canvas-background')) {
      setSelectedElement(null);
    }
  };

  const handleElementClick = (elementId, e) => {
    e.stopPropagation();
    setSelectedElement(elementId);
  };

  const duplicateElement = () => {
    if (!selectedElement) return;
    
    const element = elements.find(el => el.id === selectedElement);
    if (element) {
      const newElement = {
        ...element,
        id: uuidv4(),
        position: { x: element.position.x + 20, y: element.position.y + 20 }
      };
      onElementsChange([...elements, newElement]);
      setSelectedElement(newElement.id);
    }
  };

  const deleteElement = () => {
    if (!selectedElement) return;
    onElementsChange(elements.filter(el => el.id !== selectedElement));
    setSelectedElement(null);
  };

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Delete' && selectedElement) {
        deleteElement();
      }
      if (e.key === 'd' && (e.ctrlKey || e.metaKey) && selectedElement) {
        e.preventDefault();
        duplicateElement();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElement, elements]);

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('desktop')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'desktop' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Desktop View"
          >
            <Monitor className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('tablet')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'tablet' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Tablet View"
          >
            <Tablet className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'mobile' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-2" />

          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-2 rounded-lg transition-colors ${
              showGrid ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Toggle Grid"
          >
            <Grid3x3 className="w-5 h-5" />
          </button>

          {selectedElement && (
            <>
              <div className="w-px h-6 bg-gray-300 mx-2" />
              <button
                onClick={duplicateElement}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Duplicate (Ctrl/Cmd+D)"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button
                onClick={deleteElement}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete (Del)"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
            <button
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              className="p-1 hover:bg-white rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4 text-gray-600" />
            </button>
            <span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(200, zoom + 10))}
              className="p-1 hover:bg-white rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => setZoom(100)}
              className="p-1 hover:bg-white rounded transition-colors ml-1"
              title="Reset Zoom"
            >
              <Maximize2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-auto p-8" onClick={handleCanvasClick}>
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div
            ref={setNodeRef}
            id="canvas-drop-zone"
            className={`canvas-background mx-auto bg-white rounded-lg shadow-lg relative ${
              isOver && draggedElement ? 'ring-4 ring-primary-300 ring-opacity-50' : ''
            }`}
            style={{
              width: `${getCanvasWidth()}px`,
              minHeight: '1000px',
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
              transition: 'transform 0.2s',
              backgroundImage: showGrid ? 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)' : 'none',
              backgroundSize: showGrid ? '20px 20px' : 'auto'
            }}
          >
            {elements.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center text-gray-400">
                  <p className="text-lg font-medium mb-2">Drop elements here</p>
                  <p className="text-sm">Drag elements from the left sidebar to start building</p>
                </div>
              </div>
            )}

            {draggedElement && (
              <div className="absolute inset-0 bg-primary-50 bg-opacity-20 border-2 border-dashed border-primary-400 rounded-lg flex items-center justify-center pointer-events-none">
                <p className="text-primary-600 font-medium">Drop to add {draggedElement}</p>
              </div>
            )}

            {elements.map((element) => (
              <div
                key={element.id}
                onClick={(e) => handleElementClick(element.id, e)}
                className={`absolute cursor-move hover:ring-2 hover:ring-primary-300 transition-all ${
                  selectedElement === element.id ? 'ring-2 ring-primary-500' : ''
                }`}
                style={{
                  left: `${element.position.x}px`,
                  top: `${element.position.y}px`,
                  width: `${element.size.width}px`,
                  height: `${element.size.height}px`,
                  zIndex: selectedElement === element.id ? 10 : 1
                }}
              >
                <ElementRenderer element={element} />
                {selectedElement === element.id && (
                  <div className="absolute -top-6 left-0 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                    {element.type}
                  </div>
                )}
              </div>
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
};

export default FunnelCanvas;