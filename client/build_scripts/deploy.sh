rm -rf ./build;
yarn run build;
aws --profile trajectory s3 cp build/ s3://talks.sambleckley.com/ --recursive --exclude index.html --region us-east-2 --cache-control max-age=604800;
aws --profile trajectory s3 cp build/index.html s3://talks.sambleckley.com/ --region us-east-2 --cache-control max-age=120;
for key in $( find ./build -type f | sed "s|^\./build/||" ); do
  aws --profile trajectory s3api put-object-acl --bucket talks.sambleckley.com --region us-east-2 --key $key --grant-read uri=http://acs.amazonaws.com/groups/global/AllUsers;
done
