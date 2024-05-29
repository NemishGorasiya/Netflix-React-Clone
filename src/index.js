import { lazy } from "react";

export const LazyLoadedErrorPage = lazy(() => import("./pages/ErrorPage"));
export const LazyLoadedMoreInfoAboutMoviePage = lazy(() =>
  import("./pages/MoreInfoAboutMoviePage")
);
export const LazyLoadedExplorePage = lazy(() => import("./pages/ExplorePage"));
export const LazyLoadedManageAccountsPage = lazy(() =>
  import("./pages/ManageAccountsPage")
);
export const LazyLoadedUserPreferences = lazy(() =>
  import("./pages/UserPreferences")
);
