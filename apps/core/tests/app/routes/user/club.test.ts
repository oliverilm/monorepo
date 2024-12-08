import {
  registerTestUserAndRetrieveToken,
  testServer,
} from '../../../integration-init';
import { getTestUserProfile } from '../../../utils/user';

describe('User Club related actions', () => {
  it('should be able to create a club with a unique name', async () => {
    const token = await registerTestUserAndRetrieveToken(testServer);
    const response = await testServer.inject({
      method: 'POST',
      url: '/user/club/create',
      payload: {
        name: 'unique club',
        country: 'EE',
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    expect(response.json()).toStrictEqual({
      country: 'EE',
      createdAt: expect.any(String),
      description: '',
      id: expect.any(String),
      name: 'unique club',
      slug: 'unique-club',
      updatedAt: expect.any(String),
    });

    const profile = await getTestUserProfile();
    expect(profile?.clubId).toBe(response.json().id);
  });

  it('should not be able to create a club if user is already in a club', async () => {
    const token = await registerTestUserAndRetrieveToken(testServer);
    const response = await testServer.inject({
      method: 'POST',
      url: '/user/club/create',
      payload: {
        name: 'unique club',
        country: 'EE',
      },
    });
  });

  it('should not be able to create a club if user is not logged in', async () => {
    const response = await testServer.inject({
      method: 'POST',
      url: '/user/club/create',
      payload: {
        name: 'unique club',
        country: 'EE',
      },
    });

    expect(response.json()).toStrictEqual(
      {
        "error": "Unauthorized",
        "message": "Unauthorized",
        "statusCode": 401,
      }
    );
  });

  it('should not be able to create a club with a duplicate name', async () => {
    expect(true);
  });
});
