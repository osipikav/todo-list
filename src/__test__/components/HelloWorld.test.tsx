import { render, screen } from '@testing-library/react';
import { ToDoList } from 'components/ToDoList';
import { describe, expect, it } from 'vitest';

describe('Test ToDoList component', () => {
  it('Test render ToDoList', () => {
    render(<ToDoList />);

    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  });
});
