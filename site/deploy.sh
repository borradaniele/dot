#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs:build

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git config user.name github-actions
git config user.email github-actions@github.com

git init
git add -A
git commit -m '👽 Docs Build'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:borradaniele/dot.git master

cd -
