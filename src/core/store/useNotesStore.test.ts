import { renderHook, act } from '@testing-library/react';
import { useNotesStore } from './useNotesStore';

// Clear the store before each test
beforeEach(() => {
  useNotesStore.getState().clearNotes();
});

describe('useNotesStore', () => {
  it('should initialize with empty notes array', () => {
    const { result } = renderHook(() => useNotesStore());
    expect(result.current.notes).toEqual([]);
  });

  it('should add a new note', () => {
    const { result } = renderHook(() => useNotesStore());
    act(() => {
      result.current.addNote('Test note');
    });
    expect(result.current.notes).toHaveLength(1);
    expect(result.current.notes[0].text).toBe('Test note');
  });

  it('should delete a note', () => {
    const { result } = renderHook(() => useNotesStore());
    act(() => {
      result.current.addNote('Note to delete');
    });
    const noteId = result.current.notes[0].id;
    act(() => {
      result.current.deleteNote(noteId);
    });
    expect(result.current.notes).toHaveLength(0);
  });

  it('should update a note', () => {
    const { result } = renderHook(() => useNotesStore());
    act(() => {
      result.current.addNote('Original text');
    });
    const noteId = result.current.notes[0].id;
    act(() => {
      result.current.updateNote(noteId, 'Updated text');
    });
    expect(result.current.notes[0].text).toBe('Updated text');
  });

  it('should clear all notes', () => {
    const { result } = renderHook(() => useNotesStore());
    act(() => {
      result.current.addNote('Note 1');
      result.current.addNote('Note 2');
    });
    act(() => {
      result.current.clearNotes();
    });
    expect(result.current.notes).toHaveLength(0);
  });
});
