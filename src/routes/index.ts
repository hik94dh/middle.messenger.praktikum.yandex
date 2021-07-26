import Router from '../modules/router';
import { signInPage } from '../pages/sign-in/index';
import { signUpPage } from '../pages/sign-up/index';
import { profilePage } from '../pages/profile/index';
import { messengerPage } from '../pages/messenger/index';
import { page500 } from '../pages/500/index';
import { page404 } from '../pages/404/index';

import {
	MAIN_PATH,
	SIGN_IN_PATH,
	SIGN_UP_PATH,
	PROFILE_PATH,
	MESSENGER_PATH,
	SERVER_ERROR_PATH,
	NOT_FOUND_PATH,
} from './constants';

const router = new Router('app');

router
	.use(MAIN_PATH, signInPage)
	.use(SIGN_IN_PATH, signInPage)
	.use(SIGN_UP_PATH, signUpPage)
	.use(PROFILE_PATH, profilePage)
	.use(MESSENGER_PATH, messengerPage)
	.use(SERVER_ERROR_PATH, page500)
	.use(NOT_FOUND_PATH, page404)
	.start();
