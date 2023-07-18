rm * -Include *.tar.gz, *.zip
tar -cvzf ./build.tar.gz ./build
7z.exe a  -r ./build.zip ./build
write-host 'zip压缩完成!' -ForegroundColor green
