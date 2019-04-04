#!/bin/bash
STORAGE_LOCATION='.'
DESTINATION_LOCATION='../keynotes'

IMAGE_URL='https://www.jointmeeting.org/resource/resmgr/2019_headshots_resized/claire_pomeroy.jpg'
KEYNOTE_NAME='claire_pomeroy'

original_file_extension=${IMAGE_URL##*.}
original_image="$STORAGE_LOCATION/$KEYNOTE_NAME.$original_file_extension"
wget "$IMAGE_URL" -O "$original_image"

convert "$original_image" -strip -resize 80 "$DESTINATION_LOCATION/$KEYNOTE_NAME"_thumb.jpg