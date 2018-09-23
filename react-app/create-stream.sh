#!/bin/bash 
port=${1:-8080}
count=0
token=eyJraWQiOiIycW1BZkZlM1NLZGx0LXNhOXkzZDJjTjZtbjVNci00U2Fmb0dGS3VEaG1JIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULmVia1RSZ2FOYjB0ZUthXzVLZ1ZiVDc5NTBWVTJKbkN4Sl90QmNWMkxIaUUiLCJpc3MiOiJodHRwczovL2Rldi03Mzc1MjMub2t0YXByZXZpZXcuY29tL29hdXRoMi9kZWZhdWx0IiwiYXVkIjoiYXBpOi8vZGVmYXVsdCIsImlhdCI6MTUzNzcxOTY2OCwiZXhwIjoxNTM3NzIzMjY4LCJjaWQiOiIwb2FnYnFicGs0cW1KRHBhUzBoNyIsInVpZCI6IjAwdWZraWptaHE3MFZ6Z1ZkMGg3Iiwic2NwIjpbIm9wZW5pZCJdLCJzdWIiOiJkZW1vQG9rdGEuY29tIn0.snzaH7hvY3VblhGz59lfJYSr24qA27bz8sG4ZhQoRgBXW5zHT7xYar6ZyjyK_E24cHX734B29Vntn5Buuye6E6fbZ-h3y1Srzz23AKIQYCv_Y1g_8_ogGpIkTwPq6Ei-JNHgCQ58CAOhABbi2c_zsc3oYxqUwpkITtwKOL1xEO7ben-e2HKURIwwLiXnvA1GalcDkyNpGy2ZUBcw0mFKBaKHZLGcD8FLHM1snZhVTVf4KxPtYjQnl11RjYVs30w8foJnkl8CZB0jWexDbjAubABbBFdIptIGGiRKzzREA7ZxvQFULPPceVlmQRn0av3lAcr8tNHayYCWoSxs4lw06A

profile () {
  ((count++))
  echo "posting ${count}"
  http POST http://localhost:${port}/profiles email="random${count}" Authorization:"Bearer ${token}"
  if [ $count -gt 120 ]
  then
    echo "count is $count, ending..."
    break
  fi
}

while sleep 1; do profile; done
