#!/bin/bash
# Builds ShopKart for iOS. Needs full Xcode (App Store), not just Command Line Tools.
#
#   ./build.sh simulator             -> dist/ShopKart-simulator.zip (.app for simulators / cloud simulators)
#   DEVELOPMENT_TEAM=ABCDE12345 ./build.sh ipa
#                                    -> dist/ShopKart.ipa (signed, for real devices)
set -euo pipefail
cd "$(dirname "$0")"

if ! xcodebuild -version >/dev/null 2>&1; then
  echo "Full Xcode is required. Install it from the App Store, then run:"
  echo "  sudo xcode-select -s /Applications/Xcode.app/Contents/Developer"
  exit 1
fi
command -v xcodegen >/dev/null || brew install xcodegen
xcodegen generate --quiet

mkdir -p dist
case "${1:-simulator}" in
  simulator)
    xcodebuild -project ShopKart.xcodeproj -scheme ShopKart -configuration Release \
      -sdk iphonesimulator -derivedDataPath build CODE_SIGNING_ALLOWED=NO build
    rm -f dist/ShopKart-simulator.zip
    (cd build/Build/Products/Release-iphonesimulator && zip -qr ../../../../dist/ShopKart-simulator.zip ShopKart.app)
    echo "Built dist/ShopKart-simulator.zip"
    ;;
  ipa)
    : "${DEVELOPMENT_TEAM:?Set DEVELOPMENT_TEAM to your Apple team ID}"
    xcodebuild -project ShopKart.xcodeproj -scheme ShopKart -configuration Release \
      -destination 'generic/platform=iOS' -archivePath build/ShopKart.xcarchive \
      DEVELOPMENT_TEAM="$DEVELOPMENT_TEAM" -allowProvisioningUpdates archive
    xcodebuild -exportArchive -archivePath build/ShopKart.xcarchive \
      -exportOptionsPlist ExportOptions.plist -exportPath dist -allowProvisioningUpdates
    echo "Built dist/ShopKart.ipa"
    ;;
  *)
    echo "Usage: ./build.sh [simulator|ipa]"; exit 1 ;;
esac
