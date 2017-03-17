#rm -rf ./build;
npm run build;
aws --profile diiq-talks s3 cp build/ s3://talks.diiq.org/ --recursive;
for key in $( find ./build -type f | sed "s|^\./build/||" ); do
aws --profile diiq-talks s3api put-object-acl --bucket talks.diiq.org --key $key --grant-read uri=http://acs.amazonaws.com/groups/global/AllUsers;
done
