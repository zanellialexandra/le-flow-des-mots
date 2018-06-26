set MONGO_HOME=C:\Program Files\MongoDB\Server\3.4
cd /d "%~dp0"
"%MONGO_HOME%\bin\mongoimport" --db test --collection publications --drop --file dataset/publications.json --jsonArray
pause