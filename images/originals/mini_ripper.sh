#!/bin/bash
STORAGE_LOCATION='.'
DESTINATION_LOCATION='../keynotes'

IMAGE_URL='https://pbs.twimg.com/profile_images/833863863120433152/OErWkyXy_400x400.jpg'
KEYNOTE_NAME='vijay_sankaran'

original_file_extension=${IMAGE_URL##*.}
original_image="$STORAGE_LOCATION/$KEYNOTE_NAME.$original_file_extension"
wget "$IMAGE_URL" -O "$original_image"

convert "$original_image" -strip -resize 80 "$DESTINATION_LOCATION/$KEYNOTE_NAME"_thumb.jpg