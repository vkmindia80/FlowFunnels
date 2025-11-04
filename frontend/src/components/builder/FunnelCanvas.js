import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuidv4 } from 'uuid';
import ElementRenderer from './ElementRenderer';
import { ZoomIn, ZoomOut, Maximize2, Monitor, Tablet, Smartphone, Plus, Trash2, Grid3x3, GripVertical, Copy } from 'lucide-react';

const SortableElement = ({ element, isSelected, onSelect, onDelete, onDuplicate }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative mb-2 ${isSelected ? 'ring-2 ring-primary-500 rounded-lg' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(element.id);
      }}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-8 top-0 h-full flex items-center cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical className="w-5 h-5 text-gray-400 hover:text-primary-500" />
      </div>

      {/* Element */}
      <div className="hover:outline hover:outline-2 hover:outline-primary-300 rounded-lg transition-all">
        <ElementRenderer element={element} />
      </div>

      {/* Quick Actions */}
      {isSelected && (
        <div className="absolute -top-8 right-0 flex items-center gap-1 bg-primary-600 rounded-lg px-2 py-1 shadow-lg">
          <span className="text-white text-xs font-medium mr-2">{element.type}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate(element.id);
            }}
            className="p-1 hover:bg-primary-700 rounded transition-colors"
            title="Duplicate"
          >
            <Copy className="w-3.5 h-3.5 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(element.id);
            }}
            className="p-1 hover:bg-red-600 rounded transition-colors"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

