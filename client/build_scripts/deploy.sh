#rm -rf ./build;
npm run build;
aws --profile circonference s3 cp build/ s3://diiq-circonference/ --recursive;
for key in $( find ./build -type f | sed "s|^\./build/||" ); do
aws --profile circonference s3api put-object-acl --bucket diiq-circonference --key $key --grant-read uri=http://acs.amazonaws.com/groups/global/AllUsers;
done
