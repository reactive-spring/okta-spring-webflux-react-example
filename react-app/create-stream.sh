#!/bin/bash
port=${1:-8080}
count=0
accessToken=eyJraWQiOiIycW1BZkZlM1NLZGx0LXNhOXkzZDJjTjZtbjVNci00U2Fmb0dGS3VEaG1JIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULnZpZDdpVnh3Yk1tUWxUbENKSG44TjdzRWZrLS1EM1A3NXJQSnNiOGx3T1kiLCJpc3MiOiJodHRwczovL2Rldi03Mzc1MjMub2t0YXByZXZpZXcuY29tL29hdXRoMi9kZWZhdWx0IiwiYXVkIjoiYXBpOi8vZGVmYXVsdCIsImlhdCI6MTU0MjE0OTExMSwiZXhwIjoxNTQyMTUyNzExLCJjaWQiOiIwb2FnYnFicGs0cW1KRHBhUzBoNyIsInVpZCI6IjAwdWZraWptaHE3MFZ6Z1ZkMGg3Iiwic2NwIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCJdLCJzdWIiOiJkZW1vQG9rdGEuY29tIn0.3oN93Sc75eGXfrg81K0hvFpL8WNTE8hzqcd8KV0X6dDePiCcoP1oKQwgAvrOYMiJmgCpw1jWqcZKn9S5e68DPZ6ydpMVmSuW-5MA-S7LSfuP31tCoTXs-Erf5kOhi_EZdQsmlNVOi7AQOcIxPRjSlaI4trQg5AZblSRFtF51jRgv5pWTuN_jp1BUiDrzrOuezdkbTwUwH3oNQ4SNj9_UqvOWRvj3dttbXoUTWhueUZe8ob63UErTAi0gvMJEtGlU-oriP1b5sGRbTmwD5EoUp_dl9C0I3vV2WowwZ4uLzaL_mLesRUPSvPsXs4t5lseR09qH--j_ZT21sjJT1WpGfA

profile () {
  ((count++))
  echo "posting #${count}"
  http POST http://localhost:${port}/profiles email="random${count}" "Authorization: Bearer ${accessToken}"
  if [ $count -gt 120 ]
  then
    echo "count is $count, ending..."
    break
  fi
}

while sleep 1; do profile; done
