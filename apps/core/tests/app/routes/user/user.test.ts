import { registerTestUserAndRetrieveToken, testServer } from '../../../integration-init';

describe('user routes', () => {
  test('should be able to fetch user profile with authenticated session', async () => {
    const token = await registerTestUserAndRetrieveToken();
    const response = await testServer.inject({
      method: 'GET',
      url: '/user/profile',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    expect(response.json()).toStrictEqual(
      {
        "belt": null,
        "clubId": null,
        "createdAt": expect.any(String),
        "dateOfBirth": null,
        "id": expect.any(String),
        "nationalId": null,
        "nationalIdType": null,
        "updatedAt": expect.any(String),
        "userId": expect.any(String),
      }
    );
  });
});
