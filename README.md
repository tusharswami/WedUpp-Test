# WedUpp-Test
app.js is the starting file.
home.ejs and result.ejs are two views files.
which contains HTML formatting with CSS, Vanilla JS and BootStrap.
file.txt a file which contains the texts which are scanned for finding out the occurences


Test cases(for inputting a numeric value at the front-end)
INPUT(N - Numeric Value)
1. Alphabets - Keystrokes are not accespted
2. Numbers - Keystokes accepts only value having charCode between 48 to 57.
3. Special Characters/Spaces - Not accepted
4. Value of the number ranges from 1 to 25

OUTPUT
1. Output is generated in three columns namely #(for serial number), word, frequency(occurence of a word).
2. N rows are generated.
3. Doesn't include occurence of the following words “the”, “a”, “of”, “and”, “in”, ”is”, “to”.


DEPENDENCIES
1. Express (express)
2. Body Parser (body-parser)
3. File System integration (fs)

