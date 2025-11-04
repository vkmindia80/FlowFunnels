export const getDefaultSize = (type) => {
  switch (type) {
    case 'heading': return { width: 'auto', height: 'auto' };
    case 'text': return { width: 'auto', height: 'auto' };
    case 'button': return { width: 'auto', height: 'auto' };
    case 'image': return { width: '100%', height: '300px' };
    case 'video': return { width: '100%', height: '315px' };
    case 'input':
    case 'textarea':
    case 'email':
    case 'phone':
    case 'url':
    case 'number':
    case 'checkbox':
    case 'radio':
    case 'select':
    case 'multiselect':
    case 'toggle':
    case 'date':
    case 'time':
    case 'file':
    case 'range':
    case 'rating':
    case 'progress':
      return { width: '100%', height: 'auto' };
    case 'container': return { width: '100%', height: 'auto' };
    case 'divider': return { width: '100%', height: '2px' };
    case 'spacer': return { width: '100%', height: '40px' };
    default: return { width: '100%', height: 'auto' };
  }
};

export const getDefaultStyles = (type) => {
  const common = { display: 'block' };
  
  switch (type) {
    case 'heading':
      return {
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#1f2937',
        textAlign: 'center',
        lineHeight: '1.2',
        padding: '16px',
        margin: '0'
      };
    case 'text':
      return {
        fontSize: '16px',
        fontWeight: 'normal',
        color: '#4b5563',
        textAlign: 'left',
        lineHeight: '1.6',
        padding: '8px',
        margin: '0'
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
        padding: '12px 24px',
        display: 'inline-block',
        textAlign: 'center',
        margin: '8px auto',
        width: 'auto'
      };
    case 'image':
      return {
        borderRadius: '8px',
        width: '100%',
        height: 'auto',
        display: 'block',
        margin: '0'
      };
    case 'video':
      return {
        borderRadius: '8px',
        width: '100%',
        aspectRatio: '16/9',
        display: 'block'
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
        backgroundColor: '#ffffff',
        width: '100%',
        display: 'block',
        boxSizing: 'border-box'
      };
    case 'checkbox':
    case 'radio':
    case 'toggle':
      return {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        padding: '8px'
      };
    case 'range':
      return {
        padding: '8px',
        width: '100%'
      };
    case 'rating':
      return {
        padding: '8px'
      };
    case 'progress':
      return {
        padding: '8px',
        width: '100%'
      };
    case 'container':
      return {
        backgroundColor: '#f9fafb',
        padding: '20px',
        borderRadius: '8px',
        width: '100%',
        minHeight: '100px'
      };
    case 'divider':
      return {
        backgroundColor: '#e5e7eb',
        height: '2px',
        width: '100%',
        border: 'none',
        margin: '16px 0'
      };
    case 'spacer':
      return {
        backgroundColor: 'transparent',
        height: '40px',
        width: '100%'
      };
    default:
      return {};
  }
};

export const getDefaultContent = (type) => {
  switch (type) {
    case 'heading':
      return { text: 'Your Headline Here' };
    case 'text':
      return { text: 'Add your text content here. You can edit this in the properties panel.' };
    case 'button':
      return { text: 'Click Me', url: '#' };
    case 'image':
      return { src: 'https://via.placeholder.com/800x400/0ea5e9/ffffff?text=Image', alt: 'Image' };
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
