This is an example app built with [React Native](https://facebook.github.io/react-native/) 
and [Redux](http://redux.js.org/) for both iOS and Android to find interesting deals on [Reverb.com](https://reverb.com). 

You can search for gear or browse categories. The app uses the Reverb price guide to determine the going rate of the instruments and then finds all listings with an interesting price. Viewing details of a listing takes you to the Reverb.com web site.

The app works on both phones and tablets. In landscape mode on a tablet, the layout changes automatically and the search screen turns into a side bar.

Note: since this is only an example app for developers, there are no guarantees whatsoever about the correctness of the search results. Do not use it for serious gear hunting :-).

![Find](https://raw.githubusercontent.com/martijnboland/reverb-dealfinder/master/docs/screenshots/find.png)
![Deals](https://raw.githubusercontent.com/martijnboland/reverb-dealfinder/master/docs/screenshots/deals.png)

# Getting Started

## Prerequisites

To build an run the app, you need the following prerequisites:
- OS X, Node.js 4.0 or newer and Homebrew to install Watchman and Flow,
see [React Native Requirements](https://facebook.github.io/react-native/docs/getting-started.html) 
- Xcode 7 or newer for iOS
- For Android, you'll need the Android SDK, see [the React Native Android setup guide](https://facebook.github.io/react-native/docs/android-setup.html) for detailed instructions
- The React Native CLI:

```
npm install -g react-native-cli
```

## Quick start

- Clone this repository to a local directory:

```
git clone https://github.com/martijnboland/reverb-dealfinder.git /my/local/directory
```

- Go to the root directory of the sources and install the dependencies:

``` 
npm install
```

### Run on iOS: 
- open ios/ReverbDealFInder.xcodeproj with Xcode and hit run

### Run on Android
- start an emulator of choice
- run the packager for Android;

```
react-native run-android
```
  
### Run tests

```
npm run test
``` 

#More screenshots

iPad:

![Find Tablet portrait](https://raw.githubusercontent.com/martijnboland/reverb-dealfinder/master/docs/screenshots/find-tablet-portrait.png)
![Deals Tablet landscape](https://raw.githubusercontent.com/martijnboland/reverb-dealfinder/master/docs/screenshots/deals-tablet-landscape.png)
 
 # License
 MIT &copy; Martijn Boland
