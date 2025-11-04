import React from 'react';

const ElementRenderer = ({ element }) => {
  const { type, styles, content } = element;

  const renderElement = () => {
    switch (type) {
      case 'heading':
        return (
          <div style={{ ...styles, width: '100%', height: '100%', padding: '8px' }}>
            <h1 style={{ margin: 0, fontSize: styles.fontSize, fontWeight: styles.fontWeight, color: styles.color, textAlign: styles.textAlign }}>
              {content.text}
            </h1>
          </div>
        );

      case 'text':
        return (
          <div style={{ ...styles, width: '100%', height: '100%' }}>
            <p style={{ margin: 0, fontSize: styles.fontSize, color: styles.color, lineHeight: styles.lineHeight }}>
              {content.text}
            </p>
          </div>
        );

      case 'button':
        return (
          <button
            style={{
              ...styles,
              width: '100%',
              height: '100%'
            }}
          >
            {content.text}
          </button>
        );

      case 'image':
        return (
          <img
            src={content.src}
            alt={content.alt}
            style={{
              ...styles,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        );

      case 'video':
        return (
          <iframe
            src={content.url}
            style={{
              ...styles,
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );

      case 'input':
        return (
          <div style={{ width: '100%', height: '100%' }}>
            {content.label && (
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                {content.label}
              </label>
            )}
            <input
              type={content.type || 'text'}
              placeholder={content.placeholder}
              required={content.required}
              style={{
                ...styles,
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>
        );

      case 'textarea':
        return (
          <div style={{ width: '100%', height: '100%' }}>
            {content.label && (
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                {content.label}
              </label>
            )}
            <textarea
              placeholder={content.placeholder}
              required={content.required}
              style={{
                ...styles,
                width: '100%',
                height: content.label ? 'calc(100% - 30px)' : '100%',
                resize: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        );

      case 'checkbox':
        return (
          <div style={{ ...styles, width: '100%', height: '100%' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={content.checked}
                readOnly
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span style={{ fontSize: styles.fontSize || '14px', color: styles.color || '#374151' }}>
                {content.label}
              </span>
            </label>
          </div>
        );

      case 'radio':
        return (
          <div style={{ ...styles, width: '100%', height: '100%' }}>
            <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
              {content.label}
            </div>
            {(content.options || []).map((option, index) => (
              <label key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name={element.id}
                  value={option}
                  readOnly
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '14px', color: '#374151' }}>{option}</span>
              </label>
            ))}
          </div>
        );

      case 'select':
        return (
          <div style={{ width: '100%', height: '100%' }}>
            {content.label && (
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                {content.label}
              </label>
            )}
            <select
              style={{
                ...styles,
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              {(content.options || []).map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );

      case 'multiselect':
        return (
          <div style={{ width: '100%', height: '100%' }}>
            {content.label && (
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                {content.label}
              </label>
            )}
            <select
              multiple
              style={{
                ...styles,
                width: '100%',
                height: content.label ? 'calc(100% - 30px)' : '100%',
                boxSizing: 'border-box'
              }}
            >
              {(content.options || []).map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );

      case 'date':
        return (
          <div style={{ width: '100%', height: '100%' }}>
            {content.label && (
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                {content.label}
              </label>
            )}
            <input
              type="date"
              style={{
                ...styles,
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>
        );

      case 'time':
        return (
          <div style={{ width: '100%', height: '100%' }}>
            {content.label && (
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                {content.label}
              </label>
            )}
            <input
              type="time"
              style={{
                ...styles,
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>
        );

      case 'file':
        return (
          <div style={{ width: '100%', height: '100%' }}>
            {content.label && (
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                {content.label}
              </label>
            )}
            <input
              type="file"
              accept={content.accept}
              style={{
                ...styles,
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>
        );

      case 'email':
        return (
          <div style={{ width: '100%', height: '100%' }}>
            {content.label && (
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                {content.label}
              </label>
            )}
            <input
              type="email"
              placeholder={content.placeholder}
              required={content.required}
              style={{
                ...styles,
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>
        );

      case 'phone':
        return (
          <div style={{ width: '100%', height: '100%' }}>
            {content.label && (
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                {content.label}
              </label>
            )}
            <input
              type="tel"
              placeholder={content.placeholder}
              required={content.required}
              style={{
                ...styles,
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>
        );

      case 'url':
        return (
          <div style={{ width: '100%', height: '100%' }}>
            {content.label && (
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                {content.label}
              </label>
            )}
            <input
              type="url"
              placeholder={content.placeholder}
              required={content.required}
              style={{
                ...styles,
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>
        );

      case 'number':
        return (
          <div style={{ width: '100%', height: '100%' }}>
            {content.label && (
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                {content.label}
              </label>
            )}
            <input
              type="number"
              placeholder={content.placeholder}
              min={content.min}
              max={content.max}
              step={content.step}
              required={content.required}
              style={{
                ...styles,
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>
        );

      case 'range':
        return (
          <div style={{ width: '100%', height: '100%' }}>
            {content.label && (
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                {content.label}: {content.value || content.min || 0}
              </label>
            )}
            <input
              type="range"
              min={content.min || 0}
              max={content.max || 100}
              value={content.value || 50}
              readOnly
              style={{
                ...styles,
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>
        );

      case 'toggle':
        return (
          <div style={{ ...styles, width: '100%', height: '100%' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <div style={{
                width: '48px',
                height: '24px',
                backgroundColor: content.checked ? '#0ea5e9' : '#d1d5db',
                borderRadius: '12px',
                position: 'relative',
                transition: 'background-color 0.3s'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#ffffff',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  left: content.checked ? '26px' : '2px',
                  transition: 'left 0.3s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }} />
              </div>
              <span style={{ fontSize: styles.fontSize || '14px', color: styles.color || '#374151' }}>
                {content.label}
              </span>
            </label>
          </div>
        );

      case 'rating':
        return (
          <div style={{ ...styles, width: '100%', height: '100%' }}>
            {content.label && (
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                {content.label}
              </label>
            )}
            <div style={{ display: 'flex', gap: '4px' }}>
              {[...Array(content.maxRating || 5)].map((_, index) => (
                <span key={index} style={{
                  fontSize: '24px',
                  color: index < (content.rating || 0) ? '#fbbf24' : '#d1d5db',
                  cursor: 'pointer'
                }}>
                  ★
                </span>
              ))}
            </div>
          </div>
        );

      case 'progress':
        return (
          <div style={{ ...styles, width: '100%', height: '100%' }}>
            {content.label && (
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                {content.label}: {content.value || 0}%
              </label>
            )}
            <div style={{
              width: '100%',
              height: '20px',
              backgroundColor: '#e5e7eb',
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${content.value || 0}%`,
                height: '100%',
                backgroundColor: '#0ea5e9',
                transition: 'width 0.3s'
              }} />
            </div>
          </div>
        );

      case 'container':
        return (
          <div style={{
            ...styles,
            width: '100%',
            height: '100%',
            border: '2px dashed #d1d5db',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}>
            <p style={{ color: '#9ca3af', fontSize: '14px', textAlign: 'center' }}>
              {content.text || 'Container - Drag elements here'}
            </p>
          </div>
        );

      case 'divider':
        return (
          <div
            style={{
              ...styles,
              width: '100%',
              height: '100%'
            }}
          />
        );

      case 'spacer':
        return (
          <div
            style={{
              ...styles,
              width: '100%',
              height: content.height || '40px',
              backgroundColor: 'transparent'
            }}
          />
        );

      default:
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f3f4f6',
              borderRadius: '8px'
            }}
          >
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Unknown: {type}</p>
          </div>
        );
    }
  };

  return <div className="w-full h-full pointer-events-none">{renderElement()}</div>;
};

export default ElementRenderer;