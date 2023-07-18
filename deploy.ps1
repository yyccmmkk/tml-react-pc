$account = gc D:/.account;
curl -u $account  -X GET  xxxxxxxx
#scp -P 20000 -r  ./fe_stage3  root@192.168.0.197:/opt/cosmo/idp/
