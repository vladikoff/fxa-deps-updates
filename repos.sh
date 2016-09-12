#!/bin/bash -ex

cd projects

git clone https://github.com/mozilla/fxa-content-server.git &
git clone https://github.com/mozilla/fxa-auth-server.git &
git clone https://github.com/mozilla/fxa-auth-db-mysql.git &
git clone https://github.com/mozilla/fxa-auth-mailer.git &
git clone https://github.com/mozilla/fxa-customs-server.git &
git clone https://github.com/vladikoff/browserid-verifier.git -b http &
git clone https://github.com/mozilla/fxa-oauth-server.git &
git clone https://github.com/mozilla/fxa-oauth-console.git &
git clone https://github.com/mozilla/fxa-profile-server.git &
git clone https://github.com/mozilla/fxa-basket-proxy.git &

wait

cd ..
