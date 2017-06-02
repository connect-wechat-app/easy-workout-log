const initialState = {
  loadingCounter: 0,
  userNotifications: []
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TASK-START':
      {
        return {
          ...state,
          loadingCounter: state.loadingCounter + 1
        };
      }
    case 'TASK-END':
      {
        return {
          ...state,
          loadingCounter: state.loadingCounter - 1
        };
      }
    case 'USER-NOTIFICATION-ADD':
      {
        const userNotifications = state.userNotifications;

        return {
          ...state,
          userNotifications: [
            ...userNotifications,
            {
              type: action.userNotificationType,
              text: action.userNotificationText,
              isRead: false
            }
          ]
        };
      }
    case 'USER-NOTIFICATION-UPDATE':
      {
        const index = action.index;
        const userNotifications = state.userNotifications;
        const userNotification = userNotifications[index];

        return {
          ...state,
          userNotifications: [
            ...userNotifications.slice(0, index),
            {
              ...userNotification,
              isRead: action.isRead
            },
            ...userNotifications.slice(index + 1)
          ]
        };
      }
    default:
      return state;
  }
};

export default globalReducer;
