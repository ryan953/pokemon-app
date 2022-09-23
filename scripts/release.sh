#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

####################################################################################
# You should have a .sentryclirc file created with the following fields filled in:
# You can get an auth token with `sentry-cli login`
# [defaults]
# project=
# org=

# [auth]
# token=
####################################################################################

# SENTRY_LOG_LEVEL=info
VERSION=$(git rev-parse --short HEAD)

echo "Creating release..."
sentry-cli releases new "$VERSION"

echo "Uploading sourcemaps..."
sentry-cli releases files "$VERSION" upload-sourcemaps \
  --url-prefix '~/static/js' \
  'build/static/js'

echo "Setting commits..."
sentry-cli releases set-commits "$VERSION" --auto

echo "Finailizing..."
sentry-cli releases finalize "$VERSION"

echo "Done!"
