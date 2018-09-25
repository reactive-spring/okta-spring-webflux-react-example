#!/bin/bash 
port=${1:-8080}
count=0
token=eyJraWQiOiIycW1BZkZlM1NLZGx0LXNhOXkzZDJjTjZtbjVNci00U2Fmb0dGS3VEaG1JIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULkc2TUZha1FERldJUEI4TWNGY3JlazZzQ1BXZ1JfSnNwSHJvNERoVUZGQUkiLCJpc3MiOiJodHRwczovL2Rldi03Mzc1MjMub2t0YXByZXZpZXcuY29tL29hdXRoMi9kZWZhdWx0IiwiYXVkIjoiYXBpOi8vZGVmYXVsdCIsImlhdCI6MTUzNzg0NDA4MywiZXhwIjoxNTM3ODQ3NjgzLCJjaWQiOiIwb2FnYnFicGs0cW1KRHBhUzBoNyIsInVpZCI6IjAwdWZraWptaHE3MFZ6Z1ZkMGg3Iiwic2NwIjpbIm9wZW5pZCJdLCJzdWIiOiJkZW1vQG9rdGEuY29tIn0.H-xiQ7UbhTPgedHiQ1c3eT74wGzPdecwscB2sUPPL2ia-1ZKJ9_dKUCnvQcdt5AjcGh_c3uGsmmXGY2sztHmpAht4416jksZV98ztx4Fz41D4Q30aylCA2y4KV4B2NsHrhskwyQ77rz_yKjdEOW1VK2rGcijmrLGLrC4_OX1dA6ZMvQSPJc6hX62phtidhYlQfmDIW-C6Qv6_SiNtn6podzfuePmSPtZDbl3bNUmobmCUAjeeaL6SdyLD-AYpsnKTVhpwPGUsAMG3ThQPNgjbKtl41H6W8GxHhkD-rA1ali-e8jqk5wxauPAbEnM5vX38HLv2m4Ld5brDo43BkB9-Q

profile () {
  ((count++))
  echo "posting #${count}"
  http POST http://localhost:${port}/profiles email="random${count}" Authorization:"Bearer ${token}"
  if [ $count -gt 120 ]
  then
    echo "count is $count, ending..."
    break
  fi
}

while sleep 1; do profile; done
