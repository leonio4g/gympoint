import React from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import logo from '~/assets/logo-header.png';
import SignIn from '~/pages/SignIn';
import Checkins from '~/pages/Checkins';
import HelpList from '~/pages/HelpOrder/HelpList';
import HelpShow from '~/pages/HelpOrder/HelpShow';
import HelpNew from '~/pages/HelpOrder/HelpNew';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Checkins,
            HelpOrder: {
              screen: createStackNavigator(
                {
                  HelpList,
                  HelpShow,
                  HelpNew,
                },
                {
                  defaultNavigationOptions: {
                    headerTitle: () => <Image source={logo} />,
                    headerTitleContainerStyle: {
                      justifyContent: 'center',
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Pedir ajuda',
                // eslint-disable-next-line react/prop-types
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                ),
              },
            },
          },

          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#fff',
              inactiveTintColor: 'rgba(255,255,255,0.6)',
              style: {
                backgroundColor: '#EE4E62',
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
