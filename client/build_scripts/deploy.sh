rm -rf ./build;
yarn run build;
aws --profile trajectory s3 cp build/ s3://palette.sambleckley.com/ --recursive --exclude index.html --region us-east-2 --cache-control max-age=604800;
aws --profile trajectory s3 cp build/index.html s3://palette.sambleckley.com/ --region us-east-2 --cache-control max-age=120;
aws --profile trajectory s3 cp static_pages s3://palette.sambleckley.com/  --recursive --region us-east-2 --cache-control max-age=120;
for key in $( find ./static_pages -type f ! -name "*.*" | sed "s|^\./static_pages/||" ); do
  aws --profile trajectory s3 cp static_pages/$key s3://palette.sambleckley.com/$key --content-type "text/html" --cache-control max-age=120;
done
for key in $( find ./build -type f | sed "s|^\./build/||" ); do
  aws --profile trajectory s3api put-object-acl --bucket palette.sambleckley.com --region us-east-2 --key $key --grant-read uri=http://acs.amazonaws.com/groups/global/AllUsers;
done
for key in $( find ./static_pages -type f | sed "s|^\./static_pages/||" ); do
  aws --profile trajectory s3api put-object-acl --bucket palette.sambleckley.com --region us-east-2 --key $key --grant-read uri=http://acs.amazonaws.com/groups/global/AllUsers;
done
