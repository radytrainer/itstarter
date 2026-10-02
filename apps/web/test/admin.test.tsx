import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithIntl as render } from './render';
import { ConfirmButton, LocalizedInput } from '../src/components/admin/fields';
import { ImportStudents } from '../src/components/admin/import-students';
import { emptyQuestion, QuestionEditor } from '../src/components/admin/question-editor';

const router = { replace: vi.fn(), refresh: vi.fn() };
vi.mock('next/navigation', () => ({ useRouter: () => router, usePathname: () => '/admin' }));

const fetchMock = vi.fn();
beforeEach(() => vi.stubGlobal('fetch', fetchMock));
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  fetchMock.mockReset();
  router.refresh.mockReset();
});
const respond = (body: object) =>
  fetchMock.mockResolvedValueOnce(new Response(JSON.stringify(body)));

describe('LocalizedInput', () => {
  it('edits English and Khmer separately and drops an empty Khmer', () => {
    const onChange = vi.fn();
    render(<LocalizedInput label="Title" value={{ en: 'Hello' }} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Khmer (ខ្មែរ)'), { target: { value: 'សួស្តី' } });
    expect(onChange).toHaveBeenLastCalledWith({ en: 'Hello', km: 'សួស្តី' });
    fireEvent.change(screen.getByLabelText('English'), { target: { value: 'Hi' } });
    expect(onChange).toHaveBeenLastCalledWith({ en: 'Hi' });
  });
});

describe('ConfirmButton', () => {
  it('needs two presses before deleting', () => {
    const onConfirm = vi.fn();
    render(<ConfirmButton label="Delete" onConfirm={onConfirm} />);
    fireEvent.click(screen.getByRole('button', { name: /Delete/ }));
    expect(onConfirm).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /Are you sure/ }));
    expect(onConfirm).toHaveBeenCalledOnce();
  });
});

describe('ImportStudents', () => {
  const csv = 'username,name\nsokha,Sokha\ndara,Dara';

  it('checks first (dry run), then imports and shows the one-time passwords', async () => {
    render(<ImportStudents />);
    fireEvent.change(screen.getByLabelText('Or paste here'), { target: { value: csv } });
    const importButton = () =>
      screen.getByRole('button', { name: /Import 2 students/ }) as HTMLButtonElement;
    expect(importButton().disabled).toBe(true);

    respond({
      success: true,
      data: {
        created: 0,
        rows: [
          { line: 2, username: 'sokha', displayName: 'Sokha', cohort: null, problems: [] },
          { line: 3, username: 'dara', displayName: 'Dara', cohort: null, problems: [] },
        ],
      },
    });
    fireEvent.click(screen.getByRole('button', { name: /Check/ }));
    expect(await screen.findByText('Everything looks good. Ready to import.')).toBeTruthy();
    expect(JSON.parse(fetchMock.mock.calls[0]![1].body)).toEqual({ csv, dryRun: true });

    respond({
      success: true,
      data: {
        created: 2,
        rows: [
          {
            line: 2,
            username: 'sokha',
            displayName: 'Sokha',
            cohort: null,
            problems: [],
            temporaryPassword: 'blue-mango-1234',
          },
          {
            line: 3,
            username: 'dara',
            displayName: 'Dara',
            cohort: null,
            problems: [],
            temporaryPassword: 'red-river-5678',
          },
        ],
      },
    });
    fireEvent.click(importButton());
    expect(await screen.findByText('2 students were created.')).toBeTruthy();
    expect(screen.getByText('blue-mango-1234')).toBeTruthy();
    expect(screen.getByRole('button', { name: /Download passwords/ })).toBeTruthy();
  });

  it('shows problems per line and keeps Import disabled', async () => {
    render(<ImportStudents />);
    fireEvent.change(screen.getByLabelText('Or paste here'), { target: { value: csv } });
    respond({
      success: true,
      data: {
        created: 0,
        rows: [
          {
            line: 2,
            username: 'sokha',
            displayName: 'Sokha',
            cohort: null,
            problems: ['Username already exists'],
          },
        ],
      },
    });
    fireEvent.click(screen.getByRole('button', { name: /Check/ }));
    expect(await screen.findByText(/Username already exists/)).toBeTruthy();
    expect(screen.getByRole('alert').textContent).toMatch(/Nobody was created/);
    expect((screen.getByRole('button', { name: /Import/ }) as HTMLButtonElement).disabled).toBe(
      true,
    );
  });
});

describe('QuestionEditor', () => {
  it('shows why a question cannot be saved', async () => {
    respond({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'This question can’t be answered yet.',
        details: { problems: ['Mark exactly 1 correct option (now 0).'] },
      },
    });
    render(
      <QuestionEditor
        activityId="a1"
        question={{ ...emptyQuestion(), prompt: { en: '1 + 1 = ?' } }}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /Save/ }));
    expect(await screen.findByText('Mark exactly 1 correct option (now 0).')).toBeTruthy();
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe('/api/admin/activities/a1/questions');
    expect(init.method).toBe('POST');
  });

  it('switching kind gives the right answer template and hides the options', async () => {
    respond({ success: true, data: {} });
    render(
      <QuestionEditor
        activityId="a1"
        question={{ ...emptyQuestion(), id: 'q1', prompt: { en: 'Is it safe?' } }}
      />,
    );
    fireEvent.change(screen.getByLabelText('Question kind'), {
      target: { value: 'safe_or_dangerous' },
    });
    expect(screen.queryByText('Options')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: /Save/ }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe('/api/admin/questions/q1');
    expect(JSON.parse(init.body)).toMatchObject({
      kind: 'safe_or_dangerous',
      config: { answer: 'dangerous' },
      options: [],
    });
  });
});
