#!bin/bash

#Uses docker run --rm -it -v $PWD:/wd buildkite/puppeteer:latest bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
#echo $DIR
npm cache clean -f
npm install -g n
n stable


for CASE in 'accept' 'decline'
 do

 SRCDIR="$DIR/data/splits/$CASE/"
 RESULTSDIR="$DIR/results/splits/$CASE"
 mkdir -p $RESULTSDIR
 

 PDFDIR="$RESULTSDIR/pdfs/"
 TEXTDIR="$RESULTSDIR/texts/"

 mkdir -p $PDFDIR
 mkdir -p $TEXTDIR
 
 FILES="$(ls $SRCDIR)"

 for FILENAME in $FILES;
    do
      SRCFILE=$SRCDIR$FILENAME
      echo "Processing file ... $SRCFILE"
      node $DIR/main.js --src $SRCFILE --pdf $PDFDIR --txt $TEXTDIR
      #rm $SRCFILE
    done

 done 
