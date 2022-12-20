#!/bin/bash

MAX=99
MIN=0
SERIES_LENGTH=$((1440*30))
OUTPUT=data/series.csv
CURRENT_DATETIME=$(date +%s)
PERIOD=60
RANDOM=$$

random_value(){
   r1=$((${RANDOM}%98+1))
   echo $r1 
}

: > $OUTPUT
echo "Generating ${SERIES_LENGTH} random metrics between ${MIN} and ${MAX} until date ${CURRENT_DATETIME}"
echo "..."
echo "#datatype measurement,tag,double,dateTime" >> ${OUTPUT}
echo "metric,tag,value,time" >> ${OUTPUT}

i=0
while [[ $i -lt $SERIES_LENGTH ]]
do
    timestamp=$(($CURRENT_DATETIME-$PERIOD*$i))'000000000'
    echo "cpu,default,$(random_value),$timestamp" >> ${OUTPUT}
    echo "mem,default,$(random_value),$timestamp" >> ${OUTPUT}
    i=$((i+1))
done


echo "Series generated succesfully."