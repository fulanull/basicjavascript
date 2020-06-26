#!/bin/bash
#clones a repository which contains required files to this course.

git clone git@github.com:jonasschmedtmann/complete-javascript-course.git

#sets git config to be able to push to github
git config --local user.email "42985175+fulanull@users.noreply.github.com"
git config --local user.name "fulanull"
git config --global core.editor "vim"

