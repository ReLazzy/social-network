import { Page, RouteList, Router } from '@happysanta/router';
import { UserType } from '../types/User';
import { useAppSelector } from '../hooks/redux';

export const PAGE_MAIN = '/';
export const PAGE_LOGIN = '/login';
export const PAGE_AUTH = '/auth';
export const PAGE_FEED = '/feed';
export const PAGE_FRIENDS = '/friends';
export const PAGE_MESSAGES = '/messages';
export const PAGE_PROFILE = '/profile/:id([A-z]+)';
export const PAGE_EDIT_PROFILE = '/edit';

export const PANEL_LOGIN = 'login';
export const PANEL_REGISTRATION = 'registration';

export const PANEL_FEED = 'feed';
export const PANEL_FRIENDS = 'friends';
export const PANEL_MESSAGES = 'messages';
export const PANEL_PROFILE = 'profile';
export const PANEL_EDIT = 'edit';

export const VIEW_AUTH = 'view_auth';

export const VIEW_FEED = 'feed';
export const VIEW_FRIENDS = 'friends';
export const VIEW_MESSAGES = 'messages';
export const VIEW_PROFILE = 'profile';

// export const MODAL_EDIT_POST = 'edit_post/:idPost([0-9]+)';
export const MODAL_EDIT_PROFILE = 'edit_profile';

export const publicRoutes = [PAGE_LOGIN, PAGE_AUTH];
export const privateRoutes = [
  PAGE_FRIENDS,
  PAGE_FEED,
  PAGE_MESSAGES,
  PAGE_PROFILE,
];

export const routes = {
  [PAGE_LOGIN]: new Page(PANEL_LOGIN, VIEW_AUTH),
  [PAGE_AUTH]: new Page(PANEL_REGISTRATION, VIEW_AUTH),
  [PAGE_FEED]: new Page(PANEL_FEED, VIEW_FEED),
  [PAGE_FRIENDS]: new Page(PANEL_FRIENDS, VIEW_FRIENDS),
  [PAGE_MESSAGES]: new Page(PANEL_MESSAGES, VIEW_MESSAGES),
  [PAGE_PROFILE]: new Page(PANEL_PROFILE, VIEW_PROFILE),
};

export const router = new Router(routes);
router.onEnterPage(PAGE_MAIN, () => {
  router.pushPage(PAGE_FEED);
});

router.start();
