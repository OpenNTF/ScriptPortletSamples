for f in `find . -maxdepth 1 -mindepth 1 -type d|grep /`;
do
 echo  pushing $f
 # set path to sp.sh in the following line:
 ./sp.sh push -contentRoot $f
 done
