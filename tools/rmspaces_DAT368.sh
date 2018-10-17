#!/bin/bash

cf t -o teched_dat368 -s dev00

org=$(cf org teched_dat368 --guid); echo "teched_dat368: " $org
hdb=$(cf service dat368-db --guid); echo "dat368-db: " $hdb
spc=$(cf space dev00 --guid); echo "dev00: " $spc

for i in {01..30}; do
  echo ""
  echo "Run" $i
  cf t -s dev$i
  cf d DAT368.web -f -r
  cf d DAT368.xsjs -f -r
  cf d DAT368.python -f -r
  cf d DAT368.db -f -r
  cf delete-service dat368-hdi -f
  cf service dat368-hdi
  while [ $? -eq 0 ]; do
    echo "Still deleting dat368-hdi in space dev$i."
    sleep 30
    cf service dat368-hdi
  done
  cf t -s dev00
  spc=$(cf space dev$i --guid); echo "dev$i: " $spc
  cf update-service dat368-db -c '{"operation":"removedatabasemapping","orgid":"'$org'","spaceid":"'$spc'"}'
  cf t -s dev00
  cf delete-space dev$i -f
done

cf t -o teched_dat368 -s dev00

