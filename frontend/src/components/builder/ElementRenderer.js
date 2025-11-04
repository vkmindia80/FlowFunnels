import React from 'react';

const ElementRenderer = ({ element }) => {
  const { type, styles, content, size } = element;

  const renderElement = () => {
    switch (type) {
      case 'text':
        return (
          <div
            style={{
              ...styles,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              padding: '8px'
            }}
          >
            {content.tag === 'h1' && (
              <h1 style={{ margin: 0, fontSize: styles.fontSize }}>{content.text}</h1>
            )}
            {content.tag === 'h2' && (
              <h2 style={{ margin: 0, fontSize: styles.fontSize }}>{content.text}</h2>
            )}
            {content.tag === 'h3' && (
              <h3 style={{ margin: 0, fontSize: styles.fontSize }}>{content.text}</h3>
            )}
            {content.tag === 'p' && (
              <p style={{ margin: 0, fontSize: styles.fontSize }}>{content.text}</p>
            )}
          </div>
        );

      case 'button':
        return (
          <button
            style={{
              ...styles,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
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
              height: '100%'
            }}
          />
        );

      case 'form':
        return (
          <div
            style={{
              ...styles,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {content.fields?.map((field, index) => (
              <input
                key={index}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                style={{
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            ))}
            <button
              style={{
                padding: '10px 16px',
                backgroundColor: '#0ea5e9',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {content.submitText}
            </button>
          </div>
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
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Unknown element</p>
          </div>
        );
    }
  };

  return <div className="w-full h-full">{renderElement()}</div>;
};

export default ElementRenderer;