#!/usr/bin/env bash

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

rm -r -f .git

echo '# offlinha
Build do site' > README.md

# if you are deploying to a custom domain
# echo 'site.com' > CNAME

git init
git add -A
git commit -m 'deploy :octocat:'

# deploy na gh pages
git push -f https://github.com/nenitf/offlinha master:gh-pages

cd -
