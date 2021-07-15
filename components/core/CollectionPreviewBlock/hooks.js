import * as React from "react";
import * as Events from "~/common/custom-events";
import * as Actions from "~/common/actions";

export const useFollowHandler = ({ collection, viewer }) => {
  const followedCollection = React.useMemo(
    () => viewer?.subscriptions?.find((subscription) => subscription.id === collection.id),
    []
  );
  const [state, setState] = React.useState({
    isFollowed: !!followedCollection,
    // NOTE(amine): viewer will have the hydrated state
    followCount: followedCollection?.subscriberCount ?? collection.subscriberCount,
  });

  const handleFollowState = () => {
    setState((prev) => {
      if (prev.isFollowed) {
        return {
          isFollowed: false,
          followCount: prev.followCount - 1,
        };
      }
      return {
        isFollowed: true,
        followCount: prev.followCount + 1,
      };
    });
  };

  const follow = async () => {
    if (!viewer) {
      Events.dispatchCustomEvent({ name: "slate-global-open-cta", detail: {} });
      return;
    }
    // NOTE(amine): optimistic update
    handleFollowState();
    const response = await Actions.createSubscription({
      slateId: collection.id,
    });

    if (Events.hasError(response)) {
      // NOTE(amine): revert back to old state if there is an error
      handleFollowState();
      return;
    }
  };

  return { follow, ...state };
};
