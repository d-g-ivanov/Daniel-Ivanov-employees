import { useRef, useEffect } from 'react';

import './styles.css';

const supportsDragAndDrop = (function () {
  const div = document.createElement('div');
  return 'draggable' in div || ('ondragstart' in div && 'ondrop' in div); // && 'FormData' in window && 'FileReader' in window;
})();

const prevent = (e) => {
  e.stopPropagation();
  e.preventDefault();
};

let counter = 0;
const hoverClass = 'picker-hovered';
const activeClass = 'picker-active';

export default function FilePicker({ processFile, acceptTypes }) {
  const dropzone = useRef();
  // handlers
  const onDragOver = (e) => {
    prevent(e);
    e.dataTransfer.dropEffect = 'copy';
  };

  const onDragEnter = (e) => {
    prevent(e);
    counter++;
    dropzone.current.classList.add(hoverClass);
  };

  const onDragLeave = (e) => {
    prevent(e);
    counter--;
    if (counter === 0) {
      dropzone.current.classList.remove(hoverClass);
    }
  };

  const onInputChange = (e) => {
    prevent(e);

    let files;
    if (e.dataTransfer) {
      files = [...e.dataTransfer.files];
    } else if (e.target) {
      files = [...e.target.files];
    }

    counter = 0;
    dropzone.current.classList.remove(hoverClass);

    if (acceptTypes && !acceptTypes.includes(files[0].type)) {
      return alert(`File type "${files[0].type}" not permitted.`);
    }

    dropzone.current.classList.add(activeClass);
    dropzone.current.getElementsByClassName(
      'picker-text'
    )[0].textContent = `File "${files[0].name}" inserted.`;

    processFile && processFile(files[0]);
  };

  // event listeners
  useEffect(() => {
    const zone = dropzone.current;
    if (!zone) return;

    zone.addEventListener('dragover', onDragOver, true);
    zone.addEventListener('dragenter', onDragEnter, false);
    zone.addEventListener('dragleave', onDragLeave, false);
    zone.addEventListener('drop', onInputChange, true);
    zone.addEventListener('change', onInputChange, true);

    return () => {
      zone.removeEventListener('dragover', onDragOver);
      zone.removeEventListener('dragenter', onDragEnter);
      zone.removeEventListener('dragleave', onDragLeave);
      zone.removeEventListener('drop', onInputChange);
      zone.removeEventListener('change', onInputChange);
    };
  }, []);

  return (
    <div className="picker" ref={dropzone}>
      <input
        id="file-input"
        type="file"
        accept={acceptTypes ? acceptTypes.join() : '*'}
        name="picker"
      />
      <label htmlFor="file-input">
        <div id="file-input-texts">
          <div className="picker-icon">&#8687;</div>
          <div className="picker-text">
            Choose files {supportsDragAndDrop ? ' or drop them here' : ''}
          </div>
        </div>
      </label>
    </div>
  );
}
