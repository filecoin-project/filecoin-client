/* eslint-disable no-prototype-builtins */
import shuffle from "lodash/shuffle";
import * as Actions from "~/common/actions";

// NOTE(amine): fetch explore objects
export const fetchExploreItems = async ({ currentItems, update }) => {
  const requestObject = {};
  if (currentItems.length) {
    if (update) {
      requestObject.latestTimestamp = currentItems[0].createdAt;
    } else {
      requestObject.earliestTimestamp = currentItems[currentItems.length - 1].createdAt;
    }
  }
  const response = await Actions.getExplore(requestObject);
  return response;
};

// NOTE(amine): fetch explore objects
export const fetchActivityItems = async ({ currentItems, viewer, update }) => {
  const requestObject = {};

  if (currentItems.length) {
    if (update) {
      requestObject.latestTimestamp = currentItems[0].createdAt;
    } else {
      requestObject.earliestTimestamp = currentItems[currentItems.length - 1].createdAt;
    }
  }

  requestObject.following = viewer.following.map((item) => item.id);
  requestObject.subscriptions = viewer.subscriptions.map((item) => item.id);

  const response = await Actions.getActivity(requestObject);
  return response;
};
//NOTE(martina): our grouping schema is as follows: we group first by multiple people doing the same action to the same target, then by one person doing the same action to different targets
// We remove repeat targets so that the user is not shown the same file/slate twice

let ids = {};

//NOTE(martina): this is used when grouping by multiple different users doing the same action on the same target. The value here is the target that should be the same (in addition to the type of action)
// e.g. "Martina, Tara, and Haris liked this file"
let fieldGroupings = {
  SUBSCRIBE_SLATE: "slate",
  SUBSCRIBE_USER: "user",
  LIKE_FILE: "file",
  SAVE_COPY: "file",
};

//NOTE(martina): this is used when grouping by one user doing the same action to different targets
// e.g. "Martina liked 3 files"

//NOTE(martina): primary is the primary "target" of the action (the thing that can differ). If there is a secondary, it is something that should stay consistent when grouping items with different values for the primary
// For example, for CREATE_SLATE_OBJECT, primary = file and secondary = slate.
// In other words, "Martina added 3 files to this one slate" is a valid grouping (slate is consistent), whereas "Martina added 3 files to 3 different slates" is not a valid grouping (slate is not consistent)
const ownerIdGroupings = {
  CREATE_SLATE_OBJECT: { primary: "file", secondary: "slate" },
  CREATE_SLATE: { primary: "slate" },
  CREATE_FILE: { primary: "file", secondary: "slate" },
  SUBSCRIBE_SLATE: { primary: "slate" },
  SUBSCRIBE_USER: { primary: "user" },
  FILE_VISIBLE: { primary: "file" },
  SLATE_VISIBLE: { primary: "slate" },
  LIKE_FILE: { primary: "file" },
  SAVE_COPY: { primary: "file" },
};

//NOTE(martina): pass the new activity items through this to group and order them
export const processActivity = (activity) => {
  let activityByType = {};
  for (let item of activity) {
    if (item.type === "DOWNLOAD_FILE") continue;
    const { primary } = ownerIdGroupings[item.type];
    const { id } = item[primary];
    if (ids[id]) {
      continue; //NOTE(martina): removing repeats from previous activity
    }

    if (activityByType[item.type]) {
      activityByType[item.type].push(item);
    } else {
      activityByType[item.type] = [item];
    }
  }

  //NOTE(martina): first grouping by multiple people doing the same action on the same target
  let finalActivity = [];
  for (let [type, events] of Object.entries(activityByType)) {
    if (!fieldGroupings.hasOwnProperty(type)) continue;
    let field = fieldGroupings[type];
    const { grouped, ungrouped } = groupByField(events, field);
    if (grouped?.length) {
      finalActivity.push(...grouped);
    }
    if (ungrouped?.length) {
      activityByType[type] = ungrouped;
    } else {
      delete activityByType[type];
    }
  }

  //NOTE(martina): removing repeats within the group
  for (let item of finalActivity) {
    const { primary } = ownerIdGroupings[item.type];
    let { id } = item[primary];
    ids[id] = true;
  }
  for (let [key, arr] of Object.entries(activityByType)) {
    let filteredArr = [];
    for (let item of arr) {
      const { primary } = ownerIdGroupings[item.type];
      let { id } = item[primary];
      if (ids[id]) {
        continue;
      } else {
        filteredArr.push(item);
        ids[id] = true;
      }
    }
    activityByType[key] = filteredArr;
  }

  //NOTE(martina): second grouping of same owner doing same action on different targets
  for (let [type, events] of Object.entries(activityByType)) {
    if (!ownerIdGroupings.hasOwnProperty(type)) continue;
    let field = ownerIdGroupings[type];
    const groupedActivity = groupByOwner(events, field.primary, field.secondary);
    finalActivity.push(...groupedActivity);
  }

  return shuffle(finalActivity);
};

const groupByField = (activity, key) => {
  let ungrouped = {};
  let grouped = {};
  for (let item of activity) {
    const { id } = item[key];
    let match = ungrouped[id];
    if (match) {
      grouped[id] = match;
      grouped[id].owner = [match.owner, item.owner];
      delete ungrouped[id];
    } else {
      match = grouped[id];
      if (match) {
        grouped[id].owner.push(item.owner);
      } else {
        ungrouped[id] = item;
      }
    }
  }
  return { grouped: Object.values(grouped), ungrouped: Object.values(ungrouped) };
};

const groupByOwner = (activity, collateCol, sharedCol = "") => {
  let grouped = {};
  for (let item of activity) {
    let aggregateKey = `${item.owner.id}-${sharedCol ? item[sharedCol]?.id : ""}`;
    let match = grouped[aggregateKey];
    if (match) {
      if (Array.isArray(match[collateCol])) {
        match[collateCol].push(item[collateCol]);
      } else {
        match[collateCol] = [match[collateCol], item[collateCol]];
      }
    } else {
      grouped[aggregateKey] = item;
    }
  }
  return Object.values(grouped);
};

//TODO(martina): add ranking by score, removing repeats from a persistent pool of ids before the first grouping as well (for that one, don't add to the ids list yet)
