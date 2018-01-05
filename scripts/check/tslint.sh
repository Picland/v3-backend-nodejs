#!/usr/bin/env bash

cd "$(git rev-parse --show-toplevel)"
TSLINT="node_modules/.bin/tslint"
pwd

if [[ ! -x "$TSLINT" ]]; then
  printf "\t\033[41mPlease install ESlint\033[0m (npm install tslint)\n"
  exit 1
fi

STAGED_FILES=($(git diff --cached --name-only --diff-filter=ACM | grep ".ts$"))

echo "Step2: TSLint check ${#STAGED_FILES[@]} files"

if [[ "$STAGED_FILES" = "" ]]; then
  exit 0
fi

$TSLINT "${STAGED_FILES[@]}" --fix

TSLINT_EXIT="$?"

# Re-add files since they may have been fixed
git add "${STAGED_FILES[@]}"

if [[ "${TSLINT_EXIT}" == 0 ]]; then
  printf "\n\033[42mCOMMIT SUCCEEDED\033[0m\n"
else
  printf "\n\033[41mCOMMIT FAILED:\033[0m Fix tslint errors and try again\n"
  exit 1
fi

exit $?