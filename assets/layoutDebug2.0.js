// layoutDebug2.0.js

export function layoutDebug() {
  console.log("Layout debug initialized");

  // Remove existing highlights, info boxes, and panel
  document.querySelectorAll('.position-highlight-box, .resize-handle, .resize-border, #position-info-panel, #css-update-panel').forEach(el => el.remove());
  
  // Create fixed info panel
  const infoPanel = createPanel('position-info-panel', 'top-0 end-0');
  
  // Create CSS update panel
  const cssUpdatePanel = createPanel('css-update-panel', 'bottom-0 end-0');
  
  // Highlight positioned elements
  highlightPositionedElements(infoPanel, cssUpdatePanel);
  
  // Add window resize event listener
  window.addEventListener('resize', () => {
    document.querySelectorAll('*').forEach(el => {
      const pos = window.getComputedStyle(el).position;
      if (pos === 'absolute' || pos === 'relative') {
        updatePositionInfo(el, infoPanel, cssUpdatePanel);
      }
    });
  });
}

function createPanel(id, position) {
  const panel = document.createElement('div');
  panel.id = id;
  panel.className = `position-fixed ${position} m-3 p-3 bg-white text-dark rounded shadow`;
  panel.style.cssText = 'z-index: 10000; width: 280px; display: none; font-size: 14px;';
  document.body.appendChild(panel);
  return panel;
}

function highlightPositionedElements(infoPanel, cssUpdatePanel) {
  document.querySelectorAll('*').forEach(el => {
    const pos = window.getComputedStyle(el).position;
    
    if (pos === 'absolute' || pos === 'relative') {
      const color = pos === 'absolute' ? '#E85C0D' : '#FABC3F';
      
      el.style.outline = `3px dashed ${color}`;
      el.style.outlineOffset = '-3px';
      
      updatePositionInfo(el, infoPanel, cssUpdatePanel);
      
      el.addEventListener('mouseenter', () => {
        infoPanel.innerHTML = el.dataset.detailedInfo;
        infoPanel.style.display = 'block';
        el.style.outlineStyle = 'solid';
      });
      
      el.addEventListener('mouseleave', () => {
        infoPanel.style.display = 'none';
        el.style.outlineStyle = 'dashed';
      });

      if (pos === 'absolute') {
        makeElementDraggable(el, infoPanel, cssUpdatePanel);
        makeElementResizable(el, infoPanel, cssUpdatePanel);
      }
    }
  });
}

function updatePositionInfo(el, infoPanel, cssUpdatePanel) {
  const pos = window.getComputedStyle(el).position;
  const parent = el.parentElement;
  const color = pos === 'absolute' ? '#E85C0D' : '#FABC3F';
  
  const parentRect = parent.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  
  const top = (elRect.top - parentRect.top) / parentRect.height * 100;
  const left = (elRect.left - parentRect.left) / parentRect.width * 100;
  const width = elRect.width / parentRect.width * 100;
  const height = elRect.height / parentRect.height * 100;
  
  const detailedInfoHtml = `
    <strong style="color: ${color};">Element:</strong> ${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${el.className ? '.' + el.className.replace(/\s+/g, '.') : ''}<br>
    <strong style="color: ${color};">Position:</strong> ${pos}<br>
    <strong style="color: ${color};">Top:</strong> ${top.toFixed(2)}%<br>
    <strong style="color: ${color};">Left:</strong> ${left.toFixed(2)}%<br>
    <strong style="color: ${color};">Width:</strong> ${width.toFixed(2)}%<br>
    <strong style="color: ${color};">Height:</strong> ${height.toFixed(2)}%
  `;
  
  el.dataset.detailedInfo = detailedInfoHtml;
  
  const selector = el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className ? '.' + el.className.replace(/\s+/g, '.') : '');
  const cssRule = `${selector} {
  position: ${pos};
  top: ${top.toFixed(2)}%;
  left: ${left.toFixed(2)}%;
  width: ${width.toFixed(2)}%;
  height: ${height.toFixed(2)}%;
}`;
  
  cssUpdatePanel.innerHTML = `<strong style="color: ${color};">Updated CSS:</strong><br><pre style="background: #f7f7f7; padding: 10px; border-radius: 4px; max-height: 200px; overflow-y: auto; margin-top: 10px; border: 1px solid #e0e0e0;">${cssRule}</pre>`;
  cssUpdatePanel.style.display = 'block';
}

function makeElementDraggable(el, infoPanel, cssUpdatePanel) {
  el.style.cursor = 'move';
  el.addEventListener('mousedown', startDragging);

  function startDragging(e) {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startLeft = el.offsetLeft;
    const startTop = el.offsetTop;

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);

    function drag(e) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      el.style.left = `${startLeft + dx}px`;
      el.style.top = `${startTop + dy}px`;
      updatePositionInfo(el, infoPanel, cssUpdatePanel);
    }

    function stopDragging() {
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', stopDragging);
    }
  }
}

function makeElementResizable(el, infoPanel, cssUpdatePanel) {
  const resizeHandles = ['nw', 'ne', 'sw', 'se', 'n', 's', 'e', 'w'];
  resizeHandles.forEach(direction => {
    const handle = document.createElement('div');
    handle.className = `resize-handle resize-${direction}`;
    handle.style.position = 'absolute';
    handle.style.width = handle.style.height = '10px';
    handle.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    handle.style.zIndex = '9999';

    switch(direction) {
      case 'nw': handle.style.top = handle.style.left = '-5px'; handle.style.cursor = 'nw-resize'; break;
      case 'ne': handle.style.top = handle.style.right = '-5px'; handle.style.cursor = 'ne-resize'; break;
      case 'sw': handle.style.bottom = handle.style.left = '-5px'; handle.style.cursor = 'sw-resize'; break;
      case 'se': handle.style.bottom = handle.style.right = '-5px'; handle.style.cursor = 'se-resize'; break;
      case 'n': handle.style.top = '-5px'; handle.style.left = '50%'; handle.style.cursor = 'n-resize'; break;
      case 's': handle.style.bottom = '-5px'; handle.style.left = '50%'; handle.style.cursor = 's-resize'; break;
      case 'e': handle.style.right = '-5px'; handle.style.top = '50%'; handle.style.cursor = 'e-resize'; break;
      case 'w': handle.style.left = '-5px'; handle.style.top = '50%'; handle.style.cursor = 'w-resize'; break;
    }

    el.appendChild(handle);
    handle.addEventListener('mousedown', startResizing);
  });

  function startResizing(e) {
    e.preventDefault();
    e.stopPropagation();
    const direction = e.target.className.split(' ')[1].split('-')[1];
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = el.offsetWidth;
    const startHeight = el.offsetHeight;
    const startLeft = el.offsetLeft;
    const startTop = el.offsetTop;

    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResizing);

    function resize(e) {
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newLeft = startLeft;
      let newTop = startTop;

      if (direction.includes('e')) newWidth = startWidth + (e.clientX - startX);
      if (direction.includes('s')) newHeight = startHeight + (e.clientY - startY);
      if (direction.includes('w')) {
        newWidth = startWidth - (e.clientX - startX);
        newLeft = startLeft + (e.clientX - startX);
      }
      if (direction.includes('n')) {
        newHeight = startHeight - (e.clientY - startY);
        newTop = startTop + (e.clientY - startY);
      }

      el.style.width = `${newWidth}px`;
      el.style.height = `${newHeight}px`;
      el.style.left = `${newLeft}px`;
      el.style.top = `${newTop}px`;
      updatePositionInfo(el, infoPanel, cssUpdatePanel);
    }

    function stopResizing() {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResizing);
    }
  }
}