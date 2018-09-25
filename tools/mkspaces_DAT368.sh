#!/bin/bash

cf t -o teched_dat368 -s dev00

org=$(cf org teched_dat368 --guid); echo "teched_dat368: " $org
hdb=$(cf service dat368-db --guid); echo "dat368-db: " $hdb
spc=$(cf space dev00 --guid); echo "dev00: " $spc

for i in {01..01}; do
  echo ""
  echo "Run" $i
  cf create-space dev$i -o teched_dat368
  spc=$(cf space dev$i --guid); echo "dev$i: " $spc
  cf set-space-role primaryuser01@gmail.com teched_dat368 dev$i SpaceDeveloper
  cf t -o teched_dat368 -s dev00
  cf update-service dat368-db -c '{"operation":"adddatabasemapping","orgid":"'$org'","spaceid":"'$spc'","isdefault":"true"}'
  cf t -s dev$i
  cf create-service hana hdi-shared dat368-hdi -c '{"database_id":"'$hdb'"}'
  cf services | grep dat368-hdi | grep "create succeeded"
  while [ $? -ne 0 ]; do
    cf services | grep dat368-hdi
    echo "Still creating dat368-hdi."
    sleep 30
    cf services | grep dat368-hdi | grep "create succeeded"
  done 
echo "blah: $?"

done

cf t -o teched_dat368 -s dev00

