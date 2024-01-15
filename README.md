# Simple-Handpose-Image-Editor
using p5.js and handpose model from ml5.js

As the name suggests, this has EXTREMELY limited features when compared to normal image editors ;)

And it is actually an assignment from a bachelor-level HCI course ;) 

# Features
This program allows user to perform actions by switching to 3 different modes:
1. Default Mode
   <br>For view only. User's index fingertip is still detected but no actions will be performed on the image.
2. Freehand Drawing Mode
   <br>Users can draw on the image by moving their finger.
3. Region Selection and Copying Mode
   <br>Users can copy the selected region of the image and place it on the another selected region of the image.

(And sadly these are the only functions can be done by this program :( )

# Basic Controls
1. Key controls for mode switching
   All done by simple press and release
   - 'f' key: switch to Freehand Drawing Mode
   - 's' key: switch to Region Selection and Copying Mode
   - 'e' key: switch to Default Mode
     
2. Default Mode
   <br>Move your index finger and the corresponding positions of the detected fingertip on the camera display and the image will be indicated by a green dot

3. Freehand Drawing Mode
   <br>Move your index finger and the drawing will be shown by magenta strokes

4. Region Selection and Copying Mode
   <br>Move your index finger and thumb where a yellow box is displayed between the two fingertips (the detected region).
   <br>Press and release 'c' key to copy the region.
   <br>Press and release 'v' key to paste the copied region on the current detected region.

# Links
Fullscreen playable version: https://editor.p5js.org/FishballInTheSea/full/pjIeEl5Cu
