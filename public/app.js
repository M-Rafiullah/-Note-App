(()=> {
  'use strict';

  const app = {
    noteEditor: document.getElementById('note-editor'),
    noteEditorTitle: document.getElementById('note-editor-title'),
    title: document.getElementById('title'),
    message: document.getElementById('message'),
    color: document.getElementById('color'),
    addButton: document.getElementById('add-btn'),
    errorDisplay: document.getElementById('error'),
    deleteButton: document.querySelector('.delete'),
    editButton: document.querySelector('.edit'),
    notesSection: document.getElementById('notes-section'),
    notes: document.getElementById('notes'),
    editMode: false,

    init:()=> {
      app.title.addEventListener('focus', app.clearError);
      app.message.addEventListener('focus', app.clearError);

      app.title.addEventListener('keypress', app.detectInput);
      app.message.addEventListener('keypress', app.detectInput);

      app.addButton.addEventListener('click', app.createNote);
    },
    detectInput1: ()=> {
      if(!app.title.value || !app.message.value) {
        return;
      } else {
        app.addButton.innerText = 'Create Note';
      }
    },
    clearError: ()=> {
      app.title.classList.remove('is-empty');
      app.message.classList.remove('is-empty');
      app.errorDisplay.innerHTML = '';
    },
    createNote: ()=> {
      if(!app.title.value || !app.message.value) {
        if(!app.title.value) {
          app.title.classList.add('is-empty');  
        }
        if(!app.message.value) {
          app.message.classList.add('is-empty');
        }
        app.errorDisplay.innerHTML = '<span>*Values required</span>';
        return;
      } else {
        let note = new Object();

        note.title = app.title.value;
        note.message = app.message.value;
        note.color = app.color.value;

        app.addNote(note);
      }
    },
    addNote: (note)=> {
      let li = document.createElement('li'),
      deleteBtn = document.createElement('span'),
      editBtn = document.createElement('span'),
      title = document.createElement('span'),
      message = document.createElement('span'),
      footer = document.createElement('footer');

      deleteBtn.className = 'delete';
      deleteBtn.innerHTML = '<i class="fa fa-trash-o"></i>';
      deleteBtn.addEventListener('click', app.deleteNote);

      title.className = 'note-title';
      title.innerHTML = note.title;

      message.className = 'note-message';
      message.innerHTML = note.message;

      editBtn.className = 'edit';
      editBtn.innerHTML = '<i class="fa fa-pencil-square-o"></i> Edit';
      editBtn.addEventListener('click', app.editNote);

      footer.appendChild(editBtn);
      
      li.className = note.color;

      li.appendChild(deleteBtn);
      li.appendChild(title);
      li.appendChild(message);
      li.appendChild(footer);

      app.notes.prepend(li);

      app.title.value = '';
      app.message.value = '';

      if(!app.editMode) {
        app.addButton.innerText = 'Create Note';
      } else {
        setTimeout(()=> {
          app.addButton.innerText = 'Create Note';
        }, 200);
      }
    },
    editNote: function() {
     let li,
      title,
      message,
      color,
      note = new Object();

      li = this.parentNode.parentNode;

      for(let i = 0; i < li.childNodes.length; i++) {
        if(li.childNodes[i].className === 'note-title') {
          title = li.childNodes[i].innerText;
        }
      }

      for(let i = 0; i < li.childNodes.length; i++) {
        if(li.childNodes[i].className === 'note-message') {
          message = li.childNodes[i].innerText;
        }
      }

      color = li.getAttribute('class');

      note.title = title;
      note.message = message;
      note.color = color;
      
      app.openNote(note);

      setTimeout(()=> {
        li.remove();
      }, 200);
    },
    openNote: (note)=> {
      if(!app.editMode) {
        app.noteEditor.classList.add('hide');
        app.notesSection.classList.add('hide');
      
        setTimeout(()=>{
          app.noteEditorTitle.innerText = 'Edit Note';
          
          app.addButton.innerText = 'Done';
          app.addButton.removeEventListener('click', app.createNote);
          app.addButton.addEventListener('click', app.saveNote);

          app.title.value = note.title;
          app.message.value = note.message;
          app.color.value = note.color;

          app.noteEditor.classList.remove('hide');
          app.editMode = true;
        }, 200);
      } else {
        return;
      }  
    },
    saveNote: ()=> {
      app.createNote();

      app.noteEditor.classList.add('hide');
      app.notesSection.classList.add('hide');
    
      setTimeout(()=> {
        app.noteEditorTitle.innerText = 'Create Note';

        app.addButton.removeEventListener('click', app.saveNote);
        app.addButton.addEventListener('click', app.createNote);

        app.title.value = '';
        app.message.value = '';

        app.notesSection.classList.remove('hide');
        app.noteEditor.classList.remove('hide');
        app.editMode = false;
      }, 200);
    },    
    deleteNote: ()=>{
      this.parentNode.remove();
    }
  };

  app.init();

})();