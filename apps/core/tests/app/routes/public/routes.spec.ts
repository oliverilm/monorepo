import { testServer } from '../../../integration-init';

describe('GET /', () => {
  it('should respond with a message', async () => {
    const response = await testServer.inject({
      method: 'GET',
      url: '/public/health',
    });

    expect(response.json()).toStrictEqual(
      {
        healthy: true,
      },
    );
  });
});
