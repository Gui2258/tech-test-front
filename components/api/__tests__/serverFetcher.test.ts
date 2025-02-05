import { serverFetcher } from '../serverFetcher';

const mockFetch = jest.fn();
global.fetch = mockFetch;

const BACKEND_URL = 'http://localhost:3001/api';

describe('serverFetcher', () => {
    beforeEach(() => {
        mockFetch.mockClear();
        process.env.BACKEND_URL = BACKEND_URL;
    });

    it('makes request to correct URL', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ data: 'test' }),
        });

        await serverFetcher('/test-endpoint');

        expect(mockFetch).toHaveBeenCalledWith(
            `${BACKEND_URL}/test-endpoint`,
            expect.any(Object)
        );
    });

    // Rest of the tests remain the same...
});