const DroppableColumn = ({ column, sectionId, rowId, onDrop, selectedElement, onSelect, onDelete, onDuplicate, onReorder }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `column-${sectionId}-${rowId}-${column.id}`,
    data: { sectionId, rowId, columnId: column.id, type: 'column' }
  });

  const elementIds = (column.elements || []).map(el => el.id);

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-h-[200px] p-4 border-2 border-dashed rounded-lg transition-all ${
        isOver ? 'border-primary-500 bg-primary-50' : 'border-gray-300 bg-gray-50/50'
      }`}
      style={{ width: `${(column.width / 12) * 100}%` }}
    >
      {column.elements && column.elements.length > 0 ? (
        <SortableContext items={elementIds} strategy={verticalListSortingStrategy}>
          <div className="space-y-2 pl-8 relative">
            {column.elements.map(element => (
              <SortableElement
                key={element.id}
                element={element}
                isSelected={selectedElement === element.id}
                onSelect={onSelect}
                onDelete={onDelete}
                onDuplicate={onDuplicate}
              />
            ))}
          </div>
        </SortableContext>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
          <div className="text-center">
            <Plus className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Drop elements here</p>
          </div>
        </div>
      )}
    </div>
  );
};

const Row = ({ row, sectionId, sections, onSectionsChange, selectedElement, onSelect }) => {
  const handleDrop = (columnId, element) => {
    const newSections = [...sections];
    const section = newSections.find(s => s.id === sectionId);
    const rowToUpdate = section.rows.find(r => r.id === row.id);
    const column = rowToUpdate.columns.find(c => c.id === columnId);
    
    if (!column.elements) {
      column.elements = [];
    }
    column.elements.push(element);
    onSectionsChange(newSections);
  };

  const handleDeleteElement = (elementId) => {
    const newSections = [...sections];
    const section = newSections.find(s => s.id === sectionId);
    const rowToUpdate = section.rows.find(r => r.id === row.id);
    
    rowToUpdate.columns.forEach(column => {
      if (column.elements) {
        column.elements = column.elements.filter(el => el.id !== elementId);
      }
    });
    
    onSectionsChange(newSections);
    onSelect(null);
  };

  const handleDuplicateElement = (elementId) => {
    const newSections = [...sections];
    const section = newSections.find(s => s.id === sectionId);
    const rowToUpdate = section.rows.find(r => r.id === row.id);
    
    rowToUpdate.columns.forEach(column => {
      if (column.elements) {
        const elementIndex = column.elements.findIndex(el => el.id === elementId);
        if (elementIndex !== -1) {
          const element = column.elements[elementIndex];
          const newElement = {
            ...element,
            id: uuidv4()
          };
          column.elements.splice(elementIndex + 1, 0, newElement);
        }
      }
    });
    
    onSectionsChange(newSections);
  };

  const handleDeleteRow = () => {
    const newSections = [...sections];
    const section = newSections.find(s => s.id === sectionId);
    section.rows = section.rows.filter(r => r.id !== row.id);
    onSectionsChange(newSections);
  };

  return (
    <div className="group relative mb-4 bg-white rounded-lg border border-gray-200 p-4">
      {/* Row Actions */}
      <div className="absolute -top-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-2 py-1 shadow-lg">
          <span className="text-xs text-gray-500">{row.columns.length} column{row.columns.length > 1 ? 's' : ''}</span>
          <button
            onClick={handleDeleteRow}
            className="p-1 hover:bg-red-50 text-red-600 rounded transition-colors"
            title="Delete Row"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        {row.columns.map(column => (
          <DroppableColumn
            key={column.id}
            column={column}
            sectionId={sectionId}
            rowId={row.id}
            onDrop={handleDrop}
            selectedElement={selectedElement}
            onSelect={onSelect}
            onDelete={handleDeleteElement}
            onDuplicate={handleDuplicateElement}
          />
        ))}
      </div>
    </div>
  );
};

const Section = ({ section, sections, onSectionsChange, selectedElement, onSelect }) => {
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  const addRow = (columnCount) => {
    const newSections = [...sections];
    const sectionToUpdate = newSections.find(s => s.id === section.id);
    
    const newRow = {
      id: uuidv4(),
      columns: Array.from({ length: columnCount }, (_, i) => ({
        id: uuidv4(),
        width: 12 / columnCount,
        elements: []
      }))
    };
    
    sectionToUpdate.rows.push(newRow);
    onSectionsChange(newSections);
    setShowColumnMenu(false);
  };

  const deleteSection = () => {
    const newSections = sections.filter(s => s.id !== section.id);
    onSectionsChange(newSections);
  };

  return (
    <div className="group relative mb-6 bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
      {/* Section Header */}
      <div className="absolute -top-4 left-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-primary-600 text-white px-3 py-1 rounded-lg text-xs font-medium shadow-lg">
          Section
        </div>
      </div>

      {/* Section Actions */}
      <div className="absolute -top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={deleteSection}
          className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-lg transition-colors shadow-lg"
          title="Delete Section"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Rows */}
      <div className="space-y-4">
        {section.rows.map(row => (
          <Row
            key={row.id}
            row={row}
            sectionId={section.id}
            sections={sections}
            onSectionsChange={onSectionsChange}
            selectedElement={selectedElement}
            onSelect={onSelect}
          />
        ))}
      </div>

      {/* Add Row Button */}
      <div className="relative mt-4">
        <button
          onClick={() => setShowColumnMenu(!showColumnMenu)}
          className="w-full py-3 border-2 border-dashed border-gray-300 hover:border-primary-400 rounded-lg text-gray-500 hover:text-primary-600 transition-all flex items-center justify-center gap-2 group/btn"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Row</span>
        </button>

        {/* Column Layout Menu */}
        {showColumnMenu && (
          <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-10">
            <p className="text-xs text-gray-500 mb-2 font-semibold">Select Column Layout</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(cols => (
                <button
                  key={cols}
                  onClick={() => addRow(cols)}
                  className="flex flex-col items-center gap-2 p-3 hover:bg-primary-50 border-2 border-gray-200 hover:border-primary-400 rounded-lg transition-all group"
                  title={`${cols} Column${cols > 1 ? 's' : ''}`}
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: cols }).map((_, i) => (
                      <div key={i} className="w-3 h-8 bg-gray-300 group-hover:bg-primary-400 rounded-sm" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 group-hover:text-primary-600 font-medium">{cols} col</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FunnelCanvas = ({ sections, onSectionsChange, selectedElement, setSelectedElement, draggedElement }) => {
  const [zoom, setZoom] = useState(100);
  const [viewMode, setViewMode] = useState('desktop');
  const [showGrid, setShowGrid] = useState(false);

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

  const handleCanvasClick = (e) => {
    if (e.target.id === 'canvas-drop-zone' || e.target.classList.contains('canvas-background')) {
      setSelectedElement(null);
    }
  };

  const addSection = () => {
    const newSection = {
      id: uuidv4(),
      rows: [{
        id: uuidv4(),
        columns: [{
          id: uuidv4(),
          width: 12,
          elements: []
        }]
      }]
    };
    onSectionsChange([...sections, newSection]);
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
          <div className="p-8">
            {sections.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Start Building Your Page</h3>
                <p className="text-gray-500 mb-6">Add a section to begin building your funnel page</p>
                <button
                  onClick={addSection}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl transition-all shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5 font-semibold"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add First Section
                </button>
              </div>
            ) : (
              <>
                {sections.map(section => (
                  <Section
                    key={section.id}
                    section={section}
                    sections={sections}
                    onSectionsChange={onSectionsChange}
                    selectedElement={selectedElement}
                    onSelect={setSelectedElement}
                  />
                ))}
                
                {/* Add Section Button */}
                <button
                  onClick={addSection}
                  className="w-full py-4 border-2 border-dashed border-gray-300 hover:border-primary-400 rounded-xl text-gray-500 hover:text-primary-600 transition-all flex items-center justify-center gap-2 bg-white hover:bg-primary-50 group"
                >
                  <Plus className="w-6 h-6" />
                  <span className="font-semibold text-lg">Add Section</span>
                </button>
              </>
            )}

            {draggedElement && (
              <div className="fixed inset-0 bg-primary-50 bg-opacity-30 border-4 border-dashed border-primary-400 rounded-lg flex items-center justify-center pointer-events-none z-50">
                <div className="bg-white rounded-xl shadow-2xl p-6 border-2 border-primary-500">
                  <p className="text-primary-600 font-bold text-lg">Drop into a column to add {draggedElement}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunnelCanvas;
