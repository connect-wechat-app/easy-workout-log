import { expect } from 'chai';

import globalReducer from './globalReducer';
import actions from '../actions/globalActions';

describe('globalReducer', () => {
  it('should reduce undefined state to initial state', () => {
    // when
    const newState = globalReducer(undefined, { type: '' });

    // then
    expect(newState)
      .to
      .deep
      .equal({ loadingCounter: 0, userNotifications: [] });
  });

  describe('TASK-START', () => {
    it('should increment the loading counter for TASK-START for an undefined state', () => {
      // when
      const newState = globalReducer(undefined, actions.taskStart());

      // then
      expect(newState)
        .to
        .deep
        .equal({ loadingCounter: 1, userNotifications: [] });
    });

    it('should increment the loading counter for TASK-START', () => {
      // when
      const newState = globalReducer({
        loadingCounter: 2
      }, actions.taskStart());

      // then
      expect(newState)
        .to
        .deep
        .equal({ loadingCounter: 3 });
    });
  });

  describe('TASK-END', () => {
    it('should decrement the loading counter for an undefined state', () => {
      // when
      const newState = globalReducer(undefined, actions.taskEnd());

      // then
      expect(newState)
        .to
        .deep
        .equal({ loadingCounter: -1, userNotifications: [] });
    });

    it('should decrement the loading counter', () => {
      // when
      const newState = globalReducer({
        loadingCounter: 2
      }, actions.taskEnd());

      // then
      expect(newState)
        .to
        .deep
        .equal({ loadingCounter: 1 });
    });
  });

  describe('USER-NOTIFICATION-ADD', () => {
    it('should add a user notification', () => {
      // when
      const newState = globalReducer({
        userNotifications: []
      }, actions.userNotificationAdd('SUCCESS', 'yay!'));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          userNotifications: [
            {
              type: 'SUCCESS',
              text: 'yay!',
              isRead: false
            }
          ]
        });
    });

  });

  describe('USER-NOTIFICATION-UPDATE', () => {
    it('should mark a user notification as read for the first notification', () => {
      // when
      const newState = globalReducer({
        userNotifications: [
          {
            type: 'SUCCESS',
            text: '0',
            isRead: false
          }, {
            type: 'SUCCESS',
            text: '1',
            isRead: false
          }, {
            type: 'SUCCESS',
            text: '2',
            isRead: false
          }
        ]
      }, actions.userNotificationUpdate(0, true));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          userNotifications: [
            {
              type: 'SUCCESS',
              text: '0',
              isRead: true
            }, {
              type: 'SUCCESS',
              text: '1',
              isRead: false
            }, {
              type: 'SUCCESS',
              text: '2',
              isRead: false
            }
          ]
        });
    });

  });

});
