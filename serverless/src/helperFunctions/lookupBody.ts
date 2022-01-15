export const getEventWithUsersLookUpBody = (
  matchBody: Record<string, unknown> | null
) => {
  const filterBody: Record<string, unknown>[] = [
    {
      $lookup: {
        from: "userEvent",
        localField: "_id",
        foreignField: "eventId",
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "user",
        localField: "user.userId",
        foreignField: "_id",
        as: "aUser",
      },
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        time: { $first: "$time" },
        introduction: { $first: "$introduction" },
        hours: { $push: "$user.hours" },
        users: { $push: "$aUser" },
      },
    },
  ];
  if (matchBody != null) {
    filterBody.push({ $match: matchBody });
  }
  return filterBody;
};

export const getUsersWithEventsLookUpBody = (
  matchBody: Record<string, unknown> | null
) => {
  const filterBody: Record<string, unknown>[] = [
    {
      $lookup: {
        from: "userEvent",
        localField: "_id",
        foreignField: "userId",
        as: "event",
      },
    },
    {
      $unwind: {
        path: "$event",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "event",
        localField: "event.eventId",
        foreignField: "_id",
        as: "aEvent",
      },
    },
    {
      $group: {
        _id: "$_id",
        userEmail: { $first: "$userEmail" },
        firstName: { $first: "$firstName" },
        lastName: { $first: "$lastName" },
        address: { $first: "$address" },
        birthday: { $first: "$birthday" },
        password: { $first: "$password" },
        admin: { $first: "$admin" },
        volunteer: { $first: "$volunteer" },
        hours: { $push: "$event.hours" },
        events: { $push: "$aEvent" },
      },
    },
  ];
  if (matchBody != null) {
    filterBody.push({ $match: matchBody });
  }
  return filterBody;
};
