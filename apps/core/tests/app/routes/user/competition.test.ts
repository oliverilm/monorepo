import { CreateCompetition } from '../../../../src/app/services/competition';
import {
    registerTestUserAndRetrieveToken,
    testServer
  } from '../../../integration-init';
  
  describe('Competition related actions', () => {
    test("should be able to create a competition", async () => {
        const token = await registerTestUserAndRetrieveToken({ addons: { withClub: true }});
        const payload: CreateCompetition = {
          name: "test_competition"
        } 
        const response = await testServer.inject({
            method: 'POST',
            url: '/api/competitions',
            headers: {
                Authorization: `Bearer ${token}`
            },
            payload,
        });
        
        expect(response.json()).toMatchInlineSnapshot()
      })

  });
  