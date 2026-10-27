#!/bin/sh
# Salin fail web aplikasi dari akar repo ke www/ untuk dibungkus oleh Capacitor.
set -e
SRC="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$(cd "$(dirname "$0")" && pwd)/www"
rm -rf "$DEST"
mkdir -p "$DEST"
for f in index.html styles.css manifest.webmanifest logo-mds.jpg icon-192.png icon-512.png maskable-512.png data.js bylaws.js db.js word.js ai.js app.js; do
  cp "$SRC/$f" "$DEST/$f"
done
echo "Fail web disalin ke $DEST"
