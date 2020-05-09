#!/bin/bash

# Updating

echo Saving with commit $1
# https://help.github.com/en/github/using-git/caching-your-github-password-in-git
git config --global credential.helper 'cache --timeout=86400'
git add .
git commit -m "$1"
git push gitlab

# Deploying

ssh -tt -i /home/charles/.ssh/amazon-tesis.pem ubuntu@18.219.150.69 << EOF
cd apps/bci-front-end
git config --global credential.helper 'cache --timeout=86400'
git pull
pm2 restart "node_modules/.bin/react-scripts start"
exit
EOF