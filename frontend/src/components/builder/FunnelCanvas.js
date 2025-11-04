import React, { useState, useCallback } from 'react';
import { DndContext, useSensor, useSensors, PointerSensor, DragOverlay } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import ElementRenderer from './ElementRenderer';
import { ZoomIn, ZoomOut, Maximize2, Monitor, Tablet, Smartphone } from 'lucide-react';

const FunnelCanvas = ({ elements, onElementsChange, selectedElement, setSelectedElement }) => {
  const [zoom, setZoom] = useState(100);
  const [viewMode, setViewMode] = useState('desktop'); // desktop, tablet, mobile
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const getCanvasWidth = () => {
    switch (viewMode) {
      case 'mobile': return 375;
      case 'tablet': return 768;
      case 'desktop': return 1280;
      default: return 1280;
    }
  };

  const handleDragEnd = useCallback((event) => {
    const { active, delta, over } = event;
    setActiveId(null);

    if (!over) return;

    // If dropping a new element from library
    if (active.id.startsWith('library-')) {
      const elementType = active.id.replace('library-', '');
      const canvasRect = document.getElementById('canvas-drop-zone').getBoundingClientRect();
      const dropX = event.activatorEvent.clientX - canvasRect.left;
      const dropY = event.activatorEvent.clientY - canvasRect.top;

      const newElement = {
        id: uuidv4(),
        type: elementType,
        position: { x: Math.max(0, dropX - 50), y: Math.max(0, dropY - 25) },
        size: getDefaultSize(elementType),
        styles: getDefaultStyles(elementType),
        content: getDefaultContent(elementType)
      };

      onElementsChange([...elements, newElement]);
      setSelectedElement(newElement.id);
    } else {
      // Moving existing element
      const elementIndex = elements.findIndex(el => el.id === active.id);
      if (elementIndex === -1) return;

      const updatedElements = [...elements];
      updatedElements[elementIndex] = {
        ...updatedElements[elementIndex],
        position: {
          x: updatedElements[elementIndex].position.x + delta.x,
          y: updatedElements[elementIndex].position.y + delta.y
        }
      };

      onElementsChange(updatedElements);
    }
  }, [elements, onElementsChange, setSelectedElement]);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const getDefaultSize = (type) => {
    switch (type) {
      case 'text': return { width: 400, height: 60 };
      case 'button': return { width: 200, height: 50 };
      case 'image': return { width: 300, height: 200 };
      case 'form': return { width: 400, height: 250 };
      case 'video': return { width: 560, height: 315 };
      default: return { width: 200, height: 100 };
    }
  };

  const getDefaultStyles = (type) => {
    switch (type) {
      case 'text':
        return {
          fontSize: '24px',
          fontWeight: '600',
          color: '#1f2937',
          textAlign: 'left',
          lineHeight: '1.5'
        };
      case 'button':
        return {
          backgroundColor: '#0ea5e9',
          color: '#ffffff',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          border: 'none',
          cursor: 'pointer'
        };
      case 'image':
        return {
          borderRadius: '8px',
          objectFit: 'cover'
        };
      case 'form':
        return {
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)'
        };
      case 'video':
        return {
          borderRadius: '8px'
        };
      default:
        return {};
    }
  };

  const getDefaultContent = (type) => {
    switch (type) {
      case 'text':
        return { text: 'Your headline here', tag: 'h2' };
      case 'button':
        return { text: 'Click Me', url: '#' };
      case 'image':
        return { src: 'https://via.placeholder.com/300x200', alt: 'Image' };
      case 'form':
        return {
          fields: [
            { type: 'text', placeholder: 'Name', required: true },
            { type: 'email', placeholder: 'Email', required: true }
          ],
          submitText: 'Submit'
        };
      case 'video':
        return { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' };
      default:
        return {};
    }
  };

  const handleCanvasClick = (e) => {
    if (e.target.id === 'canvas-drop-zone' || e.target.closest('.canvas-background')) {
      setSelectedElement(null);
    }
  };

  const handleElementClick = (elementId, e) => {
    e.stopPropagation();
    setSelectedElement(elementId);
  };

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
              title="Fit to Screen"
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
            id="canvas-drop-zone"
            className="canvas-background mx-auto bg-white rounded-lg shadow-lg relative"
            style={{
              width: `${getCanvasWidth()}px`,
              minHeight: '800px',
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
              transition: 'transform 0.2s'
            }}
          >
            {elements.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <p className="text-lg font-medium mb-2">Drop elements here</p>
                  <p className="text-sm">Drag elements from the left sidebar to start building</p>
                </div>
              </div>
            )}

            {elements.map((element) => (
              <div
                key={element.id}
                onClick={(e) => handleElementClick(element.id, e)}
                className={`absolute cursor-move ${
                  selectedElement === element.id ? 'ring-2 ring-primary-500 ring-offset-2' : ''
                }`}
                style={{
                  left: `${element.position.x}px`,
                  top: `${element.position.y}px`,
                  width: `${element.size.width}px`,
                  height: `${element.size.height}px`
                }}
              >
                <ElementRenderer element={element} />
              </div>
            ))}
          </div>

          <DragOverlay>
            {activeId && activeId.startsWith('library-') ? (
              <div className="bg-white rounded-lg shadow-lg p-4 opacity-80">
                Dropping {activeId.replace('library-', '')}...
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default FunnelCanvas;