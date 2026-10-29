# ShopKart mobile apps

A small shopping app (home, search, product, cart, checkout) for Android and iOS,
with the same `shopkart://` deep links on both. The catalog is fixed, so tests
always see the same products (ids `p101`–`p108`).

## Deep links

| Link | Opens |
|---|---|
| `shopkart://home` | Home, all products |
| `shopkart://search?q=shoes` | Home with search results |
| `shopkart://product/p101` | Product page (unknown id shows "Product not found") |
| `shopkart://cart` | Cart |
| `shopkart://cart?add=p103&qty=2` | Adds the item, then opens the cart |

Any other link opens Home with a "Link not recognised" message.
On Android, Back from a deep-linked screen returns to Home.

```bash
# Android
adb shell am start -W -a android.intent.action.VIEW -d "shopkart://product/p101"
# iOS simulator
xcrun simctl openurl booted "shopkart://product/p101"
```

## Android (`shopkart-android/`)

App id `com.shopkart.demo`, minSdk 26, targetSdk 35. Plain Java, no libraries.

```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
cd shopkart-android && ./gradlew assembleRelease bundleRelease
```

- APK: `app/build/outputs/apk/release/app-release.apk`
- AAB (Play Store): `app/build/outputs/bundle/release/app-release.aab`

Release builds are signed with `shopkart-upload.jks` using `keystore.properties`.
Neither file is committed. Back both up: Play Store updates must be signed with
the same upload key. Without them, release builds fall back to the debug key.

## iOS (`shopkart-ios/`)

SwiftUI, iOS 16+, bundle id `com.shopkart.demo`. Needs full Xcode.

```bash
cd shopkart-ios
./build.sh simulator                        # dist/ShopKart-simulator.zip
DEVELOPMENT_TEAM=ABCDE12345 ./build.sh ipa   # dist/ShopKart.ipa, needs an Apple Developer account
```

`build.sh` generates `ShopKart.xcodeproj` from `project.yml` with XcodeGen.
