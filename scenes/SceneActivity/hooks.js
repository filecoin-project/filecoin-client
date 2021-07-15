import * as React from "react";
import * as Events from "~/common/custom-events";
import * as ActivityUtilities from "~/common/activity-utilities";

const updateExploreFeed = async ({ viewer, state, onAction, setState, update }) => {
  const currentItems = viewer?.explore?.items || state?.explore?.items || [];
  const response = await ActivityUtilities.fetchExploreItems({ currentItems, update });
  if (Events.hasError(response)) return;

  const newItems = response.data;

  const currentFeed = viewer?.explore?.feed || state?.explore?.feed || [];
  const newFeed = await ActivityUtilities.processActivity(newItems).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const newState = {
    items: currentItems.concat(newItems),
    feed: currentFeed.concat(newFeed),
    shouldFetchMore: newItems.length > 0,
  };

  if (viewer) {
    onAction({ type: "UPDATE_VIEWER", viewer: { explore: newState } });
    return;
  }

  setState((prev) => ({ ...prev, explore: newState }));
};

const updateActivityFeed = async ({ viewer, onAction, update }) => {
  const currentItems = viewer?.activity?.items || [];
  const response = await ActivityUtilities.fetchActivityItems({ currentItems, viewer, update });
  if (Events.hasError(response)) return;

  const newItems = response.data;

  const currentFeed = viewer?.activity?.feed || [];
  const newFeed = ActivityUtilities.processActivity(newItems).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  onAction({
    type: "UPDATE_VIEWER",
    viewer: {
      activity: {
        feed: currentFeed.concat(newFeed),
        items: currentItems.concat(newItems),
        shouldFetchMore: newItems.length > 0,
      },
    },
  });
};

// NOTE(amine): get the state for the selected tab.
const getState = (viewer, state, tab) => {
  if (!viewer) return state.explore || [];

  if (tab === "explore") {
    return viewer?.explore || {};
  }
  return viewer?.activity || {};
};

const getTab = (page, viewer) => {
  if (page.params?.tab) return page.params?.tab;

  if (viewer?.subscriptions?.length || viewer?.following?.length) {
    return "activity";
  }
  return "explore";
};

export function useActivity({ page, viewer, onAction }) {
  const [state, setState] = React.useState({
    explore: {
      feed: [],
      items: [],
      shouldFetchMore: true,
    },
    loading: {
      explore: false,
      activity: false,
    },
  });

  const tab = getTab(page, viewer);

  const updateFeed = React.useCallback(
    async (update) => {
      const currentState = getState(viewer, state, tab);
      const { shouldFetchMore } = currentState || {};
      if (typeof shouldFetchMore === "boolean" && !shouldFetchMore) {
        return;
      }

      if (state.loading[tab]) return;
      setState((prev) => ({ ...prev, loading: { ...prev.loading, [tab]: true } }));
      if (viewer && tab === "activity") {
        await updateActivityFeed({ viewer, onAction, update });
      } else {
        await updateExploreFeed({ viewer, onAction, state, setState, update });
      }
      setState((prev) => ({ ...prev, loading: { ...prev.loading, [tab]: false } }));
    },
    [tab, onAction, state, viewer]
  );

  const { feed = [] } = getState(viewer, state, tab);
  React.useEffect(() => {
    if (feed && feed?.length !== 0) return;
    updateFeed(true);
  }, [tab]);

  return { updateFeed, feed, tab, isLoading: state.loading };
}
