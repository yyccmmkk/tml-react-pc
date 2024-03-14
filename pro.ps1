npm run build
rm * -Include *.tar.gz, *.zip
tar -cvzf ./build.tar.gz ./build
#7z.exe a  -r ./build.zip ./build
Compress-Archive ./build ./build.zip
write-host 'zip压缩完成!' -ForegroundColor green
