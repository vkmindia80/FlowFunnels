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