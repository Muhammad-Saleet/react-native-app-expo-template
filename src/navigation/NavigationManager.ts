import { createRef } from 'react'
import { StackActions } from '@react-navigation/native'

export const navigationRef = createRef()

const loadingState = {
  index: 0,
  routes: [
    {
      name: 'LoadingView',
    },
  ],
}

const authState = {
  index: 0,
  routes: [
    {
      name: 'AuthStack',
      state: {
        index: 0,
        routes: [
          {
            name: 'LoginView',
          },
        ],
      },
    },
  ],
}

const bottomTabsState = {
  index: 0,
  routes: [
    {
      name: 'BottomTabs',
      state: {
        index: 0,
        routes: [
          {
            name: 'HomeView',
          },
        ],
      },
    },
  ],
}

export const NavigationManager = {
  navigate (name, params) {
    navigationRef.current?.navigate(name, params)
  },

  push (name, params) {
    navigationRef.current?.dispatch(StackActions.push(name, params))
  },

  getRootState () {
    return navigationRef.current?.getRootState()
  },

  resetRoot (navigationState) {
    navigationRef.current?.resetRoot(navigationState)
  },

  getCurrentRoute () {
    return navigationRef.current?.getCurrentRoute()
  },

  addListener (event, callback) {
    return navigationRef.current?.addListener(event, callback)
  },

  predefinedStates: {
    authState,
    bottomTabsState,
    loadingState,
  },
}
