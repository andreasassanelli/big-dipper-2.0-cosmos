import {
    renderHook,
    act,
    cleanup,
} from '@testing-library/react-hooks';
import { useProfileDetails } from './hooks';

const mockPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('hook: useProfileDetails', () => {
    test('correctly toggles profile open', async () => {
        const { result } = renderHook(() => useProfileDetails());
        // initial
        expect(result.current.state.loading).toBe(true);
        expect(result.current.state.exists).toBe(true);
        expect(result.current.state.desmosProfile).toBe(null);

        // render profile UI if shouldShowProfile returns true
        act(() => {
            result.current.shouldShowProfile();
        });
        expect(result.current.state.loading).toBe(false);
        expect(result.current.state.exists).toBe(true);
        expect(result.current.state.desmosProfile).toBe(true);

        // don't render profile UI if shouldShowProfile returns false
        act(() => {
            result.current.shouldShowProfile();
        });
        expect(result.current.state.loading).toBe(true);
        expect(result.current.state.exists).toBe(false);
        expect(result.current.state.desmosProfile).toBe(true);

    });
});

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});