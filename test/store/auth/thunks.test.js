
import { checkingAuthentication } from "../../../src/store/auth/thunks"


jest.mock('../../../src/auth/firebase/providers')

describe('tests on authThunks', () => {

    test('should invoque checkingCredentials', () => {

        checkingAuthentication()

    })
})