: for push to github
git config --global https.proxy http://127.0.0.1:1080
git push
git config --global --unset https.proxy
git config --global -l